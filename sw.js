// Имя вашего репозитория
const REPO_NAME = 'chinese_songs_games';
const BASE_PATH = `/${REPO_NAME}/`;
const CACHE_NAME = 'chinese-cache-v7';

// Файлы для кеширования
const FILES_TO_CACHE = [
  `${BASE_PATH}`,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}grammar.html`,
  `${BASE_PATH}review.html`,
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

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        console.log('📦 Начинаем кеширование...');
        
        try {
          // Кешируем все файлы сразу
          await cache.addAll(FILES_TO_CACHE);
          console.log('✅ Все файлы успешно закешированы');
        } catch (err) {
          console.error('❌ Ошибка кеширования:', err);
          
          // Пробуем кешировать по отдельности
          for (const file of FILES_TO_CACHE) {
            try {
              const response = await fetch(file);
              if (response && response.ok) {
                await cache.put(file, response);
                console.log(`✅ Закеширован: ${file}`);
              }
            } catch (e) {
              console.warn(`⚠️ Не удалось закешировать: ${file}`);
            }
          }
        }
      })
  );
  self.skipWaiting();
});

// Активация
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
      console.log('✅ Service Worker активирован');
      return self.clients.claim();
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Пропускаем запросы к другим доменам
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
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then(networkResponse => {
            // Кешируем успешные ответы
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // Возвращаем офлайн страницу
            return caches.match(`${BASE_PATH}index.html`)
              .then(cached => {
                if (cached) return cached;
                return new Response('Офлайн режим', {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({
                    'Content-Type': 'text/html'
                  })
                });
              });
          });
      })
  );
});
