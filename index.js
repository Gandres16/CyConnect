document.addEventListener('DOMContentLoaded', function() {
    loadIndex();
});

function loadIndex() {
    fetch("./data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        displayPosts(data.posts);
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}

function displayPosts(posts) {
    const flashSalesContainer = document.getElementById("postsContainer");
    if (!flashSalesContainer) {
        console.error("posts container element not found in the DOM.");
        return;
    }
    flashSalesContainer.innerHTML = '';

    let row = createRow();

    posts.forEach((post, index) => {
        if (index > 0 && index % 1 === 0) {
            flashSalesContainer.appendChild(row);
            row = createRow();
        }

        const col = createColumn();
        const card = createCard(post);

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
    col.className = "col";
    return col;
}

function createCard(post) {
    const card = document.createElement("div");
    card.className = "card h-100";

    if (post.img) {
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = post.img;
        img.alt = post.title || 'Post Image';
        card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = post.username || '';
    cardBody.appendChild(title);

    const subtitle = document.createElement("h5");
    subtitle.className = "card-subtitle";
    subtitle.textContent = post.caption || '';
    cardBody.appendChild(subtitle);

    const time = document.createElement("p");
    time.className = "card-text";
    time.textContent = post.time || '';
    cardBody.appendChild(time);

    card.appendChild(cardBody);

    return card;
}