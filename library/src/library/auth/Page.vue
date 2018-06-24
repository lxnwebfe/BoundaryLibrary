<template lang="html">
  <el-row>
    <div id="scene" class="scene">
      <div data-depth="0"></div>
      <div data-depth="0.2">
        <div id="bg"></div>
      </div>
    </div>
    <el-col>
      <el-form :model="form" :rules="rules" ref="form">
        <h1>边界图书馆</h1>
        <el-form-item prop="userName">
          <el-input placeholder="用户名：" v-model="form.userName" />
        </el-form-item>
        <el-form-item prop="userPsd">
          <el-input type="password" placeholder="密 码：" v-model="form.userPsd" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import Parallax from 'parallax-js'
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    return {
      innerWidth: (window.innerWidth + 100),
      innerHeight: (window.innerHeight + 40),
      form: {
        userName: '',
        userPsd: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        userPsd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    Parallax
  },
  mounted () {
    let imgObj = document.getElementById('bg')
    imgObj.style.width = this.innerWidth + 'px'
    imgObj.style.height = this.innerHeight + 'px'
    imgObj.style.marginLeft = -this.innerWidth / 2 + 'px'
    imgObj.style.marginTop = -this.innerHeight / 2 + 'px'
    let scene = document.getElementById('scene')
    let parallaxInstance = new Parallax(scene)
    console.log(parallaxInstance)
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiosAction.post('/users/login', {
            userName: this.form.userName,
            userPsd: this.form.userPsd
          })
            .then(res => {
              let code = res.data.code
              if (code === '400') {
                this.$message.error('用户名或密码错误')
              } else {
                this.$cookies.get('userName') === 'root' ? this.$router.push('/library/management/books') : this.$router.push('/library/books')
              }
            })
            .catch(err => console.log(err))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="css">
.el-row, .scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.scene div {
  width: 100%;
  height: 100%;
}
#bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/bg.jpg) no-repeat center center;
  background-size: cover;
}
.el-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;
  min-height: 300px;
  margin-top: -150px;
  margin-left: -165px;
  background-color: rgba(255, 255, 255, 0.6);
}
.el-form-item {
  width: 80%;
  margin-left: 10%;
}
.el-button {
  width: 60%;
}
</style>
