// ============================================================
// 🧠 МОДУЛЬ ПОВТОРЕНИЯ — 2 ИГРЫ + КУБИКИ + СОХРАНЕНИЕ
// ============================================================

const REVIEW_KEY = 'chinese_review_words';
const REVIEW_RADICALS_KEY = 'chinese_review_radicals';
const REVIEW_STATS_KEY = 'chinese_review_stats';

// ==================== ХРАНИЛИЩЕ ====================

function getReviewWords() {
    try { const data = localStorage.getItem(REVIEW_KEY); return data ? JSON.parse(data) : []; }
    catch (e) { return []; }
}

function saveReviewWords(words) {
    try { localStorage.setItem(REVIEW_KEY, JSON.stringify(words)); }
    catch (e) { console.error(e); }
}

function getReviewRadicals() {
    try { const data = localStorage.getItem(REVIEW_RADICALS_KEY); return data ? JSON.parse(data) : []; }
    catch (e) { return []; }
}

function saveReviewRadicals(radicals) {
    try { localStorage.setItem(REVIEW_RADICALS_KEY, JSON.stringify(radicals)); }
    catch (e) { console.error(e); }
}

function getStats() {
    try {
        const data = localStorage.getItem(REVIEW_STATS_KEY);
        return data ? JSON.parse(data) : { totalGames: 0, totalCorrect: 0, totalWrong: 0, bestStreak: 0 };
    } catch (e) { return { totalGames: 0, totalCorrect: 0, totalWrong: 0, bestStreak: 0 }; }
}

function saveStats(stats) {
    try { localStorage.setItem(REVIEW_STATS_KEY, JSON.stringify(stats)); }
    catch (e) { console.error(e); }
}

// ==================== ДОБАВЛЕНИЕ ====================

function addWordToReview(wordChar) {
    if (typeof WORDS === 'undefined') return false;
    const word = WORDS.find(w => w.c === wordChar);
    if (!word) return false;
    const reviewList = getReviewWords();
    if (reviewList.some(w => w.c === word.c)) {
        showToast('⚠️ Слово уже в списке', 'warning');
        return false;
    }
    reviewList.push({
        c: word.c, p: word.p || '?', m: word.m || '?',
        e: word.e || '📖', cat: word.cat || 'basics', a: word.a || ''
    });
    saveReviewWords(reviewList);
    showToast(`✅ "${word.c}" добавлено!`, 'success');
    renderReviewPanel();
    return true;
}

function addRadicalToReview(radicalChar) {
    if (typeof RADICALS === 'undefined') return false;
    const radical = RADICALS.find(r => r.s === radicalChar);
    if (!radical) return false;
    const reviewList = getReviewRadicals();
    if (reviewList.some(r => r.s === radical.s)) {
        showToast('⚠️ Радикал уже в списке', 'warning');
        return false;
    }
    reviewList.push({
        s: radical.s, p: radical.p || '?', m: radical.m || '?',
        e: radical.e || '🔤', ex: radical.ex || ''
    });
    saveReviewRadicals(reviewList);
    showToast(`✅ Радикал "${radical.s}" добавлен!`, 'success');
    renderReviewPanel();
    return true;
}

// ==================== УДАЛЕНИЕ ====================

function removeWordFromReview(wordChar) {
    if (!confirm(`🗑️ Удалить "${wordChar}"?`)) return false;
    let list = getReviewWords().filter(w => w.c !== wordChar);
    saveReviewWords(list);
    showToast('🗑️ Удалено', 'info');
    renderReviewPanel();
    return true;
}

function removeRadicalFromReview(radicalChar) {
    if (!confirm(`🗑️ Удалить "${radicalChar}"?`)) return false;
    let list = getReviewRadicals().filter(r => r.s !== radicalChar);
    saveReviewRadicals(list);
    showToast('🗑️ Удалено', 'info');
    renderReviewPanel();
    return true;
}

// ==================== ТОСТ ====================

