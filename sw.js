const CACHE_NAME = 'chinese-course-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/songs.js',
  '/WORDS.js',
  '/GRAMMAR.js',
  '/DIALOGS.js',
  '/game.js',
  '/pinyin-sounds.js',
  '/writing-videos.js',
  '/sounds-videos.js'
];

// Установка Service Worker — кешируем файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширование файлов');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Ошибка кеширования:', err))
  );
  self.skipWaiting();
});

// Активация — удаляем старые кеши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Удаляем старый кеш:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Перехват запросов — сначала ищем в кеше, потом в сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Нашли в кеше — возвращаем
        if (response) {
          return response;
        }
        // Не нашли — идём в сеть
        return fetch(event.request).then(networkResponse => {
          // Кешируем новый файл для будущих офлайн-сессий
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Офлайн и нет в кеше — показываем заглушку
        return caches.match('/index.html');
      })
  );
});
