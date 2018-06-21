<template lang="html">
  <div class="">
    <el-form class="searchForm" inline>
      <el-form-item class="form-item" label="">
        <el-input v-model="searchForm.userName" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="">
        <el-button type="primary" class="btn">搜索</el-button>
        <el-button plain class="btn">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
      :data="resultData"
      class="table"
      border>
        <el-table-column
          label="用户名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册日期">
          <template slot-scope="scope">
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain>修改</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        userName: '',
        sex: ''
      },
      resultData: [{
        userName: '222',
        sex: '男'
      }]
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
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 0
}
.table {
  text-align: left;
}
</style>
