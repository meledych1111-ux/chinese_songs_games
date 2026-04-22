// ==========================================
// Модуль: Сравнение звуков пиньинь
// ==========================================

(function() {
    const SOUND_COMPARISONS = [
      { title: 'Сравнение an / en', description: 'Разница в произношении финалей -an и -en', videoUrl: 'https://www.rednote.com/explore/69e5c2340000000023012eb1?xsec_token=ABSJ5fXql0_RYweB4YHpGEEFBK-eZFkbVBu23jLwrDlgE=&xsec_source=pc_user' },
      { title: 'Сравнение r / l', description: 'Разница в произношении инициалей r- и l-', videoUrl: 'https://www.rednote.com/explore/69e1974a000000001d01c10a?xsec_token=ABe_8nJiAf34tSIz6aT4Oeg1r3trq9cVqPP5O_tI_2nuY=&xsec_source=pc_user' },
      { title: 'Сравнение sh / r', description: 'Разница в произношении sh и r', videoUrl: 'https://www.rednote.com/explore/69dc6975000000001b002437?xsec_token=AB-SmsktqGvfoEoRiqGXWP1fDvQdZefq0_ec3K0LH4k2A=&xsec_source=pc_user' },
      { title: 'Сравнение ch / sh', description: 'Разница в произношении ch и sh', videoUrl: 'https://www.rednote.com/explore/69d75484000000001b00392d?xsec_token=AB_0KZeIdM6WmaHYzg9fWBsKQeRw7HVQPZG8F_3X3DdUY=&xsec_source=pc_user' },
      { title: 'Сравнение zh / ch', description: 'Разница в произношении zh и ch', videoUrl: 'https://www.rednote.com/explore/69d605be0000000023011bf5?xsec_token=ABkKwux9CW1qcsmiBWYINvkc5N3l5CiH3MMS566eLs2ag=&xsec_source=pc_user' },
      { title: 'Сравнение s / sh', description: 'Разница в произношении s и sh', videoUrl: 'https://www.rednote.com/explore/69bf52b1000000001d0184af?xsec_token=ABsx26CH90vZ3NQx-ceAkf0w31Am0Oi4yW577L4ds1r0k=&xsec_source=pc_user' },
      { title: 'Сравнение c / ch', description: 'Разница в произношении c и ch', videoUrl: 'https://www.rednote.com/explore/69bc9bbf000000001d01f3f6?xsec_token=AB2ODZH99zHb98WgLgXa_PAx804esQ-7g9UicPOgogvTQ=&xsec_source=pc_user' },
      { title: 'Сравнение z / zh', description: 'Разница в произношении z и zh', videoUrl: 'https://www.rednote.com/explore/69b9ee24000000002200e721?xsec_token=ABaugVeAQDj0r-HZ4kJ-NFeFDUOfJ-F7oAxQntaLQ_5M0=&xsec_source=pc_user' },
      { title: 'Сравнение c / s', description: 'Разница в произношении c и s', videoUrl: 'https://www.rednote.com/explore/69b0fb780000000022031fef?xsec_token=ABiY1ioQSnLbRQCVTNKKa-vHv6t30ndNAbydN1GZSwMnY=&xsec_source=pc_user' },
      { title: 'Сравнение z / c', description: 'Разница в произношении z и c', videoUrl: 'https://www.rednote.com/explore/69af6026000000002603e3fb?xsec_token=ABx1UPZVCtUgbJXuf7o-yKlN-X0GyQR-fViTkvWPGHRZw=&xsec_source=pc_user' },
      { title: 'Сравнение x / s', description: 'Разница в произношении x и s', videoUrl: 'https://www.rednote.com/explore/69ad0ed6000000002202d500?xsec_token=ABUlbLA862y6cBkTBLPyyLxa3axswTQ4JbVdEScdojEmM=&xsec_source=pc_user' },
      { title: 'Сравнение q / c', description: 'Разница в произношении q и c', videoUrl: 'https://www.rednote.com/explore/69ab6a00000000002603f89f?xsec_token=ABs9lyQkd2XaDDHZrrHZGaCSlZpcitrRycvwkQrWcMbec=&xsec_source=pc_user' },
      { title: 'Сравнение j / z', description: 'Разница в произношении j и z', videoUrl: 'https://www.rednote.com/explore/69aa307e000000002203be50?xsec_token=AB0levL5NEDbmhnoEr7KmShVMObrVGWmL2Yw8vZD9Iahc=&xsec_source=pc_user' },
      { title: 'Сравнение q / x', description: 'Разница в произношении q и x', videoUrl: 'https://www.rednote.com/explore/69a8d766000000002202f654?xsec_token=ABapMyoBqidwqf9zPW7EEdnOwiL9YRwgFP7q04hGzJEvU=&xsec_source=pc_user' },
      { title: 'Сравнение j / q', description: 'Разница в произношении j и q', videoUrl: 'https://www.rednote.com/explore/69a773a6000000002202ded4?xsec_token=ABHdSwkDh7EuFZsEjGUQy_97PQL2lQtVtcMHwjjK36fg4=&xsec_source=pc_user' },
      { title: 'Сравнение h / f', description: 'Разница в произношении h и f', videoUrl: 'https://www.rednote.com/explore/6986ada9000000000a02f7a8?xsec_token=ABZaHgyQq2Z1lofLRsec_TjuQAEnop3MRkAFAR030PH50=&xsec_source=pc_user' },
      { title: 'Сравнение g / k', description: 'Разница в произношении g и k', videoUrl: 'https://www.rednote.com/explore/698549d1000000000a02b4d2?xsec_token=AB09BiCc_vnFnT5wZbdXCFAAY2eGZxVp468vgD_JJnHrQ=&xsec_source=pc_user' },
      { title: 'Сравнение t / k', description: 'Разница в произношении t и k', videoUrl: 'https://www.rednote.com/explore/69845234000000000a03e956?xsec_token=ABBeMhTgi-pniMy2XM3d3Jkz1EMOQgv5a7D9Sf49mIGtg=&xsec_source=pc_user' },
      { title: 'Сравнение d / g', description: 'Разница в произношении d и g', videoUrl: 'https://www.rednote.com/explore/6982999e000000000a02c844?xsec_token=AB4J8Ct0sRbEJusmSsruX1Sla7iiS0KLVAcgTDFfYfYgc=&xsec_source=pc_user' },
      { title: 'Сравнение n / l', description: 'Разница в произношении n и l', videoUrl: 'https://www.rednote.com/explore/698047e8000000000b0121eb?xsec_token=ABSOd9CxSATgMiAmSRjhLBZmCutmzibRIvHLsZeIH4EDE=&xsec_source=pc_user' }
    ];

  function renderComparisons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div class="card">
        <h2 style="margin-bottom:20px;">🔊 Сравнение звуков</h2>
        <p style="margin-bottom:16px;">🎬 Нажми, чтобы смотреть видео-урок.</p>
        <div class="comparisons-grid">
          ${SOUND_COMPARISONS.map(item => `
            <div class="comparison-card">
              <div style="font-weight:bold; color:#e67e22; margin-bottom:5px;">${item.title}</div>
              <div style="font-size:12px; margin-bottom:10px;">${item.description}</div>
              <a href="${item.videoUrl}" target="_blank" class="btn" style="text-decoration:none; display:inline-block; font-size:12px;">🎬 Смотреть</a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Экспортируем функцию в глобальное окно
  window.renderComparisons = renderComparisons;
})();
