// Имя вашего репозитория
const REPO_NAME = 'chinese_songs_games';
const BASE_PATH = `/${REPO_NAME}/`;
const CACHE_NAME = 'chinese-cache-v4';

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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Кеширование...');
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => console.error('Ошибка:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('🗑️ Удаляем:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(`${BASE_PATH}index.html`))
  );
});
