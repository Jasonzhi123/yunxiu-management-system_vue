<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickName" label="发布人" width="200px"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogList, delBlogItem } from '@/api/blogManagement/blog'
// import scroll from '@/utils/scroll'

export default {
  data() {
    return {
      blogList: [],
      count: 50,
      delDialogVisible: false,
      loading: false,
      blog: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // scroll.start(this.getList)
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await getBlogList({
        startNum: this.blogList.length,
        count: this.count
      })
      this.loading = false
      this.blogList = this.blogList.concat(data)
      // if (_blogList.length < this.count) {
      //   scroll.end()
      // }

      console.log(this.blogList)
      // })
    },
    onDel(row) {
      this.blog = row
      this.delDialogVisible = true
    },
    async doDel() {
      this.delDialogVisible = false
      this.loading = true
      const res = await delBlogItem(this.blog)
      console.log(res)
      this.loading = false
      // console.log(res)
      // if (res.data.delBlogRes.deleted > 0) {
      //   this.blogList = []
      //   this.getList()
      //   this.$message({
      //     message: '删除成功',
      //     type: 'success'
      //   })
      // }
    }
  }
}
</script>

<style>
</style>
