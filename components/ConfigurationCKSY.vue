<template>
  <div class="configuration-parameter-wrapper">
    <h3 class="title">
      参数配置
      <el-link :disabled="disbledFlag">
        <i class="el-icon-refresh" @click="findMonitorDeviceStateExtByMonitorId('cz')"></i>
      </el-link>
      <el-button size="small" style="margin-left:20px;" @click="ckCoapSendDown">最新参数获取</el-button>
    </h3>
    <template class="tab-content-detail">
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        ref="configParameter"
        label-width="100%"
        :model="configParameter"
        class="el-form-diy"
      >
        <el-form-item label="设备正常检测周期" class="switch-show" prop="03">
          <div class="item-warpper">
            <el-input placeholder="1-1400" v-model.number="configParameter['03']" @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">min</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="设备正常发送周期" class="switch-show" prop="04">
          <div class="item-warpper">
            <el-input placeholder="1-1440" v-model.number="configParameter['04']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">min</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="变化量报警值" class="switch-show" prop="05">
          <div class="item-warpper">
            <el-input placeholder="请输入变化量报警值" v-model.number="configParameter['05']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">kpa</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="报警上限值" class="switch-show" prop="06">
          <div class="item-warpper">
            <el-input placeholder="请输入报警上限值" v-model.number="configParameter['06']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">kpa</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="报警下限值" class="switch-show" prop="07">
          <div class="item-warpper">
            <el-input placeholder="请输入报警下限值" v-model.number="configParameter['07']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">kpa</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="电池电压下限报警" class="switch-show" prop="08">
          <div class="item-warpper">
            <el-input placeholder="请输入电池电压下限报警" v-model.number="configParameter['08']"  @change="changeOrBlur"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="服务器 IP" class="switch-show" prop="" >
          <div class="item-warpper">
            <el-input placeholder="服务器 IP" v-model.trim="configParameter.ip" :disabled="disabledFlag"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="报警开关" class="switch-show" prop="16" >
          <el-radio v-model="configParameter['16']"  @change="changeOrBlur" :label="1">开</el-radio>
          <el-radio v-model="configParameter['16']"  @change="changeOrBlur" :label="0">关</el-radio>
        </el-form-item>
        <el-form-item label="服务器端口 PORT" class="switch-show" prop="">
          <div class="item-warpper">
            <el-input placeholder="服务器端口 PORT" v-model.trim="configParameter['0B']" :disabled="disabledFlag" >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="设备时间 YEAR" class="switch-show" prop="">
          <div class="item-warpper">
            <el-select  v-model="configParameter['0C']"
                       placeholder="YEAR"
                       class="selet-width-100"
                       filterable
                        :disabled="disabledFlag"
                        @change="getDateVal"
            >
              <el-option
                v-for="item of yearList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="设备时间 MONTH" class="switch-show" prop="">
          <div class="item-warpper">
            <el-select  v-model="configParameter['0D']"
                        placeholder="MONTH"
                        class="selet-width-100"
                        filterable
                        :disabled="disabledFlag"
                        @change="getDateVal"
            >
              <el-option
                v-for="item of monthList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="设备时间 DATE" class="switch-show" prop="">
          <div class="item-warpper">
            <el-select  v-model="configParameter['0E']"
                        placeholder="DATE"
                        class="selet-width-100"
                        filterable
                        :disabled="dataFlag"
            >
              <el-option
                v-for="item of dateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="设备时间 HOUR" class="switch-show" prop="">
          <div class="item-warpper">
            <el-select  v-model="configParameter['0F']"
                        placeholder="HOUR"
                        class="selet-width-100"
                        filterable
                        :disabled="disabledFlag"
            >
              <el-option
                v-for="item of hourList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="设备时间 MINUTE" class="switch-show" prop="">
          <div class="item-warpper">
            <el-select  v-model="configParameter['10']"
                        placeholder="MINUTE"
                        class="selet-width-100"
                        filterable
                        :disabled="disabledFlag"
            >
              <el-option
                v-for="item of minAndSecList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="设备时间 SECOND" class="switch-show" prop="">
          <div class="item-warpper">
            <el-select  v-model="configParameter['11']"
                        placeholder="SECOND"
                        class="selet-width-100"
                        filterable
                        :disabled="disabledFlag"
            >
              <el-option
                v-for="item of minAndSecList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="经度信息(高)" class="switch-show" prop="">
          <div class="item-warpper">
            <el-input placeholder="-180-180"  :disabled="disabledFlag"
                      v-model.trim="configParameter['12']"
                      @change="changeOrBlur"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="经度信息(低)" class="switch-show" prop="">
          <div class="item-warpper">
            <el-input placeholder="-180-180"  :disabled="disabledFlag"
                      v-model.trim="configParameter['13']"  @change="changeOrBlur"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="纬度信息(高）" class="switch-show" prop="">
          <div class="item-warpper">
            <el-input placeholder="-90-90" :disabled="disabledFlag"
                      v-model.trim="configParameter['14']"  @change="changeOrBlur"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="纬度信息(低）" class="switch-show" prop="">
          <div class="item-warpper">
            <el-input placeholder="-90-90"  :disabled="disabledFlag"
                      v-model.trim="configParameter['15']"  @change="changeOrBlur"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="设备报警检测周期" class="switch-show" prop="18">
          <div class="item-warpper">
            <el-input placeholder="1-1440" v-model.number="configParameter['18']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">min</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="设备报警发送周期" class="switch-show" prop="19">
          <div class="item-warpper">
            <el-input placeholder="1-1440" v-model.number="configParameter['19']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">min</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="温度报警下限" class="switch-show" prop="1A">
          <div class="item-warpper">
            <el-input placeholder="请输入温度报警下限" v-model.number="configParameter['1A']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">℃</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="流量报警上限" class="switch-show" prop="1B">
          <div class="item-warpper">
            <el-input placeholder="请输入流量报警上限" v-model.number="configParameter['1B']"  @change="changeOrBlur">
              <i slot="suffix" class="test-icon-diy">L/s</i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item class="btn-wrapper">
          <el-button
            type="primary"
            :disabled="disbledSubmitFlag"
            @click="beforeSubmit"
            v-loading.fullscreen.lock="fullscreenloading"
          >确定</el-button>
          <el-button :disabled="disbledFlag" @click="resetForm">取消</el-button>
          <el-checkbox v-if="batchFlag" @change="checked = !checked">同时应用到其他设备</el-checkbox>
        </el-form-item>
      </el-form>
    </template>
    <el-dialog
      title="操作提醒"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="tips-wrpper">
        <i class="el-icon-circle-check"></i>
        <span class="span-tips">
            操作成功，设备将在24小时内反馈结果。<br/>
            建议反馈成功后再继续修改阈值。
        </span>
      </div>
    </el-dialog>

    <!--    批量下行-->
    <batch-downlink  ref="batchDownlink" @ckBatchDownLink="ckBatchDownLinkFun"></batch-downlink>
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
      return {
        checked:false,
        dialogVisible:false,
        disabledFlag:true,
        dataFlag:true,
        dateTemp:null,
        dateList:[],
        fullscreenloading: false,
        labelPosition: "top",
        isOpenArr: [],
        isValidArr: [],
        isShow: "",
        disbledFlag: false,
        disbledSubmitFlag: true,
        batchFlag:false,
        configParameter: {
          '03':'',
          '04':'',
          '05':'',
          '06':'',
          '07':'',
          '08':'',
          'ip':'',
          '16':'',
          '0B':'',
          '0C':'',
          '0D':'',
          '0E':'',
          '0F':'',
          '10':'',
          '11':'',
          '12':'',
          '13':'',
          '14':'',
          '15':'',
          '18':'',
          '19':'',
          '1A':'',
          '1B':''
        },
        rules: {
          '03': [{ required: true, message: "设备正常检测周期必填", trigger: "blur" },
                 { type: 'number',min: 1, max: 1440,  message: '必须为1-1440的数字', trigger: 'blur' }],
          '04': [{ required: true, message: "设备正常发送周期必填", trigger: "blur" },
                 { type: 'number',min: 1, max: 1440,  message: '必须为1-1440的数字', trigger: 'blur' }],
          '05': [{ required: true, message: "变化量报警值必填", trigger: "blur" },
            { type: 'number', message: '必须为数字', trigger: 'blur' }],
          '06': [{ required: true, message: "报警上限值必填", trigger: "blur" },
            { type: 'number', message: '必须为数字', trigger: 'blur' }],
          '07': [{ required: true, message: "报警下限值必填", trigger: "blur" },
            { type: 'number', message: '必须为数字', trigger: 'blur' }],
          '08': [{ required: true, message: "电池电压下限报警必填", trigger: "blur" },
            { type: 'number', message: '必须为数字', trigger: 'blur' }],
          ip: [{ required: true, message: "服务器 IP必填", trigger: "blur" },
                 {pattern: /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/, message: '请输入正确的ip',trigger:'blur'}],
          '16': [{ required: true, message: "报警开关必填", trigger: "blur" }],
          '0B': [{ required: true, message: "服务器端口 PORT必填", trigger: "blur" }],
          '0C': [{ required: true, message: "设备时间 YEAR必填", trigger: "blur" }],
          '0D': [{ required: true, message: "设备时间 MONTH必填", trigger: "blur" }],
          '0E': [{ required: true, message: "设备时间 DATE必填", trigger: "blur" }],
          '0F': [{ required: true, message: "设备时间 HOUR必填", trigger: "blur" }],
          '10': [{ required: true, message: "设备时间 MINUTE必填", trigger: "blur" }],
          '11': [{ required: true, message: "设备时间 SECOND必填", trigger: "blur" }],
          '12': [{ required: true, message: "经度信息必填", trigger: "blur" },
            {pattern: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/, message: '正确经度信息',trigger:'blur'}],
          '13': [{ required: true, message: "经度信息必填", trigger: "blur" },
            {pattern: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/, message: '正确经度信息',trigger:'blur'}],
          '14': [{ required: true, message: "纬度信息必填", trigger: "blur" },
            {pattern:/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/, message: '请输入正确纬度的信息',trigger:'blur'}],
          '15': [{ required: true, message: "纬度信息必填", trigger: "blur" },
            {pattern:/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/, message: '请输入正确纬度的信息',trigger:'blur'}],
          '18': [{ required: true, message: "设备报警检测周期必填", trigger: "blur" },
                  { type: 'number',min: 1, max: 1440,  message: '必须为1-1440的数字', trigger: 'blur' }],
          '19': [{ required: true, message: "设备报警发送周期必填", trigger: "blur" },
                  { type: 'number',min: 1, max: 1440,  message: '必须为1-1440的数字', trigger: 'blur' }],
          '1A': [{ required: true, message: "温度报警下限必填", trigger: "blur" },
                 { type: 'number', min: -300, max: 700, message: '必须为-300-700数字', trigger: 'blur' }],
          '1B': [{ required: true, message: "流量报警上限必填", trigger: "blur" },
                 { type: 'number',  min: 0, max: 5000,message: '必须为0-5000数字', trigger: 'blur' }],
        }
      };
    },

    computed:{
      yearList(){
         let arry =[];
         let temp=null;
         for(let i = 0 ; i < 256; i++){
           temp = (i < 10) ? ('200'+i) : ((i>9&&i<100)? ('20'+i) : ('2'+i));
           arry.push({
             value:i,
             label:temp
           })
         }
         return arry
      },
      monthList(){
        return this.getSelectVal(1,13)
      },
      hourList(){
        return this.getSelectVal(0,24)
      },
      minAndSecList(){
        return this.getSelectVal(0,60)
      }
    },
    mounted() {
      const that = this;
      this.$nextTick(()=>{
        that.getDateVal();
        that.findMonitorDeviceStateExtByMonitorId();
        that.batchFlag = (that.fromParent.downType == 1) ? true :false
      })
    },
    methods: {
      /**
       * 批量下行
       */
      batchDownlink(val) {
        const that = this;
        that.$refs.batchDownlink.initTempDownLink(val);
      },
      /**
       * 辰控水压批量下行确定按钮，
       */
      ckBatchDownLinkFun(val){
        const that = this;
        that.fullscreenloading=true;
        let configParameter= {
          '03': that.configParameter['03'],
          '04': that.configParameter['04'],
          '05':that.configParameter['05'],
          '06':that.configParameter['06'],
          '07':that.configParameter['07'],
          '08':that.configParameter['08'],
          '16':that.configParameter['16'],
          '18':that.configParameter['18'],
          '19':that.configParameter['19'],
          '1A':that.configParameter['1A'],
          '1B':that.configParameter['1B'],
        };
        that.$axios
          .$POST({
            api_name: "ckCoapSendDownBatch",
            params: {
              controlHost: val.join(','),
              operationType: "1",
              dataValue: JSON.stringify(configParameter),
              orgCode: that.fromParent.sourceId,
              unitId: that.fromParent.unitId,
              username:that._Storage.getObj("userObj", "userObj").userName
            },
            time:300000
          }).then(res => {
          if (res.data.code == "success") {
            let tips = `本次操作共${res.data.data.count}条，成功${res.data.data.successNum}条，失败${res.data.data.errorNum}条`;
            that.$message({
              message: tips,
              type: "success",
              duration:2500
            });
            that.$refs.batchDownlink.batchCancelHandel();
            setTimeout(function(){
              that.fullscreenloading=false;
              that.ckCoapSendDown()
            },500)
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
            type: "success",
            duration:1800
          });
        });
      },
      /**
       * 日期时间的范围生成
       * @param start
       * @param end
       * @returns {Array}
       */
      getSelectVal(start,end){
        let arry =[];
        for(let i = start ; i < end; i++){
          arry.push({
            value:i,
            label:i
          })
        }
        // this.changeOrBlur();
        return arry
      },
      /**
       * 天数切换（31，30，29，28）
       */
      getDateVal(){
        const that = this;
        let yearVal = that.configParameter['0C'];
        let monthVal = that.configParameter['0D'];
        let dateVal = that.configParameter['0E'];
        if(yearVal&& monthVal){
          that.dataFlag = false;
          yearVal = Number((yearVal < 10) ? ('200'+yearVal) : ((yearVal>9&&yearVal<100)? ('20'+yearVal) : ('2'+yearVal)));
          if([1,3,5,7,8,10,12].includes(monthVal)){
            that.dateList = that.getSelectVal(1,32);
          }else if([4,6,9,11].includes(monthVal)){
            that.dateList = that.getSelectVal(1,31);
          }else if(monthVal === 2){
            let day =  (yearVal%400==0||yearVal%4==0&&yearVal%100!=0) ? 30 : 29
            that.dateList = that.getSelectVal(1,day);
          }
          let obj = null;
          obj = this.dateList.find((item)=>{
            return item.value === dateVal;
          });
          if(!obj){
            that.configParameter['0E'] ='';
          }
        }else{
          that.dataFlag = true;
          that.dateList=[];
        }
        // that.changeOrBlur();
      },

      /**
       * 点击 最新参数获取
       */
      ckCoapSendDown(){
        const that = this;
        that.fullscreenloading = true;
        this.$axios
          .$POST({
            api_name: "ckCoapSendDown",
            time:'15000',
            params: {
              controlHost: that.fromParent.controlHost,
              operationType: "2",
              dataValue: '',
              orgCode: that.fromParent.sourceId,
              unitId: that.fromParent.unitId,
              username:that._Storage.getObj("userObj", "userObj").userName
            }
          })
          .then(res => {
            if (res.data.state == "201") {
                that.fullscreenloading = false;
                that.dialogVisible = true
            } else {
              that.fullscreenloading = false;
              this.$message({
                message: "命令下发失败",
                type: "error"
              });
            }
          }).catch(res=>{
          that.fullscreenloading = false;
          this.$message({
            message: res,
            type: "warning"
          });
        });
      },
      /**
       * 输入框值有变化 确定按钮亮起来
       */
      changeOrBlur() {
        this.disbledSubmitFlag = false;
      },
      /**
       * 点击刷新事件
       */
      findMonitorDeviceStateExtByMonitorId(deft) {
        //硬件平台-根据监测设备ID获取设备阈值信息---辰控水压
        let that = this;
        this.$axios
          .$POST({
            api_name: "findMonitorDeviceStateExtByMonitorId",
            params: {
              monitorId: that.fromParent.id,
              sourceId: that.fromParent.sourceId
            },
            time:'12000'
          })
          .then(res => {
            if (res.data.code == "success") {
               if(res.data.data.thresholdValue){
                 that.configParameter = JSON.parse(res.data.data.thresholdValue);
                 that.configParameter.ip = that.configParameter['09']+'.'+that.configParameter['0A'];
                 if(deft){
                   that.$message({
                     message: res.data.rspMsg || res.data.message,
                     type: 'success'
                   });
                 }
                 setTimeout(function(){
                   that.disbledSubmitFlag = true;
                 },50)
               }else{
                 if(deft){
                   this.$message.error(res.data.rspMsg || res.data.message);
                 }
               }
            } else {
              if(deft){
                this.$message.error(res.data.rspMsg || res.data.message);
              }
            }
          });
      },
      /**
       * 点击取消事件
       */
      resetForm() {
        this.findMonitorDeviceStateExtByMonitorId();
      },
      /**
       * 点击确定事件
       */
      submit(){
        const that = this;
        that.$refs.configParameter.validate(valid => {
          if (valid) {
            that.fullscreenloading = true;
            let configParameter= {
              '03': that.configParameter['03'],
              '04': that.configParameter['04'],
              '05':that.configParameter['05'],
              '06':that.configParameter['06'],
              '07':that.configParameter['07'],
              '08':that.configParameter['08'],
              '16':that.configParameter['16'],
              // '0B':that.configParameter['0B'],
              // '0C':that.configParameter['0C'],
              // '0D':that.configParameter['0D'],
              // '0E':that.configParameter['0E'],
              // '0F':that.configParameter['0F'],
              // '10':that.configParameter['10'],
              // '11':that.configParameter['11'],
              // '12':that.configParameter['12'],
              // '13':that.configParameter['13'],
              // '14':that.configParameter['14'],
              // '15':that.configParameter['15'],
              '18':that.configParameter['18'],
              '19':that.configParameter['19'],
              '1A':that.configParameter['1A'],
              '1B':that.configParameter['1B'],
            };
            that.$axios
              .$POST({
                api_name: "ckCoapSendDown",
                params: {
                  controlHost: that.fromParent.controlHost,
                  operationType: "1",
                  dataValue: JSON.stringify(configParameter),
                  orgCode: that.fromParent.sourceId,
                  unitId: that.fromParent.unitId,
                  username:that._Storage.getObj("userObj", "userObj").userName
                }
              })
              .then(res => {
                if (res.data.state == "201") {
                  this.$message({
                    message: "命令下发成功",
                    type: "success"
                  });
                  setTimeout(function(){
                    that.ckCoapSendDown()
                  },50)
                } else {
                  this.$message({
                    message: "命令下发失败",
                    type: "error"
                  });
                  that.fullscreenloading = false;
                }
              }).catch(res=>{
                this.$message({
                  message: res,
                  type: "warning"
                });
                that.fullscreenloading = false;
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      /**
       * 点击确定时判断是否是批量下行
       */
      beforeSubmit(){
        const that = this;
        that.$refs.configParameter.validate(valid => {
          if (valid) {
             if(that.fromParent.downType=='1'&&that.checked){
               let configParameter= {
                 '03': that.configParameter['03'],
                 '04': that.configParameter['04'],
                 '05':that.configParameter['05'],
                 '06':that.configParameter['06'],
                 '07':that.configParameter['07'],
                 '08':that.configParameter['08'],
                 '16':that.configParameter['16'],
                 '18':that.configParameter['18'],
                 '19':that.configParameter['19'],
                 '1A':that.configParameter['1A'],
                 '1B':that.configParameter['1B'],
               };
               that.batchDownlink(configParameter);
             }else{
               that.oneSubmit();
             }
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },
      /**
       * 单个下行
       */
      oneSubmit(){
        const that = this;
        that.fullscreenloading = true;
        let configParameter= {
          '03': that.configParameter['03'],
          '04': that.configParameter['04'],
          '05':that.configParameter['05'],
          '06':that.configParameter['06'],
          '07':that.configParameter['07'],
          '08':that.configParameter['08'],
          '16':that.configParameter['16'],
          '18':that.configParameter['18'],
          '19':that.configParameter['19'],
          '1A':that.configParameter['1A'],
          '1B':that.configParameter['1B'],
        };
        that.$axios
          .$POST({
            api_name: "ckCoapSendDown",
            params: {
              controlHost: that.fromParent.controlHost,
              operationType: "1",
              dataValue: JSON.stringify(configParameter),
              orgCode: that.fromParent.sourceId,
              unitId: that.fromParent.unitId,
              username:that._Storage.getObj("userObj", "userObj").userName
            }
          })
          .then(res => {
            if (res.data.state == "201") {
              this.$message({
                message: "命令下发成功",
                type: "success",
                duration:1500,
              });
              setTimeout(function(){
                that.ckCoapSendDown()
              },500)
            } else {
              this.$message({
                message: "命令下发失败",
                type: "error"
              });
              that.fullscreenloading = false;
            }
          }).catch(res=>{
          this.$message({
            message: res,
            type: "warning"
          });
          that.fullscreenloading = false;
        });
      },

      submitForm() {
        let that = this;
        that.sendCommand(5);
        that.fullscreenloading = true;
        setTimeout(function() {
          that.fullscreenloading = false;
          that.findMonitorDeviceStateExtByMonitorId('cz');
        }, 5000);
      },
      getLatestParameters() {
        //获取最新参数
        let that = this;
        this.$axios
          .$POST({
            api_name: "sendCommand",
            params: {
              monitorId: that.fromParent.id,
              controlHost: that.fromParent.controlHost,
              sourceId: that.fromParent.sourceId,
              commandType: "2",
              flushThreshold: "1"
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              this.$message({
                message: "命令下发成功",
                type: "success"
              });
              setTimeout(function() {
                that.findMonitorDeviceStateExtByMonitorId('cz');
              }, 5000);
            } else {
              console.log("失败");
            }
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .configuration-parameter-wrapper {
    width: auto;
    max-width: 1200px;
    /deep/.el-form-diy {
      padding: 0 0 20px 0;
      .el-form-item {
        box-sizing: border-box;
        padding-right: 40px;
        width: 33.33%;
        float: left;
        margin-bottom: 10px;
        &.btn-wrapper {
          width: 100%;
          margin-top: 20px;
        }
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


    .tips-wrpper{
      i{
        font-size: 90px;
        color: #a9d468;
       display: block;
        text-align: center;
        margin: 20px;
      }
      .span-tips{
        font-size: 16px;
        display: block;
        line-height: 28px;
        text-align: center;
        padding: 0 0 40px;
      }
    }
  }
</style>
