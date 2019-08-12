<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>统计报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">火灾数据统计</template>
              <el-menu-item index="1">企业报警统计</el-menu-item>
              <el-menu-item index="2">运营中心报警统计(昨天)</el-menu-item>
              <el-menu-item index="3">通话时间(昨天)</el-menu-item>
              <el-menu-item index="4">企业火警明细</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">经开区数据统计</template>
              <el-menu-item index="5">报警复核(昨天)</el-menu-item>
              <el-menu-item index="6">单位报警统计</el-menu-item>
              <el-menu-item index="7">单位设施巡查统计(昨天)</el-menu-item>
              <el-menu-item index="8">设备离在线数量统计</el-menu-item>
              <el-menu-item index="9">设备离线详情</el-menu-item>
              <el-menu-item index="10">单位防火检查统计(昨天)</el-menu-item>
              <el-menu-item index="11">消控室值班</el-menu-item>
              <el-menu-item index="12">单位防火巡查统计</el-menu-item>
              <el-menu-item index="13">单位防火巡查统计(昨天)</el-menu-item>
              <el-menu-item index="14">物联网设备数统计(不包含主机)</el-menu-item>
              <el-menu-item index="15">单位巡检巡查信息查询(消控室值班)</el-menu-item>
              <el-menu-item index="16">单位隐患管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">用户数据统计</template>
              <el-menu-item index="17">企业侧注销用户明细(全部)</el-menu-item>
              <el-menu-item index="18">企业侧注销用户明细(昨天)</el-menu-item>
              <el-menu-item index="19">全量数据</el-menu-item>
              <el-menu-item index="20">企业侧新增用户明细(昨天)</el-menu-item>
              <el-menu-item index="21">各侧注销的用户数(不包含当天)</el-menu-item>
              <el-menu-item index="22">统计各侧新增的用户数(昨天)</el-menu-item>
              <el-menu-item index="23">各侧已开通用户数(不包含当天的和已注销用户)</el-menu-item>
              <el-menu-item index="24">企业侧用户中注册用户数量、机构用户数量(全部)</el-menu-item>
              <el-menu-item index="25">企业侧用户中注册用户数量、机构用户数量(昨天)</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">企业数据统计</template>
              <el-menu-item index="26">企业活跃情况统计</el-menu-item>
              <el-menu-item index="27">企业新增账号</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="12" class="add-btn-style">
          <span v-show="currentKey==='1'||currentKey ==='4'|| this.currentKey ==='6'" style="font-weight: normal;!important;">查询时间:</span>
          <el-select v-show="currentKey==='1'||currentKey ==='4'|| this.currentKey ==='6'" id="querySelect" style="width: 20%;" @change="changeSelect" placeholder="请选择" filterable v-model.trim="num">
            <el-option
              v-for="item in onlineStates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" @click="exportExcel()">导出Excel</el-button>
        </el-col>
      </el-row>
      <el-row>
        <dataCenterPage1 ref="dataCenterPage1" v-if="currentKey === '1'"></dataCenterPage1>
        <dataCenterPage2 ref="dataCenterPage2" v-else-if="currentKey === '2'"></dataCenterPage2>
        <dataCenterPage3 ref="dataCenterPage3" v-else-if="currentKey === '3'"></dataCenterPage3>
        <dataCenterPage4 ref="dataCenterPage4" v-else-if="currentKey === '4'"></dataCenterPage4>

        <dataCenterPage5 ref="dataCenterPage5" v-else-if="currentKey === '5'"></dataCenterPage5>
        <dataCenterPage6 ref="dataCenterPage6" v-else-if="currentKey === '6'"></dataCenterPage6>
        <dataCenterPage7 ref="dataCenterPage7" v-else-if="currentKey === '7'"></dataCenterPage7>
        <dataCenterPage8 ref="dataCenterPage8" v-else-if="currentKey === '8'"></dataCenterPage8>
        <dataCenterPage9 ref="dataCenterPage9" v-else-if="currentKey === '9'"></dataCenterPage9>
        <dataCenterPage10 ref="dataCenterPage10" v-else-if="currentKey === '10'"></dataCenterPage10>
        <dataCenterPage11 ref="dataCenterPage11" v-else-if="currentKey === '11'"></dataCenterPage11>
        <dataCenterPage12 ref="dataCenterPage12" v-else-if="currentKey === '12'"></dataCenterPage12>
        <dataCenterPage13 ref="dataCenterPage13" v-else-if="currentKey === '13'"></dataCenterPage13>
        <dataCenterPage14 ref="dataCenterPage14" v-else-if="currentKey === '14'"></dataCenterPage14>
        <dataCenterPage15 ref="dataCenterPage15" v-else-if="currentKey === '15'"></dataCenterPage15>
        <dataCenterPage16 ref="dataCenterPage16" v-else-if="currentKey === '16'"></dataCenterPage16>

        <dataCenterPage17 ref="dataCenterPage17" v-else-if="currentKey === '17'"></dataCenterPage17>
        <dataCenterPage18 ref="dataCenterPage18" v-else-if="currentKey === '18'"></dataCenterPage18>
        <dataCenterPage19 ref="dataCenterPage19" v-else-if="currentKey === '19'"></dataCenterPage19>
        <dataCenterPage20 ref="dataCenterPage20" v-else-if="currentKey === '20'"></dataCenterPage20>
        <dataCenterPage21 ref="dataCenterPage21" v-else-if="currentKey === '21'"></dataCenterPage21>
        <dataCenterPage22 ref="dataCenterPage22" v-else-if="currentKey === '22'"></dataCenterPage22>
        <dataCenterPage23 ref="dataCenterPage23" v-else-if="currentKey === '23'"></dataCenterPage23>
        <dataCenterPage24 ref="dataCenterPage24" v-else-if="currentKey === '24'"></dataCenterPage24>
        <dataCenterPage25 ref="dataCenterPage25" v-else-if="currentKey === '25'"></dataCenterPage25>

        <dataCenterPage26 ref="dataCenterPage26" v-else-if="currentKey === '26'"></dataCenterPage26>
        <dataCenterPage27 ref="dataCenterPage27" v-else-if="currentKey === '27'"></dataCenterPage27>
      </el-row>
      </div>
    </div>
