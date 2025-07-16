const container = document.querySelector('.content');
const controls = document.createElement('div');
controls.classList.add('controls');
document.body.appendChild(controls);

let currentUrl = 'https://rickandmortyapi.com/api/episode';

async function loadEpisodes(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showEpisodes(data.results);
        updateControls(data.info);
    } catch (error) {
        container.innerHTML = '<p style="color:red;">Error loading episodes.</p>';
        console.error(error);
    }
}

async function showEpisodes(episodes) {
    container.innerHTML = '';

    for (const episode of episodes) {
        const card = document.createElement('div');
        card.classList.add('character-card');

        // Створюємо контейнер для аватарок персонажів
        const residentsAvatars = document.createElement('div');
        residentsAvatars.classList.add('residents-container');

        // Для кожного персонажа в епізоді — завантажуємо і додаємо аватарку
        // (Обробляємо послідовно, щоб уникнути великих навантажень)
        for (const characterUrl of episode.characters) {
            try {
                const charRes = await fetch(characterUrl);
                const character = await charRes.json();

                const img = document.createElement('img');
                img.src = character.image;
                img.alt = character.name;
                img.title = character.name;
                img.classList.add('resident-avatar');
                residentsAvatars.appendChild(img);
            } catch {
                // Якщо не вдалося завантажити персонажа — пропускаємо
            }
        }

        card.innerHTML = `
            <div class="character-info">
                <h3>${episode.name}</h3>
                <p><strong>Episode code:</strong> ${episode.episode}</p>
                <p><strong>Air date:</strong> ${episode.air_date}</p>
                <p><strong>Characters count:</strong> ${episode.characters.length}</p>
            </div>
        `;

        card.appendChild(residentsAvatars);
        container.appendChild(card);
    }
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
            currentUrl = `https://rickandmortyapi.com/api/episode?page=${pageNumber}`;
            loadEpisodes(currentUrl);
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

loadEpisodes(currentUrl);