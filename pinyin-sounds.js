// ==========================================
// Модуль: Сравнение звуков пиньинь
// ОГРОМНЫЕ звуки — сразу видно что сравниваем
// ==========================================

(function() {
    const SOUND_COMPARISONS = [
      // === НОВЫЕ ВИДЕО ===
      {
        pair: 'a • o • e • i • u • ü<br>→<br>ang • eng • ing • ong',
        title: '🎬 韵母口型大全',
        description: 'Все финали: от простых до носовых',
        videoUrl: 'http://xhslink.com/o/G3AxgYIxyI'
      },
      {
        pair: 'in<br><span style="font-size:0.5em;">vs</span><br>ing',
        title: 'in vs ing — разбор',
        description: 'in: язык внизу | ing: корень языка вверх',
        videoUrl: 'http://xhslink.com/o/7eBLuEIBOTP'
      },
      {
        pair: 'ang eng<br>ing ong',
        title: 'Задненосовые',
        description: 'Корень языка поднимается назад',
        videoUrl: 'http://xhslink.com/o/xmOy44wp7x'
      },
      {
        pair: 'an en in<br>un ün',
        title: 'Передненосовые',
        description: 'Кончик языка у нижних зубов',
        videoUrl: 'http://xhslink.com/o/2HqPwcU8dy1'
      },
      {
        pair: 'zh ch sh',
        title: 'Шипящие',
        description: 'Язык поднимается к нёбу',
        videoUrl: 'http://xhslink.com/o/9ZqcE4LpL41'
      },
      {
        pair: 'z c s',
        title: 'Свистящие',
        description: 'Плоские звуки, язык у зубов',
        videoUrl: 'http://xhslink.com/o/7sBCBNQF4fU'
      },
      {
        pair: 'en<br><span style="font-size:0.5em;">vs</span><br>un',
        title: 'en vs un',
        description: 'en: рот плоский | un: губы округляются',
        videoUrl: 'http://xhslink.com/o/9z1CzsXN9sG'
      },

      // === ОРИГИНАЛЬНЫЕ СРАВНЕНИЯ ===
      {
        pair: 'an / en',
        title: 'Сравнение an / en',
        description: 'Разница в произношении финалей -an и -en',
        videoUrl: 'https://www.rednote.com/explore/69e5c2340000000023012eb1?xsec_token=ABSJ5fXql0_RYweB4YHpGEEFBK-eZFkbVBu23jLwrDlgE=&xsec_source=pc_user'
      },
      {
        pair: 'r / l',
        title: 'Сравнение r / l',
        description: 'Разница в произношении инициалей r- и l-',
        videoUrl: 'https://www.rednote.com/explore/69e1974a000000001d01c10a?xsec_token=ABe_8nJiAf34tSIz6aT4Oeg1r3trq9cVqPP5O_tI_2nuY=&xsec_source=pc_user'
      },
      {
        pair: 'sh / r',
        title: 'Сравнение sh / r',
        description: 'Разница в произношении sh и r',
        videoUrl: 'https://www.rednote.com/explore/69dc6975000000001b002437?xsec_token=AB-SmsktqGvfoEoRiqGXWP1fDvQdZefq0_ec3K0LH4k2A=&xsec_source=pc_user'
      },
      {
        pair: 'ch / sh',
        title: 'Сравнение ch / sh',
        description: 'Разница в произношении ch и sh',
        videoUrl: 'https://www.rednote.com/explore/69d75484000000001b00392d?xsec_token=AB_0KZeIdM6WmaHYzg9fWBsKQeRw7HVQPZG8F_3X3DdUY=&xsec_source=pc_user'
      },
      {
        pair: 'zh / ch',
        title: 'Сравнение zh / ch',
        description: 'Разница в произношении zh и ch',
        videoUrl: 'https://www.rednote.com/explore/69d605be0000000023011bf5?xsec_token=ABkKwux9CW1qcsmiBWYINvkc5N3l5CiH3MMS566eLs2ag=&xsec_source=pc_user'
      },
      {
        pair: 's / sh',
        title: 'Сравнение s / sh',
        description: 'Разница в произношении s и sh',
        videoUrl: 'https://www.rednote.com/explore/69bf52b1000000001d0184af?xsec_token=ABsx26CH90vZ3NQx-ceAkf0w31Am0Oi4yW577L4ds1r0k=&xsec_source=pc_user'
      },
      {
        pair: 'c / ch',
        title: 'Сравнение c / ch',
        description: 'Разница в произношении c и ch',
        videoUrl: 'https://www.rednote.com/explore/69bc9bbf000000001d01f3f6?xsec_token=AB2ODZH99zHb98WgLgXa_PAx804esQ-7g9UicPOgogvTQ=&xsec_source=pc_user'
      },
      {
        pair: 'z / zh',
        title: 'Сравнение z / zh',
        description: 'Разница в произношении z и zh',
        videoUrl: 'https://www.rednote.com/explore/69b9ee24000000002200e721?xsec_token=ABaugVeAQDj0r-HZ4kJ-NFeFDUOfJ-F7oAxQntaLQ_5M0=&xsec_source=pc_user'
      },
      {
        pair: 'c / s',
        title: 'Сравнение c / s',
        description: 'Разница в произношении c и s',
        videoUrl: 'https://www.rednote.com/explore/69b0fb780000000022031fef?xsec_token=ABiY1ioQSnLbRQCVTNKKa-vHv6t30ndNAbydN1GZSwMnY=&xsec_source=pc_user'
      },
      {
        pair: 'z / c',
        title: 'Сравнение z / c',
        description: 'Разница в произношении z и c',
        videoUrl: 'https://www.rednote.com/explore/69af6026000000002603e3fb?xsec_token=ABx1UPZVCtUgbJXuf7o-yKlN-X0GyQR-fViTkvWPGHRZw=&xsec_source=pc_user'
      },
      {
        pair: 'x / s',
        title: 'Сравнение x / s',
        description: 'Разница в произношении x и s',
        videoUrl: 'https://www.rednote.com/explore/69ad0ed6000000002202d500?xsec_token=ABUlbLA862y6cBkTBLPyyLxa3axswTQ4JbVdEScdojEmM=&xsec_source=pc_user'
      },
      {
        pair: 'q / c',
        title: 'Сравнение q / c',
        description: 'Разница в произношении q и c',
        videoUrl: 'https://www.rednote.com/explore/69ab6a00000000002603f89f?xsec_token=ABs9lyQkd2XaDDHZrrHZGaCSlZpcitrRycvwkQrWcMbec=&xsec_source=pc_user'
      },
      {
        pair: 'j / z',
        title: 'Сравнение j / z',
        description: 'Разница в произношении j и z',
        videoUrl: 'https://www.rednote.com/explore/69aa307e000000002203be50?xsec_token=AB0levL5NEDbmhnoEr7KmShVMObrVGWmL2Yw8vZD9Iahc=&xsec_source=pc_user'
      },
      {
        pair: 'q / x',
        title: 'Сравнение q / x',
        description: 'Разница в произношении q и x',
        videoUrl: 'https://www.rednote.com/explore/69a8d766000000002202f654?xsec_token=ABapMyoBqidwqf9zPW7EEdnOwiL9YRwgFP7q04hGzJEvU=&xsec_source=pc_user'
      },
      {
        pair: 'j / q',
        title: 'Сравнение j / q',
        description: 'Разница в произношении j и q',
        videoUrl: 'https://www.rednote.com/explore/69a773a6000000002202ded4?xsec_token=ABHdSwkDh7EuFZsEjGUQy_97PQL2lQtVtcMHwjjK36fg4=&xsec_source=pc_user'
      },
      {
        pair: 'h / f',
        title: 'Сравнение h / f',
        description: 'Разница в произношении h и f',
        videoUrl: 'https://www.rednote.com/explore/6986ada9000000000a02f7a8?xsec_token=ABZaHgyQq2Z1lofLRsec_TjuQAEnop3MRkAFAR030PH50=&xsec_source=pc_user'
      },
      {
        pair: 'g / k',
        title: 'Сравнение g / k',
        description: 'Разница в произношении g и k',
        videoUrl: 'https://www.rednote.com/explore/698549d1000000000a02b4d2?xsec_token=AB09BiCc_vnFnT5wZbdXCFAAY2eGZxVp468vgD_JJnHrQ=&xsec_source=pc_user'
      },
      {
        pair: 't / k',
        title: 'Сравнение t / k',
        description: 'Разница в произношении t и k',
        videoUrl: 'https://www.rednote.com/explore/69845234000000000a03e956?xsec_token=ABBeMhTgi-pniMy2XM3d3Jkz1EMOQgv5a7D9Sf49mIGtg=&xsec_source=pc_user'
      },
      {
        pair: 'd / g',
        title: 'Сравнение d / g',
        description: 'Разница в произношении d и g',
        videoUrl: 'https://www.rednote.com/explore/6982999e000000000a02c844?xsec_token=AB4J8Ct0sRbEJusmSsruX1Sla7iiS0KLVAcgTDFfYfYgc=&xsec_source=pc_user'
      },
      {
        pair: 'n / l',
        title: 'Сравнение n / l',
        description: 'Разница в произношении n и l',
        videoUrl: 'https://www.rednote.com/explore/698047e8000000000b0121eb?xsec_token=ABSOd9CxSATgMiAmSRjhLBZmCutmzibRIvHLsZeIH4EDE=&xsec_source=pc_user'
      },
      {
        pair: 'd / t',
        title: 'Сравнение d / t',
        description: 'Разница в произношении d и t',
        videoUrl: 'https://www.rednote.com/explore/697d58f7000000000c035656?xsec_token=ABsQ40cABoMcog1DOSmlPYv5UlsM7ajdS0bhE2qnz8M14=&xsec_source=pc_user'
      },
      {
        pair: 'p / m',
        title: 'Сравнение p / m',
        description: 'Разница в произношении p и m',
        videoUrl: 'https://www.rednote.com/explore/697c036f000000000a03d7ea?xsec_token=ABPemzeWnMZ97yWGvPQuv3SJYqKBS6KBPW8sAoG_J_4ME=&xsec_source=pc_user'
      },
      {
        pair: 'b / p',
        title: 'Сравнение b / p',
        description: 'Как различать b и p',
        videoUrl: 'https://www.rednote.com/explore/697b3165000000000c03556a?xsec_token=ABU90zuwNZwPS93KI1jbQj9he98wcpODZ7c_89RiPCY04=&xsec_source=pc_user'
      }
    ];

  function renderComparisons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="card">
        <h2 style="margin-bottom:20px; text-align:center;">🔊 Сравнение похожих звуков пиньинь</h2>
        <p style="margin-bottom:16px;color:#555; text-align:center;">🎯 Нажмите на карточку, чтобы открыть видеоурок</p>
        <div class="comparisons-grid">
          ${SOUND_COMPARISONS.map(item => `
            <div class="comparison-card" onclick="window.open('${item.videoUrl}', '_blank')">
              <div class="comparison-pair">${item.pair}</div>
              <div class="comparison-title">${item.title}</div>
              <div class="comparison-desc">${item.description}</div>
              <div class="comparison-hint">▶ Нажмите для просмотра</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

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
  }

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
  }

  function setupSwitching() {
    const ourTab = document.querySelector('[data-tab="pinyin-sounds"]');
    if (!ourTab) return;

    if (ourTab._ourHandler) {
      ourTab.removeEventListener('click', ourTab._ourHandler);
    }

    const handler = function(e) {
      const allPanels = document.querySelectorAll('.panel');
      const allTabs = document.querySelectorAll('.tab');

      allPanels.forEach(panel => panel.classList.remove('active'));

      const ourPanel = document.getElementById('pinyinSoundsPanel');
      if (ourPanel) {
        ourPanel.classList.add('active');
        renderComparisons('pinyinSoundsContainer');
      }

      allTabs.forEach(tab => tab.classList.remove('active'));
      ourTab.classList.add('active');

      e.preventDefault();
      e.stopPropagation();
    };

    ourTab.addEventListener('click', handler);
    ourTab._ourHandler = handler;
  }

  function addStyles() {
    if (document.getElementById('pinyin-styles')) return;
    const style = document.createElement('style');
    style.id = 'pinyin-styles';
    style.textContent = `
      .comparisons-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 20px;
      }
      .comparison-card {
        background: white;
        border-radius: 28px;
        padding: 28px 20px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        border: 1px solid rgba(0,0,0,0.05);
      }
      .comparison-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 24px 36px -12px rgba(0,0,0,0.2);
        background: linear-gradient(135deg, #fff 0%, #fef9f0 100%);
      }
      .comparison-pair {
        font-size: 52px;
        font-weight: 900;
        letter-spacing: 8px;
        background: linear-gradient(135deg, #e67e22, #f39c12, #e74c3c);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-bottom: 16px;
        text-shadow: 0 2px 5px rgba(0,0,0,0.05);
        line-height: 1.3;
      }
      .comparison-title {
        font-size: 18px;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 10px;
      }
      .comparison-desc {
        font-size: 13px;
        color: #7f8c8d;
        line-height: 1.45;
        margin-bottom: 16px;
      }
      .comparison-hint {
        font-size: 12px;
        color: #e67e22;
        font-weight: 600;
        opacity: 0.6;
        letter-spacing: 0.5px;
      }
      .comparison-card:hover .comparison-hint {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    addStyles();
    addTab();
    createPanel();
    setupSwitching();
    console.log('✅ Модуль загружен — огромные звуки!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 300);
  }
})();
