const req = async (url) => {
    const data = await fetch(url);
    return data.json()
};


req("https://rickandmortyapi.com/api")
.then((navigation) => {
    createNavigationMenu(navigation)
})

const createNavigationMenu = (navigation) => {
    const navigationData = Object.entries(navigation);
    if(!Array.isArray(navigationData) && navigationData.length <= 0) return;

   const links =  navigationData.map(([key, value]) => {
        const nav = document.createElement("a");
        nav.href = `./${key}`;
        nav.innerText = key;
        nav.dataset.url = value;
        nav.classList.add("btn");

        return nav
    });
    
    document.querySelector(".navigation_btn").append(...links)
}
