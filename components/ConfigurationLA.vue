<template>
  <div class="configuration-parameter-wrapper">
    <h3 class="title" v-if="fromParent.sourceId=='hnla'">控制操作</h3>
    <div class="tab-content-detail control-operation" v-if="fromParent.sourceId=='hnla'">
      <el-button size="mini" @click="sendCommand(6,0,'')">复位</el-button>
      <el-button size="mini" @click="sendCommand(6,2,'')">脱扣</el-button>
      <el-button size="mini" @click="sendCommand(6,3,'')">消音</el-button>
      <el-button size="mini" @click="sendCommand(8,'','')">自检</el-button>
      <el-button size="mini" @click="changeIP">变更IP 》</el-button>

      <el-form
        label-position="top"
        :rules="rules"
        ref="ipForm"
        label-width="100%"
        :model="ipForm"
        class="el-form-diy ip"
        v-if="ipShow"
      >
        <el-form-item label prop="ip">
          <el-input v-model.trim="ipForm.ip" placeholder="请输入ip"></el-input>
        </el-form-item>
        <el-form-item label prop="port">
          <el-input
            v-model.trim="ipForm.port"
            placeholder="请输入端口号"
            class="port"
            style="width:150px;margin-right:10px;"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-wrapper">
          <el-button size="mini" @click="ok('ipForm')">确认</el-button>
          <el-button size="mini" @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h3 class="title">
      <span>参数配置</span>

      <i
        class="el-icon-refresh"
        @click="findMonitorDeviceStateExtByMonitorId()"
        style="cursor: pointer;"
      ></i>

      <el-button size="small" style="margin-left:20px;" @click="getLatestParameters">最新参数获取</el-button>
    </h3>

    <div class="tab-content-detail">
      <el-form
        :label-position="labelPosition"
        ref="LAForm"
        label-width="100%"
        :model="formData"
        class="el-form-diy"
      >
        <el-form-item
          v-for="(item,index)  in  allFormData"
          :prop="Object.keys(formData)[index]"
          :rules="[{ required: true , message: '请输入值', trigger: 'blur'}]"
          :label="item.flagName"
          class="switch-show"
          :key="index"
        >
          <div class="item-warpper" v-if="item.flagPara==1">
            <el-input
              placeholder="请输入值"
              v-model.trim="formData[Object.keys(formData)[index]]"
              :disabled="flags[index]?true:false"
              @input="inputFocus(index)"
            >
              <i slot="suffix" class="test-icon-diy">{{item.unit?item.unit:''}}</i>
            </el-input>
            <div class="el-switch-wrap"></div>
          </div>
          <div class="switch-show" v-if="item.flagPara==2" :prop="Object.keys(formData)[index]">
            <el-radio-group
              v-model="formData[Object.keys(formData)[index]]"
              @change="inputFocus(index)"
              :disabled="flags[index]?true:false"
            >
              <el-radio :label="leftRadio[index]">
                <span v-if="item.flag=='5'">三</span>
                <span
                  v-if=" item.flag=='6' || item.flag=='7' || item.flag=='8' || item.flag=='9' || item.flag=='11' || item.flag=='12' "
                >开</span>
                <span v-if=" item.flag=='10'">单相</span>
              </el-radio>
              <el-radio :label="rightRadio[index]">
                <span v-if="item.flag=='5'">四</span>
                <span
                  v-if="item.flag=='6' || item.flag=='7' || item.flag=='8' || item.flag=='9' || item.flag=='11' || item.flag=='12' "
                >关</span>
                <span v-if="item.flag=='10'">三相</span>
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-wrapper">
      <el-button
        type="primary"
        @click="LAsubmit"
        :disabled="handleDisable"
        v-loading.fullscreen.lock="fullscreenloading"
      >确定</el-button>
      <el-button @click="resetForm()">取消</el-button>
      <el-checkbox v-if="batchFlag" @change="laChecked = !laChecked">同时应用到其他设备</el-checkbox>
    </div>
    <!--    批量下行  @laBatchDownLink="LAbatchSubmit"-->
    <batch-downlink  ref="batchDownlink" @laBatchDownLink="LAbatchSubmit"></batch-downlink>
    <!--    提醒  弹框-->
    <el-dialog custom-class="del-dialog-wrap"  :visible.sync="czdialogDelVisible" width="340px">
      <div class="del-dialog-main">
        <div class="icon-wrap">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="p-wrap">
          <p class="title-p">还有未获取协议/参数结构的设备。可能会导致数据展示不全。是否要批量获取协议/参数结构？？</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getAgreementNumber">获取协议号</el-button>
        <el-button @click="directQuery">直接查询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import batchDownlink from "~/pages/downLine/batchDownlink";
