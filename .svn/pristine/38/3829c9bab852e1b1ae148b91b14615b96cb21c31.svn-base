<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">业主单位管理</el-breadcrumb-item>
        <el-breadcrumb-item>免费企业升级申请处置</el-breadcrumb-item>
      </el-breadcrumb>
      <nuxt-link :to="{name:'ownerunitManager'}" class="back-pre">&lt;&lt;返回</nuxt-link>
    </div>
    <div class="main-wrap">
      <el-tabs class="top-tab" v-loading.lock="isLoading">
        <div class="tab-content">
          <el-checkbox v-model="syncFlag">备选项</el-checkbox>
          <!-- 基础信息 -->
          <el-button
            type="primary"
            size="small"
            @click="saveForm"
            style="margin:10px 0 20px 0;float:right"
          >完成并提交
          </el-button>
          <h3 class="title" style="margin-top:20px;float:left">基础信息</h3>
          <div style="clear:both"></div>
          <div class="tab-content-detail">
            <el-form
              :model="fromParent"
              ref="fromParent"
              class="basic-information"
              label-width="120px"
              :label-position="labelPosition"
              :rules="rules"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业名称:" prop="unitName">
                    <el-input v-model.trim="fromParent.unitName"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="统一信用编码:">
                    <el-input
                      placeholder="请输入"
                      :disabled="false"
                      v-model.trim="fromParent.unitCreditCode"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="企业地址:" required :rules="[{ required: true}]">
                    <area-cascader
                      type="all"
                      v-model="businessAddress"
                      :level="1"
                      :data="pcaa"
                      :placeholder="businessAddress1"
                      @change="changeAreaCascader"
                    ></area-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="详细地址:" prop="unitAddress">
                    <el-input :disabled="false" v-model.trim="fromParent.unitAddress"
                              style="width: 90%;float: left;"></el-input>
                    <el-button type="text" @click="mapChoosePoint()" style="width: 10%;"
                               icon="el-icon-location-outline"></el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="接入渠道:" prop="enterpriseUnitAccessChannel">
                    <el-select
                      style="width: 100%"
                      placeholder="请选择"
                      filterable
                      v-model.trim="fromParent.enterpriseUnitAccessChannel"
                    >
                      <el-option
                        v-for="item in joinTypeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务模式:" prop="enterpriseUnitServiceModel">
                    <el-select
                      :disabled="true"
                      style="width: 100%"
                      placeholder="请选择"
                      filterable
                      v-model.trim="fromParent.enterpriseUnitServiceModel"
                    >
                      <el-option
                        v-for="item in serviceTypeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业种类:" prop="enterpriseUnitType">
                    <el-select
                      :disabled="true"
                      style="width: 100%"
                      placeholder="请选择"
                      filterable
                      v-model.trim="fromParent.enterpriseUnitType"
                    >
                      <el-option
                        v-for="item in unitTypeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司类型:" prop="enterpriseCompanyType">
                    <el-select
                      :disabled="true"
                      style="width: 100%"
                      placeholder="请选择"
                      filterable
                      v-model.trim="fromParent.enterpriseCompanyType"
                    >
                      <el-option
                        v-for="item in companyTypeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属集团:">
                    <el-select
                      :disabled="true"
                      style="width: 100%"
                      placeholder="请选择"
                      filterable
                      v-model.trim="fromParent.unitParentId=='-1'?'':fromParent.unitParentId"
                    >
                      <el-option
                        v-for="item in unitParentGroupData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item>
                    <template slot-scope="scope">
                      <el-checkbox
                        :disabled="true"
                        v-model="operationChecked"
                      >分配到签入运营中心
                      </el-checkbox>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <template>
                      <el-checkbox
                        :disabled="bigScreenDisable"
                        v-model="bigScreenChecked"
                      >企业提供VIP服务(大屏展示系统)
                      </el-checkbox>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <h3 class="title" style="margin-top:20px;">联系信息</h3>
          <div class="tab-content-detail">
            <el-form
              :model="fromParent"
              class="basic-information"
              label-width="160px"
              :label-position="labelPosition"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业法人:">
                    <el-input placeholder="请输入" v-model.trim="fromParent.legalperson"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人联系电话:">
                    <el-input placeholder="请输入" v-model.trim="fromParent.legalpersonTel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业紧急联系人:">
                    <el-input placeholder="请输入" v-model.trim="fromParent.unitContact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业紧急联系人电话:">
                    <el-input placeholder="请输入" v-model.trim="fromParent.unitContactTel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <h3 class="title" style="margin-top:20px;" v-show="roomData.length !== 0">消控室信息</h3>
          <div class="tab-content-detail" v-show="roomData.length !== 0">
            <template v-for="item in roomData">
              <el-form
                :model="item"
                class="basic-information"
                label-width="160px"
                :key="item.id"
                style="margin-top: 20px;margin-bottom: 20px;"
                :label-position="labelPosition"
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="消控室名称:">
                      <el-input placeholder="请输入消控室名称" v-model.trim="item.firecontrolroomName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="消控室电话:">
                      <el-input placeholder="请输入消控室电话" v-model.trim="item.firecontrolroomTel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="备注:">
                      <el-input placeholder="请输入消控室电话备注信息" v-model.trim="item.firecontrolroomComments"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <h3 class="title" style="margin-top:20px;" v-if="item.fcroomperList.length !== 0">消控室人员信息</h3>
              <template v-for="item1 in item.fcroomperList">
                <el-form
                  :model="item1"
                  class="basic-information"
                  label-width="160px"
                  :key="item1.id"
                  style="margin-top: 20px;margin-bottom: 20px;"
                  :label-position="labelPosition"
                >
                  <el-row v-if="item.fcroomperList.length !== 0">
                    <el-col :span="8">
                      <el-form-item style="margin-bottom: 0px !important;" label="消控室人员姓名:">
                        <el-input placeholder="请输入消控室人员姓名" v-model.trim="item1.personnelName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item style="margin-bottom: 0px !important;" label="消控室人员电话:">
                        <el-input placeholder="请输入消控室人员电话" v-model.trim="item1.personnelTel"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item style="margin-bottom: 0px !important;" label="备注:">
                        <el-input placeholder="请输入消控室电话备注信息" v-model.trim="item1.personnelComments"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </template>
            </template>
          </div>
          <h3 class="title" style="margin-top:20px;">合同上传</h3>
          <div class="tab-content-detail">
            <el-form
              :model="fromParent"
              class="basic-information"
              label-width="160px"
              :label-position="labelPosition"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="服务期始:">
                    <template>
                      <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                          v-model="fromParent.enterpriseUnitServiceStartDate"
                          type="date"
                          :disabled="pickerReadonly"
                          placeholder="选择服务期始日期"
                        ></el-date-picker>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务期止:">
                    <template>
                      <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                          v-model="fromParent.enterpriseUnitServiceEndDate"
                          type="date"
                          :disabled="pickerReadonly"
                          placeholder="选择服务期止日期"
                        ></el-date-picker>
                      </div>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row></el-row>
            </el-form>
            <el-form
              :model="fromParent"
              class="basic-information"
              label-width="160px"
              :label-position="labelPosition"
            >
              <el-col :span="24">
                <el-form-item label="" prop="uploadFile">
                  <el-upload
                    accept=".pdf,.doc,.docx"
                    class="upload-demo"
                    ref="upload"
                    action="/test/ownerunit/uploadOperationOrgAttach"
                    list-type="text"
                    :show-file-list="false"
                    :http-request="UploadImage"
                  >
                    <el-button type="primary" style="float: left">
                      添加附件
                      <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                    <h3 class="title" style="margin: 0px 10px;float: left;color: #009cff !important;font-size: 14px;">
                      *支持word/pdf格式</h3>
                  </el-upload>

                  <el-table
                    v-show="fromParent.enterpriseUnitAttachment"
                    :show-header="false"
                    :data="fromParent.enterpriseUnitAttachment"
                  >
                    <el-table-column property="attachmentName"></el-table-column>
                    <el-table-column width="260">
                      <template slot-scope="scope">
                        <el-button type="primary" @click="downloadFile(scope.row)">查看</el-button>
                        <el-button
                          v-if="!scope.row.hasOwnProperty('attachmentUrl')"
                          @click="deleteFile(scope.row)"
                        >删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>
      </el-tabs>
    </div>
    <el-dialog title="地图选点" :visible.sync="dialogMapVisible" v-if='dialogMapVisible' width="1000px">
      <MyMap :center="center" :zoom="zoom" v-on:mapPointChange="mapPointChange" v-on:mapLoaded="mapLoaded"
             ref="MyMap"></MyMap>
    </el-dialog>
  </div>
