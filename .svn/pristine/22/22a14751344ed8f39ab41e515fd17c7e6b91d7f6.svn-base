<!-- 下行列表页 -->
<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>服务机构管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>服务机构管理</h3>
        </el-col>
      </el-row>
      <div class="main-container">
        <!-- 查询 -->
        <el-form :inline="true" :model="formData" ref="formData" class="hardware-form">
          <el-form-item label="企业名称:" prop="orgName" :label-width="labelWidth">
            <el-input placeholder="请输入企业名称" v-model.trim="formData.orgName"></el-input>
          </el-form-item>

          <el-form-item label="合作模式:" :label-width="labelWidth">
            <el-select placeholder="请选择" filterable v-model.trim="formData.province">
              <el-option
                v-for="item in cooperationModelData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="服务状态:" :label-width="labelWidth">
            <el-select placeholder="请选择" filterable v-model.trim="formData.province">
              <el-option
                v-for="item in serviceStateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="运营中心:" :label-width="labelWidth">
            <el-select placeholder="请选择" filterable v-model.trim="formData.province">
              <el-option
                v-for="item in opCenterData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" class="serch-btn">
            <el-button type="primary" size="small" @click="lookFor()">查询</el-button>
            <el-button size="small" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <div class="list-wrap">
          <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
            <el-table-column label="企业名称" width="290" prop="serviceUnitName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="合作模式" prop="serviceUnitJoinModelText" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="所属运营中心" prop="subCenterName" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="服务状态" prop="dataStatusText" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-link type="primary" style="color: #999999;" v-if="checkState(scope.row.dataStatus)">启用</el-link>
                <el-link type="primary" v-if="!checkState(scope.row.dataStatus)" @click="startClick(scope.row)">启用</el-link>
                <el-link type="primary" v-if="!checkState(scope.row.dataStatus)" style="color: #999999;">停用</el-link>
                <el-link type="primary" v-if="checkState(scope.row.dataStatus)" @click="stopClick(scope.row)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <Pagination :widgetInfo="widgetInfo" v-on:sonHandleCurrentChange="sonHandleCurrentChange" />
        </div>
      </div>
    </div>

<!--    <el-dialog :title="optTitle" :visible.sync="dialogVisible" width="1000px">-->
<!--      <div class="dialog-body-diy-wrapper">-->
<!--        <el-form-->
<!--          class="dialog-form-style"-->
<!--          :label-position="labelPosition"-->
<!--          label-width="120px"-->
<!--          :rules="rules"-->
<!--          ref="plan"-->
<!--          :model="plan" >-->
<!--          <el-row>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="运营中心名称" prop="">-->
<!--                <el-input v-model.trim="plan.orgName" maxlength="16"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="服务区域" prop="">-->
<!--                <el-cascader style="width: 100%;"-->
<!--                  v-model="value"-->
<!--                  :options="serviceArea"-->
<!--                  :props="{ expandTrigger: 'hover' ,checkStrictly: true }"-->
<!--                  @change="handleChange">-->
<!--                </el-cascader>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="运营中心类型" prop="">-->
<!--                <el-select style="width: 100%;" v-model="plan.joinType" placeholder="请选择">-->
<!--                  <el-option-->
<!--                    v-for="item of center_type"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="联系地址" prop="">-->
<!--                <el-cascader style="width: 100%;"-->
<!--                     v-model="value1"-->
<!--                     :options="serviceArea"-->
<!--                     :props="{expandTrigger: 'hover',checkStrictly: true }"-->
<!--                     @change="handleChange">-->
<!--                </el-cascader>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="详细地址" prop="">-->
<!--                <el-input v-model.trim="plan.unitAddress" maxlength="16"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="联系人" prop="">-->
<!--                <el-input v-model.trim="plan.contactPerson" maxlength="16"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="联系电话" prop="">-->
<!--                <el-input v-model.trim="plan.contactPersonTel" maxlength="11"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="是否提供监测服务" prop="">-->
<!--                <el-radio-group v-model="plan.monitorServiceStatus">-->
<!--                  <el-radio :label="1">是</el-radio>-->
<!--                  <el-radio :label="0">否</el-radio>-->
<!--                </el-radio-group>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="24">-->
<!--              <el-form-item label="合同上传" prop="">-->
<!--                <el-table :show-header="false"-->
<!--                          :data="plan.operationOrgAttachment">-->
<!--                  <el-table-column property="attachmentName"></el-table-column>-->
<!--                  <el-table-column width="105">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-button type="primary"  @click="downloadFile(scope.row)">查看</el-button>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                </el-table>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-form>-->
<!--      </div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="handleClose">取 消</el-button>-->
<!--        <el-button type="primary" @click="saveOrUpdateForm('plan')">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

  </div>
