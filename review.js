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
            <!-- ВЕРХНЯЯ ПАНЕЛЬ С НАВИГАЦИЕЙ -->
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:6px;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="background:${modeColor};color:white;padding:3px 14px;border-radius:16px;font-size:13px;font-weight:700;">
                        ${modeIcon} ${modeTitle}
                    </span>
                    <!-- СТРЕЛКИ НАВИГАЦИИ -->
                    <div style="display:flex;gap:4px;">
                        <button onclick="previousGameQuestion()" 
                                style="background:#666;color:white;border:none;padding:6px 12px;border-radius:12px;font-size:18px;cursor:pointer;${gameState.currentIndex === 0 ? 'opacity:0.3;cursor:not-allowed;' : ''}"
                                ${gameState.currentIndex === 0 ? 'disabled' : ''}>
                            ←
                        </button>
                        <button onclick="nextGameQuestion()" 
                                style="background:#666;color:white;border:none;padding:6px 12px;border-radius:12px;font-size:18px;cursor:pointer;${gameState.currentIndex >= gameState.total - 1 ? 'opacity:0.3;cursor:not-allowed;' : ''}"
                                ${gameState.currentIndex >= gameState.total - 1 ? 'disabled' : ''}>
                            →
                        </button>
                    </div>
                </div>
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

// === ФУНКЦИЯ ДЛЯ ПЕРЕХОДА К ПРЕДЫДУЩЕМУ ВОПРОСУ ===
function previousGameQuestion() {
    if (!gameState.isActive || gameState.currentIndex <= 0) return;
    
    gameState.currentIndex--;
    showGameCard();
}

// === ОБНОВЛЕННАЯ ФУНКЦИЯ ДЛЯ ПЕРЕХОДА К СЛЕДУЮЩЕМУ ВОПРОСУ ===
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

