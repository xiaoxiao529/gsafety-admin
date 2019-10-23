<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>报表数据</el-breadcrumb-item>
        <el-breadcrumb-item>统计任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <div class="location">
        <el-col :span="12">
          <h3>统计任务</h3>
        </el-col>
      </div>
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true"
                 :model="serchForm"
                 ref="serchForm"
                 class="hardware-form">
          <el-form-item class="oprationUser"
                        label="任务名称:"
                        prop="oprationUser"
                        :label-width="labelWidth">
            <el-input placeholder="请输入任务名称" v-model.trim="serchForm.workName"></el-input>
          </el-form-item>

          <el-form-item label
                        class="serch-btn"
                        style="width:20%">
            <el-button type="primary"
                       size="small"
                       @click="serch()">查询
            </el-button>
            <el-button size="small"
                       @click="rest('serchForm')">重置
            </el-button>
          </el-form-item>
        </el-form>
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="任务名称" prop="jobName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="描述" prop="describe" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="任务状态" prop="status" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <div>
                  <el-link type="primary" @click="look(scope.row.jobName,scope.row.jobGroup)">查看记录</el-link>
                  <el-link type="primary" @click="disable(scope.row.jobName,scope.row.jobGroup,scope.row.status)">
                    {{scope.row.status==='正常'?'停用':'启用'}}
                  </el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange"></Pagination>
      </div>
    </div>
    <el-dialog title="任务记录"
               :visible.sync="dialogFormVisible"
               width="1020px">
      <div class="deviceInfoList-wrap"
           id="deviceInfoList_wrap">
        <el-table :data="deviceInfoList"
                  class="deviceInfoList-table"
                  v-loading.lock="dialogIsLoading"
                  stripe
                  show-overflow-tooltip>
<!--          <el-table-column label="任务名称" prop="jobName" show-overflow-tooltip align="center"></el-table-column>-->
          <el-table-column label="文件" prop="recordDescribe" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="计算时间" prop="createTime" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div>
                <el-link type="primary" @click="downloadExcel(scope.row)">下载</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Pagination1 :widgetInfo="widgetInfo1"
                   v-on:sonHandleCurrentChange="sonHandleCurrentChange1"></Pagination1>
    </el-dialog>
  </div>
</template>

