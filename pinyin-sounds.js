// ==========================================
// Модуль: Сравнение звуков пиньинь
// БЕЗ КОНФЛИКТОВ с основным кодом
// ==========================================

(function() {
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

  function renderComparisons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="card">
        <h2 style="margin-bottom:20px;">🔊 Сравнение похожих звуков</h2>
        <p style="margin-bottom:16px;color:#555;">🎯 Нажмите на кнопку, чтобы открыть видеоурок.</p>
        <div class="comparisons-grid">
          ${SOUND_COMPARISONS.map(item => `
            <div class="comparison-card">
              <div class="comparison-title">${item.title}</div>
              <div class="comparison-desc">${item.description}</div>
              <a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="comparison-link">🎬 Смотреть видео</a>
              <div style="font-size:11px;color:#999;margin-top:12px;">🌐 RedNote (возможен VPN)</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Добавляем вкладку в главное меню
  function addTab() {
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) return;
    if (tabsContainer.querySelector('[data-tab="pinyin-sounds"]')) return;

    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.setAttribute('data-tab', 'pinyin-sounds');
    newTab.textContent = '🔊 Звуки пиньинь';
    tabsContainer.appendChild(newTab);
    console.log('✅ Вкладка добавлена');
  }

  // Создаём панель (без инлайн-стилей!)
  function createPanel() {
    if (document.getElementById('pinyinSoundsPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'pinyinSoundsPanel';
    panel.className = 'panel'; // только класс, без style.display
    panel.innerHTML = '<div id="pinyinSoundsContainer"></div>';

    const studyPanel = document.getElementById('studyPanel');
    if (studyPanel?.parentNode) {
      studyPanel.parentNode.insertBefore(panel, studyPanel.nextSibling);
    } else {
      document.body.appendChild(panel);
    }
    console.log('✅ Панель создана');
  }

  // ДОБАВЛЯЕМ ОБРАБОТЧИК ТОЛЬКО ДЛЯ НАШЕЙ ВКЛАДКИ (не трогаем остальные)
  function setupOurTabOnly() {
    const ourTab = document.querySelector('[data-tab="pinyin-sounds"]');
    if (!ourTab) return;

    // Удаляем возможный старый обработчик
    if (ourTab._ourHandler) {
      ourTab.removeEventListener('click', ourTab._ourHandler);
    }

    const handler = function(e) {
      e.preventDefault();
      e.stopPropagation(); // НЕ даём основному обработчику сработать

      // Скрываем все панели через классы (как в основном коде)
      document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
      });

      // Показываем нашу панель
      const ourPanel = document.getElementById('pinyinSoundsPanel');
      if (ourPanel) {
        ourPanel.classList.add('active');
        renderComparisons('pinyinSoundsContainer');
      }

      // Обновляем активный класс у вкладок
      document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
      });
      ourTab.classList.add('active');
    };

    ourTab.addEventListener('click', handler);
    ourTab._ourHandler = handler;
    console.log('✅ Обработчик для вкладки настроен');
  }

  // Стили (добавляем только свои, не трогая существующие)
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

  // Ждём, пока основной код index.html полностью загрузится и создаст свои обработчики
  function waitForMainCode() {
    // Даём основному коду время на инициализацию
    setTimeout(() => {
      addStyles();
      addTab();
      createPanel();
      setupOurTabOnly();
      console.log('✅ Модуль "Сравнение звуков" загружен (без конфликтов)');
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForMainCode);
  } else {
    waitForMainCode();
  }
})();