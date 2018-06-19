<template lang="html">
  <el-row>
    <el-col>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新增图书" name="first" class="add">
          <el-row type="flex" justify="center">
            <el-col :span="12"><AddBooksPage/></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="更新图书" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="删除图书" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import AddBooksPage from './add/Page'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    AddBooksPage
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="css">
</style>
