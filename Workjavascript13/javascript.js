const [...allInputsFromPizza] = document.querySelectorAll("#pizza input");
const ingridients = document.querySelector(".ingridients");
const pizza = {
    cacke: {},
    sauces: [],
    toppings: [],
    price: 0
};
const sauce = document.getElementById("sauce");
const topping = document.getElementById("topping");
const cacke = document.querySelector(".table");

allInputsFromPizza.forEach(function (input) {
    input.addEventListener("click", (event) => {
        if (event.target.id === "small") {
            pizza.cacke.price = 56.32;
            pizza.cacke.type = event.target.id;
        } else if (event.target.id === "mid") {
            pizza.cacke.price = 89.34;
            pizza.cacke.type = event.target.id;
        } else if (event.target.id === "big") {
            pizza.cacke.price = 105;
            pizza.cacke.type = event.target.id;
        } else {
            throw new Error("Вы укразли какой-то другой корж");
        }
        count(pizza);
        showPrice(pizza.price);
    });
});

ingridients.addEventListener("click", (e) => {
    if (pizza.cacke.price === undefined) {
        showError("Вы дожны сначала выбрать кож и только потом Вы можете выбрать ингридитенты");
        return;
    }
    if (e.target.id === "sauceClassic") {
        pizza.sauces.push({
            price: 78.43,
            type: "Кетчуп",
            img: e.target.src
        });
    } else if (e.target.id === "sauceBBQ") {
        pizza.sauces.push({
            price: 99.43,
            type: "BBQ",
            img: e.target.src
        });
    } else if (e.target.id === "sauceRikotta") {
        pizza.sauces.push({
            price: 120.94,
            type: "Рiкотта",
            img: e.target.src
        });
    } else if (e.target.id === "moc1") {
        pizza.toppings.push({
            price: 54,
            type: "Сир звичайний",
            img: e.target.src
        });
    } else if (e.target.id === "moc2") {
        pizza.toppings.push({
            price: 98,
            type: "Сир фета",
            img: e.target.src
        });
    } else if (e.target.id === "moc3") {
        pizza.toppings.push({
            price: 125.94,
            type: "Моцарелла",
            img: e.target.src
        });
    } else if (e.target.id === "telya") {
        pizza.toppings.push({
            price: 111,
            type: "Телятина",
            img: e.target.src
        });
    } else if (e.target.id === "vetch1") {
        pizza.toppings.push({
            price: 94,
            type: "Помiдори",
            img: e.target.src
        });
    } else if (e.target.id === "vetch2") {
        pizza.toppings.push({
            price: 94,
            type: "Гриби",
            img: e.target.src
        });
    }

    rerenderPizza();
});

function rerenderPizza() {
    sauce.innerHTML = "";
    topping.innerHTML = "";
    cacke.innerHTML = `<img src="Pizza_pictures/klassicheskij-bortik_1556622914630.png" alt="Корж класичний">`;

    pizza.sauces.forEach(sauceItem => {
        addTopping(sauceItem.img);
    });
    renderSauceCounts();

    pizza.toppings.forEach((toppingItem, index) => {
        addTopping(toppingItem.img);
        addTextTopping(toppingItem.type, index);
    });

    count(pizza);
    showPrice(pizza.price);
}

function renderSauceCounts() {
    const counts = pizza.sauces.reduce((acc, sauce) => {
        acc[sauce.type] = (acc[sauce.type] || 0) + 1;
        return acc;
    }, {});

    const sauceDiv = document.getElementById("sauce");
    sauceDiv.innerHTML = "";

    for (const [type, count] of Object.entries(counts)) {
        const span = document.createElement("span");
        span.classList.add("new-topping");
        span.textContent = `${type} ×${count}`;

        const deleteIcon = document.createElement("span");
        deleteIcon.innerText = "❌";
        deleteIcon.style.cursor = "pointer";
        deleteIcon.onclick = () => {
            pizza.sauces = pizza.sauces.filter(sauce => sauce.type !== type);
            rerenderPizza();
        };
        span.append(deleteIcon);

        sauceDiv.append(span);
    }
}

function addTopping(src) {
    const img = document.createElement("img");
    img.src = src;
    cacke.append(img);
}

function addTextTopping(name, index) {
    const newTopping = document.createElement("span");
    newTopping.classList.add("new-topping");
    newTopping.innerText = name;

    const deleteIcon = document.createElement("span");
    deleteIcon.innerText = "❌";
    deleteIcon.style.cursor = "pointer";

    deleteIcon.onclick = () => {
        pizza.toppings.splice(index, 1);
        rerenderPizza();
    };

    newTopping.append(deleteIcon);
    topping.append(newTopping);
}

function count(pizza) {
    let full_price = 0;
    full_price += pizza.cacke.price || 0;
    full_price += pizza.sauces.reduce((a, c) => a + c.price, 0);
    full_price += pizza.toppings.reduce((a, c) => a + c.price, 0);
    pizza.price = full_price;
    return pizza;
}

function showPrice(price = 0) {
    document.getElementById("price").innerText = price.toFixed(2);
}

function showError(text = "У Вас возникла какая-то плохая ситуацыя 😭") {
    const error_modal = document.querySelector(".error_modal");
    const textSpan = document.querySelector("#error-text");
    textSpan.innerText = text;
    error_modal.classList.add("show");
    setTimeout(() => {
        error_modal.classList.remove("show");
    }, 5000);
}
document.getElementById("btnSubmit").addEventListener("click", () => {
  // Тут можна додати перевірку або інші дії перед переходом

  // Переадресація на index.html
  window.location.href = "index2.html";
});
showPrice();