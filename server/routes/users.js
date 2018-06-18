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
    connection.query(userSQL.queryUser, [param.userName, param.userPsd], function (err, result) {
      var sess = req.session;
      if (result&&result.length>0) {
        // req.session._userName = param.userName
        req.session.regenerate(function(err) {
         if(err){
           return result = {
             msg: '登录失败'
           }
         } else {
           req.session.userName = param.userName
           res.cookie('userName', param.userName, {expires: new Date(Date.now() + 15 * 60 * 1000), httpOnly: true, path: '/'});
           console.log(req.session)
           console.log(req.cookies)
           res.end()
         }
       });
      } else {
        result = {
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
// 用户借阅
router.post('/borrowing', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var param = req.body;
    connection.query(userSQL.addUserBorrow, [
      param.uid,
      param.bookName,
      param.bookAuthor,
      param.bookType,
      param.bookImageUrl,
      param.bookInventory,
      param.bookDate,
      param.bookScore
    ], function (err, result) {
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
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource22');
});

module.exports = router;
