<!--
 * @Descripttion: 运营中心管理--企业用户管--业主单位
 * @version: 
 * @Author: yangxq
 * @Date: 2019-07-18 09:48:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-07-25 12:38:20
 -->
<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>运营中心</el-breadcrumb-item>
        <el-breadcrumb-item>企业用户</el-breadcrumb-item>
        <el-breadcrumb-item>业主单位用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>业主单位用户</h3>
        </el-col>

        <el-col :span="12" class="add-btn-style">
          <el-button type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
        </el-col>
      </el-row>
      <div class="main-container">
        <div class="enterpriserUser-wrap">
          <div class="left-tree">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

            <!-- <el-tree
              class="filter-tree"
              :data="treeData"
              :props="defaultProps"
              default-expand-all
              node-key="orgCode"
              :filter-node-method="filterNode"
              ref="tree"
              highlight-current
              @node-click="handleNodeClick"
            ></el-tree>-->
          </div>
          <div class="right-con">
            <el-tree
              :data="stationTree"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2,3]"
              :default-checked-keys="[5]"
            ></el-tree>
            <div class="list-wrap">
              <el-table
                v-loading.lock="isLoading"
                :data="tableData"
                show-overflow-tooltip
                stripe
                @row-click="detail"
              >
                <el-table-column
                  label="用户名"
                  prop="loginName"
                  show-overflow-tooltip
                  align="center"
                  min-width="10%"
                ></el-table-column>
                <el-table-column
                  label="手机号"
                  prop="userTelphone"
                  show-overflow-tooltip
                  align="center"
                  min-width="10%"
                ></el-table-column>
                <el-table-column
                  label="角色"
                  prop="userRole"
                  show-overflow-tooltip
                  align="center"
                  min-width="10%"
                ></el-table-column>
                <el-table-column
                  label="姓名"
                  prop="userName"
                  show-overflow-tooltip
                  align="center"
                  min-width="10%"
                ></el-table-column>
                <el-table-column
                  label="账号状态"
                  prop="userAuthStatusName"
                  show-overflow-tooltip
                  align="center"
                  min-width="10%"
                ></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center" min-width="10%">
                  <template slot-scope="scope">
                    <div>
                      <!-- //<el-link type="primary" @click="resetPassword(scope.row.id)">重置密码</el-link> -->
                      <el-link
                        type="primary"
                        v-if="scope.row.userAuthStatus != 2"
                        @click.stop="resetPassword(scope.row.id)"
                      >重置密码</el-link>
                      <el-link
                        type="primary"
                        v-if="scope.row.userAuthStatus != 2"
                        @click.stop="lock(scope.row)"
                      >锁定</el-link>
                      <el-link
                        type="primary"
                        v-if="scope.row.userAuthStatus == 2"
                        @click.stop="unLock(scope.row)"
                      >解锁</el-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- <Pagination
              :widgetInfo="widgetInfo"
              v-on:sonHandleCurrentChange="sonHandleCurrentChange"
            />-->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="widgetInfo.pageNo"
              :page-sizes="[10, 15, 20,25]"
              :page-size="widgetInfo.pageSize"
              :total="widgetInfo.total"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="创建管理员" :visible.sync="dialogFormVisible" @close="closeDialog()" width="450px">
      <div class="createAdmin-wrap">
        <el-form :inline="true" :model="createAdminForm" :rules="rules" ref="createAdminForm">
          <el-form-item label="手机号:" prop="userTelphone">
            <el-input v-model="createAdminForm.userTelphone" @blur="findUserByUserTelphone()"></el-input>
          </el-form-item>
          <el-form-item label="用户名:" prop="loginName">
            <el-input v-model="createAdminForm.loginName"></el-input>
          </el-form-item>
          <el-form-item label="提示" class="tip">
            <div>1-14位，支持纯英文、纯数字或者英文+数字组合，区分英文大小写，不支持特殊符号和中文</div>
          </el-form-item>
          <el-form-item label="姓名:" prop="userName">
            <el-input v-model="createAdminForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="登录密码:" prop="password">
            <el-input type="password" v-model="createAdminForm.password"></el-input>
          </el-form-item>
          <el-form-item label="提示" class="tip">
            <div>6~14位，由英文+数字组合，区分英文大小写，不支持特殊符号</div>
          </el-form-item>
          <el-form-item label="角色:" prop="roleIds">
            <el-select
              placeholder="请选择"
              multiple
              filterable
              allow-create
              v-model.trim="createAdminForm.roleIds"
            >
              <el-option
                v-for="item in rolesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位:" prop="station">
            <el-input v-model="createAdminForm.station"></el-input>
            <div class="station-tree-wrap"></div>
          </el-form-item>
          <el-form-item label="性别:" prop="userSex">
            <el-select placeholder="请选择性别" v-model.trim="createAdminForm.userSex">
              <el-option
                v-for="item in userSexs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="邮箱:" prop="userEmail">
            <el-input v-model="createAdminForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="身份证:" prop="userCardNo">
            <el-input v-model="createAdminForm.userCardNo"></el-input>
          </el-form-item>
          <el-form-item class="btn-item">
            <el-button type="primary" size="small" @click="saveOrUpdateForm('createAdminForm')">确认</el-button>
            <el-button size="small" @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="用户详情" :visible.sync="DetailDialogVisible" width="540px">
      <div id="userDetail">
        <div class="user-info">
          <div class="w-photo">
            <div class="photo">
              <img :src="userPhoto" />
            </div>
            <i :class="genderIcon"></i>
            <div class="name">{{info.userName}}</div>
          </div>
          <ul class="base-info">
            <li>
              <i class="iconfont icon-user-line"></i>
              <em class="label">用 户 名：</em>
              <em class="value">{{info.loginName}}</em>
            </li>
            <li>
              <i class="iconfont icon-mail-line"></i>
              <em class="label">邮 箱：</em>
              <em class="value">{{ info.userEmail }}</em>
            </li>
            <li>
              <i class="iconfont icon-phone-line"></i>
              <em class="label">手 机 号：</em>
              <em class="value">{{ info.userTelphone }}</em>
            </li>
            <li>
              <i class="iconfont icon-idcard-line"></i>
              <em class="label">身 份 证：</em>
              <em class="value">{{ info.userCardNo }}</em>
            </li>
          </ul>
        </div>
        <div class="detail-module-a">
          <div class="m-title">账号信息</div>
          <div class="m-content">
            <div class="account-info">
              <ul class="list">
                <li>
                  <em class="label">应用：</em>
                  <div class="value">{{ info.sysName || '--'}}</div>
                </li>
                <li>
                  <em class="label">角色：</em>
                  <div class="value">{{ info.roleName || '--'}}</div>
                </li>
                <li class="i-72">
                  <em class="label">客服账号：</em>
                  <div class="value">{{ info.exten || '--'}}</div>
                </li>
              </ul>
              <ul class="list">
                <li>
                  <em class="label">单位：</em>
                  <div class="value">{{ info.orgName || '--'}}</div>
                </li>
                <li>
                  <em class="label">岗位：</em>
                  <div class="value">{{ info.postName || '--'}}</div>
                  <div class="station-tree-box"></div>
                </li>
                <li class="i-72">
                  <em class="label">创建时间：</em>
                  <div class="value">{{ info.createTime || '--'}}</div>
                </li>
              </ul>
            </div>
            <div class="exit-time">
              <i class="iconfont icon-exit-1"></i>
              最近一次登录&nbsp;{{ info.lastLoginTime || '--' }}
            </div>
          </div>
        </div>
      </div>
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
      dialogFormVisible: false, //关闭窗口 创建管理员
      DetailDialogVisible: false, //关闭窗口 用户详情
      isLoading: false,
      userObj: {},
      info: {},
      baseImg: require("~/assets/img/user-photo-default.png"),
      filterText: "",
      // currentNode: "",
      userSexs: [
        {
          label: "男",
          value: "0"
        },
        {
          label: "女",
          value: "1"
        },
        {
          label: "其他",
          value: "2"
        }
      ],
      rolesList: [],
      createAdminForm: {
        userTelphone: "",
        loginName: "",
        userName: "",
        password: "",
        roleIds: [],
        userSex: "",
        userEmail: "",
        userCardNo: "",
        station: ""
      },
      treeData: [],
      tableData: [],
      orgCode: "", //当前业主单位
      stationTree: [],
      postCodes: [], //岗位id
      widgetInfo: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      defaultProps: {
        children: "childNodes",
        label: "unit_name"
        // children: "childNodes",
        // label: "orgName"
      },
      rules: {
        userTelphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8})$/,
            message: "请输入正确格式的手机号！"
          }
        ],
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,14}$/,
            message: "请输入正确格式的用户名！"
          }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/,
            message: "请输入正确格式的密码！"
          }
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
        userSex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      }
    };
  },
  computed: {
    currentOrgcode() {
      return this.treeData.length > 0 ? this.treeData[0].unit_id : "";
    },
    genderIcon: function() {
      //详情性别图标
      if (this.info.userSex) {
        return this.info.userSex === "0"
          ? "icon-gender iconfont icon-gender-male"
          : "icon-gender iconfont icon-gender-female";
      } else {
        return "";
      }
    },
    userPhoto: function() {
      //详情用户头像
      return this.info.photoUrl ? this.info.photoUrl : this.baseImg;
    }
  },
  mounted() {
    let that = this;

    // that.getTtree(() => {
    //   this.$nextTick(() => {
    //     that.$refs["tree"].setCurrentKey(that.treeData[0].unit_id);
    //   });
    //   that.queryList();
    //   console.log("hat.stationTree", that.stationTree);
    //   列表;
    //   that.getTableData();
    //   //获取角色
    //   that.getRole();
    //   //获取岗位树
    //   that.getStation();
    // });
    that.queryList();
    that.userObj = that._Storage.getObj("userObj", "userObj");
  },
  methods: {
    queryList() {
      let that = this;
      var data1 = [
        {
          name: "研发部",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85be6eeb044d",
          type: "1",
          parentId: "-1"
        },
        {
          name: "邵秦部门",
          deptName: "邵秦部门",
          id: "2c9078c46a637f98016a85be9ca3044e",
          type: "1",
          parentId: "-1"
        },
        {
          name: "软件测试工程师",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85bf6344044f",
          type: "2",
          parentId: "2c9078c46a637f98016a85be6eeb044d"
        },
        {
          name: "java开发工程师",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85c01bf30450",
          type: "2",
          parentId: "2c9078c46a637f98016a85be6eeb044d"
        }
      ];
      that.stationTree = [
        {
          name: "研发部",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85be6eeb044d",
          type: "1",
          parentId: "-1"
        },
        {
          name: "邵秦部门",
          deptName: "邵秦部门",
          id: "2c9078c46a637f98016a85be9ca3044e",
          type: "1",
          parentId: "-1"
        },
        {
          name: "软件测试工程师",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85bf6344044f",
          type: "2",
          parentId: "2c9078c46a637f98016a85be6eeb044d"
        },
        {
          name: "java开发工程师",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85c01bf30450",
          type: "2",
          parentId: "2c9078c46a637f98016a85be6eeb044d"
        }
      ];
      for (var i = 0; i < that.stationTree.length; i++) {
        if (that.stationTree[i].parentId == -1) {
          that.stationTree[i].children = [];
        }
        console.log("that.stationTree", that.stationTree);
        for (var j = 0; j < data1.length; j++) {
          if (that.stationTree.id == that.stationTree.parentId) {
            that.stationTree[i].children[0].push[that.stationTree];
          }
        }
      }
      console.log("that.stationTree", that.stationTree);
    },
    //表格数据
    getTableData() {
      let that = this;
      that.isLoading = true;
      that.$axios
        .$POST_NEW({
          api_name: "queryUserListBySysCodeAndOrgCode",
          params: {
            centerType: 3, //2：运营中心 3：业主单位 4：服务机构
            orgCode: that.orgCode || that.currentOrgcode,
            pageNo: that.widgetInfo.pageNo,
            pageSize: that.widgetInfo.pageSize
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            that.isLoading = false;
            var data = res.data.data;
            that.tableData = data.rows;
            that.widgetInfo.total = data.total === null ? 0 : data.total;
          } else {
            that.tableData = [];
            that.widgetInfo.list = res.data.rows;
            that.widgetInfo.total = 0;
            console.log("没有数值。。。。。");
          }
        });
    },
    //用户详情
    detail(row, event, column) {
      let that = this;
      console.log(row, event, column);
      that.DetailDialogVisible = true;
      that.userfindUserByUserId(row.id, row.orgCode);
    },
    //左侧树结构
    getTtree(cb) {
      let that = this;
      that.isLoading = true;
      that.$axios
        .$POST_NEW({
          api_name: "getRecordEnterpriseUnitTree",
          params: {
            orgCode: "340100FWZX201805230001"
          }
        })
        .then(res => {
          if (res.data.code == "success" && res.data.data.length > 0) {
            that.isLoading = false;
            that.treeData = res.data.data;
            cb & cb();
          } else {
          }
        });
    },
    //过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    //树点击事件
    handleNodeClick(data) {
      let that = this;
      that.orgCode = data.unit_id;
      that.getTableData();
      that.getRole();
      //获取岗位树
      that.getStation();
    },
    //新增用户
    add() {
      let that = this;
      // 判断是否有数据。有数据时则不弹出新增页面
      that.$axios
        .$POST_NEW({
          api_name: "findAdminUser",
          params: {
            sysCode: "operation_system",
            orgCode: that.orgCode || that.currentOrgcode
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            if (res.data.data.length) {
              that.$message({
                message: "管理员账户已存在！",
                type: "warning"
              });
            } else {
              that.dialogFormVisible = true;
            }
          }
        });
    },

    //重置密码
    resetPassword(id) {
      let that = this;
      const h = that.$createElement;
      that
        .$msgbox({
          title: "",
          message: h(
            "div",
            { style: " font-size: 18px;color: #434343; text-align: center;" },
            [
              h("div", null, "确认重置密码? "),
              h(
                "div",
                { style: "font-size: 16px;color: #999;    margin: 20px 0;" },
                "重置后密码为a123456，重置后请及时告知用户"
              )
            ]
          ),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
        .then(action => {
          that.$message({
            type: "success",
            message: "重置密码成功!"
          });
          that.resetPasswordByUserIdBusiness(id);
        })
        .catch(() => {
          that.$message({
            type: "warning",
            message: "已取消重置密码"
          });
        });
    },
    //重置密码接口获取
    resetPasswordByUserIdBusiness(row) {
      let that = this;
      that.$axios
        .$POST_NEW({
          api_name: "resetPasswordByUserIdBusiness",
          params: {
            userId: id
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            this.$message({
              message: "密码重置成功!",
              type: "success"
            });
          }
        });
    },

    //锁定账号
    lock(row) {
      let that = this;
      const h = that.$createElement;
      that
        .$msgbox({
          title: "锁定账号",
          message: h(
            "div",
            { style: " font-size: 18px;color: #434343; text-align: center;" },
            [h("div", null, "确认锁定该账号，锁定后该账号将不能登录当前系统 ")]
          ),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
        .then(action => {
          // that.$message({
          //   type: "success",
          //   message: "锁定成功!"
          // });
          that.getLock(row, 2, "锁定成功!");
        })
        .catch(() => {
          that.$message({
            type: "warning",
            message: "已取消锁定"
          });
        });
    },
    //解锁账号
    unLock(row) {
      let that = this;
      const h = that.$createElement;
      that
        .$msgbox({
          title: "解锁账号",
          message: h(
            "div",
            { style: " font-size: 18px;color: #434343; text-align: center;" },
            [h("div", null, "确认解锁账号，解锁后恢复账号当前系统登录权限 ")]
          ),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
        .then(action => {
          // that.$message({
          //   type: "success",
          //   message: "锁定成功!"
          // });
          that.getLock(row, 1, "解锁成功");
        })
        .catch(() => {
          that.$message({
            type: "warning",
            message: "已取消锁定"
          });
        });
    },
    //锁定账号接口获取
    getLock(row, operateType, describe) {
      let that = this;
      that.$axios
        .$POST_NEW({
          api_name: "getLock",
          params: {
            userId: row.id,
            lockUserId: that.userObj.id,
            centerType: row.sysCode,
            orgCode: row.orgCode,
            operateType: operateType
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            that.$message({
              message: describe,
              type: "success"
            });
            that.getTableData();
          }
        });
    },
    //保存用户
    saveOrUpdateForm(formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.$axios
            .$POST_NEW({
              api_name: "saveOrUpdateUser",
              params: {
                centerType: 2,
                createUserId: that.userObj.id,
                userTelphone: that.createAdminForm.userTelphone,
                loginName: that.createAdminForm.loginName,
                userName: that.createAdminForm.userName,
                password: that.createAdminForm.password,
                roleIds: that.createAdminForm.roleIds.join(","),
                userSex: that.createAdminForm.userSex,
                userEmail: that.createAdminForm.userEmail,
                userCardNo: that.createAdminForm.userCardNo,
                orgCode: that.orgCode || that.currentOrgcode
              }
            })
            .then(res => {
              if (res.data.code == "success") {
                that.getTableData();
                that.$message({
                  message: res.data.message,
                  type: "success"
                });
                this.$refs["createAdminForm"].resetFields();
                that.dialogFormVisible = false;
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        }
      });
    },
    //取消
    cancel() {
      let that = this;
      that.$refs["createAdminForm"].resetFields();
      that.dialogFormVisible = false;
    },
    closeDialog() {
      let that = this;
      that.$refs["createAdminForm"].resetFields();
    },
    //根据系统code与组织机构code获取角色列表
    getRole() {
      let that = this;
      that.$axios
        .$POST_NEW({
          api_name: "findRoleListBySysCodeAndOrgCode",
          params: {
            centerType: 2,
            orgCode: that.orgCode || that.currentOrgcode
          }
        })
        .then(res => {
          if (res.data.code == "success" && res.data.data.data.length > 0) {
            this.rolesList = res.data.data.data;
          } else {
          }
        });
    },
    //根据系统CODE、组织机构CODE获取管理员账号
    findAdminUser() {
      let that = this;
      that.$axios
        .$POST_NEW({
          api_name: "findAdminUser",
          params: {
            orgCode: that.orgCode || that.currentOrgcode,
            sysCode: "manager"
          }
        })
        .then(res => {
          if (res.data.code == "success") {
          } else {
          }
        });
    },
    //获取用户信息
    userfindUserByUserId(userId, orgCode) {
      let that = this;
      that.$axios
        .$POST_NEW({
          api_name: "userfindUserByUserId",
          params: {
            centerType: 3,
            userId: userId,
            orgCode: orgCode
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            that.info = res.data.data;
          } else {
          }
        });
    },

    // 手机号验证加带入基本信息
    findUserByUserTelphone() {
      let that = this;
      that.$axios
        .$POST_NEW({
          api_name: "findUserByUserTelphone",
          params: {
            userTelphone: that.createAdminForm.userTelphone,
            orgCode: that.orgCode || that.currentOrgcode
          }
        })
        .then(res => {
          if (res.data.code == "success") {
            var userExist = res.data.data.userExist;
            var userOrgcode = that.orgCode || that.currentOrgcode;
            if (userExist) {
              var authList = res.data.data.authList;
              for (var i = 0; i < authList.length; i++) {
                if (
                  authList[i].sysCode == "operation_system" &&
                  authList[i].orgCode == userOrgcode
                ) {
                  // 用户存在说明在此系统已存在，则return，不带回信息
                  that.$message({
                    message: "账号已创建，请重新输入手机号!",
                    type: "warning"
                  });
                  // 手机号置空
                  //INPUT.userTelphone._data["orgObj_PhoneDiv"] = "";
                  that.createAdminForm.userTelphone = "";
                  return;
                }
              }
              that.createAdminForm = res.data.data.userInfo;
            }
          } else {
            that.$refs["createAdminForm"].resetFields();
          }
        });
    },
    //岗位树
    // getStation() {
    //   let that = this;
    //   that.$axios
    //     .$POST_NEW({
    //       api_name: "findAllDeptAndPostNoTree",
    //       params: {
    //         centerType: 3,
    //         orgCode: that.orgCode || that.currentOrgcode
    //       }
    //     })
    //     .then(res => {
    //       if (res.data.code == "success") {
    //       } else {
    //       }
    //     });
    // },

    handleSizeChange(val) {
      this.widgetInfo.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.widgetInfo.pageNo = val;
      this.getTableData();
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/operatingCenter.scss";
</style>