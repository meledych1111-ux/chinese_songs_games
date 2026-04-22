// Настройки игры "Поиск иероглифа"
const EMOJI_GAME_CHARS = ['龙', '虎', '猫', '鱼', '兔', '星', '书', '学', '红', '心', '月', '日', '花', '鸟', '水', '山', '火', '手'];
const EMOJI_DECOYS = ['🍎', '🌟', '🍀', '🏮', '🎲', '🎨', '🚀', '🌈', '💎', '🔔', '🎈', '🎁', '☀', '☁', '🍄', '🍦', '🚲'];

let emojiGameData = { target: '', count: 0 };

/**
 * Инициализация игры "Поиск иероглифа"
 * Мы добавляем её ВНИЗ панели gamePanel, чтобы старая игра осталась сверху.
 */
function startEmojiSearchGame() {
    const panel = document.getElementById('gamePanel');
    if (!panel) return;

    // Создаем отдельный контейнер для нашей новой игры, если его еще нет
    let gameContainer = document.getElementById('emoji-search-container');
    if (!gameContainer) {
        gameContainer = document.createElement('div');
        gameContainer.id = 'emoji-search-container';
        gameContainer.style.marginTop = "30px";
        gameContainer.style.paddingTop = "20px";
        gameContainer.style.borderTop = "3px dashed #ff6b35";
        panel.appendChild(gameContainer);
    }

    // Генерация случайного задания
    emojiGameData.target = EMOJI_GAME_CHARS[Math.floor(Math.random() * EMOJI_GAME_CHARS.length)];
    emojiGameData.count = Math.floor(Math.random() * 5) + 3; // от 3 до 7 штук

    let items = [];
    for (let i = 0; i < emojiGameData.count; i++) items.push(emojiGameData.target);

    // Заполняем поле (всего 36 символов)
    while (items.length < 36) {
        let decoy = Math.random() > 0.5
            ? EMOJI_DECOYS[Math.floor(Math.random() * EMOJI_DECOYS.length)]
            : EMOJI_GAME_CHARS[Math.floor(Math.random() * EMOJI_GAME_CHARS.length)];
        if (decoy !== emojiGameData.target) items.push(decoy);
    }
    items.sort(() => Math.random() - 0.5);

    // Отрисовка интерфейса
    gameContainer.innerHTML = `
        <div class="card" style="border: 3px solid #ff6b35; box-shadow: 0 4px 15px rgba(255,107,53,0.2);">
            <h3 style="color: #ff6b35; margin-bottom: 10px;">🔍 Мини-игра: Найди иероглиф</h3>
            <p style="font-size: 1.1rem; margin-bottom: 15px;">
                Сколько раз встречается: <b style="font-size: 2.2rem; color: #333; vertical-align: middle; margin: 0 10px;">${emojiGameData.target}</b> ?
            </p>

            <div id="emoji-field" style="background: #fdfdfd; padding: 15px; border-radius: 20px; font-size: 30px;
                line-height: 1.6; letter-spacing: 8px; margin-bottom: 20px; user-select: none; border: 1px solid #eee;">
                ${items.join('')}
            </div>

            <div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
                <input type="number" id="emoji-input" placeholder="?"
                    style="width: 70px; padding: 12px; font-size: 20px; border: 2px solid #ddd; border-radius: 15px; text-align: center;">
                <button class="btn" onclick="checkEmojiResult()" style="min-height: 48px;">ОК</button>
                <button class="btn" onclick="startEmojiSearchGame()" style="background: #eee; color: #333; min-height: 48px;">🔄</button>
            </div>

            <div id="emoji-feedback" style="margin-top: 15px; font-size: 1.1rem; font-weight: bold; min-height: 24px;"></div>
        </div>
    `;
}

/**
 * Проверка введенного числа
 */
window.checkEmojiResult = function() {
    const input = document.getElementById('emoji-input');
    const val = parseInt(input.value);
    const feedback = document.getElementById('emoji-feedback');

    if (val === emojiGameData.count) {
        feedback.innerText = "✅ Правильно! Ты очень внимательный! 🎉";
        feedback.style.color = "#2ecc71";
        input.style.borderColor = "#2ecc71";
        setTimeout(startEmojiSearchGame, 2000);
    } else {
        feedback.innerText = "❌ Неверно. Попробуй пересчитать!";
        feedback.style.color = "#e74c3c";
        input.style.borderColor = "#e74c3c";
        input.value = "";
        input.focus();
    }
};

// Слушаем переключение вкладок, чтобы запустить игру при входе в "🎮 Игра"
document.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (tab && tab.dataset.tab === 'game') {
        // Небольшая задержка, чтобы панель успела открыться
        setTimeout(startEmojiSearchGame, 100);
    }
});

// Если страница уже загружена на вкладке игры
if (document.querySelector('.tab.active[data-tab="game"]')) {
    setTimeout(startEmojiSearchGame, 500);
}