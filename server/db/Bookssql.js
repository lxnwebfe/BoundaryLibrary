var BooksSQL = {
  queryAll: 'SELECT * FROM BOOKS ORDER BY id DESC',
  addBooks: 'INSERT INTO BOOKS(bookName, bookAuthor, bookType, bookImageUrl, bookInventory, bookDate, press, unitPrice bookScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)',
  updateBooks: 'UPDATE BOOKS SET bookName=?, bookAuthor=?, bookType=?, bookImageUrl=?, bookInventory=?, bookDate=?, press=?, unitPrice=? WHERE id=?',
  deleteBooks: 'DELETE FROM BOOKS WHERE id=?'
}

module.exports = BooksSQL
