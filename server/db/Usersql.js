var UserSQL = {
  queryAll: 'SELECT * FROM USER ORDER BY id DESC',
  queryLoginUser: 'SELECT * FROM USER WHERE userName=? AND userPsd=?',
  addUser: 'INSERT INTO USER(userName, userPsd) VALUES (?, ?)',
  addUser2: 'INSERT INTO USER(userName, userPsd, sex, phone, idCard, registrDate, userLevel) VALUES (?, ?, ?, ?, ?, ?, ?)',
  addUserBorrow: 'INSERT INTO USERBORROWING(uid, bookName, bookAuthor, bookType, bookImageUrl, bookInventory, bookDate, bookScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  updateUser: 'UPDATE USER SET userName=?, userPsd=?, sex=?, phone=?, idCard=? WHERE id=?',
  deleteUser: 'DELETE FROM USER WHERE id=?',
  queryUserBorrowingList: 'SELECT * FROM USERBORROWING WHERE uid=? ORDER BY id DESC',
  queryUserBorrowHistoryList: 'SELECT * FROM USERBORROWHISTORY WHERE uid=? ORDER BY id DESC'
}

module.exports = UserSQL
