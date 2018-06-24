<template lang="html">
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="借阅中..." name="first" class="add">
        <div style="margin-top: 46px;">
          <BorrowingPage/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="预订图书" name="third">预订图书</el-tab-pane>
      <el-tab-pane label="借阅历史" name="second">
        <div style="margin-top: 46px;">
          <BorrowHistoryPage />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import BorrowingPage from './borrowing/Page'
import BorrowHistoryPage from './history/Page'
export default {
  data () {
    return {
      activeName: 'first',
      renderHistoryList: false
    }
  },
  components: {
    BorrowingPage,
    BorrowHistoryPage
  },
  methods: {
    handleClick (tab, event) {
      let tabIndex = tab.index
      if (tabIndex === 2) {
        console.log(tab.index)
      }
    }
  }
}
</script>

<style lang="css">
.table {
  text-align: left;
}
.table .book-image {
  max-width: 200px;
  max-height: 200px;
}
</style>