</template>

<script>
    import {AreaCascader} from "vue-area-linkage";
    import MyMap from '~/components/baiduMap/map'
    import {pca, pcaa} from "area-data";
    export default {
        components: {
            MyMap
        },
        data() {
            return {
                selected: [],
                businessAddress: [],
                businessAddress1: "",
                pca: pca,
                pcaa: pcaa,
                flieListsend: "",
                roomData: [],
                id: null,
                labelPosition: "right",
                isLoading: false,
                operationTypeDisable: false, //分配运营中心
                operationChecked: false, //  是否分派运营中心
                bigScreenDisable: true, //大屏
                bigScreenChecked: false,
                startTime: "",
                endTime: "",
                pickerReadonly: true, //时间选择器是否可点击
                fromParent: {},
                center: {},
                zoom: 11,
                dialogMapVisible: false,
                syncFlag:1,
                applyResult:0,
                disposeUserId:'',
                disposeUserName:'',
                //服务模式
                serviceTypeData: [
                    {
                        value: "",
                        label: "请选择"
                    }
                ],
                //所属集团
                unitParentGroupData: [
                    {
                        value: "",
                        label: "请选择"
                    }
                ],
                //服务状态
                serviceStatus: [
                    {
                        value: "",
                        label: "请选择"
                    },
                    {
                        value: "0",
                        label: "待服务"
                    },
                    {
                        value: "1",
                        label: "服务中"
                    },
                    {
                        value: "2",
                        label: "服务期满"
                    }
                ],
                unitTypeData: [
                    {
                        value: "01",
                        label: "单一型"
                    },
                    {
                        value: "02",
                        label: "集团型"
                    }
                ],
                joinTypeData: [
                    {
                        value: "0",
                        label: "直接发展"
                    },
                    {
                        value: "1",
                        label: "深度合作伙伴"
                    }
                ],
                companyTypeData: [
                    {
                        value: "0",
                        label: "集团总公司"
                    },
                    {
                        value: "1",
                        label: "集团分公司"
                    }
                ],
                rules: {
                    unitName: [
                        {required: true, message: "请输入业主单位", trigger: "blur"}
                    ],
                    unitAddress: [
                        {required: true, message: "请输入详细地址", trigger: "blur"}
                    ],
                    enterpriseUnitAccessChannel: [
                        {required: true, message: "请输入接入渠道", trigger: "blur"}
                    ],
                    enterpriseUnitServiceModel: [
                        {required: true, message: "请输入服务模式", trigger: "blur"}
                    ],
                    enterpriseUnitType: [
                        {required: true, message: "请输入企业种类", trigger: "blur"}
                    ],
                    uenterpriseCompanyType: [
                        {required: true, message: "请输入公司类型", trigger: "blur"}
                    ]
                }
            };
        },
        computed: {},
        created() {

        },

        mounted() {
            let unitObj = this._Storage.getObj("ownerEditUnitRow", "obj");
            let userObj = this._Storage.getObj("userObj", "userObj");
            this.unitId = unitObj.unitId;
            this.applyId = unitObj.applyId;
            this.applyResult = unitObj.applyResult,
            this.disposeUserId = userObj.id,
            this.disposeUserName = userObj.userName,
            this.findAllSubCenterCode();
        },

        methods: {
            changeAreaCascader() {
                var addressObject = this.businessAddress;
                for (var i = 0; i < addressObject.length; i++) {
                    for (var key in addressObject[i]) {
                        if (i == 0) {
                            this.fromParent.province = key;
                            this.fromParent.provinceName = addressObject[i][key];
                        } else if (i == 1) {
                            this.fromParent.city = key;
                            this.fromParent.cityName = addressObject[i][key];
                        } else if (i == 2) {
                            this.fromParent.county = key;
                            this.fromParent.countyName = addressObject[i][key];
                        }
                    }
                }
            },
            //编辑业主单位信息接口
            findAllSubCenterCode() {
                this.isLoading = true;
                const that = this;
                this.$axios
                    .$POST_NEW({
                        api_name: "queryEnterpriseUnitInfoByUnitId",
                        params: {
                            unitId: that.unitId,
                            applyId: that.applyId
                        }
                    })
                    .then(res => {
                        that.isLoading = false;
                        if (res.data.code === "success") {
                            // that.fromParent = res.data.data;
                            //   debugger
                            that.fromParent = JSON.parse(JSON.stringify(res.data.data));
                            if (that.fromParent.enterpriseUnitAttachment === "") {
                                that.fromParent.enterpriseUnitAttachment = [];
                            }
                            that.roomData = [];
                            that.roomData = JSON.parse(that.fromParent.firecontrolroomInfo);
                            that.businessAddress = [];
                            that.businessAddress[0] = pcaa[86][that.fromParent.province]; //res.data.addrprovinceid省对应的id
                            that.businessAddress[1] =
                                pcaa[this.fromParent.province][that.fromParent.city]; //res.data.addrcityid省对应的id
                            that.businessAddress[2] =
                                pcaa[this.fromParent.city][that.fromParent.county]; //res.data.addrcountyid省对应的id
                            that.businessAddress1 =
                                that.businessAddress[0] +
                                "/" +
                                that.businessAddress[1] +
                                "/" +
                                that.businessAddress[2];
                            that.getCheckBoxState();
                            var data = [
                                that.$axios.$POST_NEW({api_name: "findAllParentUnit"}),
                                that.$axios.$POST_NEW({api_name: "queryOrgServiceType"})
                            ];
                            that.$axios.$AllRequst({
                                data: data,
                                callback: function (args) {
                                    for (var key in args) {
                                        if (args[key].data.code === "success") {
                                            if (
                                                args[key].config.url.search("findAllParentUnit") !== -1
                                            ) {
                                                that.unitParentGroupData = args[key].data.data;
                                                that.unitParentGroupData.unshift({
                                                    value: "",
                                                    label: "请选择"
                                                });
                                            }
                                            if (
                                                args[key].config.url.search(
                                                    "queryOrgServiceType"
                                                ) !== -1
                                            ) {
                                                that.serviceTypeData = args[key].data.data;
                                                that.serviceTypeData.unshift({
                                                    value: "",
                                                    label: "请选择"
                                                });
                                            }
                                        } else {
                                            that.$message.warning(res.data.message);
                                        }
                                    }
                                }
                            });
                        } else {
                            that.$message.warning(res.data.message);
                        }
                    });
            },

            getCheckBoxState() {
                const that = this;
                that.operationChecked = that.fromParent.operationType === "1";
                if (
                    that.fromParent.enterpriseUnitServiceModel === "2" ||
                    that.fromParent.enterpriseUnitServiceModel === "3"
                ) {
                    that.bigScreenDisable = false;
                    if (that.fromParent.screenFlag === "1") {
                        that.bigScreenDisable = true;
                        that.bigScreenChecked = true;
                    }
                }
                if (that.fromParent.status === "9") {
                    that.pickerReadonly = true;
                } else if (that.fromParent.status === "0") {
                    that.pickerReadonly = false;
                    if (that.fromParent.serverHisInfo.length > 0) {
                        // ToDo 续约记录
                    }
                } else {
                    that.pickerReadonly = true;
                }
            },

            UploadImage(param) {
                const that = this;
                let formData = new FormData();
                Object.keys(this.fromParent).forEach(key => {
                    formData.append(key, that.fromParent[key]);
                });
                formData.append("enterpriseFile", param.file);
                this.$axios
                    .$POSTFile({
                        api_name: "uploadEnterpriseAttach",
                        baseURL: "/test",
                        fb: formData
                    })
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === "success") {
                            let data = new Object();
                            data.attachmentName = param.file.name;
                            data.attachmentId = res.data.data;
                            that.fromParent.enterpriseUnitAttachment.push(data);
                            that.$message.success("合同上传成功！");
                        } else {
                            that.$message.error(res.data.message);
                        }
                    });
            },
            //确认修改
            updateEnterpriseUnit(params) {
                const that = this;
                that.$refs["fromParent"].validate(valid => {
                    if (valid) {
                        let attachIds = "";
                        const array = this.fromParent.enterpriseUnitAttachment;
                        for (let key in array) {
                            attachIds += array[key].attachmentId;
                        }
                        if (attachIds === "") {
                            that.$message.warning("请上传合同");
                            // return;
                        }
                        that.$axios
                            .$POST_NEW({
                                api_name: "saveOrUpdateEnterpriseUnitInfo",
                                params: {
                                    createCenterCode: that.fromParent.createCenterCode,
                                    subCenterCode:that.fromParent.subCenterCode,
                                    unitId: that.fromParent.unitId,
                                    operationType: that.fromParent.operationType,
                                    screenFlag: that.fromParent.screenFlag,
                                    syncFlag:that.syncFlag,
                                    applyId:that.applyId,
                                    applyResult:that.applyResult,
                                    attachIds: attachIds,
                                    unitParentName: that.fromParent.unitParentName,
                                    disposeUserId:that.disposeUserId,
                                    disposeUserName:that.disposeUserName,
                                    firecontrolroomInfo: JSON.stringify(that.roomData),
                                    sync:that.syncFlag === 1,
                                    check: that.operationChecked === 1,
                                    unitName: that.fromParent.unitName,
                                    unitCreditCode:that.fromParent.unitCreditCode,
                                    cascader: that.fromParent.cascader,
                                    province: that.fromParent.province,
                                    city: that.fromParent.city,
                                    county: that.fromParent.county,
                                    unitAddress: that.fromParent.unitAddress,
                                    unitPointX: that.fromParent.unitPointX,
                                    unitPointY: that.fromParent.unitPointY,
                                    enterpriseUnitAccessChannel:that.fromParent.enterpriseUnitAccessChannel,
                                    enterpriseUnitServiceModel:that.fromParent.enterpriseUnitServiceModel,
                                    enterpriseUnitType:that.fromParent.enterpriseUnitType,
                                    bigScreen: that.bigScreenChecked,
                                    legalperson:that.fromParent.legalperson,
                                    legalpersonTel:that.fromParent.legalpersonTel,
                                    unitContact: that.fromParent.unitContact,
                                    unitContactTel: that.fromParent.unitContactTel,
                                    enterpriseUnitServiceStartDate:that.fromParent.enterpriseUnitServiceStartDate,
                                    enterpriseUnitServiceEndDate: that.fromParent.enterpriseUnitServiceEndDate,
                                }
                            })
                            .then(res => {
                                debugger
                                that.loading = false;
                                if (res.data.code === "success") {
                                    that.$message.success(res.data.message);
                                    that.$router.push({
                                        name: "ownerunitManager"
                                    });
                                } else {
                                    that.$message.error(res.data.message);
                                }
                            });
                    }
                });
            },

            //保存消控室用户信息
            savaEdit(index, row) {
                console.log(index, row);
            },

            saveForm() {
                // this.$refs.upload.submit();
                this.updateEnterpriseUnit(this.fromParent);
            },

            //地图选点
            mapChoosePoint() {
                let lng = this.fromParent.unitPointX;
                let lat = this.fromParent.unitPointY;
                this.center = {};
                this.center.lng = lng;
                this.center.lat = lat;
                this.center.address = this.fromParent.unitAddress;
                this.center.optMode = "edit";
                this.dialogMapVisible = true;
            },
            mapPointChange(pointObj) {
                this.fromParent.unitPointX = pointObj.position.lng;
                this.fromParent.unitPointX = pointObj.position.lat;
                this.fromParent.unitAddress = pointObj.title;
                this.dialogMapVisible = false;
            },
            //地图加载完成
            mapLoaded() {
                this.$refs["MyMap"].setLocationAdd(this.fromParent.unitAddress);
            },

            //下载合同
            downloadFile(data) {
                window.open(
                    "/test/ownerunit/downloadAttachById?attId=" +
                    data.attachmentId
                );
            },
            deleteFile(data) {
                const that = this;
                this.loading = true;
                this.$axios
                    .$POST_NEW({
                        api_name: "deleteEnterpriseAttach",
                        params: {
                            attachId: data.attachmentId
                        }
                    })
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === "success") {
                            that.$message.success(res.data.message);
                            that.fromParent.operationOrgAttachment = that.fromParent.operationOrgAttachment.filter(
                                obj => {
                                    return obj.attachmentId !== data.attachmentId;
                                }
                            );
                        } else {
                            that.$message.error(res.data.message);
                        }
                    });
            },
        }
    };
