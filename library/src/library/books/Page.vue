<template lang="html">
  <div>
    <el-row>
      <el-col>
        <el-form>
          <el-form-item label="">
            <el-input v-model="search" placeholder="请输入图书名称、作者" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content" :gutter="20">
      <el-col :span="6" v-for="item in booksData" :key="item.id" class="results">
        <div @click="enterDetail(item.id)">
          <img :src="item.bookImageUrl" alt="" ondragstart="return false">
        </div>
        <p>
          <span>{{item.bookName}} {{item.bookDate}}</span>
          <span>{{item.bookAuthor}}</span>
        </p>
        <el-button type="success" plain @click="openBorrowBox('root', item)">我要借阅</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="我要借阅"
      :visible.sync="showBorrowDialog"
      width="30%"
      center>
      <el-form size="mini">
        <el-form-item label="借阅人：">root</el-form-item>
        <el-form-item label="借阅书籍：">{{borrowBoxData.bookName}}</el-form-item>
        <el-form-item label="借阅数量：">
          <el-input-number v-model="borrowNum" size="mini" :min="1" :max="3"></el-input-number>
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
      search: '',
      showBorrowDialog: false,
      borrowNum: 1,
      booksData: [],
      borrowBoxData: {}
    }
  },
  mounted () {
    this.queryBooks()
  },
  methods: {
    queryBooks () {
      axiosAction.get('/books/query')
        .then(res => {
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
    openBorrowBox (userName, item) {
      this.borrowBoxData = {}
      this.borrowBoxData = item
      this.showBorrowDialog = true
    },
    borrow () {
      axiosAction.post('/users/borrowing', {
        uid: 1,
        bookName: this.borrowBoxData.bookName,
        bookAuthor: this.borrowBoxData.bookAuthor,
        bookType: this.borrowBoxData.bookType,
        bookImageUrl: this.borrowBoxData.bookImageUrl,
        bookInventory: this.borrowBoxData.bookInventory,
        bookDate: this.borrowBoxData.bookDate,
        bookScore: this.borrowNum
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // this.$message({
      //   message: '借阅成功',
      //   type: 'success'
      // })
      // this.showBorrowDialog = false
    }
  }
}
</script>

<style lang="css">
.results {
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
}
</style>
