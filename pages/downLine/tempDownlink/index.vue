<template>
  <div class="DialogStockWrap" id="tempDownLink">
    <el-dialog
      title="临时下行"
      :visible.sync="tempDownlinkVisible"
      :lock-scroll="lockScroll"
      width="1050px"
      :before-close="cancelHandel"
      :close-on-click-modal="clickModalFlag"
      :close-on-press-escape="clickModalFlag">
      <div class="tempDownlink-mian">
        <el-form :inline="true"
                 :model="formData"
                 ref="formData"
                 :label-position="labelPosition"
                 :label-width="labelWidth"
                 :rules="rules"
                 class="hardware-form">
          <el-form-item label="设备ID:" prop="deviceId">
            <el-input placeholder="请输入100以内字符"
                      v-model.trim="formData.deviceId"
                      maxlength="100"
                     ></el-input>
          </el-form-item>
          <el-form-item label="用传编码:" prop="controlHost">
            <el-input placeholder="请输入100以内字符"
                      v-model.trim="formData.controlHost"
                      maxlength="100"
                      ></el-input>
          </el-form-item>
          <el-form-item label="厂家:" prop="sourceId">
            <el-select placeholder="全部"
                       v-model.trim="formData.sourceId"
                       @change="getBrandList">
              <el-option v-for="item in sourceIdList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌:" prop="">
            <el-select placeholder="全部"
                       v-model.trim="formData.brand"
                       @change="changeBrand">
              <el-option v-for="item in brands"
                         :key="item.brand"
                         :label="item.brand"
                         :value="item.brand"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="型号:"
                        prop="">
            <el-input placeholder="请输入100以内字符"
                      v-model.trim="formData.model"
                      maxlength="100"
                      ></el-input>
          </el-form-item>
          <el-form-item label="协议号:" prop="">
            <el-input placeholder="请输入100以内字符"
                      v-model.trim="formData.deviceVersion"
                      maxlength="100"
                     ></el-input>
          </el-form-item>

          <el-form-item label="  " class="serch-btn">
            <el-button type="primary" size="small" @click="look">查询</el-button>
            <el-button type="success" size="small"
                       v-loading.fullscreen.lock="fullscreenLoading"
                       :disabled="submitFlag"
                       @click="addData">录入数据</el-button>
            <el-button size="small" @click="restForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <div class="">
          <div class="dialog-list-wrap">
            <el-table v-loading.lock="isLoading" :data="tableData" stripe show-overflow-tooltip>
              <el-table-column label="设备id" prop="deviceId" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="用传编码" prop="controlHost" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="品牌" prop="brand" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="协议号" prop="deviceVersion" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="型号" prop="deviceVersion" show-overflow-tooltip min-width="8%"></el-table-column>
              <el-table-column label="录入时间" prop="createTime" show-overflow-tooltip min-width="12%"></el-table-column>
              <el-table-column label="数据库协议/参数"
                               prop="exist"
                               min-width="8%"
                               show-overflow-tooltip
                               align="center">
                <template slot-scope="scope"
                          v-if="scope.row.sourceId =='hnla' || scope.row.sourceId =='bjlnUDP'">
                  <div>{{scope.row.exist=='0'?'' :'已存在'}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" show-overflow-tooltip align="center"  min-width="15%">
                <template slot-scope="scope">
                  <el-link type="primary" @click="deleteHardwareType(scope.$index,scope.row)" >删除</el-link>
<!--                  <el-link type="primary" @click="toDetail(scope.$index, scope.row)">下行</el-link>-->
                  <template v-if="scope.row.sourceId ==='hnla' || scope.row.sourceId ==='bjlnUDP'">
                    <el-link type="primary"
                             v-show="scope.row.exist==0"
                             @click="getParameterTemp(scope.row, scope.$index)">获取协议/参数</el-link>
                    <el-link type="primary"
                             v-show="scope.row.exist==1"
                             @click="toDetail(scope.$index, scope.row)">下行</el-link>
                  </template>
                  <template v-if="scope.row.sourceId=='tanZer' || scope.row.sourceId=='ckCoap'">
                    <el-link type="primary"
                             @click="toDetail(scope.$index, scope.row)">下行</el-link>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <Pagination
            :widgetInfo="widgetInfo"
            v-on:sonHandleCurrentChange="sonHandleCurrentChange"
          />
          <div class="" style="height: 10px"></div>
        </div>
      </div>
    </el-dialog>
    <!--    删除  弹框-->
    <el-dialog custom-class="del-dialog-wrap"  :visible.sync="dialogDelVisible" width="280px">
      <div class="del-dialog-main">
        <div class="icon-wrap">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="p-wrap">
          <p class="title-p">是否确定删除？</p>
          <p class="tips-p">删除后将不可恢复</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureHandle">确 定</el-button>
         <el-button @click="cancalHandle">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Pagination from "~/components/Pagination";
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        id:null,
        submitFlag:false,
        tempDownlinkVisible: false, //弹框显示标识
        labelPosition:'top',
        lockScroll:true,
        clickModalFlag:false,//不通过遮罩层关闭
        fullscreenLoading:false,
        dialogDelVisible:false,
        labelWidth:'90px',
        formData:{
          brand:'',
          sourceId: '',
          deviceVersion:'',
          deviceId:''
        },
        brands: [],
        sourceIdList:[],
        widgetInfo: {
          pageSize: 10,
          pageNo: 1,
          total: 0
        },
        tableData: [], //table查询结果
        isLoading: false,
        rules:{
          deviceId:[
            { required: true, message: '设备id不能为空', trigger: 'blur'},
          ],
          controlHost:[
            { required: true, message: '用传编码不能为空', trigger: 'blur' }
          ],
          sourceId:[
            { required: true, message: '厂家不能为空', trigger: 'blur' },
          ]
        }
      };
    },
    mounted() {
      const that = this;
    },
    methods: {
      getParameterTemp(row,index){
        const that = this;
        that.$emit('tempDnLinkFn',row,index)
      },
      /**
       * 获取厂家列表
       */
      getSourceList(){
        const that = this;
        that.$axios
          .$POST({
            api_name: "getSourceIdList"
          })
          .then(res => {
            if (res.data.code == "success") {
              let data = res.data.data;
              if(data){
                that.sourceIdList = data;
              }
            } else {
              that.sourceIdList = [];
              that.$message.error(res.data.rspMsg || res.data.message);
            }
          });
      },
      /**
       * 获取品牌列表
       */
      getBrandList(){
        const that = this;
        that.formData.brand = '';
        that.$axios
          .$POST({
            api_name: "getBrandList",
            params: {
              sourceId: that.formData.sourceId
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              let data = res.data.data;
              if(data){
                that.brands = data;
              }
            } else {
              that.brands = [];
              that.$message.error(res.data.rspMsg || res.data.message);
            }
          });
      },
      /**
       * 品牌切换时
       */
      changeBrand(){
        var that = this;
        var souceId = '';
        souceId = that.brands.find(item=>item.brand==that.formData.brand).sourceId;
        return that.formData.sourceId = that.sourceIdList.find(item=>item.value==souceId).value;
        //that.allUnitList.find(item=>item.value==that.allUnitListVal).subCenterCode;
      },
      /**
       * 下行
       * @param index
       * @param row
       */
      toDetail (index, row) {
        //跳转到详情
        console.log('11',row)
        this._Storage.setObj("downListRow", "obj", row);
        this.$router.push({
          name: "downLine-downlinkControlDetail",
          params: {
            row: row
          }
        });
      },
      /**
       * 删除弹框
       * @param index
       * @param row
       */
      deleteHardwareType(index,row) {
        const that = this;
        that.dialogDelVisible = true;
        that.id = row.id;
      },
      /**
       * 删除确定按钮
       */
      sureHandle(){
        const that = this;
        that.isLoading = true;
        that.$axios
          .$POST({
            api_name: "deleteTemporaryDownDeviceById",
            params: {
              id: that.id
            }
          })
          .then(res => {
            that.isLoading = false;
            if (res.data.code == "success") {
              that.isLoading = false;
              that.dialogDelVisible = false;
              that.$message({
                message: res.data.rspMsg,
                type: 'success'
              });
              that.findTemporaryDownDeviceList('load');
            } else {
              that.isLoading = false;
              that.$message.error(res.data.rspMsg);
            }
          }).catch(err=>{
          this.$message({
            message: err,
            type: 'warning'
          });
        });
      },
      /**
       * 删除取消按钮
       */
      cancalHandle(){
        const that = this;
        that.dialogDelVisible = false;
        this.$message('取消删除操作');
      },
      /**
       * 临时下行显示
       * @param param
       */
      initTempDownLink() {
        const that = this;
        that.tempDownlinkVisible = true;

        //that.outStockFormData = {};
        that.$nextTick(() => {
          that.findTemporaryDownDeviceList('search');
          that.getSourceList();//厂家显示
          that.getBrandList();//品牌显示
          that.$refs["formData"].clearValidate();
          // that.$refs["formData"].resetField();
          // let tempDownLink = document.getElementById('tempDownLink');
          // tempDownLink.getElementsByClassName('el-dialog__body')[0].scrollTop = 0;
        });
      },
      /**
       * 临时下行取消按钮
       */
      cancelHandel(){
        const that = this;
        that.formData={
            brand:'',
            sourceId: "",
            deviceVersion:'',
            deviceId:'',
            model:''
        },
        that.tempDownlinkVisible = false;
      },
      /**
       * 分页
       * @param widgetInfo
       */
      sonHandleCurrentChange(widgetInfo) {
        this.widgetInfo.pageSize = widgetInfo.pageSize
          ? parseInt(widgetInfo.pageSize)
          : this.widgetInfo.pageSize;
        this.widgetInfo.pageNo = widgetInfo.pageNo
          ? parseInt(widgetInfo.pageNo)
          : this.widgetInfo.pageNo;
        this.findTemporaryDownDeviceList('load');
      },
      /**
       * 临时下行的列表
       * @param pagenoFlag
       */
      findTemporaryDownDeviceList(pagenoFlag,other) {
        const that = this;
        that.isLoading = true;
        if(pagenoFlag=='search'){
          that.widgetInfo.pageNo = 1;
        }
        that.$axios
          .$POST({
            api_name: "findTemporaryDownDeviceList",
            params: {
              deviceId: other?'':that.formData.deviceId,
              controlHost: other?'':that.formData.controlHost,
              deviceVersion: other?'':that.formData.deviceVersion,
              model:other?'':that.formData.model,
              brand:other?'':that.formData.brand,
              sourceId:other?'':that.formData.sourceId,
              pageNo: that.widgetInfo.pageNo,
              pageSize: that.widgetInfo.pageSize
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              that.isLoading = false;
              let data = res.data.data;
              if(data){
                that.tableData = data.rows;
                that.widgetInfo.total = data.total === null ? 0 : data.total;

              }
            } else {
              that.isLoading = false;
              that.tableData = [];
              that.widgetInfo.list = res.data.data;
              that.widgetInfo.total = 0;
              that.$message.error(res.data.rspMsg || res.data.message);
            }
          });
      },

      /**
       * 新增设备
       */
      addTemporaryDownDevice(){
        const that = this;
        that.fullscreenLoading = true;
        that.$axios
          .$POST({
            api_name: "addTemporaryDownDevice",
            params: {
              deviceId: that.formData.deviceId,
              controlHost: that.formData.controlHost,
              brand: that.formData.brand,
              deviceVersion: that.formData.deviceVersion,
              sourceId: that.formData.sourceId,
              model:that.formData.model,
            },
            time:'60000'
          })
          .then(res => {
            if (res.data.code == "success") {
              that.fullscreenLoading = false;
              that.$message({
                message: res.data.rspMsg,
                type: 'success'
              });
              that.findTemporaryDownDeviceList('search','sx');
            } else {
              that.fullscreenLoading = false;
              that.$message.error(res.data.rspMsg || res.data.message);
            }
          });
      },
      /**
       * 重置
       */
      restForm(){
        const that = this;
        that.formData={
            brand:'',
            sourceId: "",
            deviceVersion:'',
            deviceId:'',
            model:'',
            controlHost:''
        }
        that.$nextTick(() => {
          that.$refs["formData"].resetFields();
        });
        that.findTemporaryDownDeviceList('search');
      },
      /**
       * 查询
       */
      look(){
        const that = this;
        that.$nextTick(() => {
          that.$refs["formData"].clearValidate();
        });
        that.findTemporaryDownDeviceList();
      },

      /**
       * 验证设备id是否存在
       */
      addData(){
        const that = this;
        that.$refs.formData.validate((valid) => {
          if (valid) {
            that.$axios
              .$POST({
                api_name: "checkTemporaryDownDeviceByDeviceId",
                params: {
                  deviceId: that.formData.deviceId,
                  sourceId: that.formData.sourceId
                }
              })
              .then(res => {
                if (res.data.code == "success") {
                  if(res.data.data){
                    that.$message.error('设备已存在');
                  }else{
                    that.addTemporaryDownDevice();
                  }

                } else {
                  that.$message.error(res.data.rspMsg||res.data.message);
                }
                that.submitFlag = true;
                setTimeout(function () {
                  that.submitFlag = false;
                },2000)
              }).catch(err=>{
              this.$message({
                message: err,
                type: 'warning'
              });
            });
          }
        })
      }
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .tempDownlink-mian{
    height: auto;
    max-height: 450px;
    /deep/.el-form .el-form-item__content{
       width: 100%;
    }
  }
  /deep/.el-loading-mask{
    background-color: rgba(255,255,255,.5);
  }
  .hardware-form{
    padding-top: 0;
  }
  /deep/.el-form--label-top .el-form-item__label{
   padding: 0;
    height: 36px;
    display: block;
  }
 .dialog-list-wrap {
   height: 200px;
   overflow: hidden;

   /deep/ .el-table {
     padding: 0;
     overflow: hidden;

     th {
       background: rgba(240, 243, 247, 1);
     }

     .el-table__body-wrapper {
       height: 150px !important;
       overflow-y: auto;
     }
   }
 }
  .serch-btn{
     width: 400px;
  }
</style>

