<template lang="html">
  <div>
    <el-form class="searchForm" inline :model="searchForm" :rules="searchFormRules" ref="searchForm">
      <el-row>
        <el-form-item class="form-item" label="" prop="bookName">
          <el-input v-model="searchForm.bookName" placeholder="请输入图书名称" clearable></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="" prop="bookAuthor">
          <el-input v-model="searchForm.bookAuthor" placeholder="请输入作者名称" clearable></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="" prop="bookType">
          <el-select v-model="searchForm.bookType" placeholder="请选择图书分类">
            <el-option v-for="item in bookClassification" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="">
          <el-button type="primary" class="btn" @click="queryBooks">搜索</el-button>
          <el-button plain class="btn" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row class="content" :gutter="20">
      <template v-if="booksData.length <= 0">
        <el-col :span="6" class="results">暂无数据</el-col>
      </template>
      <template v-else>
        <el-col :span="6" v-for="item in booksData" :key="item.id" class="results">
          <div @click="enterDetail(item.id)">
            <img :src="item.bookImageUrl" alt="" ondragstart="return false">
          </div>
          <p>
            <span>{{item.bookName}} {{item.bookDate}}</span>
            <span>{{item.bookAuthor}}</span>
            <span>库存：{{item.bookInventory}}</span>
          </p>
          <el-button type="success" plain @click="openBorrowBox(item)">我要借阅</el-button>
        </el-col>
      </template>
    </el-row>
    <el-dialog
      title="我要借阅"
      :visible.sync="showBorrowDialog"
      width="30%"
      center>
      <el-form size="mini">
        <el-form-item label="借阅人：">{{userName}}</el-form-item>
        <el-form-item label="借阅书籍：">{{borrowBoxData.bookName}}</el-form-item>
        <el-form-item label="借阅数量：">
          <el-input-number v-model="borrowNum" size="mini" :min="1" :max="3" disabled></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showBorrowDialog=false">取 消</el-button>
        <el-button type="primary" @click="borrow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    return {
      searchForm: {
        bookName: '',
        bookAuthor: '',
        bookType: ''
      },
      searchFormRules: {
        bookName: [],
        bookAuthor: [],
        bookType: []
      },
      showBorrowDialog: false,
      userName: this.$cookies.get('userName'),
      borrowNum: 1,
      booksData: [],
      borrowBoxData: {},
      bookImageUrl: '',
      bookClassification: process.env.BOOKS_TYPE
    }
  },
  mounted () {
    this.queryBooksList()
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    queryBooksList () {
      axiosAction.get('/books/query')
        .then(res => {
          for (let i in res.data) {
            res.data[i].bookImageUrl = process.env.BOOK_BASE_URL + res.data[i].bookImageUrl
          }
          this.booksData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    queryBooks () {
      axiosAction.get('/books/queryBooks', {
        params: {
          bookName: this.searchForm.bookName,
          bookAuthor: this.searchForm.bookAuthor,
          bookType: this.searchForm.bookType
        }
      })
        .then(res => {
          for (let i in res.data) {
            res.data[i].bookImageUrl = process.env.BOOK_BASE_URL + res.data[i].bookImageUrl
          }
          this.booksData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    enterDetail (val) {
      this.$router.push({
        name: 'bookDetail',
        query: {
          bookId: val
        }
      })
    },
    openBorrowBox (item) {
      this.borrowBoxData = item
      const array = this.borrowBoxData.bookImageUrl.split('/')
      this.bookImageUrl = '/' + array[array.length - 1]
      this.showBorrowDialog = true
    },
    borrow () {
      axiosAction.get('/users/queryBookInventory', {
        params: {
          bookId: this.borrowBoxData.id
        }
      })
        .then(res => {
          let data = res.data[0]
          if (data.bookInventory > 0) {
            axiosAction.post('/users/borrowing', {
              uid: this.$cookies.get('userId'),
              bookId: this.borrowBoxData.id,
              bookName: this.borrowBoxData.bookName,
              bookAuthor: this.borrowBoxData.bookAuthor,
              bookImageUrl: this.bookImageUrl,
              bookDate: this.borrowBoxData.bookDate,
              borrowingDateTime: new Date().toISOString(),
              press: this.borrowBoxData.press,
              unitPrice: this.borrowBoxData.unitPrice,
              bookType: this.borrowBoxData.bookType
            }).then(res => {
              let data = res.data
              console.log(data)
              if (data.code === 200) {
                this.$message({
                  message: '借阅成功',
                  type: 'success'
                })
                this.showBorrowDialog = false
                this.queryBooksList()
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message.error('暂无库存')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="css">
.searchForm {
  display: flex;
  margin-bottom: 60px;
}
.form-item {
  /*width: 340px;*/
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 0
}
.btn {
  width: 120px;
}
.results {
  margin-bottom: 30px;
}
.results > p {
  position: relative;
}
.results > div {
  cursor: pointer;
}
.results > div > img {
  max-width: 100%;
  max-height: 200px;
}
.results > p > span {
  display: block;
  width: 100%;
  line-height: 24px;
}
</style>
