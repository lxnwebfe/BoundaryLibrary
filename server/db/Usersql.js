var UserSQL = {
  queryAll: 'SELECT * FROM USER',
  queryUser: 'SELECT * FROM USER WHERE userName = ? AND userPsd = ?',
  addUser: 'INSERT INTO USER(userName, userPsd, userLevel) VALUES (?, ?, 1)',
  addUserBorrow: 'INSERT INTO USERBORROWING(uid, bookName, bookAuthor, bookType, bookImageUrl, bookInventory, bookDate, bookScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
}

module.exports = UserSQL
