<template>
  <div class="msgbox-container" :class="{show:show}" v-loading="loading">
    <div class="msgbox">
      <div class="msgbox-title">
        <span>新增用户-add</span>
        <img src="~/assets/img/msgbox-close.png" alt class="cursor" @click="close" />
        <!-- <img src="../../assets/img/msgbox-close.png" alt class="cursor" @click="close" />// -->
      </div>
      <div class="msgbox-main">
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">
            <b>*</b>上级资源:
          </div>
          <el-input type="text" style="width:60%" @focus="isfocus($event,'show')" v-model="sysName"></el-input>
          <!-- :default-checked-keys="info.parentId==='-1'?[info.id]:[info.parentId]" -->
          <div v-show="treeShow" class="three-container" @click="treeShow=false">
            <div class="treeData">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="treeForm"
                :props="defaultProps"
                :default-expand-all="true"
                :check-strictly="true"
                @check="handleClick"
              ></el-tree>
            </div>
          </div>
        </div>
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">
            <b>*</b>资源类型:
          </div>
          <div style="width:60%;text-align:left;">
            <el-radio v-model="info.resType" label="0">目录</el-radio>
            <el-radio v-model="info.resType" label="1">菜单</el-radio>
            <el-radio v-model="info.resType" label="2">按钮</el-radio>
          </div>
        </div>
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">
            <b>*</b>资源名称:
          </div>
          <!-- <input type="text" style="width:60%" placeholder="请输入菜单名称或按钮名称" v-model="info.resName"> -->
          <el-input type="text" style="width:60%" placeholder="请输入菜单名称或按钮名称" v-model="info.resName"></el-input>
        </div>
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">资源别名:</div>
          <el-input
            type="text"
            style="width:60%"
            placeholder="请输入菜单名称或按钮名称"
            v-model="info.resAlias"
          ></el-input>
        </div>
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">链接地址:</div>
          <el-input type="text" style="width:60%" placeholder="请输入请求地址" v-model="info.resUrl"></el-input>
        </div>
        <!-- <div class="msgbox-item">
          <div style="width:20%" class="item-name">权限标识:</div>
          <el-input type="text" style="width:60%" placeholder="请输入权限标识" v-model="info.resIdent"></el-input>
        </div>-->
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">请求方式:</div>
          <!-- <input type="text" style="width:60%" v-model="info.resRequestType"> -->
          <el-select v-model="info.resRequestType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">图标:</div>
          <el-input type="text" style="width:60%" placeholder="请输入图标" v-model="info.resIcon"></el-input>
        </div>
        <div class="msgbox-item">
          <div style="width:20%" class="item-name">
            <b>*</b> 序号:
          </div>
          <div style="width:60%;display: flex;">
            <el-input-number v-model="info.resOrder" controls-position="right" :min="1"></el-input-number>
          </div>
        </div>
        <div class="msgbox-item">
          <div class="msgbox-btn cursor" @click="close">取消</div>
          <div class="msgbox-btn-save cursor" @click="seedData">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTree } from "~/components/resourceManage/treeToArray";
import { system_item, admin_dataRes } from "~/config/conf";

const HOME_DIRECTORY = {
  resName: "主目录",
  id: "-1",
  children: ""
};

const RES_REQUESTTYPE = [
  { value: "get", label: "get" },
  { value: "post", laber: "post" },
  { value: "put", label: "put" },
  { value: "delete", label: "delete" }
];

// var admin_dataRes = admin_dataRes;