</script>

<style lang="scss" scoped>
  @import "~/assets/css/list.scss";

  $--color-primary: #1c77ff;
  /deep/ .top-tab {
    .el-tabs__nav {
      margin-left: 25px;
      height: 0px;
      line-height: 65px;
    }

    .el-tabs__item {
      font-size: 18px;
      font-weight: 400;
      color: rgba(37, 40, 46, 1);

      &.is-active {
        color: rgba(28, 119, 255, 1);
      }
    }

    .tab-content {
      padding: 0 40px;

      .title {
        font-size: 18px;
        font-weight: 400;
        color: rgba(37, 40, 46, 1);
        margin: 5px 0 10px 0;
      }
    }
  }

  .main-wrap {
    overflow-y: auto;
  }

  .Crumbs {
    .el-breadcrumb {
      display: inline-block;
    }
  }

  .back-pre {
    float: right;
    margin-right: 20px;
    color: #1c77ff;
    text-decoration: none;
  }

  /deep/ .upload-demo {
    .el-upload-list__item {
      background-color: #f5f7fa;

      .el-icon-close {
        display: inline-block;
      }
    }
  }

  //城市三级联动
  .businessAddress {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    text-indent: 15px;
  }

  /deep/ .area-cascader-wrap {
    background: transparent;

    .area-select {
      &.large {
        width: 100%;
        background: transparent;
        line-height: 34px;

        .area-selected-trigger {
          background: transparent;
          padding: 0 15px;
        }
      }
    }

    .cascader-menu-list-wrap {
      border: solid 1px #e4e7ed;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .cascader-menu-list {
      .cascader-menu-option {
        &.selected {
          color: $--color-primary;
          background: transparent;
        }
      }
    }
  }
</style>


















