var express = require('express');
var router = express.Router();
// 导入MySql模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var booksSQL = require('../db/Bookssql');
// 创建MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 查询图书列表
router.get('/query', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(booksSQL.queryAll, function (err, result) {
      /*if(result) {
        result = {
          code: 200,
          msg:'增加成功'
        };
      }*/
     //以json形式，把操作结果返回给前台页面
     res.send(result)
     //responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
// 查询图书详情列表
router.get('/queryBookDetailsList', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(`SELECT * FROM BOOKS LEFT JOIN BOOKDETAILS ON books.id=BOOKDETAILS.bookId ORDER BY books.id DESC`, function (err, result) {
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
// 查询图书
router.get('/queryBooks', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(`SELECT * FROM BOOKS WHERE bookName LIKE "%${param.bookName}%" AND  bookAuthor LIKE "%${param.bookAuthor}%" AND bookType LIKE "%${param.bookType}%" ORDER BY id DESC`, function (err, result) {
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
// 查询图书详细信息
router.get('/queryBookDetails', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(`SELECT * FROM BOOKS, BOOKDETAILS WHERE books.id="${param.bookId}" AND BOOKDETAILS.bookId="${param.bookId}"`, function (err, result) {
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})

// 添加图书
router.post('/add', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(`INSERT INTO BOOKS(bookName, bookAuthor, bookType, bookImageUrl, bookInventory, bookDate, press, unitPrice, bookScore) VALUES ("${param.bookName}", "${param.bookAuthor}", "${param.bookType}", "${param.bookImageUrl}", "${param.bookInventory}", "${param.bookDate}", "${param.press}", "${param.unitPrice}", 0);
    INSERT INTO BOOKDETAILS(bookId, bookDescription, authorDescription)
    SELECT id, "${param.bookDescription}", "${param.authorDescription}" FROM BOOKS
    WHERE id=(SELECT id FROM BOOKS WHERE bookImageUrl="${param.bookImageUrl}")`, function (err, result) {
      console.log(err, result)
      if(result) {
        result = {
          code: 200,
          msg:'增加成功'
        };
      } else {
        result = {
          err: err
        }
      }
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
//更新图书
router.post('/update', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(`UPDATE BOOKS SET bookName="${param.bookName}", bookAuthor="${param.bookAuthor}", bookType="${param.bookType}", bookImageUrl="${param.bookImageUrl}", bookInventory="${param.bookInventory}", bookDate="${param.bookDate}", press="${param.press}", unitPrice="${param.unitPrice}" WHERE id="${param.bookId}";UPDATE BOOKDETAILS SET bookDescription="${param.bookDescription}", authorDescription="${param.authorDescription}" WHERE bookId="${param.bookId}"`, function (err, result) {
        console.log(err, result)
      if(result) {
        result = {
          code: 200,
          msg:'更新成功'
        };
      } else {
        result = {
          err: err
        }
      }
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
//删除图书
router.post('/delete', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(`SET FOREIGN_KEY_CHECKS = 0; DELETE FROM BOOKS WHERE (id="${param.id}"); DELETE FROM BOOKDETAILS WHERE (bookId="${param.id}"); SET FOREIGN_KEY_CHECKS = 1`, function (err, result) {
      console.log(err, result)
      if(result) {
        result = {
          code: 200,
          msg:'删除成功'
        };
      } else {
        result = {
          err: err
        }
      }
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
