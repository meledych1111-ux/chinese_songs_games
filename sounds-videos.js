const SOUNDS_VIDEOS = [
    {
        emoji: "🔡",
        title: "Таблица звуков Пиньинь",
        description: "Полная таблица произношения всех букв и звуков китайского алфавита",
        tags: "#汉语拼音字母表 #一年级拼音 #幼小衔接",
        url: "https://www.xiaohongshu.com/explore/68f96bb6000000000400646e?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBb83wsyzFqPxZdZ8gNoiMFNLUnczro7-LChg8d_z3AsU=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776895522&share_id=c8a2fa41667543b7ab9e5446f2743cca"
    },
    {
        emoji: "📢",
        title: "Основы чтения слогов",
        description: "Урок по правильному чтению и сочетанию звуков (Пиньинь)",
        tags: "#一年级基础拼音 #拼音拼读 #每天学习一点点",
        url: "https://www.xiaohongshu.com/explore/69d5b2c00000000023007b05?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBpFTou9_ltJ5y-yE4zwkapEGydh-8O6Rrrur1Dnpg3rY=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776895453&share_id=2c78e35ea6ba4ad694d3191d6559418f"
    },
    {
        emoji: "🎯",
        title: "整体认读音节四声调拼读练习 (1)",
        description: "Запоминаем拼音? Учим целые слоги с 4 тонами. Ежедневная практика",
        tags: "#拼音 #拼读 #整体认读",
        url: "https://www.xiaohongshu.com/explore/66d481c2000000001d03bb44?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBkWl-Bz_fMShzb2vO_RYZ9WFWZvKYJSeHal0RDyZ8O5Y=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776895643&share_id=8fa2b6f262a542a89efd9981cdec64ba"
    },
    {
        emoji: "🔄",
        title: "拼读易混淆专练: in vs ing",
        description: "Практика сложных звуков: разница между -in и -ing",
        tags: "#拼音 #一年级 #幼小衔接 #每天学习一点点",
        url: "https://www.xiaohongshu.com/explore/67e0b664000000000900c063?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBy0KrP84GdK3HCQJ64VHrwXfE1blYFyKqGh1vjnlo280=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776895775&share_id=564f515277e4438db198c93b0cdfe1bf"
    },
    {
        emoji: "🗣️",
        title: "平翘舌音区分 (z/zh, c/ch, s/sh)",
        description: "Как различать свистящие и шипящие звуки в китайском",
        tags: "#一年级拼音 #平翘舌音拼读练习 #平翘舌不分",
        url: "https://www.xiaohongshu.com/explore/670c5500000000001b02de7e?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBQF28FOw3TmwMrjxVPOYnmdvb4Fx6LQGxq146PjOHr7E=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776895974&share_id=2544aeb4499c449c93207e1d0d2d1b2a"
    },
    {
        emoji: "📚",
        title: "平翘舌音拼读对比练习 (z/zh, c/ch, s/sh)",
        description: "Полный разбор и对比练习 сложных звуков для 1 класса",
        tags: "#一年级 #汉语拼音 #平舌音 #翘舌音 #平翘舌音",
        url: "https://www.xiaohongshu.com/explore/68fc26c50000000004011b8a?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBsv3ivD3TvSNM6ihCHN2UDLhvaNaep3zDmwcMcBC0IUc=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776896040&share_id=726ec32b6bfb4983b97a07c4a655aa32"
    },
    {
        emoji: "🎵",
        title: "汉语拼音:复韵母拼读",
        description: "Практика чтения сложных финалей (составных гласных)",
        tags: "#汉语拼音 #幼小衔接拼音 #拼音拼读 #一年级拼音",
        url: "https://www.xiaohongshu.com/explore/68e743950000000005031cc6?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBiHU10NqEsOAuAd7F1_siGQRu493KyAh1RJ3wYcUcY0w=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776896089&share_id=9b6b6fd0ba674ddd818ae9ff7c0cbb32"
    },
    {
        emoji: "✏️",
        title: "认字识字:拼音拼读",
        description: "Учим иероглифы через拼音 — для детей и взрослых",
        tags: "#幼小衔接认字 #认字识字 #幼儿识字 #成人识字 #拼音拼读",
        url: "https://www.xiaohongshu.com/explore/68f1c8500000000004003b28?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBM6g0kY3B0O4FB3nTSVHmxllRKffK2BviWy2Q_Iovafg=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776896147&share_id=000807562f2b49b180b5e94eb83e4a36"
    },
    {
        emoji: "🔊",
        title: "复韵母iu的拼读",
        description: "Практика чтения финали -iu. #拼音 #自然拼读 #拼音天天练",
        tags: "#拼音 #自然拼读 #拼音天天练 #幼小衔接拼音",
        url: "https://www.xiaohongshu.com/explore/663eda82000000001e037a72?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CB5zJ_LyvPqNCl1ltzVT3Qigd8ZME-gOGpko015PqiZTI=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776896198&share_id=4a93cc30d8204fca8205e355a3a6fcac"
    },
    {
        emoji: "📖",
        title: "一年级上册语文第一单元:二类生字组词",
        description: "Словарный запас для 1 класса,第一单元: составление слов",
        tags: "#一年级语文 #二类生字组词",
        url: "https://www.xiaohongshu.com/explore/6792f31d000000002a000964?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBpg-WsJWeWEws0F2RyYTuf6rgK-Ctf9hV6FrjP2Jfzz4=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776896290&share_id=2b62df36c882480b827819d4e68232dd"
    },
    {
        emoji: "🖌️",
        title: "一年级语文:孩子要记住的笔画名称",
        description: "Названия черт иероглифов, которые нужно знать первокласснику",
        tags: "#一年级语文 #一年级 #笔画 #笔画笔顺偏旁",
        url: "https://www.xiaohongshu.com/explore/676fe5590000000013001680?app_platform=ios&app_version=9.27&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBiM1lb7C7rp38bfcweQ3ugmFMojmWye7njL-Hk4TQKow=&author_share=1&xhsshare=CopyLink&shareRedId=OD01M0RGSUo2NzUyOTgwNjdGOThGPD5N&apptime=1776896350&share_id=ea7926000f884e6fba70577b3f4a545d"
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