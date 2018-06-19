var express = require('express')
var router = express.Router()
var formidable = require('formidable')
var fs = require('fs')
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
// 图片上传
router.post('/upload', function (req, res, next) {
  var form = new formidable.IncomingForm({
    encoding: 'utf-8',
    uploadDir: '/BoundaryLibrary/server/public/images',
    keepExtensions:true
  })
  form.parse(req, function(err, fields, files) {
    var obj ={};
    Object.keys(fields).forEach(function(name) {  //文本
      obj[name] = fields[name];
    });
    Object.keys(files).forEach(function(name) {  //文件
      console.log('name:' + name+";file:"+files[name].path);
      obj[name] = files[name];
    });
    responseJSON(res, obj)
  })
})
/* GET common listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
