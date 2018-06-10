var express = require('express');
var router = express.Router();
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
router.get('/query', function (req, res ,next) {
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    connection.query(userSQL.queryAll, function(err, result) {
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
     connection.release();
   });
 })
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource22');
});

module.exports = router;
