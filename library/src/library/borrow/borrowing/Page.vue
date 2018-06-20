<template lang="html">
  <el-row>
    <el-col :span="6" v-for="item in booksData" :key="item.id" class="results">
      <div @click="enterDetail(item.id)">
        <img :src="item.bookImageUrl" alt="" ondragstart="return false">
      </div>
      <p>
        <span>{{item.bookName}} {{item.bookDate}}</span>
        <span>{{item.bookAuthor}}</span>
      </p>
      <el-button type="success" plain @click="showReturnBookDialog=true">归还图书</el-button>
    </el-col>
    <el-dialog
      title="归还图书"
      :visible.sync="showReturnBookDialog"
      width="30%"
      center>
      <el-form size="mini">
        <el-form-item label="借阅人：">root</el-form-item>
        <el-form-item label="借阅书籍：">{{borrowBoxData.bookName}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showReturnBookDialog=false">取 消</el-button>
        <el-button type="primary" @click="returnBook">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      booksData: [
        {
          id: '1',
          bookName: '222',
          bookDate: '333',
          bookAuthor: '444',
          bookImageUrl: 'aaa'
        }
      ],
      borrowBoxData: {
        id: '1',
        bookName: '222',
        bookDate: '333',
        bookAuthor: '444',
        bookImageUrl: 'aaa'
      },
      showReturnBookDialog: false
    }
  },
  methods: {
    enterDetail (val) {
      this.$router.push({
        name: 'bookDetail',
        query: {
          bookId: val
        }
      })
    },
    returnBook () {
      console.log(111)
    }
  }
}
</script>

<style scoped lang="css">
</style>
