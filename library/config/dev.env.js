'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BOOK_BASE_URL: '"http://localhost:3000/static/images"',
  TEST_DATA: "[{id: '1',bookName: '222',bookAuthor: '444',bookDate: '2018-06-20',bookType: '心理学',bookImageUrl: 'aaa'}]"
})
