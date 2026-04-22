// ==========================================
// Модуль: Сравнение звуков пиньинь
// ТОЛЬКО ВКЛАДКА В ВЕРХНЕМ МЕНЮ (без фильтров)
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
      },
      {
        title: 'Сравнение sh / r',
        description: 'Разница в произношении sh и r',
        videoUrl: 'https://www.rednote.com/explore/69dc6975000000001b002437?xsec_token=AB-SmsktqGvfoEoRiqGXWP1fDvQdZefq0_ec3K0LH4k2A=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение ch / sh',
        description: 'Разница в произношении ch и sh',
        videoUrl: 'https://www.rednote.com/explore/69d75484000000001b00392d?xsec_token=AB_0KZeIdM6WmaHYzg9fWBsKQeRw7HVQPZG8F_3X3DdUY=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение zh / ch',
        description: 'Разница в произношении zh и ch',
        videoUrl: 'https://www.rednote.com/explore/69d605be0000000023011bf5?xsec_token=ABkKwux9CW1qcsmiBWYINvkc5N3l5CiH3MMS566eLs2ag=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение s / sh',
        description: 'Разница в произношении s и sh',
        videoUrl: 'https://www.rednote.com/explore/69bf52b1000000001d0184af?xsec_token=ABsx26CH90vZ3NQx-ceAkf0w31Am0Oi4yW577L4ds1r0k=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение c / ch',
        description: 'Разница в произношении c и ch',
        videoUrl: 'https://www.rednote.com/explore/69bc9bbf000000001d01f3f6?xsec_token=AB2ODZH99zHb98WgLgXa_PAx804esQ-7g9UicPOgogvTQ=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение z / zh',
        description: 'Разница в произношении z и zh',
        videoUrl: 'https://www.rednote.com/explore/69b9ee24000000002200e721?xsec_token=ABaugVeAQDj0r-HZ4kJ-NFeFDUOfJ-F7oAxQntaLQ_5M0=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение c / s',
        description: 'Разница в произношении c и s',
        videoUrl: 'https://www.rednote.com/explore/69b0fb780000000022031fef?xsec_token=ABiY1ioQSnLbRQCVTNKKa-vHv6t30ndNAbydN1GZSwMnY=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение z / c',
        description: 'Разница в произношении z и c',
        videoUrl: 'https://www.rednote.com/explore/69af6026000000002603e3fb?xsec_token=ABx1UPZVCtUgbJXuf7o-yKlN-X0GyQR-fViTkvWPGHRZw=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение x / s',
        description: 'Разница в произношении x и s',
        videoUrl: 'https://www.rednote.com/explore/69ad0ed6000000002202d500?xsec_token=ABUlbLA862y6cBkTBLPyyLxa3axswTQ4JbVdEScdojEmM=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение q / c',
        description: 'Разница в произношении q и c',
        videoUrl: 'https://www.rednote.com/explore/69ab6a00000000002603f89f?xsec_token=ABs9lyQkd2XaDDHZrrHZGaCSlZpcitrRycvwkQrWcMbec=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение j / z (口型)',
        description: 'Разница в произношении j и z (положение рта)',
        videoUrl: 'https://www.rednote.com/explore/69aa307e000000002203be50?xsec_token=AB0levL5NEDbmhnoEr7KmShVMObrVGWmL2Yw8vZD9Iahc=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение q / x',
        description: 'Разница в произношении q и x',
        videoUrl: 'https://www.rednote.com/explore/69a8d766000000002202f654?xsec_token=ABapMyoBqidwqf9zPW7EEdnOwiL9YRwgFP7q04hGzJEvU=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение j / q (口型)',
        description: 'Разница в произношении j и q (положение рта)',
        videoUrl: 'https://www.rednote.com/explore/69a773a6000000002202ded4?xsec_token=ABHdSwkDh7EuFZsEjGUQy_97PQL2lQtVtcMHwjjK36fg4=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение h / f',
        description: 'Разница в произношении h и f',
        videoUrl: 'https://www.rednote.com/explore/6986ada9000000000a02f7a8?xsec_token=ABZaHgyQq2Z1lofLRsec_TjuQAEnop3MRkAFAR030PH50=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение g / k',
        description: 'Разница в произношении g и k',
        videoUrl: 'https://www.rednote.com/explore/698549d1000000000a02b4d2?xsec_token=AB09BiCc_vnFnT5wZbdXCFAAY2eGZxVp468vgD_JJnHrQ=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение t / k',
        description: 'Разница в произношении t и k',
        videoUrl: 'https://www.rednote.com/explore/69845234000000000a03e956?xsec_token=ABBeMhTgi-pniMy2XM3d3Jkz1EMOQgv5a7D9Sf49mIGtg=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение d / g (口型)',
        description: 'Разница в произношении d и g (положение рта)',
        videoUrl: 'https://www.rednote.com/explore/6982999e000000000a02c844?xsec_token=AB4J8Ct0sRbEJusmSsruX1Sla7iiS0KLVAcgTDFfYfYgc=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение n / l (口型)',
        description: 'Разница в произношении n и l (положение рта)',
        videoUrl: 'https://www.rednote.com/explore/698047e8000000000b0121eb?xsec_token=ABSOd9CxSATgMiAmSRjhLBZmCutmzibRIvHLsZeIH4EDE=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение d / t',
        description: 'Разница в произношении d и t',
        videoUrl: 'https://www.rednote.com/explore/697d58f7000000000c035656?xsec_token=ABsQ40cABoMcog1DOSmlPYv5UlsM7ajdS0bhE2qnz8M14=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение p / m',
        description: 'Разница в произношении p и m',
        videoUrl: 'https://www.rednote.com/explore/697c036f000000000a03d7ea?xsec_token=ABPemzeWnMZ97yWGvPQuv3SJYqKBS6KBPW8sAoG_J_4ME=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение b / p',
        description: 'Как различать b и p',
        videoUrl: 'https://www.rednote.com/explore/697b3165000000000c03556a?xsec_token=ABU90zuwNZwPS93KI1jbQj9he98wcpODZ7c_89RiPCY04=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение x / s',
        description: 'Как различать x и s',
        videoUrl: 'https://www.rednote.com/explore/6978b4cc000000000903a905?xsec_token=ABZYsE4OX5sT0LrEyHQYqrz-8GL8qoloh85VTR5pb0IaM=&xsec_source=pc_user'
      },
      {
        title: 'Сравнение n / l (口型)',
        description: 'Разница в произношении n и l (положение рта)',
        videoUrl: 'https://www.rednote.com/explore/692fc056000000001e007432?xsec_token=AB9gAoDnhuhq7qraTKv01H75YLNJbRX1RVbM3avD7-L3k=&xsec_source=pc_user'
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
              <div style="font-size:11px;color:#999;margin-top:12px;">🌐 RedNote (интернет ссылка)</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Добавляем вкладку в главное меню
  function addTab() {
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) {
      console.error('❌ Контейнер .tabs не найден');
      return;
    }
    if (tabsContainer.querySelector('[data-tab="pinyin-sounds"]')) return;

    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.setAttribute('data-tab', 'pinyin-sounds');
    newTab.textContent = '🔊 Звуки пиньинь';
    tabsContainer.appendChild(newTab);
    console.log('✅ Вкладка "Звуки пиньинь" добавлена в .tabs');
  }

  // Создаём панель
  function createPanel() {
    if (document.getElementById('pinyinSoundsPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'pinyinSoundsPanel';
    panel.className = 'panel';
    panel.innerHTML = '<div id="pinyinSoundsContainer"></div>';

    const studyPanel = document.getElementById('studyPanel');
    if (studyPanel?.parentNode) {
      studyPanel.parentNode.insertBefore(panel, studyPanel.nextSibling);
    } else {
      document.body.appendChild(panel);
    }
    console.log('✅ Панель pinyinSoundsPanel создана');
  }

  // Настраиваем переключение (через стандартную систему, не ломая её)
  function setupSwitching() {
    const ourTab = document.querySelector('[data-tab="pinyin-sounds"]');
    if (!ourTab) return;

    // Убираем возможный старый обработчик
    if (ourTab._ourHandler) {
      ourTab.removeEventListener('click', ourTab._ourHandler);
    }

    const handler = function(e) {
      // Находим все панели и вкладки
      const allPanels = document.querySelectorAll('.panel');
      const allTabs = document.querySelectorAll('.tab');

      // Скрываем все панели
      allPanels.forEach(panel => panel.classList.remove('active'));

      // Показываем нашу панель
      const ourPanel = document.getElementById('pinyinSoundsPanel');
      if (ourPanel) {
        ourPanel.classList.add('active');
        renderComparisons('pinyinSoundsContainer');
      }

      // Убираем активный класс у всех вкладок
      allTabs.forEach(tab => tab.classList.remove('active'));

      // Добавляем активный класс нашей вкладке
      ourTab.classList.add('active');

      e.preventDefault();
      e.stopPropagation();
    };

    ourTab.addEventListener('click', handler);
    ourTab._ourHandler = handler;
    console.log('✅ Обработчик для вкладки настроен');
  }

  // Стили
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

  // Запуск
  function init() {
    addStyles();
    addTab();
    createPanel();
    setupSwitching();
    console.log('✅ Модуль "Сравнение звуков" загружен (только вкладка)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Даём небольшую задержку, чтобы основной код index.html успел создать свои обработчики
    setTimeout(init, 300);
  }
})();