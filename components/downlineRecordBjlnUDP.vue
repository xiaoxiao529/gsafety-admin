<template>
  <div class="configuration-parameter-wrapper">
    <template class="tab-content-detail">
      <el-form
        :label-position="labelPosition"
        ref="configParameter"
        label-width="100%"
        :model="configParameter"
        class="el-form-diy"
      >
        <el-form-item label="剩余电流报警设置值" class="switch-show" prop="wdbjzA">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.sydlbjz">
              <i slot="suffix" class="test-icon-diy">mA</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[10]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="A相温度" class="switch-show" prop="wdbjzA">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.wdbjzA">
              <i slot="suffix" class="test-icon-diy">℃</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[9]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="B相温度" class="switch-show" prop="wdbjzB">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.wdbjzB">
              <i slot="suffix" class="test-icon-diy">℃</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[8]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="C相温度" class="switch-show" prop="wdbjzC">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.wdbjzC">
              <i slot="suffix" class="test-icon-diy">℃</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[7]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="N相温度" class="switch-show" prop="wdbjzN">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.wdbjzN">
              <i slot="suffix" class="test-icon-diy">℃</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[6]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="A相电流" class="switch-show" prop="dlbjzA">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dlbjzA">
              <i slot="suffix" class="test-icon-diy">A</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[5]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="B相电流" class="switch-show" prop="dlbjzB">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dlbjzB">
              <i slot="suffix" class="test-icon-diy">A</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[4]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="C相电流" class="switch-show" prop="dlbjzC">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dlbjzC">
              <i slot="suffix" class="test-icon-diy">A</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[3]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="A相电压" class="switch-show" prop="dybjzA">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dybjzA">
              <i slot="suffix" class="test-icon-diy">V</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[2]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="B相电压" class="switch-show" prop="dybjzB">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dybjzB">
              <i slot="suffix" class="test-icon-diy">V</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[1]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="C相电压" class="switch-show" prop="dybjzC">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dybjzC">
              <i slot="suffix" class="test-icon-diy">V</i>
            </el-input>
            <div class="el-switch-wrap">
              <el-switch
                v-model="isOpenArr[0]"
                active-color="#1C77FF"
                inactive-color="#CCD4E0"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="报警时有无输出" class="switch-show" prop="jdq">
          <el-radio v-model="configParameter.jdq" label="1">有动作</el-radio>
          <el-radio v-model="configParameter.jdq" label="0">无动作</el-radio>
        </el-form-item>
        <el-form-item label="报警或者故障时蜂鸣器响不响" class="switch-show" prop="fmq">
          <el-radio v-model="configParameter.fmq" label="1">响</el-radio>
          <el-radio v-model="configParameter.fmq" label="0">不响</el-radio>
        </el-form-item>
        <el-form-item label="电压类型" class="switch-show" prop="dylx">
          <el-radio v-model="configParameter.dylx" label="1" disabled>单相</el-radio>
          <el-radio v-model="configParameter.dylx" label="0" disabled>三相</el-radio>
        </el-form-item>
        <el-form-item label="报警延时值" class="switch-show" prop="bjys">
          <div class="item-warpper">
            <el-input placeholder="请输入报警延时值" v-model="configParameter.bjys">
              <i slot="suffix" class="test-icon-diy">S</i>
            </el-input>
            <div class="el-switch-wrap"></div>
          </div>
        </el-form-item>
        <el-form-item label="第一路电流变比" class="switch-show" prop="dlbbA">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dlbbA"></el-input>
            <div class="el-switch-wrap"></div>
          </div>
        </el-form-item>
        <el-form-item label="第二路电流变比" class="switch-show" prop="dlbbB">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dlbbB"></el-input>
            <div class="el-switch-wrap"></div>
          </div>
        </el-form-item>
        <el-form-item label="第三路电流变比" class="switch-show" prop="dlbbC">
          <div class="item-warpper">
            <el-input placeholder v-model="configParameter.dlbbC"></el-input>
            <div class="el-switch-wrap"></div>
          </div>
        </el-form-item>
        <template v-if="['0020','0021','0022','0023'].includes(fromParent.deviceVersion)">
          <!--      这里是第二种状态多的内容  % ↑-->
          <el-form-item label="A相电流穿孔方向" class="switch-show">
            <el-radio v-model="isValidArr[6]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[6]" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="B相电流穿孔方向" class="switch-show">
            <el-radio v-model="isValidArr[5]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[5]" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="C相电流穿孔方向" class="switch-show">
            <el-radio v-model="isValidArr[4]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[4]" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="实时值最小上传时间间隔" class="switch-show" prop="zdsy">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.zdsy" disabled>
                <i slot="suffix" class="test-icon-diy">分</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="A相电弧报警阈值" class="switch-show" prop="dhbjzA">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dhbjzA" disabled>
                <i slot="suffix" class="test-icon-diy">↑</i>
              </el-input>
              <div class="el-switch-wrap">
                <el-switch
                  v-model="isValidArr[11]"
                  active-color="#1C77FF"
                  inactive-color="#CCD4E0"
                  active-value="1"
                  inactive-value="0"
                  active-text="开"
                  inactive-text="关"
                ></el-switch>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="B相电弧报警阈值" class="switch-show" prop="dhbjzB">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dhbjzB" disabled>
                <i slot="suffix" class="test-icon-diy">↑</i>
              </el-input>
              <div class="el-switch-wrap">
                <el-switch
                  v-model="isValidArr[10]"
                  active-color="#1C77FF"
                  inactive-color="#CCD4E0"
                  active-value="1"
                  inactive-value="0"
                  active-text="开"
                  inactive-text="关"
                ></el-switch>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="C相电弧报警阈值" class="switch-show" prop="dhbjzC">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dhbjzC" disabled>
                <i slot="suffix" class="test-icon-diy">↑</i>
              </el-input>
              <div class="el-switch-wrap">
                <el-switch
                  v-model="isValidArr[9]"
                  active-color="#1C77FF"
                  inactive-color="#CCD4E0"
                  active-value="1"
                  inactive-value="0"
                  active-text="开"
                  inactive-text="关"
                ></el-switch>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="三相电压平衡度报警阈值" class="switch-show" prop="sxdyphdbjz">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.sxdyphdbjz" disabled>
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap">
                <el-switch
                  v-model="isValidArr[8]"
                  active-color="#1C77FF"
                  inactive-color="#CCD4E0"
                  active-value="1"
                  inactive-value="0"
                  active-text="开"
                  inactive-text="关"
                ></el-switch>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="三相电流平衡度报警阈值" class="switch-show" prop="sxdlphdbjz">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.sxdlphdbjz" disabled>
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap">
                <el-switch
                  v-model="isValidArr[7]"
                  active-color="#1C77FF"
                  inactive-color="#CCD4E0"
                  active-value="1"
                  inactive-value="0"
                  active-text="开"
                  inactive-text="关"
                ></el-switch>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="电压实时值上传跃阶：额定值" class="switch-show" prop="dyjy">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dyjy">
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="电流实时值上传跃阶：额定值" class="switch-show" prop="dljy">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dljy">
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="电弧周期" class="switch-show" prop="gzdhbjsjz">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.gzdhbjsjz" disabled>
                <i slot="suffix" class="test-icon-diy">S</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="电流电压平衡度报警延时" class="switch-show" prop="sxphdbjsj">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.sxphdbjsj">
                <i slot="suffix" class="test-icon-diy">S</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="漏电实时值上传跃阶：额定值" class="switch-show" prop="ldjy">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.ldjy">
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="温度实时值上传跃阶：额定值" class="switch-show" prop="wdjy">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.wdjy">
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="电弧幅值：电流阙值" class="switch-show" prop="gzdhbjz">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.gzdhbjz" disabled>
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
        </template>
        <!--      这里是第三种状态多的内容  % ↑-->
        <template v-if="fromParent.deviceVersion == '0023'">
          <el-form-item label="短路电压下降百分比" class="switch-show" prop="dldyxjbfb">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dldyxjbfb">
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="短路电流上升百分比" class="switch-show" prop="dldlssbfb">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dldlssbfb">
                <i slot="suffix" class="test-icon-diy">%</i>
              </el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="大功率负载值" class="switch-show" prop="dglfz">
            <div class="item-warpper">
              <el-input placeholder v-model="configParameter.dglfz"></el-input>
              <div class="el-switch-wrap"></div>
            </div>
          </el-form-item>
          <el-form-item label="大功率负载" class="switch-show">
            <el-radio v-model="isValidArr[3]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[3]" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="A相电压短路" class="switch-show">
            <el-radio v-model="isValidArr[2]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[2]" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="B相电压短路" class="switch-show">
            <el-radio v-model="isValidArr[1]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[1]" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="C相电压短路" class="switch-show">
            <el-radio v-model="isValidArr[0]" label="1">是</el-radio>
            <el-radio v-model="isValidArr[0]" label="0">否</el-radio>
          </el-form-item>
        </template>
      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  //
  props: ["BjlnUDP"],
  data() {
    return {
      labelPosition: "top",
      isOpenArr: [],
      isValidArr: [],
      isShow: "",
      disbledFlag: false,
      disbledSubmitFlag: false,
      configParameter: {}
    };
  },
  computed: {
    fromParent() {
      return this._Storage.getObj("downListRow", "obj");
    }
  },
  mounted() {
    this.findMonitorDeviceStateExtByMonitorId();
  },
  methods: {
    findMonitorDeviceStateExtByMonitorId() {
      let that = this;
      console.log("that.BjlnUDP", that.BjlnUDP);

      //硬件平台-根据监测设备ID获取设备阈值信息---乐鸟
      if (that.BjlnUDP.length == 0) {
        that.isOpenArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        that.isValidArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      } else {
        that.configParameter = that.BjlnUDP;
        that.isOpenArr = that.configParameter.isOpen.split("");
        that.isValidArr = that.configParameter.isValid.split("");
      }
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
      width: 100%;
      display: flex;
      margin-bottom: 0;
      &.switch-show {
        .item-warpper {
          display: flex;
          width: 115px;
          padding-left: 5px;
          .el-input {
            .el-input__inner {
              padding: 0;
              border: 0;
              height: auto;
              line-height: normal;
              background: transparent;
              color: #606266;
            }
          }
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
      &.two-line {
        display: block;
        .el-form-item__label {
          width: 100%;
        }
        .el-form-item__content {
          width: 100%;
        }
      }
      .el-form-item__content {
        line-height: 36px;
        .el-radio-group {
          padding-left: 10px;
          .el-radio {
            margin-right: 15px;
          }
          .el-radio__input.is-disabled + span.el-radio__label {
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
        display: none;
      }
      .el-radio {
        margin: 0 15px;
      }
    }
  }
}
</style>
