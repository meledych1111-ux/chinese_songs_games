// ==========================================
// Модуль: Сравнение звуков пиньинь
// Только an/en и r/l
// ==========================================

(function() {
  // Данные для сравнения звуков (только 2)
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

  // Функция озвучивания (заглушка, если понадобится)
  function speak(text, rate = 0.75) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }

  // Рендер карточек сравнения
  function renderComparisons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
      <div class="pinyin-comparisons-section">
        <h3 class="comparisons-title">🎧 Сравнение похожих звуков</h3>
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
        </div>
      `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
  }

  // Добавляем кнопку в фильтры
  function addPinyinFilterButton() {
    const filterBar = document.querySelector('.filter-bar, .filters, .buttons-container, .fbtn-container');
    if (!filterBar) {
      console.warn('Контейнер фильтров не найден');
      return;
    }
    if (filterBar.querySelector('[data-cat="pinyin"]')) return;
    
    const btn = document.createElement('span');
    btn.className = 'fbtn';
    btn.setAttribute('data-cat', 'pinyin');
    btn.textContent = '🔊 Сравнение звуков';
    filterBar.appendChild(btn);
  }

  // Создаём контейнер
  function createPinyinContainer() {
    if (document.getElementById('pinyinContainer')) return;
    const container = document.createElement('div');
    container.id = 'pinyinContainer';
    container.style.display = 'none';
    
    const wordsContainer = document.getElementById('wordsContainer') || document.getElementById('cardsContainer');
    if (wordsContainer?.parentNode) {
      wordsContainer.parentNode.insertBefore(container, wordsContainer.nextSibling);
    } else {
      document.body.appendChild(container);
    }
  }

  // Переключение вкладок
  function setupFilterHandler() {
    const buttons = document.querySelectorAll('[data-cat]');
    buttons.forEach(btn => {
      btn.removeEventListener('click', window._pinyinHandler);
      const handler = function() {
        const cat = this.getAttribute('data-cat');
        const wordsContainer = document.getElementById('wordsContainer') || document.getElementById('cardsContainer');
        const pinyinContainer = document.getElementById('pinyinContainer');
        
        if (cat === 'pinyin') {
          if (wordsContainer) wordsContainer.style.display = 'none';
          if (pinyinContainer) {
            pinyinContainer.style.display = 'block';
            renderComparisons('pinyinContainer');
          }
        } else {
          if (wordsContainer) wordsContainer.style.display = 'block';
          if (pinyinContainer) pinyinContainer.style.display = 'none';
          if (typeof window.filterWordsByCategory === 'function') {
            window.filterWordsByCategory(cat);
          } else if (typeof window.renderWordsByCategory === 'function') {
            window.renderWordsByCategory(cat);
          }
        }
      };
      btn.addEventListener('click', handler);
      btn._pinyinHandler = handler;
    });
  }

  // Стили
  function addStyles() {
    if (document.getElementById('pinyin-styles')) return;
    const style = document.createElement('style');
    style.id = 'pinyin-styles';
    style.textContent = `
      .pinyin-comparisons-section {
        margin: 20px;
        padding: 24px;
        background: #f8f9fc;
        border-radius: 28px;
      }
      .comparisons-title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 24px;
        color: #2c3e66;
      }
      .comparisons-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
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

  // Инициализация
  function init() {
    addStyles();
    createPinyinContainer();
    addPinyinFilterButton();
    setupFilterHandler();
    console.log('✅ Модуль "Сравнение звуков" загружен');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();