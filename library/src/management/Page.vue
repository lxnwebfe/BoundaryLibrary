<template lang="html">
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <template v-if="permission">
          <el-menu-item index="1" path="222">
            <i class="el-icon-search"></i>
            <span>图书检索</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-goods"></i>
            <span>我的借阅</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-time"></i>
            <span>归还图书</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-news"></i>
            <span>预订图书</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-search"></i>
            <span>历史查询</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>图书管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span>读者管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </el-menu-item>
        </template>

      </el-menu>
    </el-aside>
    <el-main id="main"><router-view/></el-main>

  </el-container>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '1',
      screenHeight: document.body.clientHeight,
      permission: '1'
    }
  },
  mounted () {
    document.getElementById('main').style.height = this.screenHeight + 'px'
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight
      return this.screenHeight
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (this.permission) {
        if (key === '1') {
          this.$router.push('/management/books')
        }
      }
      console.log(key, keyPath)
    }
  },
  watch: {
    screenHeight (val) {
      this.screenHeight = val
      document.getElementById('left-menu').style.height = this.screenHeight + 'px'
    }
  }
}
</script>

<style scoped lang="css">
.el-menu {
  border-right: 0;
}
.el-aside {
  background-color: rgb(84, 92, 100);
}
</style>
