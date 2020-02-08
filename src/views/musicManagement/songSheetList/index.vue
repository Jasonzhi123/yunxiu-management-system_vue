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
      <el-form ref="form" :model="songSheetDetail" label-width="80px">
        <el-form-item label="歌单名称">
          <el-input v-model="songSheetDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="songSheetDetail.copywriter"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updataFormData">更新</el-button>
        <el-button @click="delDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getSongSheetList, deleteSongSheetDetail, getSongSheetDetail, updateSongSheetListDetail } from '@api/musicManagement/songSheetList'
import scroll from '@utils/scroll.js'

export default {
  data() {
    return {
      songSheetList: [],
      count: 20,
      loading: false,
      delDialogVisible: false, // 删除歌单的对话框是否显示
      info: {},
      songSheetDetail: {}// 歌单详情
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
      if (res.musiclist.length < this.count) {
        scroll.end()
      }
    },
    async onEdit(row) {
      const res = await getSongSheetDetail({ id: row._id })
      this.songSheetDetail = res.detail
      this.delDialogVisible = true
    },
    // 更新歌单信息
    async updataFormData() {
      const res = await updateSongSheetListDetail(this.songSheetDetail)
      if (res.data.modified > 0 && res.code === 0) {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.delDialogVisible = false
        this.songSheetList = []
        this.getList()
      } else {
        this.$message.error('更新失败')
      }
    },
    // 点击删除
    onDel(row) {
      this.info.id = row._id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDel()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除歌单
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
