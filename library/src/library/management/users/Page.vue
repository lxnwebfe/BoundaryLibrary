<template lang="html">
  <div class="">
    <el-form class="searchForm" inline :model="searchForm" :rules="searchFormRules" ref="searchForm">
      <el-form-item class="form-item" label="" prop="userName">
        <el-input v-model="searchForm.userName" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="" prop="phone">
        <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="" prop="sex">
        <el-select v-model="searchForm.sex" placeholder="请选择性别">
          <el-option v-for="item in allSex" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册日期：" label-width="100px" prop="registrDate">
        <el-col :span="10">
          <el-date-picker
            v-model="searchForm.registrDate"
            type="date"
            placeholder="选择注册日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item class="form-item" label="">
        <el-button type="primary" class="btn"  @click="queryUsers">搜索</el-button>
        <el-button plain class="btn" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="add-user-row">
      <el-button type="danger" @click="showAddUsersDialog=true">添加用户</el-button>
    </el-row>
    <el-row>
      <el-table
      :data="usersData"
      class="table"
      border>
        <el-table-column
          label="用户名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册日期">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.registrDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="身份证号码">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户权限">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userLevel === 0 ? '管理员' : '用户等级一'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="update(scope.row)">修改</el-button>
            <el-button type="danger" plain @click="deleteUsers(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      :visible.sync="showAddUsersDialog">
      <AddeUsersPage @closeAddUsersDialog="closeAddUsersDialog"/>
    </el-dialog>
    <el-dialog
      :visible.sync="showUpdateUsersDialog">
      <UpdateUsersPage @closeUpdateUsersDialog="closeUpdateUsersDialog" :currentUsersData="currentUsersData"/>
    </el-dialog>
  </div>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
import AddeUsersPage from './add/Page'
import UpdateUsersPage from './update/Page'
export default {
  data () {
    return {
      searchForm: {
        userName: '',
        phone: '',
        sex: '',
        registrDate: ''
      },
      allSex: process.env.SEX_TYPE,
      searchFormRules: {
        userName: [],
        phone: [],
        sex: [],
        registrDate: []
      },
      usersData: [],
      showAddUsersDialog: false,
      showUpdateUsersDialog: false,
      currentUsersData: []
    }
  },
  components: {
    AddeUsersPage,
    UpdateUsersPage
  },
  mounted () {
    this.queryUsersList()
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    queryUsersList () {
      axiosAction.get('/users/queryUsersList')
        .then(res => {
          this.usersData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    queryUsers () {
      axiosAction.get('/users/queryUsers', {
        params: {
          userName: this.searchForm.userName,
          phone: this.searchForm.phone,
          sex: this.searchForm.sex,
          registrDate: this.searchForm.registrDate
        }
      })
        .then(res => {
          this.usersData = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    update (data) {
      this.currentUsersData = data
      this.showUpdateUsersDialog = true
    },
    deleteUsers (id) {
      this.$confirm('确认删除？')
        .then(() => {
          axiosAction.post('/users/delete', {
            id: id
          })
            .then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.queryUsersList()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeAddUsersDialog (data) {
      if (data === 'false') {
        this.showAddUsersDialog = false
        this.queryUsersList()
      }
    },
    closeUpdateUsersDialog (data) {
      if (data === 'false') {
        this.showUpdateUsersDialog = false
        this.queryUsersList()
      }
    }
  }
}
</script>

<style scoped lang="css">
.searchForm {
  display: flex;
  margin-bottom: 20px;
}
.form-item {
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 0
}
.add-user-row {
  display: flex;
  margin-bottom: 20px;
}
.table {
  text-align: left;
}
</style>
