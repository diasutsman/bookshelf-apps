function addBook() {
    const title = fieldTitle.value
    const author = document.getElementById('inputBookAuthor').value
    const year = document.getElementById('inputBookYear').value
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const bookObject = composeBookToObject(title, author, year, isComplete)
    const bookItem = makeBookItem(title, author, year, isComplete)
    bookItem.id = bookObject.id
    books.push(bookObject);
    getList(isComplete).append(bookItem)
    saveBook()

    // form reset
    resetForm()
}

function deleteBook(bookItem) {
    const bookObject = findBookById(bookItem.id)
    console.log(findBookIndexById(bookItem.id))
    if (confirm(`Yakin mau menghapus buku dengan judul "${bookObject.title}"?`)) {
        alert(`Buku dengan judul "${bookObject.title}" sudah di hapus`)
        books.splice(findBookIndexById(bookItem.id), 1)
        bookItem.remove()
        refreshBookFromBooks()
        updateBookToStorage()
    } else {
        alert(`Buku dengan judul "${bookObject.title}" tidak jadi dihapus`)
    }
}

function editBook(bookItem) {
    // get the position of book item
    let offset = bookItem.getBoundingClientRect().top - document.body.getBoundingClientRect().top;

    // lock the web scroll
    document.getElementsByTagName('html')[0].style.overflowY = 'hidden'

    const bookObject = findBookById(bookItem.id)

    // remove the book item in dom
    bookItem.remove()

    // fill the book form with book object from the clicked book item
    fieldTitle.value = bookObject.title
    fieldAuthor.value = bookObject.author
    fieldYear.value = bookObject.year
    fieldIsComplete.checked = bookObject.isComplete

    // adjust the book form text
    bookSubmit.innerText = 'Edit Buku'
    inputBook.previousElementSibling.innerText = 'Edit Buku Yang di pilih'

    // scroll to top
    window.scrollTo(0, 0)

    // remove the add functionality in submit button
    inputBook.removeEventListener('submit', addBookCallback)

    // replace it with edit functionality
    inputBook.addEventListener('submit', editBookCallback)

    function editBookCallback(e) {
        // prevent form refresh
        e.preventDefault()

        // replace the book object field with the data from the form
        bookObject.title = fieldTitle.value
        bookObject.author = fieldAuthor.value
        bookObject.year = fieldYear.value
        bookObject.isComplete = fieldIsComplete.checked

        // bring back the add book text hint
        inputBook.previousElementSibling.innerText = 'Masukkan Buku Baru'
        bookSubmitBtn.innerHTML = `Masukkan Buku ke rak <span>Belum selesai dibaca</span`

        // save the book changes
        saveBook()

        // refresh book lists
        document.dispatchEvent(new Event('ondataloaded'))

        // remove the edit book functionality
        inputBook.removeEventListener('submit', editBookCallback)

        // and bring back add book functionality
        inputBook.addEventListener('submit', addBookCallback);

        // reset form
        resetForm()

        // scroll to book item position
        scrollTo(0, offset)

        // unlock the web scroll
        document.getElementsByTagName('html')[0].style.overflowY = 'overlay'
    }
}

function toggleCompleteness(bookItem) {
    const bookObject = findBookById(bookItem.id)
    const {
        title,
        author,
        year,
        isComplete
    } = bookObject
    const newBookItem = makeBookItem(title, author, year, !isComplete)
    bookObject.isComplete = !isComplete
    newBookItem.id = bookObject.id
    bookItem.remove()
    getList(!isComplete).append(newBookItem)
    saveBook()
}

function searchBook(query) {
    listCompletedBooks.innerHTML = ''
    listIncompletedBooks.innerHTML = ''
    refreshBookFromBooks(books.filter(({
        title
    }) => title.toLowerCase().includes(query.toLowerCase())))
}

function makeBookItem(title, author, year, isComplete) {
    const bookItem = htmlstringToHtmlElement('<article class="book_item"></article>')
    const divAction = htmlstringToHtmlElement('<div class="action"></div>')

    const btnGreen = htmlstringToHtmlElement(`<button class="green">${isComplete? 'Belum ' : ''}selesai di Baca</button>`)
    btnGreen.addEventListener('click', e => toggleCompleteness(e.target.parentElement.parentElement))

    const btnYellow = htmlstringToHtmlElement(`<button class="yellow">Edit buku</button>`)
    btnYellow.addEventListener('click', e => editBook(e.target.parentElement.parentElement))

    const btnRed = htmlstringToHtmlElement(`<button class="red">Hapus buku</button>`)
    btnRed.addEventListener('click', e => deleteBook(e.target.parentElement.parentElement))


    divAction.append(
        btnGreen,
        btnYellow,
        btnRed
    )

    bookItem.append(
        htmlstringToHtmlElement(`<h3>${title}</h3>`),
        htmlstringToHtmlElement(`<p>Penulis: ${author}</p>`),
        htmlstringToHtmlElement(`<p>Tahun: ${year}</p>`),
        divAction
    )

    return bookItem
}

function htmlstringToHtmlElement(htmlstring) {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlstring
    return tempDiv.firstElementChild
}

function getList(isComplete) {
    return isComplete ? listCompletedBooks : listIncompletedBooks
}

function resetForm() {
    inputBook.reset()
    bookSubmitBtn.firstElementChild.innerText = 'Belum selesai dibaca'
    inputBook.blur()
}