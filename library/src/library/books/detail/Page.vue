<template lang="html">
  <div class="">
    <el-row :gutter="20">
      <el-col style="width: 200px"><img :src="bookDetailsData.bookImageUrl" alt="" style="width: 200px;"></el-col>
      <el-col :span="18" class="title">
        <h2>{{bookDetailsData.bookName}}<i>{{bookDetailsData.bookDate}}</i></h2>
        <p>{{bookDetailsData.bookAuthor}}<span>(作者)</span></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>图书简介</h3>
        <p>{{bookDetailsData.bookDescription}}</p>
      </el-col>
      <el-col>
        <h3>作者简介</h3>
        <p>{{bookDetailsData.authorDescription}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    return {
      bookDetailsData: {}
    }
  },
  mounted () {
    this.queryBookDetails()
  },
  methods: {
    queryBookDetails () {
      axiosAction.get('/books/queryBookDetails', {
        params: {
          bookId: this.$route.query.bookId
        }
      })
        .then(res => {
          for (let i in res.data) {
            res.data[i].bookImageUrl = process.env.BOOK_BASE_URL + res.data[i].bookImageUrl
          }
          this.bookDetailsData = res.data[0]
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="css">
.el-row {
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
.title > h2 {
  margin-top: 10px;
}
</style>
