<template lang="html">
  <div>
    <el-form class="searchForm" inline :model="searchForm" :rules="searchFormRules" ref="searchForm">
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
    </el-form>
    <el-row class="add-book-row">
      <el-button type="danger" @click="showAddBooksDialog=true">新增图书</el-button>
    </el-row>
    <el-row>
      <el-table
      :data="booksData"
      class="table"
      border>
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <div style="text-align: center">
              <img :src="scope.row.bookImageUrl" class="book-image">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="图书名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作者">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookAuthor }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="出版社">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.press }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="出版日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.bookDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="图书种类">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单价（元）">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.unitPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="update(scope.row)">修改</el-button>
            <el-button type="danger" plain @click="deleteBooks(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      :visible.sync="showAddBooksDialog">
      <AddBooksPage @closeAddBooksDialog="closeAddBooksDialog"/>
    </el-dialog>
    <el-dialog
      :visible.sync="showUpdateBooksDialog">
      <UpdateBooksPage @closeUpdateBooksDialog="closeUpdateBooksDialog" :currentBooksData="currentBooksData"/>
    </el-dialog>
  </div>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
import AddBooksPage from './add/Page'
import UpdateBooksPage from './update/Page'
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
      bookClassification: process.env.BOOKS_TYPE,
      showAddBooksDialog: false,
      showUpdateBooksDialog: false,
      booksData: [],
      currentBooksData: []
    }
  },
  components: {
    AddBooksPage,
    UpdateBooksPage
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
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    update (data) {
      this.currentBooksData = data
      this.showUpdateBooksDialog = true
    },
    deleteBooks (id) {
      this.$confirm('确认删除？')
        .then(() => {
          axiosAction.post('/books/delete', {
            id: id
          })
            .then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.queryBooksList()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeAddBooksDialog (data) {
      if (data === 'false') {
        this.showAddBooksDialog = false
        this.queryBooksList()
      }
    },
    closeUpdateBooksDialog (data) {
      if (data === 'false') {
        this.showUpdateBooksDialog = false
        this.queryBooksList()
      }
    }
  }
}
</script>

<style scoped lang="css">
.searchForm {
  display: flex;
  margin-bottom: 20px;
}
.form-item {
  /*width: 340px;*/
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 0
}
.add-book-row {
  display: flex;
  margin-bottom: 20px;
}
.table {
  text-align: left;
}
.table .book-image {
  max-width: 200px;
  max-height: 200px;
}
</style>