export default {
  props: ["code"],
  data() {
    return {
      show: false,
      info: {
        // resType:0,
        // resName:'测试测试',
        // resAlias:'资源别名',
        // resUrl:'haha/ee',
        // resIdent:'bs',
        // resRequestType:'get',
        // resIcon:'icon',
        resOrder: 1
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "resName"
      },
      treeShow: false,
      sysName: "",
      options: RES_REQUESTTYPE,
      loading: false
    };
  },
  computed: {
    useObj() {
      return this._Storage.getObj("downListRow", "obj");
    }
  },
  watch: {
    code() {
      this.getSysCode();
    }
  },
  methods: {
    getSysCode() {
      // return  axios({
      //     method:'post',
      //     // url:'http://192.168.90.250:9898/res/findResourceBySysCode',
      //      url:api.forent_url.res_url+'/findResourceBySysCode',
      //     params:{
      //         sysCode:this.code
      //     }
      // })
      return this.$axios
        .$POST({
          api_name: "/res/findResourceBySysCode",
          params: {
            sysCode: this.sysCode
          }
        })
        .then(res => {
          this.data = [];
          let data;
          if (res.data.length > 0) {
            data = getTree(res.data, "-1", "id", "parentId");
            data.unshift(HOME_DIRECTORY);
            this.data = data;
          } else {
            data = HOME_DIRECTORY;
            this.data.push(data);
          }
          this.$nextTick(() => {
            this.parentId = this.data[0].id;
            this.sysName = this.data[0].resName;
            this.$refs.treeForm.setCheckedKeys([this.data[0].id]);
          });
        });
    },
    open() {
      this.show = true;
      this.getSysCode();
    },
    close() {
      this.show = false;
      this.treeShow = false;
      this.info = {};
    },
    isfocus(event, show) {
      event.target.blur();
      if (show) {
        this.treeShow = !this.treeShow;
      }
    },
    handleClick(data, checked, node) {
      let { id, resName } = data;
      this.$refs.treeForm.setCheckedNodes([]);
      this.$refs.treeForm.setCheckedNodes([data]);
      this.parentId = id;
      this.sysName = resName;
      this.treeShow = false;
    },
    seedData() {
      let info = this.info;
      if (!info.resType) {
        this.$message({
          message: "资源类型不能为空,请选择",
          type: "warning"
        });
        return;
      }
      if (!info.resName) {
        this.$message({
          message: "资源名称不能为空,请填写",
          type: "warning"
        });
        return;
      }
      if (!info.resOrder) {
        this.$message({
          message: "序号不能为空,请填写",
          type: "warning"
        });
        return;
      }
      this.loading = true;
      let {
        id,
        resOrder,
        resName,
        resAlias,
        resUrl,
        resType,
        resIdent,
        resRequestType,
        resIcon,
        sysCode
      } = info;
      //    axios({
      //        method:'post',
      //     //    url:'http://192.168.90.250:9898/res/addResource',
      //        url:api.forent_url.res_url+'/addResource',
      //        params:{
      //             id:id,
      //             resOrder:resOrder,
      //             resName:resName,
      //             resAlias:resAlias,
      //             resUrl:resUrl,
      //             resType:resType,
      //             resIdent:resIdent,
      //             resRequestType:resRequestType,
      //             resIcon:resIcon,
      //             sysCode:this.code,
      //             dataRes:'03',
      //             updateUserId:this.useObj.id,
      //             parentId:this.parentId
      //        }
      //    })

      this.$axios
        .$POST({
          api_name: "/res/addResource",
          params: {
            resOrder: resOrder,
            resName: resName,
            resAlias: resAlias,
            resUrl: resUrl,
            resType: resType,
            //resIdent: resIdent,
            resRequestType: resRequestType,
            resIcon: resIcon,
            sysCode: "manager",
            dataRes: "manager",
            createUserId: this.useObj.id,
            updateUserId: this.useObj.id,
            parentId: this.parentId
          }
        })
        .then(res => {
          let type = "success";
          this.$bus.emit("refresh");
          this.loading = false;
          this.close();
          if (res.code === "code") type = "error";
          this.$message({
            type: type,
            message: res.message
          });
        });
    }
  }
};
</script>




<style lang="scss" scoped>
@mixin display($content, $align) {
  display: flex;
  justify-content: $content;
  align-items: $align;
}
.msgbox-container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.4s;
  opacity: 0;
  visibility: hidden;
  .msgbox {
    width: 432px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .msgbox-title {
      @include display(space-between, center);
      background: #254f85;
      color: white;
      text-align: left;
      padding: 6px 15px;
      font-size: 16px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      img {
        width: 15px;
        height: 15px;
      }
    }
    .msgbox-main {
      padding: 20px 0;
      background: white;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      .msgbox-item {
        @include display(center, center);
        position: relative;
        margin: 10px 0;
        .item-name {
          text-align: right;
          font-size: 16px;
          margin-right: 10px;
          b {
            color: red;
          }
        }
        input {
          padding: 3px 10px;
        }
        .treeData {
          background: white;
          position: absolute;
          top: 106px;
          right: 8.7%;
          width: 59.5%;
          z-index: 100;
          border: 1px solid #ececec;
        }
        .msgbox-btn,
        .msgbox-btn-save {
          width: 80px;
          margin: 0 10px;
          padding: 3px 0;
          background: #e7e7e7;
          font-size: 14px;
          color: #979797;
          border-radius: 3px;
        }
        .msgbox-btn-save {
          background: #009cff;
          color: white;
        }
      }
    }
  }
}
.el-select {
  width: 60%;
}
.show {
  opacity: 1;
  visibility: visible;
}
.three-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
}
.cursor {
  cursor: pointer;
}
</style>