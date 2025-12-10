// --- ЗАВДАННЯ 3: Масив даних для генерації розмітки ---
const skillsData = [
    { name: "Adobe Photoshop", rating: "★★★★☆" },
    { name: "Adobe Illustrator", rating: "★★★★☆" },
    { name: "Microsoft Word", rating: "★★★★☆" },
    { name: "Microsoft Powerpoint", rating: "★★★★☆" },
    { name: "HTML5 / CSS3", rating: "★★★★★" },
    { name: "JavaScript", rating: "★★★★☆" },
    { name: "Gulp / Webpack", rating: "★★★☆☆" },
    { name: "Git / Version Control", rating: "★★★★☆" }
];


// --- ЗАВДАННЯ 3: Функція генерації та вставки розмітки ---
function generateDynamicSkills() {
    const container = document.getElementById('dynamicSkillsContainer');

    if (!container) return;

    // 1. Очистити вміст контейнера перед вставленням
    container.innerHTML = '';

    // 2. Генерувати розмітку
    let htmlContent = '';
    skillsData.forEach(skill => {
        // Створення HTML-розмітки на основі даних масиву
        htmlContent += `
            <li>
                ${skill.name} <span class="rating">${skill.rating}</span>
            </li>
        `;
    });

    // 3. Вставити розмітку
    container.innerHTML = htmlContent;
}


// --- ЗАВДАННЯ 2: Функція для перемикання видимості та стрілок ---
function initCollapsibleBlocks() {
    // Обираємо всі заголовки з класом "section-header"
    const headers = document.querySelectorAll('.section-header');

    headers.forEach(header => {
        // 1. Створюємо та додаємо піктограму-стрілку (▼)
        const arrow = document.createElement('span');
        arrow.textContent = '▼';
        arrow.className = 'collapse-arrow';
        header.appendChild(arrow);

        // Знаходимо контент, який потрібно згортати (він знаходиться у .collapsible-content)
        const content = header.closest('section').querySelector('.collapsible-content');

        // 2. Прив'язуємо обробник події click
        header.addEventListener('click', () => {
            if (content) {
                // • Перемикає видимість контенту
                content.classList.toggle('content-hidden');

                // • Змінює орієнтацію стрілки
                arrow.classList.toggle('arrow-rotated');
            }
        });
    });
}


// --- Головний виклик: Запуск функцій після завантаження документа ---
document.addEventListener('DOMContentLoaded', () => {

    // --- ЗАВДАННЯ 1: Підстановка імені користувача ---
    const fullName = "NOEL T.GATES"; // Ім'я для підстановки
    const nameElement = document.getElementById('personName');

    if (nameElement) {
        // Запис у текстовий вміст елемента (без вставлення HTML)
        nameElement.textContent = fullName;
    }

    // Виклик функцій для завдань 2 та 3
    generateDynamicSkills(); // Спочатку генеруємо вміст
    initCollapsibleBlocks(); // Потім додаємо для нього функцію згортання
});