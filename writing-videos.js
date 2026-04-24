// ==========================================
// Модуль: Видео по каллиграфии (написание иероглифов)
// ==========================================

(function() {
    const WRITING_VIDEOS = [
        {
            emoji: "✍️",
            title: "捺画还可以这样写",
            description: "Техника написания черты 捺 (nà) — отличный способ улучшить почерк",
            tags: "#硬笔书法之美 #练字是一种生活 #练字",
            url: "https://www.xiaohongshu.com/explore/699065a70000000015022775?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBlRwebsjH1ck3jrxdRRSDdYArY0KraPp1_8Xrxh7s-L0=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776876682&share_id=4ff9c52b9b85465bb6fef5856681a7e7"
        },
        {
            emoji: "✍️",
            title: "好的写法，建议收藏保存",
            description: "Правильные техники написания иероглифов. Сохраните для практики!",
            tags: "#写一手好字惊艳所有人 #硬笔规范字 #书法教学",
            url: "http://xhslink.com/o/Ag3RLonpiPT"
        },
        {
            emoji: "📝",
            title: "规范字书写",
            description: "Правильное написание стандартных иероглифов. Каллиграфия для детей и взрослых",
            tags: "#硬笔规范字 #同步字帖 #每日一字 #写一手好字惊艳所有人 #少儿硬笔书法 #书法教学 #练字方法 #笔画笔顺 #书法老师 #汉字之美",
            url: "http://xhslink.com/o/IzKUtk4KPs"
        },
        {
            emoji: "📖",
            title: "书法里所有口字规律",
            description: "Полный разбор правил написания иероглифа 口 (рот): отдельно, слева, справа, в окружении. Разные стили каллиграфии. Эффективность в 2 раза выше!",
            tags: "#硬笔书法 #写一手好字惊艳所有人 #硬笔规范字 #基本笔画 #硬笔书法之美 #练字方法 #生字 #书法教学 #书法老师 #书法入门",
            url: "http://xhslink.com/o/3MsFcW8PhxV"
        },
        {
            emoji: "📚",
            title: "二年级上册《语文园地一》词语手写",
            description: "Написание слов для 2 класса, 1单元. Практика для школьников. #字词积累 #小学生练字",
            tags: "#字词积累 #小学生练字 #二年级 #开学必备 #培养孩子好习惯",
            url: "http://xhslink.com/o/49vImbaOczT"
        }
    ];

    function renderWritingVideos() {
        const container = document.getElementById('writingVideosContainer');
        if (!container) return;

        let html = `
            <div class="card">
                <h2 style="margin-bottom: 20px; color: #4361ee;">✍️ Как красиво писать иероглифы</h2>
                <p style="margin-bottom: 16px; color: #555;">🎯 Видеоуроки по каллиграфии: техника написания черт и иероглифов</p>
                <div class="writing-videos-grid">
        `;

        for (let v of WRITING_VIDEOS) {
            html += `
                <div class="writing-video-card">
                    <div class="writing-video-content">
                        <div class="writing-video-emoji">${v.emoji}</div>
                        <div class="writing-video-info">
                            <div class="writing-video-title">${v.title}</div>
                            <div class="writing-video-tags">${v.tags}</div>
                            <div class="writing-video-desc">${v.description}</div>
                        </div>
                        <a href="${v.url}" target="_blank" class="writing-video-btn">🎬 Смотреть урок</a>
                    </div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Добавляем вкладку в меню
    function addTab() {
        const tabsContainer = document.querySelector('.tabs');
        if (!tabsContainer) return;
        if (tabsContainer.querySelector('[data-tab="writing"]')) return;

        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.setAttribute('data-tab', 'writing');
        newTab.innerHTML = '✍️ Каллиграфия';
        tabsContainer.appendChild(newTab);
    }

    // Создаём панель
    function createPanel() {
        if (document.getElementById('writingPanel')) return;

        const container = document.querySelector('.container');
        if (!container) return;

        const panel = document.createElement('div');
        panel.id = 'writingPanel';
        panel.className = 'panel';
        panel.innerHTML = '<div id="writingVideosContainer"></div>';
        container.appendChild(panel);
    }

    // Настраиваем переключение вкладок
    function setupSwitching() {
        const writingTab = document.querySelector('[data-tab="writing"]');
        if (!writingTab) return;

        writingTab.onclick = function(e) {
            e.preventDefault();

            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            writingTab.classList.add('active');

            document.querySelectorAll('.panel').forEach(panel => {
                panel.classList.remove('active');
            });

            const writingPanel = document.getElementById('writingPanel');
            if (writingPanel) {
                writingPanel.classList.add('active');
                renderWritingVideos();
            }
        };
    }

    // Добавляем стили
    function addStyles() {
        if (document.getElementById('writing-videos-styles')) return;

        const style = document.createElement('style');
        style.id = 'writing-videos-styles';
        style.textContent = `
            .writing-videos-grid {
                display: flex;
                flex-direction: column;
                gap: 20px;
                margin-top: 20px;
            }
            .writing-video-card {
                background: linear-gradient(135deg, #fff8f0, #ffffff);
                border-left: 6px solid #ff6b35;
                border-radius: 24px;
                padding: 18px;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .writing-video-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .writing-video-content {
                display: flex;
                align-items: center;
                gap: 18px;
                flex-wrap: wrap;
            }
            .writing-video-emoji {
                font-size: 48px;
            }
            .writing-video-info {
                flex: 1;
            }
            .writing-video-title {
                font-size: 18px;
                font-weight: 800;
                color: #2c3e50;
                margin-bottom: 6px;
            }
            .writing-video-tags {
                font-size: 11px;
                color: #ff6b35;
                margin-bottom: 6px;
                line-height: 1.4;
            }
            .writing-video-desc {
                font-size: 14px;
                color: #666;
            }
            .writing-video-btn {
                background: linear-gradient(135deg, #ff6b35, #ff9a44);
                color: white;
                padding: 10px 22px;
                border-radius: 30px;
                text-decoration: none;
                font-weight: 700;
                font-size: 14px;
                white-space: nowrap;
                transition: transform 0.2s;
                display: inline-block;
            }
            .writing-video-btn:hover {
                transform: scale(1.03);
            }
            @media (max-width: 550px) {
                .writing-video-content {
                    flex-direction: column;
                    text-align: center;
                }
                .writing-video-btn {
                    width: 100%;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Инициализация
    function init() {
        addStyles();
        addTab();
        createPanel();
        setupSwitching();
        console.log('✅ Модуль "Каллиграфия" загружен');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
