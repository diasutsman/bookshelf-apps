const listIncompletedBooks = document.getElementById('incompleteBookshelfList')
const listCompletedBooks = document.getElementById('completeBookshelfList')

document.getElementById('inputBook').addEventListener('submit', ev => {
    ev.preventDefault()
    addBook()
})

function addBook() {
    const title = document.getElementById('inputBookTitle').value
    const author = document.getElementById('inputBookAuthor').value
    const year = document.getElementById('inputBookYear').value
    const isComplete = document.getElementById('inputBookIsComplete').checked

    //making elements
    //const button = document.createElement('button')
    //button.classList.add('green')
    //button.innerText = `${isComplete? 'Belum ' : ''}selesai di Baca`
    //button.addEventListener('click', function () {
    //    console.log(this)
    //})
    const e = `
    <article class="book_item">
        <h3>${title}</h3>
        <p>Penulis: ${author}</p>
        <p>Tahun: ${year}</p>
        <div class="action">
            <button class="green">${isComplete? 'Belum ' : ''}selesai di Baca</button>
            <button class="red">Hapus buku</button>
        </div>
    </article>
    `
    ;(isComplete? listCompletedBooks : listIncompletedBooks).innerHTML += e
    attachClickEvent()
}

function deleteBook() {

}

function toggleCompleteness() {
    
}

function searchBook(query) {
    
}

function makeBookItem(title, author, year, isComplete) {
    const bookItem = document.createElement('article')
    bookItem.classList.add('book_item')

    const h3Title = document.createElement('h3')
    h3Title.innerText = title

    const pAuthor = document.createElement('p')
    pAuthor.innerText = `Penulis: ${author}`
    
    const pYear = document.createElement('p')
    pYear.innerText = `Tahun: ${year}`

    
}