<template>
  <div>
    <el-table v-loading="loading" :data="songSheetList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="copywriter" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getSongSheetList, deleteSongSheetDetail } from '@api/musicManagement/songSheetList'
import scroll from '@utils/scroll.js'

export default {
  data() {
    return {
      songSheetList: [],
      count: 20,
      loading: false,
      delDialogVisible: false, // 删除歌单的对话框是否显示
      info: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    scroll.start(this.getList)
  },
  methods: {
    async getList() {
      this.loading = true
      const res = await getSongSheetList({
        start: this.songSheetList.length,
        count: this.count
      })
      console.log(res)
      this.loading = false
      this.songSheetList = this.songSheetList.concat(res.musiclist)
      console.log(this.songSheetList)
      if (res.musiclist.length < this.count) {
        scroll.end()
      }
    },
    onEdit(row) {
      console.log('编辑', row)
    },
    onDel(row) {
      this.delDialogVisible = true
      this.info.id = row._id
    },
    doDel() {
      deleteSongSheetDetail({ id: this.info.id }).then(res => {
        this.delDialogVisible = false
        if (res.data.deleted > 0) {
          this.playlist = []
          this.getList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  }
}
</script>
