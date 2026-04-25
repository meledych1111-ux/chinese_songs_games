// ==========================================
// Модуль: Сравнение звуков пиньинь
// КАРТОЧКИ ЦВЕТНЫЕ + ТЁМНЫЕ БУКВЫ + 28px
// ==========================================

(function() {
    const SOUND_COMPARISONS = [
      // === НОВЫЕ ВИДЕО (7 шт) ===
      { title: '韵母口型大全', sounds: 'a o e i u ü → ang eng ing ong', description: 'Все финали: от простых до носовых', videoUrl: 'http://xhslink.com/o/G3AxgYIxyI', bg: '#E8F0FA', badgeBg: '#7C9ED9', textColor: '#2C3E50' },
      { title: 'in vs ing', sounds: 'in / ing', description: 'in: язык внизу | ing: корень языка вверх', videoUrl: 'http://xhslink.com/o/7eBLuEIBOTP', bg: '#FDF0E8', badgeBg: '#E8A87C', textColor: '#4A3520' },
      { title: 'Задненосовые', sounds: 'ang / eng / ing / ong', description: 'Корень языка поднимается назад', videoUrl: 'http://xhslink.com/o/xmOy44wp7x', bg: '#E8F4F0', badgeBg: '#6BAFA8', textColor: '#2A4A45' },
      { title: 'Передненосовые', sounds: 'an / en / in / un / ün', description: 'Кончик языка у нижних зубов', videoUrl: 'http://xhslink.com/o/2HqPwcU8dy1', bg: '#F0F5E8', badgeBg: '#9ABB7D', textColor: '#3A4A2A' },
      { title: 'Шипящие', sounds: 'zh / ch / sh', description: 'Язык поднимается к нёбу', videoUrl: 'http://xhslink.com/o/9ZqcE4LpL41', bg: '#F5EEF5', badgeBg: '#B980B0', textColor: '#3A2A3A' },
      { title: 'Свистящие', sounds: 'z / c / s', description: 'Плоские звуки, язык у зубов', videoUrl: 'http://xhslink.com/o/7sBCBNQF4fU', bg: '#FDF5E8', badgeBg: '#D49C6B', textColor: '#4A3520' },
      { title: 'en vs un', sounds: 'en / un', description: 'en: рот плоский | un: губы округляются', videoUrl: 'http://xhslink.com/o/9z1CzsXN9sG', bg: '#F5EAEA', badgeBg: '#C48484', textColor: '#4A2A2A' },

      // === ОРИГИНАЛЬНЫЕ ВИДЕО ===
      { title: 'an / en', sounds: 'an / en', description: 'Разница в произношении -an и -en', videoUrl: 'https://www.rednote.com/explore/69e5c2340000000023012eb1?xsec_token=ABSJ5fXql0_RYweB4YHpGEEFBK-eZFkbVBu23jLwrDlgE=&xsec_source=pc_user', bg: '#EBF0F5', badgeBg: '#8BA7C4', textColor: '#2C3E50' },
      { title: 'r / l', sounds: 'r / l', description: 'Разница в произношении r и l', videoUrl: 'https://www.rednote.com/explore/69e1974a000000001d01c10a?xsec_token=ABe_8nJiAf34tSIz6aT4Oeg1r3trq9cVqPP5O_tI_2nuY=&xsec_source=pc_user', bg: '#EFF5E8', badgeBg: '#8FBA7A', textColor: '#2E4A2A' },
      { title: 'sh / r', sounds: '
