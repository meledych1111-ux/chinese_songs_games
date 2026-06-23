// Имя вашего репозитория
const REPO_NAME = 'chinese_songs_games';
const BASE_PATH = `/${REPO_NAME}/`;
const CACHE_NAME = 'chinese-cache-v6';

// Файлы для кеширования (ВСЕ пути должны быть с BASE_PATH)
const FILES_TO_CACHE = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}songs.js`,
  `${BASE_PATH}WORDS.js`,
  `${BASE_PATH}GRAMMAR.js`,
  `${BASE_PATH}DIALOGS.js`,
  `${BASE_PATH}RADICALS.js`,
  `${BASE_PATH}game.js`,
  `${BASE_PATH}pinyin-sounds.js`,
  `${BASE_PATH}writing-videos.js`,
  `${BASE_PATH}sounds-videos.js`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}mahjong-radicals.html`
];

// Установка Service Worker - кеширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        console.log('📦 Начинаем кеширование...');
        
        // Кешируем файлы с обработкой ошибок
        const results = [];
        for (const file of FILES_TO_CACHE) {
          try {
            const response = await fetch(file);
            if (response && response.ok) {
              await cache.put(file, response);
              console.log(`✅ Закеширован: ${file}`);
              results.push(true);
            } else {
              console.warn(`⚠️ Не найден (${response?.status}): ${file}`);
              results.push(false);
            }
          } catch (err) {
            console.warn(`❌ Ошибка кеширования ${file}:`, err.message);
            results.push(false);
          }
        }
        
        const successCount = results.filter(r => r === true).length;
        console.log(`📊 Кеширование завершено: ${successCount}/${FILES_TO_CACHE.length} файлов`);
        
        // Если не удалось закешировать критичные файлы
        if (successCount === 0) {
          console.error('❌ Не удалось закешировать ни одного файла!');
        }
      })
      .catch(err => {
        console.error('❌ Критическая ошибка кеширования:', err);
      })
  );
  self.skipWaiting();
});

// Активация - очистка старых кешей
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('🗑️ Удаляем старый кеш:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker активирован, кеш готов к работе');
      return self.clients.claim();
    })
  );
});

// Перехват запросов - стратегия "сначала кеш, потом сеть"
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Пропускаем запросы к другим доменам (API, внешние ресурсы)
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Пропускаем запросы к chrome-extension
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Если есть в кеше - возвращаем
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Если нет в кеше - идем в сеть
        return fetch(event.request)
          .then(networkResponse => {
            // Проверяем, что получили валидный ответ
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Кешируем новый файл для будущих запросов
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => console.warn('Не удалось закешировать:', err));
            
            return networkResponse;
          })
          .catch(error => {
            console.warn('Ошибка загрузки:', url.pathname, error);
            
            // Если запрос на HTML страницу - показываем офлайн страницу
            if (url.pathname.endsWith('.html') || url.pathname === BASE_PATH || url.pathname === `${BASE_PATH}`) {
              return caches.match(`${BASE_PATH}index.html`);
            }
            
            // Для других файлов возвращаем ошибку
            return new Response('Офлайн режим: файл недоступен', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});
