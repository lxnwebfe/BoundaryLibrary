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

// 添加图书
router.post('/add', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(booksSQL.addBooks, [param.bookName, param.bookAuthor, param.bookType, param.bookImageUrl, param.bookInventory, param.bookDate, param.press, param.unitPrice], function (err, result) {
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
    connection.query(booksSQL.updateBooks, [param.bookName, param.bookAuthor, param.bookType, param.bookImageUrl, param.bookInventory, param.bookDate, param.press, param.unitPrice, param.id], function (err, result) {
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
    connection.query(booksSQL.deleteBooks, [param.id], function (err, result) {
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
