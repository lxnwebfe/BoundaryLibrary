<template lang="html">
  <el-row>
    <div id="scene" class="scene">
      <div data-depth="0"></div>
      <div data-depth="0.2">
        <div id="bg"></div>
      </div>
    </div>
    <el-col>
      <el-form :model="form" :rules="rules" ref="form" v-show="showRegisterBox===false">
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
          <p class="register-link" @click="showRegisterBox=true">注册新用户</p>
      </el-form>
      <el-form :model="form2" :rules="rules2" ref="form2" v-show="showRegisterBox===true">
        <h1>边界图书馆</h1>
        <el-form-item prop="registerUserName">
          <el-input placeholder="用户名：" v-model="form2.registerUserName" />
        </el-form-item>
        <el-form-item prop="registerUserPsd">
          <el-input type="password" placeholder="密 码：" v-model="form2.registerUserPsd" auto-complete="off"/>
        </el-form-item>
        <el-form-item prop="checkRegisterUserPsd">
          <el-input type="password" placeholder="重复密码：" v-model="form2.checkRegisterUserPsd" auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="register('form2')">注册</el-button>
        </el-form-item>
        <p class="register-link" @click="showRegisterBox=false">已有账号，请登录</p>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import Parallax from 'parallax-js'
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form2.checkRegisterUserPsd !== '') {
          this.$refs.form2.validateField('checkRegisterUserPsd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form2.registerUserPsd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      innerWidth: (window.innerWidth + 100),
      innerHeight: (window.innerHeight + 40),
      form: {
        userName: '',
        userPsd: '',
        registerUserName: '',
        registerUserPsd: '',
        checkRegisterUserPsd: ''
      },
      form2: {
        registerUserName: '',
        registerUserPsd: '',
        checkRegisterUserPsd: ''
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        userPsd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        registerUserName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        registerUserPsd: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkRegisterUserPsd: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
      rules2: {
        registerUserName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        registerUserPsd: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkRegisterUserPsd: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
      showRegisterBox: false
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
                this.$cookies.get('userLevel') === '0' ? this.$router.push('/library/management/books') : this.$router.push('/library/books')
              }
            })
            .catch(err => console.log(err))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiosAction.post('/users/register', {
            userName: this.form2.registerUserName,
            userPsd: this.form2.registerUserPsd
          })
            .then(res => {
              let code = res.data.code
              console.log(typeof res.data.code)
              if (code === '401') {
                this.$message.error('用户名重复')
              } else {
                this.$message({
                  message: '恭喜您，注册成功！',
                  type: 'success'
                })
                this.$cookies.get('userLevel') === '0' ? this.$router.push('/library/management/books') : this.$router.push('/library/books')
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
.register-link {
  display: block;
  float: right;
  margin-top: 0;
  margin-right: 10%;
  text-decoration: underline;
  font-size: 14px;
  color: #FFA54F;
  cursor: pointer;
}
</style>