</template>
<script>
import dataCenterPage1 from "~/components/dataCenterPage/getAlarmDataOfCompany";
import dataCenterPage2 from "~/components/dataCenterPage/getAlarmDataOfService";
import dataCenterPage3 from "~/components/dataCenterPage/getCallTimeDetails";
import dataCenterPage4 from "~/components/dataCenterPage/getFireAlarmDetails";

import dataCenterPage5 from "~/components/dataCenterPage/jingkaiData/getAlarmCheck";
import dataCenterPage6 from "~/components/dataCenterPage/jingkaiData/getAlerm";
import dataCenterPage7 from "~/components/dataCenterPage/jingkaiData/getFireAlarmDetails";
import dataCenterPage8 from "~/components/dataCenterPage/jingkaiData/getEquipmentOffOrLine";
import dataCenterPage9 from "~/components/dataCenterPage/jingkaiData/getEquipmentOffline";
import dataCenterPage10 from "~/components/dataCenterPage/jingkaiData/getFireCheckYesterday";
import dataCenterPage11 from "~/components/dataCenterPage/jingkaiData/getFireDuty";
import dataCenterPage12 from "~/components/dataCenterPage/jingkaiData/getFirePatrol";
import dataCenterPage13 from "~/components/dataCenterPage/jingkaiData/getFirePatrolYesterday";
import dataCenterPage14 from "~/components/dataCenterPage/jingkaiData/getIOTEquipmentNum";
import dataCenterPage15 from "~/components/dataCenterPage/jingkaiData/getPatrolInspectionInfo";
import dataCenterPage16 from "~/components/dataCenterPage/jingkaiData/getRiskManage";