</template>

<script>
  import Pagination from "~/components/Pagination";
  export default {
    components: {
      Pagination,
    },
    data() {
      return {
        flag: false,
        isLoading: false,
        labelWidth: "100px",

        formData: {},

        tableData: [],
        loading: true,
        pageNo: 1,
        pageSize: 6,
        total: 0,

        widgetInfo: {
          pageSize: 6,
          pageNo: 1,
          total: 0
        },

        indexNum: 0,
        userId:null,//用户id
        parentTypeNameList:[],//角色
        plan:{},
        dialogVisible: false, //新增弹出
        labelPosition: "top",
        optTitle:null,
        optMode: null,

        rules:{
          parentCode:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        },
        // 运营中心类型
        center_type : [{
          value: '0',
          label: '直营'
        },
          {
            value: '1',
            label: '加盟'
          }
        ],
        //服务区域数据
        serviceArea:[],
        onlineStates:[],
        value: [],
        value1: [],

        //服务机构管理
        cooperationModelData:[
          {
              value: '',
              label: '全部'
          },
          {
              value: '0',
              label: '签约型'
          },
          {
              value: '1',
              label: '非签约型'
          }
        ],
          // 服务状态
          serviceStateData : [
              {
                  value: '',
                  label: '全部'
              },
              {
                  value: '9',
                  label: '待启用'
              },
              {

                  value: '0',
                  label: '已启用'
              },
              {
                  value: '1',
                  label: '已停用'
              },
          ],
          opCenterData:[
              {
                  value: '',
                  label: '全部'
              }
          ],
      };
    },
    created() {
      this.findAllSubCenterCode();
    },
    computed: {

    },
    methods: {
        // 查询全部运营中心
      findAllSubCenterCode(){
        this.isLoading = true;
        this.$axios
            .$POST_NEW({
                api_name: "findAllSubCenterCode",
            })
            .then(res => {
                if (res.data.code == "success") {
                    this.isLoading = false;
                    var list = [];
                    list = res.data.data;
                    for (var key in list) {
                        var temp = {};
                        temp.value = list[key].value;
                        temp.label = list[key].label;
                        this.opCenterData.push(temp);
                    }
                } else {
                    this.opCenterData = [
                        {
                            value: '',
                            label: '全部'
                        }
                    ];
                }
            });
      },
      //获取数据
      findMonitorDeviceStateDownList() {
        this.isLoading = true;
        this.$axios
          .$POST_NEW({
            api_name: "queryOperationOrgList",
            params: {
              orgName:this.formData.orgName,
              province:this.formData.province,
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
              this.widgetInfo.list = data.rows;
              this.widgetInfo.total = 0;
            }
          });
      },
      //分页
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = widgetInfo.pageSize
          ? parseInt(widgetInfo.pageSize)
          : this.widgetInfo.pageSize;
        this.widgetInfo.pageNo = widgetInfo.pageNo
          ? parseInt(widgetInfo.pageNo)
          : this.widgetInfo.pageNo;
        this.findMonitorDeviceStateDownList();
      },

      //编辑
      editClick(orgCode){
        const that = this;
        that.dialogVisible = true;
        that.$nextTick(() => {
          that.plan = {};
          that.$refs["plan"].resetFields();
        });
        //编辑
        that.optTitle = "编辑";
        that.plan = {};

        that.$axios
          .$POST_NEW({
            api_name: "queryOperationOrgByOrgCode",
            params: {
              'orgCode': orgCode
            },
            time: 30000
          })
          .then(res => {
            if (res.data.code == "success") {
              that.plan = JSON.parse(JSON.stringify(res.data.data));
              console.log("======"+that.plan.monitorServiceStatus);
              if (that.serviceArea.length == 0){
                that.findserviceArea();
              } else {
                that.value.push(that.plan.province);
                that.value.push(that.plan.city);
                that.value1.push(that.plan.province);
                that.value1.push(that.plan.city);
                that.value1.push(that.plan.contactCounty);
              }
              that.$refs["plan"].resetFields();
            } else {
              that.$message.error('获取运营中心信息失败');
            }
          });
    },
      //改变运营中心状态
      changeState(orgCode){
        var that = this;
        var updateUser = this._Storage.getObj("userObj", "userObj").id;
        this.$confirm('确认启用运营中心服务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isLoading = true;
          this.$axios
            .$POST_NEW({
              api_name: "updateOperationOrgServerStatusByOrgCode",
              params: {
                'orgCode': orgCode,
                'updateUser': updateUser
              }
            })
            .then(res => {
              this.isLoading = false;
              this.$message.success(res.data.message);
              if (res.data.code == 'success') {
                that.lookFor();
              }
            });
        })

      },
      //重置
      reset() {
        this.formData = {};
        this.findMonitorDeviceStateDownList();
      },
      //查询
      lookFor() {
        this.findMonitorDeviceStateDownList();
      },

      //关闭弹框
      handleClose(){
        const that = this;
        that.dialogVisible = false;
        that.$nextTick(() => {
          that.plan={}
          that.$refs["plan"].resetFields();
        });
      },

      checkState: function (state) {
          if(state=='0'){
              return state;
          }else {
              return null;
          }
      },

      handleChange() {
        console.log(JSON.stringify(this.value));
        console.log(JSON.stringify(this.value1));
      },

      //启用按钮
      startClick: function (row) {
          var that = this;
          this.$confirm('确认停用企业?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.isLoading = true;
              this.$axios
                  .$POST_NEW({
                      api_name: "enableServiceUnit",
                      params: {
                          serviceUnitId: row.id,
                          operateType: '1',
                          serviceId: row.serviceUnitId,
                          serviceUnitCode: row.serviceUnitId,
                          orgCode: row.subCenterCode,
                          serviceUnitName: row.serviceUnitName,
                          subCenterName: row.subCenterName
                      }
                  })
                  .then(res => {
                      this.isLoading = false;
                      this.$message.success(res.data.message);
                      if (res.data.code == 'success') {
                          that.lookFor();
                      }
                  });
          })
      },

      //停用按钮
      stopClick: function (row) {

      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "~/assets/css/list.scss";
  /*/deep/.el-table {*/
  /*  .el-table__body-wrapper {*/
  /*    //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px*/
  /*    height: calc(*/
  /*      100vh - 90px - 64px - 20px - 65px - 76px - 85px - 82px*/
  /*    ) !important;*/
  /*  }*/
  /*}*/
  .add-btn-style {
    text-align: right;
    padding-right: 25px;
    box-sizing: border-box;
  }
  .hardware-form{
    padding: 20px 25px 0 25px;
  }
  .list-wrap {
    //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
    height: calc(100vh - 90px - 64px - 20px - 65px - 76px);
    overflow: hidden;
    /deep/.el-table {
      padding: 0;
      overflow: hidden;
      th {
        background: rgba(240, 243, 247, 1);
      }
      .el-table__body-wrapper {
        //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
        height: calc(100vh - 90px - 64px - 20px - 65px - 76px - 85px - 48px);
        overflow-y: auto;
      }
    }
  }
</style>
