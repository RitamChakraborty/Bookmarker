// Listen to submit
const form = document.getElementById('form');
form.addEventListener("submit", validate);

// Initialized required parameters
const website_name_input = document.getElementById("name");
const website_url_input = document.getElementById("url");
const article = document.getElementsByTagName('article')[0];

// List out all the book marks
listBookmarks();

function validate(ev) {
    ev.preventDefault();
    const name = website_name_input.value;
    const url = website_url_input.value;

    // Object will store the value of the current bookmark
    const bookmark = {
        name: name,
        url: url
    };

    // Adding the new bookmark to the local storage
    addToLocalStorage(bookmark);

    // Clear everything from article tag
    article.innerHTML = "<div style=\"margin: 16px\"></div>";

    // List bookmarks again after adding a new one
    listBookmarks();
}

function addToLocalStorage(bookmark) {
    if (localStorage.getItem('bookmarks') === null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        const bookmarksString = JSON.stringify(bookmarks);
        // console.log(bookmarksString);

        // Adding value to Local Storage
        localStorage.setItem('bookmarks', bookmarksString);
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Check if you already have that bookmark
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i]['name'] === bookmark['name']) {
                alert("Bookmark already exists");
                return;
            }
        }

        bookmarks.push(bookmark);
        const bookmarksString = JSON.stringify(bookmarks);

        // Adding new value to Local Storage
        localStorage.setItem('bookmarks', bookmarksString);
    }
}

function listBookmarks() {
    article.innerHTML = '<div style="margin: 16px"></div>';

    if (localStorage.getItem('bookmarks') !== null) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        for (let i = 0; i < bookmarks.length; i++) {
            const bookmark = bookmarks[i];
            const name = bookmark['name'];
            const url = bookmark['url'];

            // span will contain the header
            const span = document.createElement('span');
            span.innerText = name;
            span.className = "website-name-header";

            // Adding both buttons to a table
            const table = document.createElement('table');
            table.innerHTML = '<tr><td><button class="visit-button" onclick="visitButtonOnClick(event)" >Visit</button></td><td><button class="delete-button" onclick="deleteButtonOnClick(event)">Delete</button></td></tr>';

            // Container is the newly created bookmark
            const container = document.createElement('div');
            container.className = "container";
            container.appendChild(span);
            container.appendChild(table);

            // Adding the container to the article as a new list item
            article.appendChild(container);
        }
    }
}

// Handle click event for visit-button
function visitButtonOnClick(ev) {
    const name = getElement(ev);

    // Get all the bookmarks
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (let i = 0; i < bookmarks.length; i++) {
        const bookmark = bookmarks[i];

        // When the name is same, then get the url
        if (name === bookmark['name']) {
            const url = bookmark['url'];

            // Open the url
            window.open(url);
        }
    }
}

// Handle click event for delete-button
function deleteButtonOnClick(ev) {
    const name = getElement(ev);

    // Get all the bookmarks;
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let bookmark = null;

    for (let i = 0; i < bookmarks.length; i++) {
        bookmark = bookmarks[i];

        if (name === bookmark['name']) {
            break;
        }
    }

    // Temp array to store modified bookmark list
    var newBookmarks = [];

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i] !== bookmark) {
            newBookmarks.push(bookmarks[i]);
        }
    }

    // Convert the array to a string
    const bookmarksString = JSON.stringify(newBookmarks);

    // Add new bookmarks to the local-storage
    localStorage.setItem('bookmarks', bookmarksString);

    // Show the modified bookmark list
    listBookmarks();

}

// Get the name of the website from the button
function getElement(ev) {
    const parent = ev.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    const span = parent.children[0];
    return span.innerHTML;
}