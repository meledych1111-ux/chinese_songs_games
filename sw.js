// Имя вашего репозитория на GitHub
const REPO_NAME = 'chinese_songs_games';

// Базовый путь (с / в начале и конце)
const BASE_PATH = `/${REPO_NAME}/`;

// Название кеша (увеличьте номер при изменении файлов)
const CACHE_NAME = 'chinese-cache-v3';

// Файлы для кеширования
const FILES_TO_CACHE = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}songs.js`,
  `${BASE_PATH}WORDS.js`,
  `${BASE_PATH}GRAMMAR.js`,
  `${BASE_PATH}DIALOGS.js`,
  `${BASE_PATH}game.js`,
  `${BASE_PATH}pinyin-sounds.js`,
  `${BASE_PATH}writing-videos.js`,
  `${BASE_PATH}sounds-videos.js`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}mahjong-radicals.html`
];

// Установка: кешируем файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Кеширование файлов:', FILES_TO_CACHE);
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => console.error('❌ Ошибка кеширования:', err))
  );
  self.skipWaiting();
});

// Активация: удаляем старые кеши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('🗑️ Удаляем старый кеш:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Пропускаем запросы к другим доменам
  if (url.origin !== self.location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;  // Нашли в кеше
        }
        // Иначе идём в сеть
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Офлайн — показываем главную страницу
        return caches.match(`${BASE_PATH}index.html`);
      })
  );
});
