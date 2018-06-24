<template lang="html">
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
    </el-table>
  </el-row>

</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    return {
      booksData: []
    }
  },
  mounted () {
    this.queryUserBorrowHistoryList()
  },
  methods: {
    queryUserBorrowHistoryList () {
      axiosAction.get('/users/queryUserBorrowHistoryList', {
        params: {
          uid: this.$cookies.get('userId')
        }
      })
        .then(res => {
          let typeArray = process.env.BOOKS_TYPE
          for (let i in res.data) {
            res.data[i].bookImageUrl = process.env.BOOK_BASE_URL + res.data[i].bookImageUrl
            let j = res.data[i]
            if (j.bookType !== null) {
              for (let i in typeArray) {
                if (typeArray[i].value === j.bookType) {
                  j.bookType = typeArray[i].label
                }
              }
            }
          }
          this.booksData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="css">
</style>
