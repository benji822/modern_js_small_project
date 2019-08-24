// Book Construtor
function Book(title, author, ibsn) {
    this.title = title;
    this.author = author;
    this.ibsn = ibsn;
}

// UI Construtor
function UI() {}

UI.prototype.addBookToList = function(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ibsn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
};

UI.prototype.clearField = function() {
    const field = document.querySelectorAll('input[type="text"]');
    field.forEach(function(x) {
        x.value = "";
    });
};

UI.prototype.deleteList = function(target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
};

UI.prototype.showAlertMsg = function(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector(".alert").remove();
    }, 1000);
};

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
        ui.showAlertMsg("Book has added in list", "success");
        ui.clearField();
    }

    e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", function(e) {
    const ui = new UI();

    ui.deleteList(e.target);
    ui.showAlertMsg("Book removed", "success");

    e.preventDefault();
});