import dataCenterPage17 from "~/components/dataCenterPage/getCancelUserAllDetails";
import dataCenterPage18 from "~/components/dataCenterPage/getCancelUserDetailsYesterday";
import dataCenterPage19 from "~/components/dataCenterPage/getFullData";
import dataCenterPage20 from "~/components/dataCenterPage/getNewUserDetails";
import dataCenterPage21 from "~/components/dataCenterPage/getNumberOfCancelUser";
import dataCenterPage22 from "~/components/dataCenterPage/getNumberOfNewUser";

import dataCenterPage23 from "~/components/dataCenterPage/getNumberOfOldUser";
import dataCenterPage24 from "~/components/dataCenterPage/getRegiAndSysUserNumber";
import dataCenterPage25 from "~/components/dataCenterPage/getRegiAndSysUserNumberYesterday";

import dataCenterPage26 from "~/components/dataCenterPage/businessActivity";
import dataCenterPage27 from "~/components/dataCenterPage/newUserInNewCompany";
export default {
  components: {
    dataCenterPage1,
    dataCenterPage2,
    dataCenterPage3,
    dataCenterPage4,

    dataCenterPage5,
    dataCenterPage6,
    dataCenterPage7,
    dataCenterPage8,
    dataCenterPage9,
    dataCenterPage10,
    dataCenterPage11,
    dataCenterPage12,
    dataCenterPage13,
    dataCenterPage14,
    dataCenterPage15,
    dataCenterPage16,

    dataCenterPage17,
    dataCenterPage18,
    dataCenterPage19,
    dataCenterPage20,
    dataCenterPage21,
    dataCenterPage22,
    dataCenterPage23,
    dataCenterPage24,
    dataCenterPage25,

    dataCenterPage26,
    dataCenterPage27
  },
  data() {
    return {
      num:1,
      activeIndex: '1',
      currentKey:"1",
      widgetInfo: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },

      onlineStates:[
        {
            //设备状态
            value: 1,
            label: "昨天"
        },
        {
            value: 2,
            label: "前天"
        }
      ],
    };
  },
  mounted() {
    const that = this;
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
        this.currentKey = key;
        if (key === "4"){
            this.onlineStates = [
                {
                    //设备状态
                    value: 1,
                    label: "昨天"
                },
                {
                    value: 2,
                    label: "前天"
                },
                {
                    value: 3,
                    label: "两天前"
                }
            ];
        } else if (key === "1" || key === "6") {
            this.onlineStates = [
                {
                    //设备状态
                    value: 1,
                    label: "昨天"
                },
                {
                    value: 2,
                    label: "前天"
                }
            ];
        }
    },
    exportExcel(){
      var viewName = "dataCenterPage" + this.currentKey.toString();
      this.$refs[viewName].getExcelUrl();
    },

    changeSelect(){
      if (this.currentKey === "1" || this.currentKey ===  "4" || this.currentKey === "6"  ){
          var viewName = "dataCenterPage" + this.currentKey.toString();
          this.$refs[viewName].getDataFormNum(this.num);
      }
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.add-btn-style {
  text-align: right;
  padding-right: 25px;
  box-sizing: border-box;
}
.hardware-form{
  padding: 20px 25px 0 25px;
}
.el-menu.el-menu--horizontal{
   border-bottom: solid 0px #e6e6e6;
}
.main-wrap {
  width: 100%!important;
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
@media screen and (max-width: 1680px) {
  .list-wrap {
    //导航60px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
    height: calc(100vh - 60px - 64px - 20px - 65px - 76px);
    overflow: hidden;
    /deep/.el-table {
      padding: 0;
      overflow: hidden;
      th {
        background: rgba(240, 243, 247, 1);
      }
      .el-table__body-wrapper {
        //导航60px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
        height: calc(100vh - 60px - 64px - 20px - 65px - 76px - 85px - 48px);
        overflow-y: auto;
      }
    }
  }
}
</style>