function showToast(message, type = 'info') {
    const existing = document.querySelector('.review-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'review-toast';
    const colors = { info: '#333', success: '#2ecc71', error: '#e74c3c', warning: '#f39c12' };
    toast.style.cssText = `
        position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
        background:${colors[type] || '#333'};color:white;padding:12px 24px;
        border-radius:50px;font-size:16px;font-weight:600;z-index:10000;
        box-shadow:0 4px 20px rgba(0,0,0,0.3);max-width:90%;text-align:center;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// ==================== ГЛАВНАЯ ПАНЕЛЬ ====================

function renderReviewPanel() {
    const container = document.getElementById('reviewContainer');
    if (!container) return;
    
    const words = getReviewWords();
    const radicals = getReviewRadicals();
    const allItems = [
        ...words.map(w => ({ ...w, type: 'word' })),
        ...radicals.map(r => ({ ...r, type: 'radical' }))
    ];
    
    const stats = getStats();
    const colors = ['#4361ee', '#e53935', '#2ecc71', '#f39c12', '#8e24aa', '#00bcd4', '#ff6b35', '#4caf50'];
    
    let html = `
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;">
            <div style="background:linear-gradient(135deg,#4361ee,#764ba2);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${allItems.length}</div>
                <div style="font-size:11px;">📚 Всего</div>
            </div>
            <div style="background:linear-gradient(135deg,#2ecc71,#27ae60);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.totalCorrect || 0}</div>
                <div style="font-size:11px;">✅ Верно</div>
            </div>
            <div style="background:linear-gradient(135deg,#e74c3c,#c62828);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.totalWrong || 0}</div>
                <div style="font-size:11px;">❌ Неверно</div>
            </div>
            <div style="background:linear-gradient(135deg,#f39c12,#e67e22);color:white;padding:14px;border-radius:14px;text-align:center;">
                <div style="font-size:28px;font-weight:900;">${stats.bestStreak || 0}</div>
                <div style="font-size:11px;">🔥 Серия</div>
            </div>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
            <button onclick="startReviewGame('visual')" style="background:linear-gradient(135deg,#4361ee,#764ba2);color:white;border:none;padding:16px;border-radius:16px;font-size:16px;font-weight:700;cursor:pointer;">
                <div style="font-size:36px;">👀</div>
                <div>Угадай по виду</div>
            </button>
            <button onclick="startReviewGame('audio')" style="background:linear-gradient(135deg,#e53935,#c62828);color:white;border:none;padding:16px;border-radius:16px;font-size:16px;font-weight:700;cursor:pointer;">
                <div style="font-size:36px;">🎧</div>
                <div>Угадай на слух</div>
            </button>
        </div>
        
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 style="font-size:18px;">🧊 Мои карточки (${allItems.length})</h3>
            ${allItems.length > 0 ? '<button onclick="clearAllReview()" style="background:#e74c3c;color:white;border:none;padding:6px 16px;border-radius:20px;font-size:12px;cursor:pointer;">🗑️ Всё</button>' : ''}
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px;">
    `;
    
    if (allItems.length === 0) {
        html += '<div style="grid-column:1/-1;text-align:center;padding:40px;"><div style="font-size:48px;">📭</div><div>Нет слов</div></div>';
    } else {
        allItems.forEach((item, index) => {
            const isWord = item.type === 'word';
            const char = isWord ? item.c : item.s;
            const meaning = item.m || '?';
            const emoji = item.e || (isWord ? '📖' : '🔤');
            const color = colors[index % colors.length];
            
            html += `
                <div style="background:white;border-radius:16px;padding:12px 8px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:2px solid ${color}33;position:relative;cursor:pointer;min-height:130px;display:flex;flex-direction:column;align-items:center;justify-content:center;" onclick="speak('${char}')">
                    <button onclick="event.stopPropagation();${isWord ? `removeWordFromReview('${char}')` : `removeRadicalFromReview('${char}')`}" style="position:absolute;top:4px;right:6px;background:#e74c3c;color:white;border:none;border-radius:50%;width:22px;height:22px;font-size:12px;cursor:pointer;">✕</button>
                    <div style="font-size:44px;font-weight:900;">${char}</div>
                    <div style="font-size:20px;">${emoji}</div>
                    <div style="font-size:13px;font-weight:600;color:#555;">${meaning.length > 15 ? meaning.substring(0, 15) + '…' : meaning}</div>
                </div>
            `;
        });
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// ==================== ИГРА ====================

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

// ==================== ЛОГ ДЛЯ ИГРЫ ====================
let gameLog = [];

function addGameLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    gameLog.push({ time: timestamp, message, type });
    if (gameLog.length > 100) gameLog.shift();
    updateGameLogDisplay();
    console.log(`[${timestamp}] ${message}`);
}

function updateGameLogDisplay() {
    const logContainer = document.getElementById('gameLogContainer');
    if (!logContainer) return;
    
    if (gameLog.length === 0) {
        logContainer.innerHTML = '<div style="color:#999;font-size:13px;text-align:center;padding:10px;">📋 Лог пуст. Начните игру!</div>';
        return;
    }
    
    let html = '';
    const recentLogs = gameLog.slice(-20);
    recentLogs.forEach(entry => {
        const color = entry.type === 'success' ? '#2ecc71' : 
                      entry.type === 'error' ? '#e74c3c' : 
                      entry.type === 'warning' ? '#f39c12' : '#4361ee';
        html += `<div style="display:flex;gap:10px;padding:4px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;font-family:monospace;">
            <span style="color:#999;font-size:11px;min-width:70px;">${entry.time}</span>
            <span style="color:${color};">${entry.message}</span>
        </div>`;
    });
    
    logContainer.innerHTML = html;
}

// ==================== СТАРТ ИГРЫ ====================

function startReviewGame(mode) {
    addGameLog('🎮 Запуск игры в режиме: ' + (mode === 'visual' ? '👀 Угадай по виду' : '🎧 Угадай на слух'), 'info');
    
    const words = getReviewWords();
    const radicals = getReviewRadicals();
    
    addGameLog(`📚 Загружено слов: ${words.length}, радикалов: ${radicals.length}`, 'info');
    
    let allItems = [
        ...words.map(w => ({ ...w, type: 'word' })),
        ...radicals.map(r => ({ ...r, type: 'radical' }))
    ];
    
    if (allItems.length === 0) {
        addGameLog('❌ Нет слов в повторении! Добавьте слова.', 'error');
        showToast('📭 Добавьте слова в повторение!', 'warning');
        return;
    }
    
    addGameLog(`📝 Всего элементов для игры: ${allItems.length}`, 'info');
    addGameLog(`📝 Список: ${allItems.map(i => i.type === 'word' ? i.c : i.s).join(', ')}`, 'info');
    
    allItems.sort(() => Math.random() - 0.5);
    
    gameState = {
        mode: mode,
        items: allItems,
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        streak: 0,
        bestStreak: 0,
        total: allItems.length,
        isActive: true,
        answered: false,
        currentItem: null,
        options: []
    };
    
    addGameLog(`✅ Игра создана. Всего вопросов: ${gameState.total}`, 'success');
    addGameLog(`🔤 Первое слово: ${gameState.items[0].type === 'word' ? gameState.items[0].c : gameState.items[0].s}`, 'info');
    
    showReviewGameCard();
}

// ==================== ГЕНЕРАЦИЯ ВАРИАНТОВ ====================

function generateOptions(correctItem) {
    const isWord = correctItem.type === 'word';
    const correctChar = isWord ? correctItem.c : correctItem.s;
    const correctText = correctItem.m || '?';
    
    let options = [{
        char: correctChar,
        text: correctText,
        isCorrect: true,
        pinyin: correctItem.p || '',
        emoji: correctItem.e || ''
    }];
    
    addGameLog(`🔍 Генерация вариантов для: ${correctChar} (${correctText})`, 'info');
    
    if (typeof WORDS !== 'undefined' && WORDS.length > 0) {
        const wrongOptions = WORDS.filter(w => 
            w.c !== correctChar && 
            w.m && 
            w.m !== correctText
        );
        
        wrongOptions.sort(() => Math.random() - 0.5);
        const selected = wrongOptions.slice(0, 3);
        
        addGameLog(`📝 Взято ${selected.length} неправильных вариантов из WORDS`, 'info');
        
        selected.forEach(w => {
            options.push({
                char: w.c,
                text: w.m || '?',
                isCorrect: false,
                pinyin: w.p || '',
                emoji: w.e || ''
            });
        });
    }
    
    if (options.length < 4) {
        const fromItems = gameState.items.filter(item => {
            const char = item.type === 'word' ? item.c : item.s;
            return char !== correctChar && !options.some(o => o.char === char);
        });
        
        fromItems.sort(() => Math.random() - 0.5);
        
        addGameLog(`📝 Добавлено ${Math.min(4 - options.length, fromItems.length)} вариантов из списка повторения`, 'info');
        
        for (let i = 0; options.length < 4 && i < fromItems.length; i++) {
            const item = fromItems[i];
            const char = item.type === 'word' ? item.c : item.s;
            options.push({
                char: char,
                text: item.m || '?',
                isCorrect: false,
                pinyin: item.p || '',
                emoji: item.e || ''
            });
        }
    }
    
    while (options.length < 4) {
        options.push({
            char: '—',
            text: '—',
            isCorrect: false,
            pinyin: '',
            emoji: ''
        });
    }
    
    options.sort(() => Math.random() - 0.5);
    
    addGameLog(`✅ Сгенерировано ${options.length} вариантов (правильный: ${correctText})`, 'success');
    
    return options;
}

// ==================== ОСНОВНАЯ ФУНКЦИЯ ОТОБРАЖЕНИЯ КАРТОЧКИ ====================

function showReviewGameCard() {
    const container = document.getElementById('reviewContainer');
    if (!container) return;
    
    // Проверяем, закончилась ли игра
    if (!gameState.isActive || gameState.currentIndex >= gameState.total) {
        addGameLog('🏁 Игра завершена! Показываем результаты.', 'warning');
        showGameResults();
        return;
    }
    
    const item = gameState.items[gameState.currentIndex];
    gameState.currentItem = item;
    
    const isWord = item.type === 'word';
    const char = isWord ? item.c : item.s;
    const meaning = item.m || '?';
    const emoji = item.e || (isWord ? '📖' : '🔤');
    const pinyin = item.p || '';
    const current = gameState.currentIndex + 1;
    const total = gameState.total;
    
    addGameLog(`📝 Вопрос ${current}/${total}: ${char} (${meaning})`, 'info');
    
    // Генерируем варианты ТОЛЬКО если ещё не отвечали
    if (!gameState.answered) {
        const options = generateOptions(item);
        gameState.options = options;
    } else {
        addGameLog(`⏳ Уже отвечено на этот вопрос. Показываем результат.`, 'warning');
    }
    
    if (gameState.mode === 'audio' && !gameState.answered) {
        setTimeout(() => { speak(char); }, 300);
    }
    
    const modeColor = gameState.mode === 'visual' ? '#4361ee' : '#e53935';
    const modeIcon = gameState.mode === 'visual' ? '👀' : '🎧';
    const modeTitle = gameState.mode === 'visual' ? 'Угадай по виду' : 'Угадай на слух';
    
    let html = `
        <div style="background:white;border-radius:24px;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,0.12);">
            <!-- ВЕРХНЯЯ ПАНЕЛЬ -->
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px;">
                <span style="background:${modeColor};color:white;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:700;">${modeIcon} ${modeTitle}</span>
                <span style="color:#555;font-size:14px;font-weight:600;">
                    ${current}/${total} ✅${gameState.correct} ❌${gameState.wrong}
                    ${gameState.streak > 0 ? ` 🔥${gameState.streak}` : ''}
                </span>
            </div>
            
            <!-- ОСНОВНОЙ КОНТЕНТ -->
            <div style="text-align:center;padding:10px 0;">
    `;
    
    if (gameState.mode === 'visual') {
        html += `
            <div style="font-size:96px;font-weight:900;color:#2c3e50;line-height:1.2;margin-bottom:4px;">${char}</div>
            <div style="font-size:14px;color:#999;margin-bottom:4px;">${emoji} ${isWord ? 'Слово' : 'Радикал'}</div>
            <div style="font-size:18px;font-weight:600;color:${modeColor};margin-bottom:12px;">👆 Выберите перевод</div>
        `;
    } else {
        html += `
            <div style="font-size:56px;margin-bottom:4px;">🎧</div>
            <div style="font-size:20px;font-weight:600;color:#2c3e50;margin-bottom:2px;">Какой иероглиф прозвучал?</div>
            <button onclick="speak('${char}')" style="background:${modeColor};color:white;border:none;padding:10px 24px;border-radius:50px;font-size:16px;cursor:pointer;margin-bottom:10px;">🔊 Повторить</button>
            ${pinyin ? `<div style="font-size:13px;color:#666;margin-bottom:6px;">Подсказка: ${pinyin}</div>` : ''}
        `;
    }
    
    // ВАРИАНТЫ ОТВЕТОВ
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;max-width:500px;margin-left:auto;margin-right:auto;">';
    
    gameState.options.forEach((opt, idx) => {
        const isCorrect = opt.isCorrect;
        const label = String.fromCharCode(65 + idx);
        let bgColor = '#f0f2f5';
        let textColor = '#2c3e50';
        let border = '2px solid #e0e7ff';
        let disabled = '';
        
        if (gameState.answered) {
            disabled = 'disabled';
            if (isCorrect) {
                bgColor = '#2ecc71';
                textColor = 'white';
                border = '3px solid #27ae60';
            } else {
                bgColor = '#e74c3c';
                textColor = 'white';
                border = '3px solid #c62828';
            }
        }
        
        html += `
            <button onclick="handleAnswer(${idx})" 
                    style="background:${bgColor};color:${textColor};
                    border:${border};
                    padding:14px;border-radius:14px;font-size:16px;font-weight:700;
                    cursor:${gameState.answered ? 'default' : 'pointer'};
                    min-height:50px;display:flex;align-items:center;justify-content:center;gap:6px;
                    opacity:${gameState.answered && !isCorrect ? '0.5' : '1'};"
                    ${disabled}>
                ${label}. ${gameState.mode === 'visual' ? opt.text : opt.char}
                ${gameState.answered && isCorrect ? ' ✅' : ''}
                ${gameState.answered && !isCorrect ? ' ❌' : ''}
            </button>
        `;
    });
    
    html += '</div>';
    
    // ПОСЛЕ ОТВЕТА - показываем правильный вариант
    if (gameState.answered) {
        const correct = gameState.options.find(o => o.isCorrect);
        html += `
            <div style="margin-top:16px;padding:14px;background:#f8f9fa;border-radius:12px;border-left:4px solid ${modeColor};">
                <div style="font-weight:600;">✅ Правильный ответ: ${correct.char} — ${correct.text}</div>
                ${correct.pinyin ? `<div style="font-size:13px;color:#666;">📖 ${correct.pinyin}</div>` : ''}
            </div>
        `;
    }
    
    // ============ НАВИГАЦИОННЫЕ КНОПКИ ============
    html += `
        <div style="display:flex;justify-content:center;gap:16px;margin-top:20px;flex-wrap:wrap;">
            <!-- КНОПКА НАЗАД -->
            <button onclick="previousQuestion()" 
                    style="background:#4361ee;color:white;border:none;padding:14px 28px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;min-width:120px;${gameState.currentIndex === 0 ? 'opacity:0.3;cursor:not-allowed;' : 'box-shadow:0 4px 15px rgba(67,97,238,0.3);'}"
                    ${gameState.currentIndex === 0 ? 'disabled' : ''}>
                ← НАЗАД
            </button>
    `;
    
    // ГЛАВНАЯ КНОПКА - меняется в зависимости от состояния
    if (gameState.answered) {
        // ЕСЛИ ОТВЕТИЛИ - показываем ДАЛЕЕ или РЕЗУЛЬТАТЫ
        const isLast = gameState.currentIndex >= gameState.total - 1;
        html += `
            <button onclick="nextQuestion()" 
                    style="background:#2ecc71;color:white;border:none;padding:14px 28px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;min-width:120px;box-shadow:0 4px 15px rgba(46,204,113,0.3);">
                ${isLast ? '📊 РЕЗУЛЬТАТЫ' : 'ДАЛЕЕ →'}
            </button>
        `;
    } else {
        // ЕСЛИ НЕ ОТВЕТИЛИ - показываем ПОКАЗАТЬ
        html += `
            <button onclick="skipQuestion()" 
                    style="background:#999;color:white;border:none;padding:14px 28px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;min-width:120px;">
                👀 ПОКАЗАТЬ
            </button>
        `;
    }
    
    html += `
        </div>
        
        <!-- ============ ЛОГ ИГРЫ ============ -->
        <div style="margin-top:16px;padding:12px;background:#f8f9fa;border-radius:12px;border:1px solid #e0e7ff;max-height:150px;overflow-y:auto;font-size:12px;">
            <div style="font-weight:700;color:#4361ee;margin-bottom:6px;font-size:13px;">📋 Лог игры</div>
            <div id="gameLogContainer"></div>
        </div>
    </div>`;
    
    container.innerHTML = html;
    updateGameLogDisplay();
}

// ==================== ОБРАБОТКА ОТВЕТОВ ====================

function handleAnswer(index) {
    if (gameState.answered) return;
    
    const selected = gameState.options[index];
    const isCorrect = selected.isCorrect;
    
    addGameLog(`🖱️ Выбран вариант ${String.fromCharCode(65 + index)}: ${selected.text} (${isCorrect ? '✅' : '❌'})`, isCorrect ? 'success' : 'error');
    
    gameState.answered = true;
    
    if (isCorrect) {
        gameState.correct++;
        gameState.streak++;
        if (gameState.streak > gameState.bestStreak) gameState.bestStreak = gameState.streak;
        addGameLog(`✅ Правильно! Серия: ${gameState.streak}`, 'success');
        showToast('✅ Правильно!', 'success');
    } else {
        gameState.wrong++;
        gameState.streak = 0;
        const correct = gameState.options.find(o => o.isCorrect);
        addGameLog(`❌ Неправильно. Правильно: ${correct.text}`, 'error');
        showToast(`❌ Правильно: ${correct.text}`, 'error');
    }
    
    const stats = getStats();
    stats.totalGames++;
    stats.totalCorrect += isCorrect ? 1 : 0;
    stats.totalWrong += isCorrect ? 0 : 1;
    if (gameState.bestStreak > stats.bestStreak) stats.bestStreak = gameState.bestStreak;
    saveStats(stats);
    
    addGameLog(`📊 Статистика: ✅${gameState.correct} ❌${gameState.wrong} 🔥${gameState.bestStreak}`, 'info');
    
    showReviewGameCard();
}

function skipQuestion() {
    if (gameState.answered) return;
    
    addGameLog(`👀 Пропуск вопроса: ${gameState.currentItem.type === 'word' ? gameState.currentItem.c : gameState.currentItem.s}`, 'warning');
    
    gameState.answered = true;
    gameState.wrong++;
    gameState.streak = 0;
    
    const stats = getStats();
    stats.totalGames++;
    stats.totalWrong++;
    saveStats(stats);
    
    showReviewGameCard();
}

function previousQuestion() {
    if (gameState.currentIndex > 0) {
        addGameLog(`⬅️ Возврат к вопросу ${gameState.currentIndex} (было ${gameState.currentIndex + 1})`, 'info');
        gameState.currentIndex--;
        gameState.answered = false;
        showReviewGameCard();
    }
}

function nextQuestion() {
    addGameLog(`➡️ Переход. Индекс ДО: ${gameState.currentIndex} из ${gameState.total}`, 'info');
    
    if (gameState.currentIndex < gameState.total - 1) {
        gameState.currentIndex++;
        gameState.answered = false;
        gameState.options = [];
        addGameLog(`➡️ Переход на индекс ${gameState.currentIndex}. Слово: ${gameState.items[gameState.currentIndex].type === 'word' ? gameState.items[gameState.currentIndex].c : gameState.items[gameState.currentIndex].s}`, 'info');
        showReviewGameCard();
    } else if (gameState.currentIndex === gameState.total - 1) {
        gameState.currentIndex++;
        gameState.answered = false;
        gameState.options = [];
        addGameLog(`📊 Последний вопрос! Показываем результаты.`, 'warning');
        showReviewGameCard();
    }
}

// ==================== РЕЗУЛЬТАТЫ ====================

function showGameResults() {
    const container = document.getElementById('reviewContainer');
    if (!container) return;
    
    const total = gameState.total;
    const correct = gameState.correct;
    const wrong = gameState.wrong;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const modeColor = gameState.mode === 'visual' ? '#4361ee' : '#e53935';
    
    addGameLog(`📊 РЕЗУЛЬТАТЫ: ${correct}/${total} (${percent}%) 🔥${gameState.bestStreak}`, 'success');
    
    let emoji = '💪';
    let text = 'Практикуйтесь!';
    if (percent >= 80) { emoji = '🌟'; text = 'Отлично!'; }
    else if (percent >= 50) { emoji = '👍'; text = 'Хорошо!'; }
    
    container.innerHTML = `
        <div style="background:white;border-radius:24px;padding:24px;box-shadow:0 8px 30px rgba(0,0,0,0.12);text-align:center;">
            <div style="font-size:56px;">${emoji}</div>
            <div style="font-size:24px;font-weight:800;margin:10px 0;">${text}</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0;">
                <div style="background:#4361ee;color:white;padding:10px;border-radius:10px;"><div style="font-size:22px;">${total}</div><div style="font-size:10px;">Всего</div></div>
                <div style="background:#2ecc71;color:white;padding:10px;border-radius:10px;"><div style="font-size:22px;">${correct}</div><div style="font-size:10px;">✅</div></div>
                <div style="background:#e74c3c;color:white;padding:10px;border-radius:10px;"><div style="font-size:22px;">${wrong}</div><div style="font-size:10px;">❌</div></div>
                <div style="background:#f39c12;color:white;padding:10px;border-radius:10px;"><div style="font-size:22px;">${gameState.bestStreak}</div><div style="font-size:10px;">🔥</div></div>
            </div>
            <div style="font-size:22px;font-weight:700;color:${modeColor};">${percent}%</div>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;">
                <button onclick="startReviewGame('${gameState.mode}')" style="background:${modeColor};color:white;border:none;padding:10px 24px;border-radius:50px;font-size:14px;cursor:pointer;">🔄 Снова</button>
                <button onclick="startReviewGame('${gameState.mode === 'visual' ? 'audio' : 'visual'}')" style="background:#764ba2;color:white;border:none;padding:10px 24px;border-radius:50px;font-size:14px;cursor:pointer;">🔄 Режим</button>
                <button onclick="renderReviewPanel()" style="background:#666;color:white;border:none;padding:10px 24px;border-radius:50px;font-size:14px;cursor:pointer;">📊 Список</button>
            </div>
            
            <!-- ЛОГ -->
            <div style="margin-top:16px;padding:12px;background:#f8f9fa;border-radius:12px;border:1px solid #e0e7ff;max-height:150px;overflow-y:auto;font-size:12px;text-align:left;">
                <div style="font-weight:700;color:#4361ee;margin-bottom:6px;font-size:13px;">📋 Лог игры</div>
                <div id="gameLogContainer"></div>
            </div>
        </div>
    `;
    gameState.isActive = false;
    updateGameLogDisplay();
}

// ==================== ОЗВУЧКА ====================

function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
}

// ==================== ОЧИСТКА ====================

function clearAllReview() {
    if (!confirm('Удалить все слова из повторения?')) return;
    localStorage.removeItem(REVIEW_KEY);
    localStorage.removeItem(REVIEW_RADICALS_KEY);
    showToast('✅ Очищено!', 'success');
    renderReviewPanel();
}

// ==================== ДОБАВЛЕНИЕ ВКЛАДКИ ====================

function addReviewTab() {
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer || tabsContainer.querySelector('[data-tab="review"]')) return;
    
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

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addReviewTab, 300);
});

console.log('🧠 Модуль повторения загружен!');
