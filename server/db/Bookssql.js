var BooksSQL = {
  queryAll: 'SELECT * FROM BOOKS',
  addBooks: 'INSERT INTO BOOKS(bookName, bookAuthor, bookType, bookImageUrl, bookInventory, bookDate, bookScore) VALUES (?, ?, ?, ?, ?, ?, 0)'
}

module.exports = BooksSQL
