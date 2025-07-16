const container = document.querySelector('.content');
const controls = document.createElement('div');
controls.classList.add('controls');
document.body.appendChild(controls);

let currentUrl = 'https://rickandmortyapi.com/api/location';

async function loadLocations(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showLocations(data.results);
        updateControls(data.info);
    } catch (error) {
        container.innerHTML = '<p style="color:red;">Error loading locations.</p>';
        console.error(error);
    }
}

function showLocations(locations) {
    container.innerHTML = '';

    locations.forEach(location => {
        const card = document.createElement('div');
        card.classList.add('character-card');

        // Контейнер аватарок мешканців
        const residentsAvatars = document.createElement('div');
        residentsAvatars.classList.add('residents-container');

        // Відображаємо максимум 6 аватарок (парних)
        location.residents.slice(0, 6).forEach(residentUrl => {
            fetch(residentUrl)
                .then(res => res.json())
                .then(resident => {
                    const img = document.createElement('img');
                    img.src = resident.image;
                    img.alt = resident.name;
                    img.title = resident.name;
                    img.classList.add('resident-avatar');
                    residentsAvatars.appendChild(img);
                })
                .catch(() => {
                    // Якщо помилка завантаження аватарки - можна пропустити
                });
        });

        card.innerHTML = `
            <div class="character-info">
                <h3>${location.name}</h3>
                <p><strong>Type:</strong> ${location.type}</p>
                <p><strong>Dimension:</strong> ${location.dimension}</p>
                <p><strong>Residents count:</strong> ${location.residents.length}</p>
            </div>
        `;

        card.appendChild(residentsAvatars);
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
            currentUrl = `https://rickandmortyapi.com/api/location?page=${pageNumber}`;
            loadLocations(currentUrl);
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

// Старт
loadLocations(currentUrl);