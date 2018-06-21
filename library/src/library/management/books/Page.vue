<template lang="html">
  <div>
    <el-form class="searchForm" inline>
      <el-form-item class="form-item" label="">
        <el-input v-model="searchForm.bookName" placeholder="请输入图书名称" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="">
        <el-input v-model="searchForm.bookAuthor" placeholder="请输入作者名称" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="">
        <el-select v-model="searchForm.bookClassification" placeholder="请选择图书分类">
          <el-option v-for="item in bookClassification" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item" label="">
        <el-button type="primary" class="btn">搜索</el-button>
        <el-button plain class="btn">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="add-book-row">
      <el-button type="danger" @click="showAddBooksDialog=true">新增图书</el-button>
    </el-row>
    <el-row>
      <el-table
      :data="resultData"
      class="table"
      border>
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="图书名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作者">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookAuthor }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="出版日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.bookDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="图书种类">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bookType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain>修改</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      :visible.sync="showAddBooksDialog">
      <AddBooksPage/>
    </el-dialog>
  </div>
  <!-- <el-row>
    <el-col>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新增图书" name="first" class="add">
          <el-row type="flex" justify="center">
            <el-col :span="12"><AddBooksPage/></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="更新图书" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="删除图书" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row> -->
</template>

<script>
import AddBooksPage from './add/Page'
export default {
  data () {
    return {
      searchForm: {
        bookName: '',
        bookAuthor: '',
        bookClassification: ''
      },
      bookClassification: [
        {
          label: '文学',
          value: '1'
        },
        {
          label: '经济管理',
          value: '2'
        },
        {
          label: '少儿',
          value: '3'
        },
        {
          label: '人文社科',
          value: '4'
        },
        {
          label: '生活',
          value: '5'
        },
        {
          label: '教材教辅考试',
          value: '6'
        },
        {
          label: '励志与成功',
          value: '7'
        },
        {
          label: '科技',
          value: '8'
        },
        {
          label: '生活',
          value: '9'
        },
        {
          label: '艺术与摄影',
          value: '10'
        },
        {
          label: '体育',
          value: '11'
        },
        {
          label: '期刊杂志',
          value: '12'
        }
      ],
      showAddBooksDialog: false,
      resultData: process.env.TEST_DATA
    }
  },
  components: {
    AddBooksPage
  },
  methods: {
  }
}
</script>

<style scoped lang="css">
.searchForm {
  display: flex;
  margin-bottom: 20px;
}
.form-item {
  /*width: 340px;*/
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 0
}
.add-book-row {
  display: flex;
  margin-bottom: 20px;
}
.table {
  text-align: left;
}
</style>
