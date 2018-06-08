<template lang="pug">
  div
    div(id="scene" class="scene")
      div(data-depth="0")
      div(data-depth="0.2")
        div(id="bg")
    el-row
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

<style lang="css">
.scene {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1500px;
  margin-left: -750px;
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
#img1 {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
