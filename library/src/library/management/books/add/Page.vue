<template lang="html">
  <el-form :model="form" :rules="rules" ref="form" >
    <el-form-item label="图书封面：" label-width="100px" prop="bookImageUrl">
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.bookImageUrl" :src="form.bookImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-form-item>
    <el-form-item label="图书名称：" label-width="100px" prop="bookName">
      <el-col :span="20">
        <el-input v-model="form.bookName"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="图书作者：" label-width="100px" prop="bookAuthor">
      <el-col :span="20">
        <el-input v-model="form.bookAuthor"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="图书类型：" label-width="100px" prop="bookType">
      <el-col :span="20">
        <el-input v-model="form.bookType"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="图书日期：" label-width="100px" prop="bookDate">
      <el-col :span="10">
        <el-date-picker
          v-model="form.bookDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="库存：" label-width="100px" prop="bookInventory">
      <el-col :span="8">
        <el-input-number v-model="form.bookInventory" :min="0"></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item label="">
      <el-col>
        <el-button type="primary" @click="addBooks('form')">添加图书</el-button>
        <el-button type="info" @click="reset('form')" plain>重置</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import axiosAction from '@/commonConfig/axiosConfig'
export default {
  data () {
    return {
      form: {
        bookName: '',
        bookAuthor: '',
        bookType: '',
        bookImageUrl: '',
        bookInventory: 0,
        bookDate: ''
      },
      rules: {
        bookName: [
          {required: true, message: '请输入书名', trigger: 'blur'}
        ],
        bookAuthor: [
          {required: true, message: '请输入作者名', trigger: 'blur'}
        ],
        bookType: [
          {required: true, message: '请输入图书分类', trigger: 'blur'}
        ],
        bookImageUrl: [
          {required: true, message: '请上传图书封面', trigger: 'blur'}
        ],
        bookDate: [
          {required: true, message: '请选择图书出版日期', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      const array = file.response.file.path.split('\\')
      console.log(array[array.length - 1])
      this.form.bookImageUrl = '/static/images/' + array[array.length - 1]
      // this.form.bookImageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addBooks (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axiosAction.post('/books/add', {
            bookName: this.form.bookName,
            bookAuthor: this.form.bookAuthor,
            bookType: this.form.bookType,
            bookImageUrl: this.form.bookImageUrl,
            bookInventory: this.form.bookInventory,
            bookDate: this.form.bookDate
          })
            .then(res => {
              console.log(111)
              console.log(res)
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
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  border: 1px dashed #d9d9d9;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
