var express = require('express');
var router = express.Router();

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var identityKey = 'userName';

// 导入MySql模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
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
router.use(cookieParser());
router.use(session({
  secret: '12345', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 15 * 60 * 1000 // 有效期，单位是毫秒
  }
}));
// 用户登录
router.post('/login', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(userSQL.queryLoginUser, [param.userName, param.userPsd], function (err, result) {
      if (result&&result.length>0) {
        // req.session._userName = param.userName
        req.session.regenerate(function(err) {
         if(err){
           return result = {
             code: '-201',
             msg: '登录失败'
           }
           responseJSON(res, result)
         } else {
           res.cookie('userName', result[0].userName, {expires: new Date(Date.now() + 15 * 60 * 1000)});
           res.cookie('userId', result[0].id, {expires: new Date(Date.now() + 15 * 60 * 1000)});
           res.cookie('userLevel', result[0].userLevel, {expires: new Date(Date.now() + 15 * 60 * 1000)});
           res.end()
         }
       });
      } else {
        result = {
          code: '400',
          msg: '用户名或密码错误'
        }
        responseJSON(res, result)
      }
      connection.release()
    })
  })
})
// 用户注册
router.post('/register', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(userSQL.addUser, [param.userName, param.userPsd], function (err, result) {
      if (result) {
        result = {
          code: 200,
          msg: '增加成功'
        }
      }
      responseJSON(res, result)
      connection.release()
    })
  })
})

// 用户借阅，先查库存
router.get('/queryBookInventory', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(`SELECT bookInventory FROM BOOKS WHERE id="${param.bookId}"`, function (err, result) {
      responseJSON(res, result);
      connection.release()
    });
  })
})
router.post('/borrowing', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(`INSERT INTO USERBORROWING(uid, bookId, bookName, bookAuthor, bookImageUrl, bookDate, borrowingDateTime) VALUES ("${param.uid}", "${param.bookId}", "${param.bookName}", "${param.bookAuthor}", "${param.bookImageUrl}", "${param.bookDate}", "${param.borrowingDateTime}");
      INSERT INTO USERBORROWHISTORY(uid, bookId, bookName, bookAuthor, bookImageUrl, bookDate, borrowingDateTime, press, unitPrice, bookType) VALUES ("${param.uid}", "${param.bookId}", "${param.bookName}", "${param.bookAuthor}", "${param.bookImageUrl}", "${param.bookDate}", "${param.borrowingDateTime}", "${param.press}", "${param.unitPrice}", "${param.bookType}");
      UPDATE BOOKS SET bookInventory=bookInventory-1 WHERE id="${param.bookId}"`, function (err, result) {
      console.log(err, result)
      if (result) {
        result = {
          code: 200,
          msg: '借阅成功'
        }
      }
      responseJSON(res, result)
      connection.release()
    })
  })
})
// 查询用户借阅图书列表
router.get('/queryUserBorrowingList', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(userSQL.queryUserBorrowingList, [param.uid], function (err, result) {
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
// 用户归还图书
router.post('/returnBook', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(`DELETE FROM USERBORROWING WHERE uid="${param.uid}" AND bookId="${param.bookId}" AND borrowingDateTime="${param.borrowingDateTime}";
      UPDATE BOOKS SET bookInventory=bookInventory+1 WHERE id="${param.bookId}"`, function (err, result) {
      console.log(err, result)
      if (result) {
        result = {
          code: 200,
          msg: '归还成功'
        }
      }
      responseJSON(res, result)
      connection.release()
    })
  })
})
// 用户借阅历史查询
router.get('/queryUserBorrowHistoryList', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(userSQL.queryUserBorrowHistoryList, [param.uid], function (err, result) {
      console.log(err, result)
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
// 用户列表查询
router.get('/queryUsersList', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(userSQL.queryAll, function (err, result) {
     //以json形式，把操作结果返回给前台页面
     responseJSON(res, result);
     //释放连接
     connection.release()
   });
 })
})
// 用户查询
router.get('/queryUsers', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(`SELECT * FROM user WHERE userName LIKE "%${param.userName}%" AND  sex LIKE "%${param.sex}%" AND phone LIKE "%${param.phone}%" AND registrDate LIKE "%${param.registrDate}%" ORDER BY id DESC`, function (err, result) {
    //以json形式，把操作结果返回给前台页面
    responseJSON(res, result);
    //释放连接
    connection.release()
   });
 })
})
// 添加用户
router.post('/add', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(userSQL.addUser2, [param.userName, param.userPsd, param.sex, param.phone, param.idCard, param.registrDate, param.userLevel], function (err, result) {
      if(result) {
        result = {
          code: 200,
          msg:'添加成功'
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

// 更新用户信息
router.post('/update', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(userSQL.updateUser, [param.userName, param.userPsd, param.sex, param.phone, param.idCard, param.id], function (err, result) {
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
// 删除用户
router.post('/delete', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.body;
    connection.query(userSQL.deleteUser, [param.id], function (err, result) {
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
  res.send('respond with a resource22');
});

module.exports = router;
