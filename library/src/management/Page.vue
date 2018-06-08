<template lang="pug">
  el-row
    div(id="scene" class="scene")
      div(data-depth="0")
      div(data-depth="0.2")
        div(id="bg")
    el-col(:span="8" :offset="6")
      el-form(
        ref="form"
        label-width="80px"
        )
        el-form-item(label="用户名：")
</template>

<script>
import Parallax from 'parallax-js'
export default {
  data () {
    return {
      innerWidth: (window.innerWidth + 100),
      innerHeight: (window.innerHeight + 40)
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
  background: url(../assets/background.jpg) no-repeat center center;
  background-size: cover;
}
.el-form {
  position: absolute;
  background-color: #fff;
}
</style>
