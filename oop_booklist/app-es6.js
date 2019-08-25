class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    clearField() {
        const field = document.querySelectorAll('input[type="text"]');
        field.forEach(function(x) {
            x.value = "";
        });
    }

    deleteList(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    showAlertMsg(msg, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, 1000);
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new UI();

            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(target) {
        const books = Store.getBooks();

        books.forEach((book, idx) => {
            if (book.isbn === target) {
                books.splice(idx, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Even listerner
document.getElementById("book-form").addEventListener("submit", function(e) {
    const title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if (title === "" || author === "" || isbn === "") {
        ui.showAlertMsg("Please enter valid info for book", "error");
    } else {
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlertMsg("Book has added in list", "success");
        ui.clearField();
    }

    e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function(e) {
    const ui = new UI();
    if (e.target.className === "delete") {
        ui.deleteList(e.target);
        Store.removeBook(
            e.target.parentElement.previousElementSibling.textContent
        );
        ui.showAlertMsg("Book removed", "success");
    }

    e.preventDefault();
});
