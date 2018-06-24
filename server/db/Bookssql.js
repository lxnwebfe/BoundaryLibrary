var BooksSQL = {
  queryAll: 'SELECT * FROM BOOKS ORDER BY id DESC',
  addBooks: 'INSERT INTO BOOKS(bookName, bookAuthor, bookType, bookImageUrl, bookInventory, bookDate, press, unitPrice, bookDescription,authorDescription, bookScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)',
  updateBooks: 'UPDATE BOOKS SET bookName=?, bookAuthor=?, bookType=?, bookImageUrl=?, bookInventory=?, bookDate=?, press=?, unitPrice=?, bookDescription=?, authorDescription=? WHERE id=?',
  deleteBooks: 'SET FOREIGN_KEY_CHECKS = 0; DELETE FROM BOOKS WHERE id=?; DELETE FROM BOOKDETAILS WHERE bookId=?; SET FOREIGN_KEY_CHECKS = 1'
}

module.exports = BooksSQL
