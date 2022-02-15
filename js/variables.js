// DOM
const fieldTitle = document.getElementById('inputBookTitle')
const fieldAuthor = document.getElementById('inputBookAuthor')
const fieldYear = document.getElementById('inputBookYear')
const fieldIsComplete = document.getElementById('inputBookIsComplete')
const bookSubmitBtn = document.getElementById('bookSubmit')
const inputBook = document.getElementById('inputBook')
const searchBookBox = document.getElementById('searchBookTitle')

// data
let books = []
const STORAGE_KEY = "BOOKSHELF_APPS"
const listIncompletedBooks = document.getElementById('incompleteBookshelfList')
const listCompletedBooks = document.getElementById('completeBookshelfList')
const BOOK_ID = 'bookId'
const addBookCallback = ev => {
    ev.preventDefault()
    addBook()
}