// ============================================================
// 🧠 МОДУЛЬ ПОВТОРЕНИЯ — 2 ИГРЫ + КУБИКИ + СОХРАНЕНИЕ
// ============================================================

// ==================== ХРАНИЛИЩЕ ====================

const REVIEW_KEY = 'chinese_review_words';
const REVIEW_RADICALS_KEY = 'chinese_review_radicals';
const REVIEW_STATS_KEY = 'chinese_review_stats';

// ==================== БАЗОВЫЕ ФУНКЦИИ ====================

function getReviewWords() {
    try {
        const data = localStorage.getItem(REVIEW_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Ошибка загрузки слов для повторения:', e);
        return [];
    }
}

function saveReviewWords(words) {
    try {
        localStorage.setItem(REVIEW_KEY, JSON.stringify(words));
        updateStats();
    } catch (e) {
        console.error('Ошибка сохранения слов для повторения:', e);
    }
}

function getReviewRadicals() {
    try {
        const data = localStorage.getItem(REVIEW_RADICALS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Ошибка загрузки радикалов для повторения:', e);
        return [];
    }
}

function saveReviewRadicals(radicals) {
    try {
        localStorage.setItem(REVIEW_RADICALS_KEY, JSON.stringify(radicals));
        updateStats();
    } catch (e) {
        console.error('Ошибка сохранения радикалов для повторения:', e);
    }
}

function getStats() {
    try {
        const data = localStorage.getItem(REVIEW_STATS_KEY);
        return data ? JSON.parse(data) : { 
            totalGames: 0, 
            totalCorrect: 0, 
            totalWrong: 0, 
            bestStreak: 0,
            gamesPlayed: 0
        };
    } catch (e) {
        return { totalGames: 0, totalCorrect: 0, totalWrong: 0, bestStreak: 0, gamesPlayed: 0 };
    }
}

function saveStats(stats) {
    try {
        localStorage.setItem(REVIEW_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
        console.error('Ошибка сохранения статистики:', e);
    }
}

function updateStats() {
    const words = getReviewWords();
    const radicals = getReviewRadicals();
    const stats = getStats();
    stats.totalItems = words.length + radicals.length;
    saveStats(stats);
}

// ==================== ДОБАВЛЕНИЕ ====================

function addWordToReview(wordChar) {
    if (typeof WORDS === 'undefined') {
        console.error('WORDS не загружены!');
        return false;
    }
    
    const word = WORDS.find(w => w.c === wordChar);
    if (!word) {
        console.error('Слово не найдено:', wordChar);
        return false;
    }
    
    const reviewList = getReviewWords();
    
    if (reviewList.some(w => w.c === word.c)) {
        showToast('⚠️ Слово уже в списке повторения', 'warning');
        return false;
    }
    
    reviewList.push({
        c: word.c,
        p: word.p || '?',
        m: word.m || '?',
        e: word.e || '📖',
        cat: word.cat || 'basics',
        a: word.a || '',
        dateAdded: new Date().toISOString(),
        reviewCount: 0,
        lastReviewed: null,
        correctCount: 0,
        wrongCount: 0,
        streak: 0
    });
    
    saveReviewWords(reviewList);
    showToast(`✅ "${word.c}" добавлено в повторение!`, 'success');
    renderReviewPanel();
    return true;
}

function addRadicalToReview(radicalChar) {
    if (typeof RADICALS === 'undefined') {
        console.error('RADICALS не загружены!');
        return false;
    }
    
    const radical = RADICALS.find(r => r.s === radicalChar);
    if (!radical) {
        console.error('Радикал не найден:', radicalChar);
        return false;
    }
    
    const reviewList = getReviewRadicals();
    
    if (reviewList.some(r => r.s === radical.s)) {
        showToast('⚠️ Радикал уже в списке повторения', 'warning');
        return false;
    }
    
    reviewList.push({
        s: radical.s,
        p: radical.p || '?',
        m: radical.m || '?',
        e: radical.e || '🔤',
        ex: radical.ex || '',
        dateAdded: new Date().toISOString(),
        reviewCount: 0,
        lastReviewed: null,
        correctCount: 0,
        wrongCount: 0,
        streak: 0
    });
    
    saveReviewRadicals(reviewList);
    showToast(`✅ Радикал "${radical.s}" добавлен в повторение!`, 'success');
    renderReviewPanel();
    return true;
}

// ==================== УДАЛЕНИЕ ====================

function removeWordFromReview(wordChar) {
    if (!confirm(`🗑️ Удалить слово "${wordChar}" из повторения?`)) return false;
    let reviewList = getReviewWords();
    reviewList = reviewList.filter(w => w.c !== wordChar);
    saveReviewWords(reviewList);
    showToast(`🗑️ Слово "${wordChar}" удалено`, 'info');
    renderReviewPanel();
    return true;
}

function removeRadicalFromReview(radicalChar) {
    if (!confirm(`🗑️ Удалить радикал "${radicalChar}" из повторения?`)) return false;
    let reviewList = getReviewRadicals();
    reviewList = reviewList.filter(r => r.s !== radicalChar);
    saveReviewRadicals(reviewList);
    showToast(`🗑️ Радикал "${radicalChar}" удалён`, 'info');
    renderReviewPanel();
    return true;
}

// ==================== СТАТИСТИКА ====================

function getReviewStats() {
    const words = getReviewWords();
    const radicals = getReviewRadicals();
    const stats = getStats();
    return {
        totalWords: words.length,
        totalRadicals: radicals.length,
        total: words.length + radicals.length,
        wordsToReview: words.filter(w => !w.lastReviewed || Date.now() - new Date(w.lastReviewed).getTime() > 86400000).length,
        radicalsToReview: radicals.filter(r => !r.lastReviewed || Date.now() - new Date(r.lastReviewed).getTime() > 86400000).length,
        totalGames: stats.totalGames || 0,
        totalCorrect: stats.totalCorrect || 0,
        totalWrong: stats.totalWrong || 0,
        bestStreak: stats.bestStreak || 0,
        gamesPlayed: stats.gamesPlayed || 0
    };
}

// ==================== ТОСТ (УВЕДОМЛЕНИЯ) ====================

function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.review-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'review-toast';
    const colors = {
        info: 'rgba(0,0,0,0.85)',
        success: '#2ecc71',
        error: '#e74c3c',
        warning: '#f39c12'
    };
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: fadeInUp 0.3s ease;
        max-width: 90%;
        text-align: center;
        backdrop-filter: blur(10px);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ==================== ГЛАВНАЯ ПАНЕЛЬ ПОВТОРЕНИЯ ====================

function renderReviewPanel() {
    const container = document.getElementById('reviewContainer');
    if (!container) return;
    
    const stats = getReviewStats();
    const words = getReviewWords();
    const radicals = getReviewRadicals();
    const allItems = [
        ...words.map(w => ({ ...w, type: 'word' })),
        ...radicals.map(r => ({ ...r, type: 'radical' }))
    ];
    
    const colors = ['#4361ee', '#e53935', '#2ecc71', '#f39c12', '#8e24aa', '#00bcd4', '#ff6b35', '#4caf50'];
    
    let html = `
        <!-- СТАТИСТИКА -->
        <div class="review-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px;margin-bottom:20px;">
            <div style="background:linear-gradient(135deg,#4361ee,#764ba2);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.total}</div>
                <div style="font-size:11px;opacity:0.8;">📚 Всего</div>
            </div>
            <div style="background:linear-gradient(135deg,#2ecc71,#27ae60);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.totalCorrect || 0}</div>
                <div style="font-size:11px;opacity:0.8;">✅ Верно</div>
            </div>
            <div style="background:linear-gradient(135deg,#e74c3c,#c62828);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.totalWrong || 0}</div>
                <div style="font-size:11px;opacity:0.8;">❌ Неверно</div>
            </div>
            <div style="background:linear-gradient(135deg,#f39c12,#e67e22);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.bestStreak || 0}</div>
                <div style="font-size:11px;opacity:0.8;">🔥 Серия</div>
            </div>
        </div>
        
        <!-- КНОПКИ ИГР -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
            <button onclick="startGame('visual')" style="background:linear-gradient(135deg,#4361ee,#764ba2);color:white;border:none;padding:16px;border-radius:16px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 15px rgba(67,97,238,0.3);">
                <div style="font-size:36px;">👀</div>
                <div>Угадай по виду</div>
                <div style="font-size:11px;font-weight:400;opacity:0.8;">Выбери перевод</div>
            </button>
            <button onclick="startGame('audio')" style="background:linear-gradient(135deg,#e53935,#c62828);color:white;border:none;padding:16px;border-radius:16px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 15px rgba(229,57,53,0.3);">
                <div style="font-size:36px;">🎧</div>
                <div>Угадай на слух</div>
                <div style="font-size:11px;font-weight:400;opacity:0.8;">Услышь и выбери</div>
            </button>
        </div>
        
        <!-- ЗАГОЛОВОК КУБИКОВ -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 style="font-size:18px;">🧊 Мои карточки (${allItems.length})</h3>
            ${allItems.length > 0 ? `<button onclick="clearAllReview()" style="background:#e74c3c;color:white;border:none;padding:6px 16px;border-radius:20px;font-size:12px;cursor:pointer;">🗑️ Всё</button>` : ''}
        </div>
        
        <!-- КУБИКИ -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px;margin-bottom:16px;">
    `;
    
    if (allItems.length === 0) {
        html += `
            <div style="grid-column:1/-1;text-align:center;padding:40px;background:rgba(255,255,255,0.5);border-radius:20px;">
                <div style="font-size:48px;margin-bottom:12px;">📭</div>
                <div style="font-size:18px;color:#666;">Нет добавленных слов</div>
                <div style="font-size:14px;color:#999;margin-top:8px;">Добавьте слова через модальное окно (кнопка 🧠 В повторение)</div>
            </div>
        `;
    } else {
        allItems.forEach((item, index) => {
            const isWord = item.type === 'word';
            const char = isWord ? item.c : item.s;
            const meaning = item.m || '?';
            const emoji = item.e || (isWord ? '📖' : '🔤');
            const color = colors[index % colors.length];
            const pinyin = item.p || '';
            
            html += `
                <div class="review-cube" style="
                    background:white;
                    border-radius:16px;
                    padding:12px 8px;
                    text-align:center;
                    box-shadow:0 4px 12px rgba(0,0,0,0.08);
                    border:2px solid ${color}33;
                    position:relative;
                    cursor:pointer;
                    min-height:130px;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                " onclick="speak('${char}')">
                    <button onclick="event.stopPropagation();${isWord ? `removeWordFromReview('${char}')` : `removeRadicalFromReview('${char}')`}" 
                            class="delete-btn"
                            style="
                                position:absolute;
                                top:4px;
                                right:6px;
                                background:#e74c3c;
                                color:white;
                                border:none;
                                border-radius:50%;
                                width:22px;
                                height:22px;
                                font-size:12px;
                                cursor:pointer;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                opacity:0.7;
                                transition:opacity 0.2s;
                            "
                            onmouseover="this.style.opacity='1'"
                            onmouseout="this.style.opacity='0.7'">
                        ✕
                    </button>
                    
                    <div style="font-size:44px;font-weight:900;color:#2c3e50;line-height:1.1;margin-bottom:4px;">
                        ${char}
                    </div>
                    <div style="font-size:20px;margin-bottom:2px;">${emoji}</div>
                    <div style="font-size:13px;font-weight:600;color:#555;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                        ${meaning.length > 20 ? meaning.substring(0, 20) + '…' : meaning}
                    </div>
                    ${pinyin ? `<div style="font-size:10px;color:#999;margin-top:2px;">${pinyin}</div>` : ''}
                    <div style="font-size:9px;color:#aaa;margin-top:2px;background:#f0f0f0;padding:0 10px;border-radius:10px;">
                        ${isWord ? (item.cat || 'слово') : 'радикал'}
                    </div>
                </div>
            `;
        });
    }
    
    html += `
        </div>
        <div style="text-align:center;padding:8px;font-size:12px;color:#999;">
            💡 Нажми на кубик — услышишь произношение
        </div>
    `;
    
    container.innerHTML = html;
}

// ==================== ИГРЫ ====================

let gameState = {
    mode: 'visual',
    items: [],
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    total: 0,
    isActive: false,
    answered: false,
    currentItem: null,
    options: []
};

function startGame(mode) {
    const words = getReviewWords();
    const radicals = getReviewRadicals();
    
    let allItems = [
        ...words.map(w => ({ ...w, type: 'word' })),
        ...radicals.map(r => ({ ...r, type: 'radical' }))
    ];
    
    if (allItems.length < 3) {
        showToast('📭 Добавьте минимум 3 слова в повторение!', 'warning');
        return;
    }
    
    // Перемешиваем все слова
    allItems.sort(() => Math.random() - 0.5);
    
    // Берём все слова, чтобы пройти все
    const items = allItems;
    
    gameState = {
        mode: mode,
        items: items,
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        streak: 0,
        bestStreak: 0,
        total: items.length,
        isActive: true,
        answered: false,
        currentItem: null,
        options: []
    };
    
    showGameCard();
}

function showGameCard() {
    const container = document.getElementById('reviewContainer');
    if (!container) return;
    
    // Проверяем, закончились ли все слова
    if (!gameState.isActive || gameState.currentIndex >= gameState.total) {
        showGameResults();
        return;
    }
    
    const item = gameState.items[gameState.currentIndex];
    gameState.currentItem = item;
    gameState.answered = false;
    
    const isWord = item.type === 'word';
    const char = isWord ? item.c : item.s;
    const meaning = item.m || '?';
    const emoji = item.e || (isWord ? '📖' : '🔤');
    const pinyin = item.p || '?';
    const current = gameState.currentIndex + 1;
    const total = gameState.total;
    
    const options = generateOptions(item);
    gameState.options = options;
    
    if (gameState.mode === 'audio') {
        setTimeout(() => { speak(char); }, 300);
    }
    
    const modeIcon = gameState.mode === 'visual' ? '👀' : '🎧';
    const modeTitle = gameState.mode === 'visual' ? 'Угадай по виду' : 'Угадай на слух';
    const modeColor = gameState.mode === 'visual' ? '#4361ee' : '#e53935';
    
    let html = `
        <div style="background:white;border-radius:24px;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,0.12);">
            <!-- ВЕРХНЯЯ ПАНЕЛЬ -->
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:6px;">
                <span style="background:${modeColor};color:white;padding:3px 14px;border-radius:16px;font-size:13px;font-weight:700;">
                    ${modeIcon} ${modeTitle}
                </span>
                <span style="color:#555;font-size:13px;font-weight:600;">
                    ${current}/${total} 
                    <span style="color:#2ecc71;">✅ ${gameState.correct}</span> 
                    <span style="color:#e74c3c;">❌ ${gameState.wrong}</span>
                    ${gameState.streak > 0 ? `<span style="color:#f39c12;">🔥 ${gameState.streak}</span>` : ''}
                </span>
            </div>
            
            <div style="text-align:center;padding:6px 0;">
    `;
    
    if (gameState.mode === 'visual') {
        html += `
            <div style="font-size:96px;font-weight:900;color:#2c3e50;line-height:1.2;margin-bottom:4px;text-shadow:2px 2px 0 rgba(0,0,0,0.05);">
                ${char}
            </div>
            <div style="font-size:14px;color:#999;margin-bottom:4px;">
                ${emoji} ${isWord ? 'Слово' : 'Радикал'}
            </div>
            <div style="font-size:18px;font-weight:600;color:${modeColor};margin-bottom:12px;">
                👆 Выберите правильный перевод
            </div>
        `;
    } else {
        html += `
            <div style="font-size:56px;margin-bottom:4px;">🎧</div>
            <div style="font-size:20px;font-weight:600;color:#2c3e50;margin-bottom:2px;">
                Какой иероглиф прозвучал?
            </div>
            <button onclick="speak('${char}')" style="background:${modeColor};color:white;border:none;padding:8px 24px;border-radius:50px;font-size:16px;cursor:pointer;margin-bottom:10px;">
                🔊 Повторить
            </button>
            ${pinyin ? `<div style="font-size:13px;color:#666;margin-bottom:6px;">Подсказка: ${pinyin}</div>` : ''}
        `;
    }
    
    html += `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;max-width:500px;margin-left:auto;margin-right:auto;">
    `;
    
    options.forEach((opt, idx) => {
        const isCorrect = opt.isCorrect;
        const label = String.fromCharCode(65 + idx);
        const bgColor = gameState.answered 
            ? (isCorrect ? '#2ecc71' : '#e74c3c') 
            : '#f0f2f5';
        const textColor = gameState.answered ? 'white' : '#2c3e50';
        
        html += `
            <button onclick="handleGameAnswer(${idx})" 
                    style="
                        background:${bgColor};
                        color:${textColor};
                        border:${gameState.answered && isCorrect ? '3px solid #27ae60' : gameState.answered && !isCorrect ? '3px solid #c62828' : '2px solid #e0e7ff'};
                        padding:14px 6px;
                        border-radius:14px;
                        font-size:${gameState.mode === 'visual' ? '16px' : '18px'};
                        font-weight:700;
                        cursor:${gameState.answered ? 'default' : 'pointer'};
                        transition:all 0.2s;
                        min-height:50px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        gap:6px;
                        flex-wrap:wrap;
                        opacity:${gameState.answered && !isCorrect ? '0.5' : '1'};
                        ${!gameState.answered ? 'box-shadow: 0 2px 8px rgba(0,0,0,0.06);' : ''}
                    "
                    ${gameState.answered ? 'disabled' : ''}
            >
                <span style="font-weight:400;font-size:11px;opacity:0.6;">${label}.</span>
                ${gameState.mode === 'visual' ? opt.text : `<span style="font-size:32px;">${opt.char}</span>`}
                ${gameState.mode === 'visual' ? `<span style="font-size:14px;color:#666;font-weight:400;">${opt.emoji || ''}</span>` : ''}
                ${gameState.answered && isCorrect ? ' ✅' : ''}
                ${gameState.answered && !isCorrect ? ' ❌' : ''}
            </button>
        `;
    });
    
    html += `
            </div>
    `;
    
    if (gameState.answered) {
        const correct = options.find(o => o.isCorrect);
        html += `
            <div style="margin-top:12px;padding:12px;background:#f8f9fa;border-radius:12px;border-left:4px solid ${modeColor};">
                <div style="font-weight:600;font-size:15px;">✅ Правильный ответ:</div>
                <div style="font-size:18px;font-weight:700;">${correct.char} — ${correct.text}</div>
                ${correct.pinyin ? `<div style="font-size:13px;color:#666;">📖 ${correct.pinyin}</div>` : ''}
                ${correct.emoji ? `<div style="font-size:13px;color:#666;">${correct.emoji}</div>` : ''}
                ${item.a ? `<div style="font-size:12px;color:#888;margin-top:4px;">💡 ${item.a}</div>` : ''}
            </div>
        `;
    }
    
    // === КНОПКА "ДАЛЕЕ" ===
    html += `
        <div style="text-align:center;margin-top:12px;">
            <button onclick="${gameState.answered ? 'nextGameQuestion()' : 'showAnswerAndNext()'}" 
                    style="background:${modeColor};color:white;border:none;padding:10px 36px;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;">
                ${gameState.answered ? '➡️ Далее' : '👀 Показать ответ'}
            </button>
        </div>
    `;
    
    html += `
        </div>
    `;
    
    container.innerHTML = html;
}

// === ПОКАЗЫВАЕТ ОТВЕТ И ПЕРЕХОДИТ К СЛЕДУЮЩЕМУ ===
function showAnswerAndNext() {
    if (gameState.answered) return;
    
    // Отмечаем как неправильный, если пользователь не ответил
    gameState.answered = true;
    gameState.wrong++;
    gameState.streak = 0;
    
    const stats = getStats();
    stats.totalGames++;
    stats.totalWrong++;
    stats.gamesPlayed++;
    saveStats(stats);
    
    // Показываем карточку с ответом
    showGameCard();
    
    // Автоматически переходим к следующему через 1.5 секунды
    setTimeout(function() {
        if (gameState.isActive && gameState.answered) {
            nextGameQuestion();
        }
    }, 1500);
}

function generateOptions(correctItem) {
    const isWord = correctItem.type === 'word';
    const allItems = gameState.items;
    
    const correctText = correctItem.m || '?';
    const correctChar = isWord ? correctItem.c : correctItem.s;
    const correctPinyin = correctItem.p || '';
    const correctEmoji = correctItem.e || '';
    
    let options = [{
        char: correctChar,
        text: correctText,
        isCorrect: true,
        pinyin: correctPinyin,
        emoji: correctEmoji
    }];
    
    // Ищем другие варианты (только из списка, чтобы были РАЗНЫЕ)
    const others = allItems.filter(item => {
        const otherChar = item.type === 'word' ? item.c : item.s;
        return otherChar !== correctChar;
    });
    
    others.sort(() => Math.random() - 0.5);
    const selectedOthers = others.slice(0, 3);
    
    selectedOthers.forEach(item => {
        const char = item.type === 'word' ? item.c : item.s;
        options.push({
            char: char,
            text: item.m || '?',
            isCorrect: false,
            pinyin: item.p || '',
            emoji: item.e || ''
        });
    });
    
    // Если не хватает вариантов, добавляем из WORDS
    if (options.length < 4 && typeof WORDS !== 'undefined') {
        const extra = WORDS.filter(w => w.c !== correctChar && !options.some(o => o.char === w.c));
        extra.sort(() => Math.random() - 0.5);
        for (let i = 0; options.length < 4 && i < extra.length; i++) {
            options.push({
                char: extra[i].c,
                text: extra[i].m || '?',
                isCorrect: false,
                pinyin: extra[i].p || '',
                emoji: extra[i].e || ''
            });
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    return options;
}

function handleGameAnswer(index) {
    if (gameState.answered) return;
    
    const selected = gameState.options[index];
    const isCorrect = selected.isCorrect;
    
    gameState.answered = true;
    
    if (isCorrect) {
        gameState.correct++;
        gameState.streak++;
        if (gameState.streak > gameState.bestStreak) {
            gameState.bestStreak = gameState.streak;
        }
        showToast('✅ Правильно!', 'success');
    } else {
        gameState.wrong++;
        gameState.streak = 0;
        const correct = gameState.options.find(o => o.isCorrect);
        showToast(`❌ Правильно: ${correct.text}`, 'error');
    }
    
    const stats = getStats();
    stats.totalGames++;
    stats.totalCorrect += isCorrect ? 1 : 0;
    stats.totalWrong += isCorrect ? 0 : 1;
    if (gameState.bestStreak > stats.bestStreak) {
        stats.bestStreak = gameState.bestStreak;
    }
    stats.gamesPlayed++;
    saveStats(stats);
    
    showGameCard();
    
    // Автоматически переходим к следующему через 1.5 секунды
    setTimeout(function() {
        if (gameState.isActive && gameState.answered) {
            nextGameQuestion();
        }
    }, 1500);
}

function nextGameQuestion() {
    if (!gameState.isActive) return;
    
    // Переходим к следующему слову
    gameState.currentIndex++;
    showGameCard();
}

function showGameResults() {
    const container = document.getElementById('reviewContainer');
    if (!container) return;
    
    const total = gameState.total;
    const correct = gameState.correct;
    const wrong = gameState.wrong;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const streak = gameState.bestStreak;
    
    let emoji = percent >= 80 ? '🌟' : percent >= 50 ? '👍' : '💪';
    let message = percent >= 80 ? 'Отличный результат!' : percent >= 50 ? 'Хорошо, продолжайте!' : 'Нужно больше практики!';
    
    const modeIcon = gameState.mode === 'visual' ? '👀' : '🎧';
    const modeTitle = gameState.mode === 'visual' ? 'Угадай по виду' : 'Угадай на слух';
    const modeColor = gameState.mode === 'visual' ? '#4361ee' : '#e53935';
    
    let html = `
        <div style="background:white;border-radius:24px;padding:24px;box-shadow:0 8px 30px rgba(0,0,0,0.12);text-align:center;">
            <div style="font-size:56px;margin-bottom:6px;">${emoji}</div>
            <div style="font-size:24px;font-weight:800;color:#2c3e50;">${message}</div>
            <div style="font-size:14px;color:#666;margin-bottom:12px;">
                ${modeIcon} ${modeTitle} — завершено! (${total} слов)
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0;">
                <div style="background:#4361ee;color:white;padding:10px;border-radius:10px;">
                    <div style="font-size:22px;font-weight:900;">${total}</div>
                    <div style="font-size:10px;opacity:0.8;">Всего</div>
                </div>
                <div style="background:#2ecc71;color:white;padding:10px;border-radius:10px;">
                    <div style="font-size:22px;font-weight:900;">${correct}</div>
                    <div style="font-size:10px;opacity:0.8;">✅ Верно</div>
                </div>
                <div style="background:#e74c3c;color:white;padding:10px;border-radius:10px;">
                    <div style="font-size:22px;font-weight:900;">${wrong}</div>
                    <div style="font-size:10px;opacity:0.8;">❌ Неверно</div>
                </div>
                <div style="background:#f39c12;color:white;padding:10px;border-radius:10px;">
                    <div style="font-size:22px;font-weight:900;">${streak}</div>
                    <div style="font-size:10px;opacity:0.8;">🔥 Серия</div>
                </div>
            </div>
            
            <div style="font-size:22px;font-weight:700;margin-bottom:12px;color:${modeColor};">${percent}% точность</div>
            
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                <button onclick="startGame('${gameState.mode}')" style="background:${modeColor};color:white;border:none;padding:10px 24px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;">
                    🔄 Снова
                </button>
                <button onclick="startGame('${gameState.mode === 'visual' ? 'audio' : 'visual'}')" style="background:linear-gradient(135deg,#764ba2,#4361ee);color:white;border:none;padding:10px 24px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;">
                    🔄 Другой режим
                </button>
                <button onclick="renderReviewPanel()" style="background:#666;color:white;border:none;padding:10px 24px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;">
                    📊 К списку
                </button>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    gameState.isActive = false;
}

// ==================== ОЗВУЧКА ====================

function speak(text) {
    if (!window.speechSynthesis) {
        console.warn('Speech Synthesis не поддерживается');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

// ==================== ОЧИСТКА ВСЕГО ====================

function clearAllReview() {
    if (!confirm('🗑️ Удалить все слова и радикалы из списка повторения?')) return;
    localStorage.removeItem(REVIEW_KEY);
    localStorage.removeItem(REVIEW_RADICALS_KEY);
    showToast('✅ Всё очищено!', 'success');
    renderReviewPanel();
}

// ==================== ДОБАВЛЕНИЕ ВКЛАДКИ ====================

function addReviewTab() {
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) return;
    
    if (tabsContainer.querySelector('[data-tab="review"]')) return;
    
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.setAttribute('data-tab', 'review');
    tab.innerHTML = '🧠 Повторение';
    tab.onclick = function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        let panel = document.getElementById('reviewPanel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'reviewPanel';
            panel.className = 'panel';
            panel.innerHTML = '<div class="card" id="reviewContainer"></div>';
            document.querySelector('.container').appendChild(panel);
        }
        panel.classList.add('active');
        renderReviewPanel();
    };
    tabsContainer.appendChild(tab);
    
    if (!document.getElementById('reviewPanel')) {
        const panel = document.createElement('div');
        panel.id = 'reviewPanel';
        panel.className = 'panel';
        panel.innerHTML = '<div class="card" id="reviewContainer"></div>';
        document.querySelector('.container').appendChild(panel);
    }
}

// ==================== ПАТЧ МОДАЛЬНОГО ОКНА ====================

function patchModalButtons() {
    const originalOpenModal = window.openModal;
    if (originalOpenModal) {
        window.openModal = function(w) {
            originalOpenModal(w);
            const modalBody = document.getElementById('modalBody');
            if (modalBody) {
                const btnGroup = modalBody.querySelector('.btn-group');
                if (btnGroup) {
                    const reviewBtn = document.createElement('button');
                    reviewBtn.textContent = '🧠 В повторение';
                    reviewBtn.style.cssText = 'background:linear-gradient(135deg,#f39c12,#e67e22);';
                    reviewBtn.onclick = function() {
                        const isRadical = w.cat === 'radicals' || (w.c && RADICALS && RADICALS.some(r => r.s === w.c));
                        if (isRadical) {
                            addRadicalToReview(w.c);
                        } else {
                            addWordToReview(w.c);
                        }
                        closeModal();
                    };
                    btnGroup.appendChild(reviewBtn);
                }
            }
        };
    }
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addReviewTab, 300);
    setTimeout(patchModalButtons, 400);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .review-toast { animation: fadeInUp 0.3s ease; }
    `;
    document.head.appendChild(style);
});

console.log('🧠 Модуль повторения загружен! Кубики + 2 игры');
