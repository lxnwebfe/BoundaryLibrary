<template lang="pug">
  el-row
    div(id="scene" class="scene")
      div(data-depth="0")
      div(data-depth="0.2")
        div(id="bg")
    el-col
      el-form(
        ref="form"
        )
        el-form-item
          el-input(placeholder="用户名：" v-model="form.userName")
        el-form-item
          el-input(placeholder="密 码：" v-model="form.userPsd")
        el-form-item
          el-button(
            type="success"
            @click="login"
            ) 登录
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
    login () {
      axiosAction.post('/users/login', {
        userName: this.form.userName,
        userPsd: this.form.userPsd
      })
        .then(res => {
          let code = res.data.code
          if (code !== '400' && code !== '201') {
            this.$cookies.get('userName') === 'root' ? this.$router.push('/library/management/books') : this.$router.push('/library/books')
          }
        })
        .catch(err => console.log(err))
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
  right: 10%;
  width: 340px;
  min-height: 400px;
  margin-top: -200px;
  background-color: #fff;
}
</style>
