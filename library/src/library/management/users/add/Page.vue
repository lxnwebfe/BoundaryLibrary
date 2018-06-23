<template lang="html">
  <el-form :model="form" :rules="rules" ref="form" >
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
    <el-form-item label="权限等级：" label-width="120px" prop="userLevel">
      <el-col :span="20">
        <el-select v-model="form.userLevel" placeholder="请选择权限等级">
          <el-option v-for="item in allUserLevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="注册日期：" label-width="120px" prop="registrDate">
      <el-col :span="10">
        <el-date-picker
          v-model="form.registrDate"
          type="date"
          disabled
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="" style="text-align: center">
      <el-col>
        <el-button type="primary" @click="addUser('form')">添加用户</el-button>
        <el-button type="info" @click="reset('form')" plain>重置</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
import myDate from '@/commonConfig/date'
export default {
  data () {
    return {
      bookBlobUrl: '',
      form: {
        id: '',
        userName: '',
        userPsd: '',
        sex: '',
        phone: '',
        idCard: '',
        userLevel: '',
        registrDate: myDate.year + '-' + myDate.month + '-' + myDate.day
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
        userLevel: [
          {required: true, message: '请选择权限等级', trigger: 'blur'}
        ],
        idCard: [
          {required: true, message: '请输入身份证号码', trigger: 'blur'}
        ]
      },
      allSex: process.env.SEX_TYPE,
      allUserLevel: process.env.USER_LEVEL
    }
  },
  methods: {
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiosAction.post('/users/add', {
            id: this.form.id,
            userName: this.form.userName,
            userPsd: this.form.userPsd,
            sex: this.form.sex,
            phone: this.form.phone,
            idCard: this.form.idCard,
            userLevel: this.form.userLevel,
            registrDate: this.form.registrDate
          })
            .then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$emit('closeAddUsersDialog', 'false')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
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
