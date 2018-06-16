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
        <div @click="enterDetail(item.bookId)">
          <img :src="item.coverUrl" alt="" ondragstart="return false">
        </div>
        <p>
          <span>{{item.name}} {{item.date}}</span>
          <span>{{item.author}}</span>
        </p>
        <el-button type="success" plain @click="showBorrowDialog=true">我要借阅</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="我要借阅"
      :visible.sync="showBorrowDialog"
      width="30%"
      center>
      <el-form size="mini">
        <el-form-item label="借阅人：">夜风清吟</el-form-item>
        <el-form-item label="借阅书籍：">天才在左疯子在右(完整版)</el-form-item>
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
export default {
  data () {
    return {
      search: '',
      showBorrowDialog: false,
      borrowNum: 1,
      booksData: [
        {
          bookId: 1,
          name: '天才在左疯子在右(完整版)',
          date: '2016-01-01',
          author: '高铭',
          coverUrl: '/static/1.jpg'
        },
        {
          bookId: 2,
          name: '罗生门',
          date: '2017-07-25',
          author: '芥川龙之介',
          coverUrl: '/static/2.jpg'
        }
      ]
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
    borrow () {
      this.$message({
        message: '借阅成功',
        type: 'success'
      })
      this.showBorrowDialog = false
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
