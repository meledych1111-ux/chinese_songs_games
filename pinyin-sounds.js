// ==========================================
// Модуль: Сравнение звуков пиньинь
// ДОБАВЛЯЕТ ВКЛАДКУ В ВЕРХНЕЕ МЕНЮ
// ==========================================

(function() {
  // Данные для сравнения звуков
  const SOUND_COMPARISONS = [
    {
      title: 'Сравнение an / en',
      description: 'Разница в произношении финалей -an и -en',
      videoUrl: 'https://www.rednote.com/explore/69e5c2340000000023012eb1?xsec_token=ABSJ5fXql0_RYweB4YHpGEEFBK-eZFkbVBu23jLwrDlgE=&xsec_source=pc_user'
    },
    {
      title: 'Сравнение r / l',
      description: 'Разница в произношении инициалей r- и l-',
      videoUrl: 'https://www.rednote.com/explore/69e1974a000000001d01c10a?xsec_token=ABe_8nJiAf34tSIz6aT4Oeg1r3trq9cVqPP5O_tI_2nuY=&xsec_source=pc_user'
    }
  ];

  // Функция рендера карточек
  function renderComparisons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
      <div class="card">
        <h2 style="margin-bottom: 20px;">🔊 Сравнение похожих звуков</h2>
        <p style="margin-bottom: 16px; color: #555;">🎯 Нажмите на кнопку, чтобы открыть видеоурок. Видео откроется в новой вкладке.</p>
        <div class="comparisons-grid">
    `;

    SOUND_COMPARISONS.forEach(item => {
      html += `
        <div class="comparison-card">
          <div class="comparison-title">${item.title}</div>
          <div class="comparison-desc">${item.description}</div>
          <a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="comparison-link">
            🎬 Смотреть видео
          </a>
          <div style="font-size: 11px; color: #999; margin-top: 12px;">🌐 RedNote (возможен VPN)</div>
        </div>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
  }

  // ===== 1. ДОБАВЛЯЕМ ВКЛАДКУ В ВЕРХНЕЕ МЕНЮ =====
  function addTabToMainMenu() {
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) {
      console.error('❌ Контейнер .tabs не найден');
      return;
    }

    // Проверяем, нет ли уже такой вкладки
    if (tabsContainer.querySelector('[data-tab="pinyin-sounds"]')) return;

    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.setAttribute('data-tab', 'pinyin-sounds');
    newTab.textContent = '🔊 Звуки пиньинь';
    tabsContainer.appendChild(newTab);
    console.log('✅ Вкладка "Звуки пиньинь" добавлена в главное меню');
  }

  // ===== 2. СОЗДАЁМ ПАНЕЛЬ ДЛЯ ЭТОЙ ВКЛАДКИ =====
  function createPanelForTab() {
    if (document.getElementById('pinyinSoundsPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'pinyinSoundsPanel';
    panel.className = 'panel';
    panel.style.display = 'none';
    panel.innerHTML = '<div id="pinyinSoundsContainer"></div>';

    // Вставляем после панели studyPanel или в конец body
    const studyPanel = document.getElementById('studyPanel');
    if (studyPanel && studyPanel.parentNode) {
      studyPanel.parentNode.insertBefore(panel, studyPanel.nextSibling);
    } else {
      document.body.appendChild(panel);
    }
    console.log('✅ Панель pinyinSoundsPanel создана');
  }

  // ===== 3. ИНТЕГРИРУЕМ С СУЩЕСТВУЮЩЕЙ СИСТЕМОЙ ПЕРЕКЛЮЧЕНИЯ ТАБОВ =====
  function integrateWithExistingTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');

    tabs.forEach(tab => {
      // Удаляем старый обработчик, если он был
      const oldHandler = tab._pinyinTabHandler;
      if (oldHandler) {
        tab.removeEventListener('click', oldHandler);
      }

      // Создаём новый обработчик
      const handler = function(e) {
        const tabId = this.getAttribute('data-tab');

        // Скрываем все панели
        panels.forEach(panel => panel.classList.remove('active'));

        // Показываем нужную панель
        const targetPanel = document.getElementById(`${tabId}Panel`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }

        // Если это наша вкладка — рендерим содержимое
        if (tabId === 'pinyin-sounds') {
          renderComparisons('pinyinSoundsContainer');
        }

        // Обновляем активный класс для табов
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      };

      tab.addEventListener('click', handler);
      tab._pinyinTabHandler = handler;
    });
    console.log('✅ Навигация по вкладкам обновлена');
  }

  // ===== СТИЛИ =====
  function addStyles() {
    if (document.getElementById('pinyin-styles')) return;
    const style = document.createElement('style');
    style.id = 'pinyin-styles';
    style.textContent = `
      .comparisons-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .comparison-card {
        background: white;
        border-radius: 20px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: 0.2s;
      }
      .comparison-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.12);
      }
      .comparison-title {
        font-size: 22px;
        font-weight: bold;
        color: #e67e22;
        margin-bottom: 10px;
      }
      .comparison-desc {
        font-size: 14px;
        color: #4a627a;
        margin-bottom: 18px;
      }
      .comparison-link {
        display: inline-block;
        background: #9b59b6;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 40px;
        font-size: 14px;
        transition: 0.2s;
      }
      .comparison-link:hover {
        background: #8e44ad;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== ЗАПУСК =====
  function init() {
    addStyles();
    addTabToMainMenu();        // Добавляем вкладку в .tabs
    createPanelForTab();       // Создаём панель
    integrateWithExistingTabs(); // Настраиваем переключение
    console.log('✅ Модуль "Сравнение звуков" полностью загружен');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();