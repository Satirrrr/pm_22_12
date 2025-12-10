
/**
 * Генерує розмітку досвіду роботи на основі масиву даних.
 * @param {Array} jobs - Масив об'єктів досвіду роботи.
 */
function generateJobExperience(jobs) {
    const container = document.querySelector('#jobExperienceContainer .collapsible-content');

    if (!container) return;

    // Очистити вміст контейнера перед вставленням
    container.innerHTML = '';

    let htmlContent = '';
    jobs.forEach(job => {
        htmlContent += `
            <div class="timeline-item mt-3">
                <h6>${job.title} <span class="text-primary">${job.years}</span></h6>
                <p class="small text-muted">${job.company}</p>
                <p class="small">${job.description}</p>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}


/**
 * Генерує розмітку навичок на основі масиву даних.
 * @param {Array} skills - Масив об'єктів навичок.
 */
function generateDynamicSkills(skills) {
    const container = document.getElementById('dynamicSkillsContainer');

    if (!container) return;

    // Очистити вміст контейнера перед вставленням
    container.innerHTML = '';

    let htmlContent = '';
    skills.forEach(skill => {
        htmlContent += `
            <li>
                ${skill.name} <span class="rating">${skill.rating}</span>
            </li>
        `;
    });

    container.innerHTML = htmlContent;
}


/**
 * Ініціалізація блоків, що згортаються/розгортаються.
 */
function initCollapsibleBlocks() {
    const headers = document.querySelectorAll('.section-header');

    headers.forEach(header => {
        // код ініціалізації стрілки та обробника кліку
        const arrow = document.createElement('span');
        arrow.textContent = '▼';
        arrow.className = 'collapse-arrow';
        header.appendChild(arrow);

        const content = header.closest('section').querySelector('.collapsible-content');

        header.addEventListener('click', () => {
            if (content) {
                content.classList.toggle('content-hidden');
                arrow.classList.toggle('arrow-rotated');
            }
        });
    });
}


//ОСНОВНА ФУНКЦІЯ AJAX

/**
 * Завантаження та обробка JSON-даних.
 */
async function loadDataAndPopulate() {

    const dataPath = 'data.json';

    try {
        const response = await fetch(dataPath);

        // Перевіряємо, чи успішна відповідь (код 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Заміна захардкодженних значень на дані з JSON

        // 1. Підстановка повного імені (firstName + lastName)
        const fullName = `${data.person.firstName} ${data.person.lastName}`;
        const nameElement = document.getElementById('personName');
        if (nameElement) {
            nameElement.textContent = fullName;
        }

        // 2. Підстановка посади
        const positionElement = document.querySelector('.position');
        if (positionElement) {
            positionElement.textContent = data.person.position;
        }

        // 3. Побудова списків: Skills
        generateDynamicSkills(data.skills);

        // 4. Побудова списків: Job Experience
        generateJobExperience(data.jobExperience);


    } catch (error) {
        // Відображення короткого службового повідомлення у разі помилки
        console.error('Failed to load JSON data:', error);
        alert('Помилка завантаження даних (JSON). Перевірте, чи запущено локальний сервер.');
    } finally {
        initCollapsibleBlocks();
    }
}


document.addEventListener('DOMContentLoaded', loadDataAndPopulate);