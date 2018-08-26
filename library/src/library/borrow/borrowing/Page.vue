<template lang="html">
  <el-row>
    <template v-if="isBorrowingBooks">
      <el-col :span="6" v-for="item in borrowingDataList" :key="item.id" class="results">
        <div @click="enterDetail(item.bookId)">
          <img :src="item.bookImageUrl" alt="" ondragstart="return false">
        </div>
        <p>
          <span>{{item.bookName}} {{item.bookDate}}</span>
          <span>{{item.bookAuthor}}</span>
        </p>
        <el-button type="success" plain @click="openReturnBookBox(item)">归还图书</el-button>
      </el-col>
      <el-dialog
        title="归还图书"
        :visible.sync="showReturnBookDialog"
        width="30%"
        center>
        <el-form size="mini">
          <el-form-item label="借阅人：">{{userName}}</el-form-item>
          <el-form-item label="归还书籍：">{{returnBoxData.bookName}}</el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showReturnBookDialog=false">取 消</el-button>
          <el-button type="primary" @click="returnBook">确 定</el-button>
        </div>
      </el-dialog>
    </template>
    <template v-else>暂无借阅</template>
  </el-row>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    return {
      userName: this.$cookies.get('userName'),
      borrowingDataList: [],
      returnBoxData: {},
      showReturnBookDialog: false,
      isBorrowingBooks: ''
    }
  },
  mounted () {
    this.queryUserBorrowingList()
  },
  methods: {
    queryUserBorrowingList () {
      axiosAction.get('/users/queryUserBorrowingList', {
        params: {
          uid: this.$cookies.get('userId')
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.length <= 0) {
            this.isBorrowingBooks = false
          } else {
            this.isBorrowingBooks = true
            for (let i in res.data) {
              res.data[i].bookImageUrl = process.env.BOOK_BASE_URL + res.data[i].bookImageUrl
            }
            this.borrowingDataList = res.data
          }
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
    openReturnBookBox (item) {
      this.returnBoxData = item
      const array = this.returnBoxData.bookImageUrl.split('/')
      this.bookImageUrl = '/' + array[array.length - 1]
      this.showReturnBookDialog = true
    },
    returnBook () {
      axiosAction.post('/users/returnBook', {
        uid: this.$cookies.get('userId'),
        bookId: this.returnBoxData.bookId,
        borrowingDateTime: this.returnBoxData.borrowingDateTime
      }).then(res => {
        let data = res.data
        console.log(data)
        if (data.code === 200) {
          this.$message({
            message: '归还成功',
            type: 'success'
          })
          this.showReturnBookDialog = false
          this.queryUserBorrowingList()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="css">
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
