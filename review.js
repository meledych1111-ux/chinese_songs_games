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
        const data = localStorage
