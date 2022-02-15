inputBook.addEventListener('submit', addBookCallback)

fieldIsComplete.addEventListener('click', () => {
    if (inputBook.previousElementSibling.innerText === 'Masukkan Buku Baru') bookSubmitBtn.firstElementChild.innerText = fieldIsComplete.checked ? 'Selesai dibaca' : 'Belum selesai dibaca'
})

searchBookBox.addEventListener('keyup', () => {
    searchBook(searchBookBox.value)
})

if (isStorageExist()) {
    loadBookFromStorage()
    refreshBookFromBooks()
}

document.addEventListener('onbooksaved', () => console.log('Buku berhasil disimpan'))

document.addEventListener('ondataloaded', () => refreshBookFromBooks())