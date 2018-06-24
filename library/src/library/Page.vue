<template lang="html">
  <el-container>
    <el-header>
      <h1>边界图书管理系统</h1>
      <template v-if="userName!==''">
        <p class="loginUser">欢迎您，<span>{{userName}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<i @click="logout">注销</i></p>
      </template>
    </el-header>
    <el-container>
      <el-aside width="160px">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <template v-if="userName!==''&&userName!=='root'">
            <el-menu-item index="1" path="222">
              <i class="el-icon-search"></i>
              <span>图书检索</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-goods"></i>
              <span>我的借阅</span>
            </el-menu-item>
          </template>
          <template v-else>
            <el-menu-item index="6">
              <i class="el-icon-setting"></i>
              <span>图书管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span>读者管理</span>
            </el-menu-item>
            <!-- <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </el-menu-item> -->
          </template>

        </el-menu>
      </el-aside>
      <el-main id="main"><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '',
      screenHeight: document.body.clientHeight - 60,
      userName: ''
    }
  },
  mounted () {
    document.getElementById('main').style.height = this.screenHeight + 'px'
    window.onresize = () => {
      this.screenHeight = document.body.clientHeight - 60
      return this.screenHeight
    }
    this.currentActive()
    this.$cookies.get('userName') ? this.userName = this.$cookies.get('userName') : this.userName = ''
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/library/books')
      } else if (key === '2') {
        this.$router.push('/library/borrow')
      } else if (key === '6') {
        this.$router.push('/library/management/books')
      } else if (key === '4') {
        this.$router.push('/library/management/users')
      }
      // console.log(key, keyPath)
    },
    currentActive () {
      let path = this.$route.path
      if (path.indexOf('/library/books') !== -1) {
        this.defaultActive = '1'
      } else if (path.indexOf('/library/borrow') !== -1) {
        this.defaultActive = '2'
      } else if (path.indexOf('/library/management/books') !== -1) {
        this.defaultActive = '6'
      } else if (path.indexOf('/library/management/users') !== -1) {
        this.defaultActive = '4'
      }
    },
    logout () {
      this.$cookies.remove('userName', '/')
      this.$router.push('/')
    }
  },
  watch: {
    screenHeight (val) {
      this.screenHeight = val
      document.getElementById('main').style.height = this.screenHeight + 'px'
    }
  }
}
</script>

<style scoped lang="css">
.el-header {
  color: #fff;
  background-color: #313132;
}
.el-header h1 {
  display: inline-block;
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
}
.loginUser {
  display: block;
  float: right;
  line-height: 36px;
  font-size: 14px;
}
.loginUser i {
  font-style: normal;
  cursor: pointer;
}
.loginUser i:hover {
  color: #2588c8;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  background-color: rgb(84, 92, 100);
}
.el-main {
  width: 1000px;
}
</style>
