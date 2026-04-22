// Настройки игры "Поиск иероглифа"
const EMOJI_GAME_CHARS = ['龙', '虎', '猫', '鱼', '兔', '星', '书', '学', '红', '心', '月', '日', '花', '鸟', '水', '山', '火', '手'];
const EMOJI_DECOYS = ['🍎', '🌟', '🍀', '🏮', '🎲', '🎨', '🚀', '🌈', '💎', '🔔', '🎈', '🎁', '☀', '☁', '🍄', '🍦', '🚲'];

let emojiGameData = { target: '', count: 0 };

// Главная функция запуска игры
function startEmojiSearchGame() {
    const panel = document.getElementById('gamePanel');
    if (!panel) return;

    // Генерируем случайное задание
    emojiGameData.target = EMOJI_GAME_CHARS[Math.floor(Math.random() * EMOJI_GAME_CHARS.length)];
    emojiGameData.count = Math.floor(Math.random() * 5) + 3; // от 3 до 7 штук

    let items = [];
    for (let i = 0; i < emojiGameData.count; i++) items.push(emojiGameData.target);

    // Заполняем остальное поле (всего 36 символов)
    while (items.length < 36) {
        let decoy = Math.random() > 0.5
            ? EMOJI_DECOYS[Math.floor(Math.random() * EMOJI_DECOYS.length)]
            : EMOJI_GAME_CHARS[Math.floor(Math.random() * EMOJI_GAME_CHARS.length)];
        if (decoy !== emojiGameData.target) items.push(decoy);
    }
    items.sort(() => Math.random() - 0.5);

    // Рисуем интерфейс прямо в gamePanel
    panel.innerHTML = `
        <div class="card" style="border: 4px solid #ff6b35; border-radius: 28px; padding: 20px;">
            <h2 style="color: #ff6b35; margin-bottom: 10px;">🔍 Найди иероглиф</h2>
            <p style="font-size: 1.2rem;">Сколько раз встречается:
                <b style="font-size: 2.5rem; color: #333; vertical-align: middle; margin-left:10px;">${emojiGameData.target}</b>?
            </p>

            <div id="emoji-field" style="background: #fdfdfd; padding: 15px; border-radius: 20px; font-size: 32px;
                line-height: 1.7; letter-spacing: 10px; margin: 20px 0; user-select: none; border: 2px dashed #ff6b35;">
                ${items.join('')}
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; align-items: center;">
                <input type="number" id="emoji-input" placeholder="?"
                    style="width: 80px; padding: 12px; font-size: 22px; border: 3px solid #eee; border-radius: 15px; text-align: center;">
                <button class="btn" onclick="checkEmojiResult()" style="background: #ff6b35; color: white;">Проверить</button>
                <button class="btn" onclick="startEmojiSearchGame()" style="background: #f0f0f0; color: #333; padding: 12px 15px;">🔄</button>
            </div>

            <div id="emoji-feedback" style="margin-top: 20px; font-size: 1.3rem; font-weight: bold; min-height: 30px;"></div>
        </div>
    `;
}

// Проверка ответа
window.checkEmojiResult = function() {
    const val = parseInt(document.getElementById('emoji-input').value);
    const feedback = document.getElementById('emoji-feedback');

    if (val === emojiGameData.count) {
        feedback.innerText = "✅ Верно! Ты отличный сыщик! 🎉";
        feedback.style.color = "#44aa77";
        setTimeout(startEmojiSearchGame, 2000);
    } else {
        feedback.innerText = "❌ Неправильно. Попробуй посчитать еще раз!";
        feedback.style.color = "#e74c3c";
    }
};

// Магия: перехватываем клик по вкладке "Игра"
document.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (tab && tab.dataset.tab === 'game') {
        // Ждем 50мс, чтобы основной скрипт успел показать панель, и заменяем контент
        setTimeout(startEmojiSearchGame, 50);
    }
});