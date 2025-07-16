const container = document.querySelector('.content');

const controls = document.createElement('div');
controls.classList.add('controls');
document.body.appendChild(controls);

let currentUrl = 'https://rickandmortyapi.com/api/character';

async function loadCharacters(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Отримуємо персонажів
        const characters = data.results;

        // Для кожного персонажа отримуємо перший епізод (перший URL з масиву episode)
        for (const character of characters) {
            if (character.episode.length > 0) {
                const epRes = await fetch(character.episode[0]);
                character.firstEpisode = await epRes.json();
            } else {
                character.firstEpisode = null;
            }
        }

        showCharacters(characters);
        updateControls(data.info);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        container.innerHTML = `<p style="color:red;">Ошибка загрузки данных</p>`;
    }
}

function showCharacters(characters) {
    container.innerHTML = '';

    characters.forEach(character => {
        const firstEp = character.firstEpisode;
        const firstEpisodeHtml = firstEp
            ? `<p style="text-align: right;"><strong>First seen in:</strong><br>${firstEp.episode} - ${firstEp.name}</p>`
            : `<p style="text-align: right;"><strong>First seen in:</strong><br>Unknown</p>`;

        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <h3>${character.name}</h3>
                <div class="status">
                    <span class="status-icon ${getStatusClass(character.status)}"></span>
                    ${character.status} - ${character.species}
                </div>
                <p><strong>Last known location:</strong><br>${character.location.name}</p>
                ${firstEpisodeHtml}
            </div>
        `;

        container.appendChild(card);
    });
}

function updateControls(info) {
    controls.innerHTML = '';

    const totalPages = info.pages;
    const currentPage = getCurrentPage(currentUrl);

    const firstBtn = createPageButton(1, currentPage);
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const prevBtn = createPageButton(prevPage, currentPage);

    const currentBtn = document.createElement('button');
    currentBtn.innerText = currentPage;
    currentBtn.disabled = true;

    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    const nextBtn = createPageButton(nextPage, currentPage);

    const lastBtn = createPageButton(totalPages, currentPage);

    if (currentPage > 2) controls.appendChild(firstBtn);
    if (currentPage > 1) controls.appendChild(prevBtn);
    controls.appendChild(currentBtn);
    if (currentPage < totalPages) controls.appendChild(nextBtn);
    if (currentPage < totalPages - 1) controls.appendChild(lastBtn);
}

function createPageButton(pageNumber, currentPage) {
    const btn = document.createElement('button');
    btn.innerText = pageNumber;

    if (pageNumber !== currentPage) {
        btn.addEventListener('click', () => {
            currentUrl = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;
            loadCharacters(currentUrl);
        });
    } else {
        btn.disabled = true;
    }

    return btn;
}

function getCurrentPage(url) {
    const urlObj = new URL(url);
    const page = urlObj.searchParams.get('page');
    return page ? parseInt(page) : 1;
}

function getStatusClass(status) {
    if (status === 'Alive') return 'status-alive';
    if (status === 'Dead') return 'status-dead';
    return 'status-unknown';
}

loadCharacters(currentUrl);