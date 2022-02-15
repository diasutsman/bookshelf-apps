function isStorageExist() /*: Boolean */ {
    if (typeof Storage === 'undefined') {
        alert('Browser tidak mendukung local storage')
        return false
    }
    return true
}

function saveBook() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
    document.dispatchEvent(new Event('onbooksaved'))
}

function loadBookFromStorage() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (data) books = data
    document.dispatchEvent(new Event('ondataloaded'))
}

function updateBookToStorage() {
    if (isStorageExist()) saveBook()
}

function composeBookToObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    }
}

function findBookById(bookId) {
    return books.find(({
        id
    }) => id == bookId) || null
}

function refreshBookFromBooks(booksParam = books) {
    // empty the lists
    listCompletedBooks.innerHTML = ''
    listIncompletedBooks.innerHTML = ''
    booksParam.forEach(({
        id,
        title,
        author,
        year,
        isComplete
    }) => {
        const newBook = makeBookItem(title, author, year, isComplete)
        newBook.id = id;
        getList(isComplete).append(newBook)
    })
}

function findBookIndexById(bookId) {
    return books.findIndex(({
        id
    }) => id == bookId)
}