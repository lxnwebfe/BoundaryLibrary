'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BOOK_BASE_URL: '"http://localhost:3000/static/images"',
  TEST_DATA: "[{id: '1',bookName: '222',bookAuthor: '444',bookDate: '2018-06-20',bookType: '心理学',bookImageUrl: 'aaa'}]",
  BOOKS_TYPE: "[{label: '文学',value: '1'},{label: '经济管理',value: '2'},{label: '少儿',value: '3'},{label: '人文社科',value: '4'},{label: '生活',value: '5'},{label: '教材教辅考试',value: '6'},{label: '励志与成功',value: '7'},{label: '科技',value: '8'},{label: '生活',value: '9'},{label: '艺术与摄影',value: '10'},{label: '体育',value: '11'},{label: '期刊杂志',value: '12'}]",
  SEX_TYPE: "[{label: '男',value: 1},{label: '女',value: 2}]",
  USER_LEVEL: "[{label: '管理员',value: 0},{label: '用户等级一',value: 1}]"
})
