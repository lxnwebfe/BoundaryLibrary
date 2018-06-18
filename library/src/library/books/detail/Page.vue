<template lang="html">
  <div class="">
    <el-row :gutter="20">
      <el-col style="width: 200px"><img src="/static/1.jpg" alt=""></el-col>
      <el-col :span="18" class="title">
        <h2>天才在左疯子在右(完整版)<i>2016年1月1日</i></h2>
        <p>高铭<span>(作者)</span></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>作者简介</h3>
        <p>作者简介作者简介</p>
      </el-col>
      <el-col>
        <h3>作者简介</h3>
        <p>作者简介作者简介</p>
      </el-col>
      <el-col>
        <h3>作者简介</h3>
        <p>作者简介作者简介</p>
      </el-col>
      <el-col>
        <h3>作者简介</h3>
        <p>作者简介作者简介</p>
      </el-col>
      <el-col>
        <h3>作者简介</h3>
        <p>作者简介作者简介</p>
      </el-col>
    </el-row>
    {{this.$route.query.bookId}}
  </div>
</template>

<script>
export default {
  data () {
    return {
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
