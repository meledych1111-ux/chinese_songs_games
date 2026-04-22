(function() {
    const SOUNDS_VIDEOS = [
        {
            emoji: "🎵",
            title: "Все звуки Пиньинь",
            description: "Полная таблица произношения финалей и инициалей",
            tags: "#拼音 #基础 #发音",
            url: "https://www.xiaohongshu.com/explore/69de0a25000000001d01874e"
        },
        {
            emoji: "🗣️",
            title: "4 тона за минуту",
            description: "Как научиться различать тоны на слух",
            tags: "#汉语 #声调",
            url: "https://www.xiaohongshu.com/explore/69e724a2000000001a02da93"
        }
    ];

    function renderSoundsVideos() {
        const container = document.getElementById('soundsVideosContainer');
        if (!container) return;
        let html = `<div class="card">
            <h2 style="margin-bottom: 20px; color: #4361ee;">📢 Изучение звуков (видео)</h2>
            <div class="writing-videos-grid">`;
        for (let v of SOUNDS_VIDEOS) {
            html += `
                <div class="writing-video-card">
                    <div class="writing-video-content">
                        <div class="writing-video-emoji">${v.emoji}</div>
                        <div class="writing-video-info">
                            <div class="writing-video-title">${v.title}</div>
                            <div class="writing-video-tags">${v.tags}</div>
                            <div class="writing-video-desc">${v.description}</div>
                        </div>
                        <a href="${v.url}" target="_blank" class="writing-video-btn">🎬 Слушать звуки</a>
                    </div>
                </div>`;
        }
        html += `</div></div>`;
        container.innerHTML = html;
    }

    function addTab() {
        const tabsContainer = document.querySelector('.tabs');
        if (!tabsContainer || tabsContainer.querySelector('[data-tab="sounds-v"]')) return;
        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.setAttribute('data-tab', 'sounds-v');
        newTab.innerHTML = '📢 Звуки';
        tabsContainer.appendChild(newTab);
    }

    function createPanel() {
        if (document.getElementById('sounds-vPanel')) return;
        const panel = document.createElement('div');
        panel.id = 'sounds-vPanel';
        panel.className = 'panel';
        panel.innerHTML = '<div id="soundsVideosContainer"></div>';
        document.body.appendChild(panel); // Добавляем прямо в body
    }

    function init() {
        addTab();
        createPanel();
        // Вкладка будет работать через основной скрипт index.html
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }

    window.renderSoundsVideos = renderSoundsVideos; // Экспортируем функцию
})();