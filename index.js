document.addEventListener('DOMContentLoaded', function() {
    loadAbout();
});

function loadAbout() {
    fetch("./data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        displayUs(data.about);
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}

function displayUs(us) {
    const flashSalesContainer = document.getElementById("aboutContainer");
    if (!flashSalesContainer) {
        console.error("About us container element not found in the DOM.");
        return;
    }
    flashSalesContainer.innerHTML = '';

    let row = createRow();

    us.forEach((person, index) => {

        const col = createColumn();
        const card = createCard(person);

        col.appendChild(card);
        row.appendChild(col); 
    });

    if (row.hasChildNodes()) {
        flashSalesContainer.appendChild(row);
    }
}

function createRow() {
    const row = document.createElement("div");
    row.className = "row";
    return row;
}

function createColumn() {
    const col = document.createElement("div");
    col.className = "col-4";
    return col;
}

function createCard(us) {
    const card = document.createElement("div");
    card.className = "card h-100";

    if (us.img) {
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = us.img;
        img.alt = us.title || 'Person Image';
        card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = us.title || '';
    cardBody.appendChild(title);

    const subtitle = document.createElement("h5");
    subtitle.className = "card-subtitle";
    subtitle.textContent = us.subtitle || '';
    cardBody.appendChild(subtitle);

    const desc = document.createElement("p");
    desc.className = "card-text";
    desc.textContent = us.description;
    cardBody.appendChild(desc);

    // if (us.price) {
    //     const price = document.createElement("p");
    //     price.className = "card-text";
    //     price.textContent = '';
    //     cardBody.appendChild(price);
    // }

    card.appendChild(cardBody);

    return card;
}