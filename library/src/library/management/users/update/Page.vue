<template lang="html">
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="用户名称：" label-width="120px" prop="userName">
      <el-col :span="20">
        <el-input v-model="form.userName"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="密码：" label-width="120px" prop="userPsd">
      <el-col :span="20">
        <el-input v-model="form.userPsd"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="性别：" label-width="120px" prop="sex">
      <el-col :span="20">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option v-for="item in allSex" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号：" label-width="120px" prop="phone">
      <el-col :span="20">
        <el-input v-model="form.phone"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="身份证号码：" label-width="120px" prop="idCard">
      <el-col :span="20">
        <el-input v-model="form.idCard"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="" style="text-align: center">
      <el-col>
        <el-button type="primary" @click="updateUsers('form')">更新用户信息</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  props: ['currentUsersData'],
  data () {
    return {
      form: {
        id: this.currentUsersData.id,
        userName: this.currentUsersData.userName,
        userPsd: this.currentUsersData.userPsd,
        sex: this.currentUsersData.sex,
        phone: this.currentUsersData.phone,
        idCard: this.currentUsersData.idCard
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        userPsd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入性别', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        idCard: [
          {required: true, message: '请输入身份证号码', trigger: 'blur'}
        ]
      },
      allSex: process.env.SEX_TYPE
    }
  },
  mounted () {
  },
  methods: {
    updateUsers (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiosAction.post('/users/update', {
            id: this.form.id,
            userName: this.form.userName,
            userPsd: this.form.userPsd,
            sex: this.form.sex,
            phone: this.form.phone,
            idCard: this.form.idCard
          })
            .then(res => {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.$emit('closeUpdateUsersDialog', 'false')
            })
            .catch(err => {
              console.log(err)
            })
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
.el-form-item {
  margin-bottom: 30px;
  text-align: left;
}
</style>
