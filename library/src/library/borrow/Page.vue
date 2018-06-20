<template lang="html">
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="借阅中..." name="first" class="add">
        <el-row>
          <el-col :span="12"><BorrowingPage/></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="预订图书" name="third">预订图书</el-tab-pane>
      <el-tab-pane label="借阅历史" name="second">借阅历史</el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import BorrowingPage from './borrowing/Page'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    BorrowingPage
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="css">
</style>
