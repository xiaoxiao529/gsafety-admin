<!--
 * @Descripttion:
 * @version:
 * @Author: yangxq
 * @Date: 2019-07-26 17:58:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-08-09 15:19:08
 -->
<template>
  <div class="downlinkControlRecord">
    <el-container class="main-body">
      <el-aside width="220px" class="aside-wrap">
        <div class="aside-main-header">
          记录类型
        </div>
        <ul class="aside-main-panel">
          <li v-for="item of setType"
              :key="item.id"
              :class="item.id==currentCode ? 'type-item active' : 'type-item' "
              @click="changeHandel(item)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <div class="right-main">
          <div class="list-wrap" v-if="currentCode == '1'" key="one">
            <el-table v-loading.lock="isLoading"
                      :data="tableData"
                      stripe
                      show-overflow-tooltip>
              <el-table-column label="下行时间"
                               prop="createdTime"
                               show-overflow-tooltip />
              <el-table-column label="操作人"
                               prop="createdBy"
                               show-overflow-tooltip />
              <el-table-column label="操作"
                               prop="returnResult"
                               show-overflow-tooltip />
            </el-table>
          </div>
          <div class="list-wrap" v-if="currentCode == '2'"  key="two">
            <el-table v-loading.lock="isLoading"
                      :data="tableData"
                      stripe
                      show-overflow-tooltip>
              <el-table-column label="下行时间"
                               prop="createdTime"
                               show-overflow-tooltip />
            <el-table-column label="返回结果"
                             prop="returnResult"
                             show-overflow-tooltip />
            <el-table-column label="变更后参数"
                             show-overflow-tooltip
                             align="center">
              <template slot-scope="scope">
                <div class="look-btn">
                  <el-link type="primary"
                           :disabled="!scope.row.afterChangeData"
                           @click="look(scope.$index,scope.row)">查看</el-link>
                </div>
              </template>
            </el-table-column>
            </el-table>
          </div>
          <Pagination :widgetInfo="widgetInfo"
                      v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
      </el-container>
    </el-container>


    <el-dialog title="变更前后参数"
               :visible.sync="outerVisible"
               :width="dialogWidth">
      <div :class="['parameter-wrap',{ bjlnUDP: sourceId=='bjlnUDP' } ]">
        <div class="block after">
          <div class="parameter-box">
            <downlineRecordCKSY :CKSY="CKSYAfterChangeData" v-if="loadSurvey && sourceId=='ckCoap'" />
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="mask"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "~/components/Pagination";
  import downlineRecordCKSY from "~/components/downlineRecordCKSY";
  export default {
    components: {
      Pagination,
      downlineRecordCKSY
    },
    data () {
      return {
        findFlag:false,
        isLoading: false,
        dialogWidth: "630px",
        sourceId: "",
        tableData: [],
        menuKey: 0,
        outerVisible: false,
        HnlaData: [],
        BjlnUDP: [],
        HnlaBeforeChangeData: [],
        HnlaAfterChangeData: [],
        BjlnUDPBeforeChangeData: [],
        BjlnUDPAfterChangeData: [],
        CKSYBeforeChangeData : [],
        CKSYAfterChangeData :[],
        widgetInfo: {
          pageSize: 10,
          pageNo: 1,
          total: 0
        },
        currentCode:"1",
        setType:[{
           name:'操作',
           id:'1'
        },{
          name:'设备反馈',
          id:'2'
        }],
        loadSurvey: false
      };
    },
    computed: {
      fromParent () {
        return this._Storage.getObj("downListRow", "obj");
      }
    },
    mounted () {
      this.sourceId = this.fromParent.sourceId;
      if (this.fromParent.sourceId == "bjlnUDP") {
        this.dialogWidth = "800px";
      } else {
        this.dialogWidth = "630px";
      }
    },
    watch: {
      menuKey () {
        this.menuKey++;
      }
    },
    methods: {
      getTableData (type) {
        this.isLoading = true;
        this.$axios
          .$POST({
            api_name: "findHardwareDeviceControlRecordList",
            params: {
              controlHost: this.fromParent.controlHost,
              sourceId: this.fromParent.sourceId,
              recordType:type || '1',
              pageNo: this.widgetInfo.pageNo,
              pageSize: this.widgetInfo.pageSize
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              this.isLoading = false;
              var data = res.data.data;
              this.tableData = data.rows;
              this.widgetInfo.total = data.total === null ? 0 : data.total;
            } else {
              this.tableData = [];
              this.widgetInfo.list = res.data.rows;
              this.widgetInfo.total = 0;
              console.log("没有数值。。。。。");
            }
          });
      },
      handleClose (done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => { });
      },
      look (index, row) {
        this.outerVisible = true;
        this.HnlaBeforeChangeData = [];
        this.HnlaAfterChangeData = [];
        this.BjlnUDPBeforeChangeData = [];
        this.BjlnUDPAfterChangeData = [];
        this.CKSYBeforeChangeData = [];
        this.CKSYAfterChangeData = [];
        console.log(row.beforeChangeData);
        if (this.fromParent.sourceId === "hnla"){
          if (row.beforeChangeData) {
            this.HnlaBeforeChangeData = JSON.parse(row.beforeChangeData);
          }
          if (row.afterChangeData) {
            this.HnlaAfterChangeData = JSON.parse(row.afterChangeData);
          }
        }

        if (this.fromParent.sourceId === "bjlnUDP"){
          if (row.beforeChangeData) {
            this.BjlnUDPBeforeChangeData = JSON.parse(row.beforeChangeData);
          }
          if (row.afterChangeData) {
            this.BjlnUDPAfterChangeData = JSON.parse(row.afterChangeData);
          }
        }
        if (this.fromParent.sourceId === "ckCoap"){
          if (row.beforeChangeData) {
            this.CKSYBeforeChangeData = JSON.parse(row.beforeChangeData);
          }
          if (row.afterChangeData) {
            this.CKSYAfterChangeData = JSON.parse(row.afterChangeData);
          }

        }
        this.loadSurvey = false;
        this.$nextTick(() => {
          this.loadSurvey = true;
        });
      },
      /**
       * @Description:下行记录树切换事件
       * @param data（item=>id,name）
       */
      changeHandel(data){
        const that = this;
        that.widgetInfo={
           pageSize: 10,
           pageNo: 1,
           total:0
        }
        that.currentCode = data.id;
        that.getTableData(that.currentCode);
        console.log(that.currentCode)
      },
      sonHandleCurrentChange (widgetInfo) {
        //分页
        this.widgetInfo.pageSize = widgetInfo.pageSize
          ? parseInt(widgetInfo.pageSize)
          : this.widgetInfo.pageSize;
        this.widgetInfo.pageNo = widgetInfo.pageNo
          ? parseInt(widgetInfo.pageNo)
          : this.widgetInfo.pageNo;
        this.getTableData(this.currentCode);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~/assets/css/list.scss";
  .list-wrap {
    /deep/.el-table {
      .el-table__body-wrapper {
        height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 35px);
      }
    }
  }
  /deep/.el-dialog__wrapper .el-dialog__body {
    max-height: 550px;
  }
  .parameter-wrap {
    position: relative;
    .red {
      color: red;
    }
    .block {
      display: inline-block;
      width: 257px;
      margin-left: 20px;

      &.after {
        margin-left: 40px;
      }
      h3 {
        text-align: center;
        font-weight: 400;
        color: rgba(28, 119, 255, 1);
        margin: 10px 0;
        span {
          padding-bottom: 5px;
          display: inline-block;
          border-bottom: 2px solid rgba(28, 119, 255, 1);
        }
      }
    }
    .parameter-box-item {
      padding: 5px 10px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #a5adb8;
      .number {
        color: #25282e;
      }
    }
    .line {
      position: absolute;
      width: 1px;
      left: 285px;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.16);
    }
  }
  .parameter-wrap.bjlnUDP {
    .red {
      color: red;
    }
    .block {
      float: left;
      width: 340px;
      &.before {
        width: 340px;
      }
      &.after {
      }
      h3 {
        span {
        }
      }
    }
    .parameter-box-item {
      .number {
      }
    }
    .line {
      left: 367px;
    }
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
    top: 0;
    bottom: 0;
    left: 0;
  }
  .look-btn {
    .el-link.el-link--primary.is-disabled {
      color: #cccccc;
    }
  }
  .main-body{
    height: calc(100vh - 90px - 64px - 20px - 65px);
    .el-main{
      padding: 0px 15px 10px 15px;
      .el-checkbox{
        margin-bottom: 10px;
      }
      .card-body{
        padding-top: 15px;
      }
    }
    .aside-wrap{
      border-right: 1px solid #dcdcdc;
      .aside-main-header{
        font-size: 16px;
        padding: 9px 20px 8px;
        border-bottom: 1px solid #dcdcdc;
        line-height: 30px;
        font-weight: bold;
      }
      .type-item{
        padding: 10px 20px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        display: block;
        border-left: 3px solid #fff;
        user-select: none;
        cursor: pointer;
        &.active{
          border-left: 3px solid #1970ed;
          background: #f9f9f9;
        }
      }
    }
    .right-main{
      width: 100%
    }
  }
  @media screen and (max-width: 1680px) {
    .list-wrap {
      /deep/.el-table {
        .el-table__body-wrapper {
          //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
          height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 15px);
        }
      }
    }
  }
</style>