export default {
  components: {
    batchDownlink
  },
  props: ["fromParent"],
  data() {
    var _this = this;

    var validator_ip = function(rule, value, callback) {
      /* 校验ip */
      if (value === "") {
        callback(new Error("ip地址不能为空"));
      } else if (!new RegExp(_this.REG_IP).test(value)) {
        callback(new Error("请输入正确格式的ip地址"));
      } else {
        callback();
      }
    };
    var validator_port = function(rule, value, callback) {
      /* 校验端口号 */
      if (value === "") {
        callback(new Error("端口号不能为空"));
      } else if (!new RegExp(_this.REG_PORT).test(value)) {
        callback(new Error("请输入正确格式的端口号"));
      } else {
        callback();
      }
    };
    return {
      batchNumber:{
        monitorIds:[],
        controlHosts:[]
      },
      czdialogDelVisible:false,
      batchFlag:false,
      laChecked:false,
      REG_IP:
        "^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
        "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
        "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
        "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$",
      REG_PORT: "^[1-9][0-9]{0,4}$",
      ip: "",
      port: "",
      ipShow: false,
      handleDisable: false,
      ipForm: {},
      isLoading: false,
      fullscreenloading: false,
      flags: [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0], //是否可编辑   0可编辑  1不可编辑
      leftRadio: ["", "", "", "", "", "3", "1", "1", "1", "", "1", "1", "1"],
      rightRadio: ["", "", "", "", "", "4", "0", "0", "0", "", "3", "0", "0"],
      labelPosition: "top",
      isOpenArr: [],
      measurement: 20,
      data3: {},
      formData: {
        //双向绑定数据
        propData1: "",
        propData2: "",
        propData3: "",
        propData4: "",
        propData5: "",
        propData6: "",
        propData7: "",
        propData8: "",
        propData9: "",
        propData10: "",
        propData11: "",
        propData12: "",
        propData13: ""
      },
      formOld: {
        //存默认值  新旧数据对比
        propData1: "",
        propData2: "",
        propData3: "",
        propData4: "",
        propData5: "",
        propData6: "",
        propData7: "",
        propData8: "",
        propData9: "",
        propData10: "",
        propData11: "",
        propData12: "",
        propData13: ""
      },
      allFormData: [],
      nowType: "",
      nowValue: "",
      formDataString: [],
      rules: {
        wdbjzA: [{ required: true, message: "请输入A相温度", trigger: "blur" }],
        ip: [
          { required: true, message: "请输入ip", trigger: "blur" },
          { required: true, validator: validator_ip, trigger: "blur" }
        ],
        port: [{ required: true, validator: validator_port, trigger: "blur" }]
      }
    };
  },
  computed: {
    ipData() {
      return this.ipForm.ip + "," + this.ipForm.port;
    }
  },
  mounted() {
    this.findMonitorDeviceStateExtByMonitorId();
    this.formDataString = Object.keys(this.formData);
    this.$nextTick(()=>{
      this.batchFlag = (this.fromParent.downType == 1) ? true :false
    })
  },
  methods: {
    /**
     * 批量下行
     * dec: 点击批量下行，判断是否有未获取协议参数的，如果有，就将提示弹框显示。如果没有，批量下发选择框显示
     */
    LAbatchDownlink() {
      const that = this;
      that.fullscreenloading = true;
      this.$axios
        .$POST({
          api_name: "getDeviceInfoByNoVersion",
          params: {
            sourceId: that.fromParent.sourceId,
            deviceTypeId: that.fromParent.deviceTypeId,
            brand: that.fromParent.brand,
            model: that.fromParent.model
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            that.fullscreenloading = false;
            if(res.data.data.length){
              that.czdialogDelVisible = true;
              res.data.data.forEach((item) => {
                that.batchNumber.monitorIds.push(item.id);
                that.batchNumber.controlHosts.push(item.controlHost);
              })
            }else {
              that.fullscreenloading = false;
              that.czdialogDelVisible = false;
              that.directQuery();
            }
          } else {
            that.fullscreenloading = false;
            that.$message({
              message: err,
              type: "warning"
            });
          }
        }).catch(err=>{
        that.$message({
          message: err,
          type: "warning"
        });
      });
    },
    /**
     * 批量获取协议参数
     * dec:点击批量获取协议参数提示框里的，获取协议参数，走bb接口，接口成功后，批量下发选择框显示。
     */
    getAgreementNumber(){
      const that = this;
      that.fullscreenloading = true;
      this.$axios
        .$POSTcs({
          api_name: "hnlaSendDownBatchParam",
          params: {
            sourceId: that.fromParent.sourceId,
            deviceTypeId: that.fromParent.deviceTypeId,
            brand: that.fromParent.brand,
            model: that.fromParent.model,
            operationType:"4",
            operationItemType:"",
            dataValue:"",
            flushThreshold: "1"
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            let tips = `本次操作共${res.data.data.count}条，成功${res.data.data.successNum}条，失败${res.data.data.errorNum}条`;
            that.czdialogDelVisible = false;
            that.$message({
              message: tips,
              type: "success",
              duration:2500
            });
            setTimeout(function () {
              that.fullscreenloading=false;
              that.batchNumber={
                monitorIds:[],
                controlHosts:[]
              }
              that.directQuery();
            },2500)
          } else {
            that.fullscreenloading=false;
            that.czdialogDelVisible = true;
            that.$message({
              message: res.data.message || '操作失败',
              type: "warning"
            });
          }
        }).catch(err=>{
        that.fullscreenloading=false;
        that.$message({
          message: err,
          type: "warning"
        });
      });
    },
    /**
     * 直接查询
     */
    directQuery(){
      const that = this;
      that.czdialogDelVisible=false
      that.$refs.batchDownlink.initLaDownLink();
    },
    /**
     * 确认按钮 ，判断批量复选框是否勾选
     */
    LAsubmit(){
      const that = this;
      that.$refs.LAForm.validate(valid => {
        if (valid) {
          this.laChecked ? this.LAbatchDownlink() : this.submitForm();
        }else{
          console.log("error submit!!");
          return false;
        }
      })
    },
    /**
     * 批量下发确定按钮
     * @constructor
     */
    LAbatchSubmit(val1,val2){
      const that = this;
      that.fullscreenloading=true;
      that.$axios
        .$POST({
          api_name: "hnlaSendDownBatch",
          params: {
            monitorId: val1.join(','),
            controlHost: val2.join(','),
            sourceId: that.fromParent.sourceId,
            operationType:5,
            operationItemType: this.nowType,
            dataValue:this.nowValue,
            flushThreshold: 1
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            that.fullscreenloading=false;
            let tips = `本次操作共${res.data.data.count}条，成功${res.data.data.successNum}条，失败${res.data.data.errorNum}条`;
            that.$message({
              message: tips,
              type: "success",
              duration:2500
            });
            that.$refs.batchDownlink.batchCancelHandel();
          } else {
            that.fullscreenloading=false;
            this.$message({
              message: "批量下发失败",
              type: "error"
            });
            that.$refs.batchDownlink.LaNumClear();
          }
        }).catch(err=>{
        that.fullscreenloading=false;
        that.$refs.batchDownlink.LaNumClear();
        that.$message({
          message: err,
          type: "warning",
          duration:1800
        });
      });
    },
    changeIP() {
      this.ipShow = true;
    },
    reFresh() {
      this.findMonitorDeviceStateExtByMonitorId();
    },
    sendCommand(type1, type2, dataValue, changeIpStart) {
      let that = this;
      this.$axios
        .$POST({
          api_name: "hnlaSendDown",
          params: {
            monitorId: that.fromParent.id,
            controlHost: that.fromParent.controlHost,
            sourceId: that.fromParent.sourceId,
            operationType: type1,
            operationItemType: type2,
            dataValue: dataValue
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            var data1 = res.data.data;
            var returnTitle = data1.returnTitle;
            var layMessage = returnTitle;
            if (!returnTitle) {
              layMessage = data1.message;
            }
            if (data1.statue == "1" && type1 != 9) {
              this.$message({
                message: layMessage || data1.message || res.data.rspMsg,
                type: "success"
              });
            }
            if (type1 == "9" && data1.statue == "1") {
              this.$message({
                message: "20s之后重启",
                type: "success"
              });
              setTimeout(() => {
                this.sendCommandStart("10");
              }, 20000);
            } else if (data1.statue == "2" || data1.statue == "5") {
              this.$message({
                message: layMessage || data1.message || res.data.rspMsg,
                type: "error"
              });
            } else if (data1.statue == "3") {
              this.$message({
                message: layMessage || data1.message || res.data.rspMsg,
                type: "warning"
              });
            }
          } else {
            console.log("失败");
          }
        });
    },
    sendCommandStart(type1, type2, dataValue, changeIpStart) {
      let that = this;
      this.$axios
        .$POST({
          api_name: "hnlaSendDown",
          params: {
            monitorId: that.fromParent.id,
            controlHost: that.fromParent.controlHost,
            sourceId: that.fromParent.sourceId,
            operationType: type1,
            operationItemType: type2,
            dataValue: dataValue
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            this.$message({
              message: "重启成功",
              type: "success"
            });
          } else {
            console.log("失败");
          }
        });
    },
    findMonitorDeviceStateExtByMonitorId() {
      //硬件平台-根据监测设备ID获取设备阈值信息---立安
      this.flags = [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
      let that = this;
      this.$axios
        .$POST({
          api_name: "findMonitorDeviceStateExtByMonitorId",
          params: {
            monitorId: that.fromParent.id,
            sourceId: that.fromParent.sourceId
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            that.allFormData = JSON.parse(res.data.data.thresholdValue);
            for (var i = 0; i < that.allFormData.length; i++) {
              var temp = that.allFormData[i];
              that.formData[Object.keys(that.formData)[i]] = temp.measurement;
              that.formOld[Object.keys(that.formOld)[i]] = temp.measurement;
            }
          } else {
            console.log("失败");
          }
        });
    },

    inputFocus(i) {
      //聚焦点击
      this.flags = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      this.flags[i] = 0;
    },
    ok(formName) {
      // 确认修改ip;
      //this.sendCommand("9", "5", this.ipData, true);

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sendCommand("9", "", this.ipData, true);
          this.ipForm.ip = "";
          this.ipForm.port = "";
          this.ipShow = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      //确认修改ip
      this.ipShow = false;
      this.ipForm.ip = "";
      this.ipForm.port = "";
    },
    resetForm() {
      //取消
      (this.flags = [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]),
        this.findMonitorDeviceStateExtByMonitorId();
    },
    submitForm() {
      let that = this;
      that.sendCommand(5, this.nowType, this.nowValue);
      that.fullscreenloading = true;

      setTimeout(function() {
        that.fullscreenloading = false;
        that.findMonitorDeviceStateExtByMonitorId();
        //console.log(this.fullscreenloading, "isLoading1");
        that.flags = [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
      }, 9000);
    },
    getLatestParameters() {
      //获取最新参数
      let that = this;
      this.$axios
        .$POST({
          api_name: "hnlaSendDown",
          params: {
            monitorId: that.fromParent.id,
            controlHost: that.fromParent.controlHost,
            sourceId: that.fromParent.sourceId,
            operationType: "4",
            flushThreshold: "1"
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            var data1 = res.data.data;
            this.$message({
              message: "下发查询命令",
              type: "success"
            });
            setTimeout(function() {
              that.findMonitorDeviceStateExtByMonitorId();
              that.flags = [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
            }, 3000);
          } else {
            console.log("失败");
          }
        });
    }
  },
  watch: {
    formData: {
      handler: function(nowVal, oldVal) {
        var that = this;
        for (let i in that.formData) {
          if (nowVal[i] != this.formOld[i]) {
            var nowValueIndex = that.formDataString.indexOf(i);
            that.nowType = that.allFormData[nowValueIndex].flag;
            that.nowValue = nowVal[i];
            that.handleDisable = false;
            break;
          } else {
            that.handleDisable = true;
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.configuration-parameter-wrapper {
  width: auto;
  max-width: 1200px;
  /deep/.el-form-diy {
    padding: 0;
    .el-form-item {
      box-sizing: border-box;
      padding-right: 40px;
      width: 33.33%;
      display: inline-block;
      margin-bottom: 10px;
      &.switch-show {
        .item-warpper {
          display: flex;
        }
        .el-switch-wrap {
          width: 120px;
          text-align: right;
          .el-switch__label--left {
            margin-right: 5px;
          }
          .el-switch__label--right {
            margin-left: 5px;
          }
        }
      }
      .el-form-item__label {
        padding: 0;
        line-height: 36px;
      }
      .el-input--suffix .el-input__inner {
        padding-right: 36px;
      }
      .test-icon-diy {
        font-style: normal;
        width: 36px;
        text-align: center;
        display: inline-block;
      }
    }
  }
  .btn-wrapper {
    margin: 20px 0;
  }
}

//变更ip
/deep/.ip {
  margin-top: -26px;
  .el-input {
    margin: 0 5px;
    width: auto;
  }
  .el-input__inner {
    height: 31px;
    line-height: 31px;
  }
  .el-form-item {
    width: 32.33% !important;
    padding-right: 0 !important;
  }
}
.el-icon-refresh:hover {
  color: #1c77ff;
}
</style>