<script>
    import Pagination from "~/components/Pagination";
    import Pagination1 from "~/components/Pagination";
    import ApiConfig from "@/config/api";
    export default {
        components: {
            Pagination,
            Pagination1
        },
        data() {
            return {
                isLoading: false,
                dialogIsLoading: false,
                dialogFormVisible: false,
                deviceInfoList: [],
                labelWidth: "100px",
                tableData: [],
                serchForm: {
                    workName:""
                },
                widgetInfo: {
                    pageSize: 10,
                    pageNo: 1,
                    total: 0
                },
                widgetInfo1: {
                    pageSize: 10,
                    pageNo: 1,
                    total: 0
                },
                jobName: "",
                jobGroup: ""
            };
        },
        created() {
            if (process.client) {

            }
        },
        mounted() {
        },
        methods: {
            getTableData() {
                this.isLoading = true;
                this.$axios
                    .$GET_ENTER({
                        api_name: "findAllJob",
                        params: {
                            workName:this.serchForm.workName,
                            pageNo: this.widgetInfo.pageNo,
                            pageSize: this.widgetInfo.pageSize
                        }
                    })
                    .then(res => {
                        this.isLoading = false;
                        if (res.status === 200) {
                            let data = res.data.content;
                            this.tableData = data;
                            this.widgetInfo.total= res.data.total;
                        } else {
                            this.tableData = [];
                            this.widgetInfo.list = res.data;
                        }
                    });
            },

            serch(){
                this.widgetInfo.pageNo = 1;
                this.getTableData();
            },

            look(jobName, jobGroup) {
                let that = this;
                that.dialogFormVisible = true;
                that.jobName = jobName;
                that.jobGroup = jobGroup;
                that.widgetInfo1 = {
                    pageSize: 10,
                    pageNo: 1,
                    total: 0
                };
                that.getDeviceByRecordId(that.jobName, that.jobGroup);
            },

            disable(jobName, jobGroup, status) {
                let that = this;
                that.jobName = jobName;
                that.jobGroup = jobGroup;
                if (status === '正常') { //停用
                    this.$confirm("确认停用该条任务?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        this.$axios
                            .$GET_ENTER({
                                api_name: "pauseJob",
                                params: {
                                    jobName: jobName,
                                    jobGroup: jobGroup,
                                }
                            })
                            .then(res => {
                                if (res.status === 200) {
                                    this.$message.success(res.data);
                                    this.getTableData();
                                } else {
                                    this.$message.error(res.data);
                                }
                            });
                    });
                } else { //启用
                    this.$confirm("确认启用该条任务?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        this.$axios
                            .$GET_ENTER({
                                api_name: "resumeJob",
                                params: {
                                    jobName: jobName,
                                    jobGroup: jobGroup,
                                }
                            }).then(res => {
                            if (res.status === 200) {
                                this.$message.success(res.data);
                                this.getTableData();
                            } else {
                                this.$message.error(res.data);
                            }
                        });
                    });
                }
            },

            getDeviceByRecordId(jobName, jobGroup) {
                let that = this;
                that.dialogIsLoading = true;
                that.deviceInfoList = [];
                that.$axios
                    .$GET_ENTER({
                        api_name: "findRecordByJob",
                        params: {
                            jobName: jobName,
                            jobGroup: jobGroup,
                            pageNo: that.widgetInfo1.pageNo,
                            pageSize: that.widgetInfo1.pageSize
                        }
                    })
                    .then(res => {
                        that.dialogIsLoading = false;
                        if (res.data.code === "success") {
                            that.deviceInfoList = [];
                            let data = res.data.data;
                            for (let key in data.content) {
                                that.deviceInfoList.push(data.content[key])
                            }
                           that.widgetInfo1.total = res.data.data.total;
                        } else {
                            that.deviceInfoList = [];
                            that.widgetInfo1.list = res.data.data.content;
                            that.$message.error(res.data.message);
                        }
                    });
            },

            rest(formName) {
                this.$refs[formName].resetFields();
                this.widgetInfo.pageNo = 1;
                this.serchForm.workName = '';
                this.getTableData();
            },

            sonHandleCurrentChange(widgetInfo) {
                //分页
                this.widgetInfo.pageSize = widgetInfo.pageSize
                    ? parseInt(widgetInfo.pageSize)
                    : this.widgetInfo.pageSize;
                this.widgetInfo.pageNo = widgetInfo.pageNo
                    ? parseInt(widgetInfo.pageNo)
                    : this.widgetInfo.pageNo;
                this.getTableData();
            },
            sonHandleCurrentChange1(widgetInfo) {
                //分页
                this.widgetInfo1.pageSize = widgetInfo.pageSize
                    ? parseInt(widgetInfo.pageSize)
                    : this.widgetInfo1.pageSize;
                this.widgetInfo1.pageNo = widgetInfo.pageNo
                    ? parseInt(widgetInfo.pageNo)
                    : this.widgetInfo1.pageNo;
                this.getDeviceByRecordId(this.jobName, this.jobGroup);
            },
            //下载Excel表格
            downloadExcel(obj){
                let defaults;
                if (process.env.NODE_ENV === "development") {
                    defaults = "/enterprisedata";
                } else {
                    defaults = ApiConfig.apiHost;
                }
                let url = defaults + ApiConfig.api["downloadJobExcel"]+"?jobName="+obj.jobName+
                    "&jobGroup="+obj.jobGroup+"&createTime="+obj.createTime;
                console.log(url);
                this.$confirm("确认下载该文件？")
                    .then(_ => {
                        window.open(url);
                    })
                    .catch(_ => {

                    });
            },
            //时间戳转换(yyyy-mm-dd hh:mm:ss)
            formatftimes(timestamp) {
                if (timestamp === null || timestamp === '' || timestamp === undefined) {
                    return '-';
                }
                if (typeof (timestamp) == "string") {
                    return timestamp;
                }
                if (typeof (timestamp) == "number" && timestamp.toString().length !== 13) {//这里只处理13位的标准时间戳
                    return timestamp;
                }
                let date = new Date(timestamp);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = this.setFormat(date.getDate()) + ' ';
                let h = this.setFormat(date.getHours()) + ':';
                let m = this.setFormat(date.getMinutes()) + ':';
                let s = this.setFormat(date.getSeconds());
                return (Y + M + D + h + m + s);
            },
            //时间位数为1位数时，前面补0
            setFormat(x) {
                if (x < 10) {
                    x = "0" + x;
                }
                return x;
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import "~/assets/css/list.scss";

  .main-wrap {
    /deep/ .el-table {
      .el-icon-arrow-right {
        font-size: 17px;
        font-weight: bold;
        color: #b7b5b5;
      }

      .scope-span {
        margin-right: 15px;
      }

      .el-table__expanded-cell[class*="cell"] {
        padding: 0;

        th {
          background: #e7eaef;
        }

        tr {
          background: rgba(245, 247, 252, 1);
        }
      }
    }

    /deep/ .el-form {
      .el-form-item {
        width: 20%;

        &.DataSelect {
          width: 30%;

          .el-date-editor .el-range__icon,
          .el-date-editor .el-range__close-icon {
            display: none;
          }

          .el-date-editor .el-range-input {
            width: 100%;
          }
        }
      }

      .el-form-item__content {
        width: calc(100% - 100px);
      }
    }
  }

  .deviceInfoList-wrap {
    /deep/ .el-table {
      .el-table__body-wrapper {
        height: auto;
        min-height: 250px;
        overflow-y: auto;
      }
    }
  }

  /deep/ .el-dialog__wrapper {
    overflow: hidden;
  }

  @media screen and (max-width: 1680px) {
    .main-wrap {
      /deep/ .el-form {
        .el-form-item {
          &.DataSelect {
            width: 40%;
          }
        }
      }
    }
  }
</style>
