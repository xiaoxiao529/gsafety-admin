<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="widgetInfo.pageNo"
      :page-sizes="[10, 15, 20,25]"
      :page-size="widgetInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="widgetInfo.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    widgetInfo: Object
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("sonHandleCurrentChange", {
        pageSize: this.pageSize
      });
    },
    handleCurrentChange(val) {
      this.$emit("sonHandleCurrentChange", {
        pageNo: val
      });
    }
  },
  mounted() {
    let that = this;
    that.$emit("sonHandleCurrentChange", {
      pageSize: 10,
      pageNo: 1
    });
  }
};
</script>



