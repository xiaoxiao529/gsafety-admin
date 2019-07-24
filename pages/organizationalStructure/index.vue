<template>
  <div>
    <div class="Crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >硬件平台</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-wrap">
      <el-row class="location">
        <el-col :span="12">
          <h3>组织架构</h3>
        </el-col>
        
      </el-row>
      <div class="main-container">
      		<p>{{companyName}}</p>
					<!--<el-tree :data="organizationalStructureData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
					<el-table
				    :data="tableData5"
				    style="width: 100%">
				    <el-table-column type="expand">
				      <template slot-scope="props">
				        <el-table
						      :data="tableData"
						      style="width: 100%">
						      <el-table-column
						        prop="date"
						        label="日期"
						        width="180">
						      </el-table-column>
						      <el-table-column
						        prop="name"
						        label="姓名"
						        width="180">
						      </el-table-column>
						      <el-table-column
						        prop="address"
						        label="地址">
						      </el-table-column>
						    </el-table>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="部门/人员"
				      prop="name">
				    </el-table-column>
				    <el-table-column
				      label="UID"
				      prop="">
				    </el-table-column>
				    <el-table-column
				      label="人员状态"
				      prop="">
				    </el-table-column>
				    <el-table-column
				      label="岗位"
				      prop="">
				    </el-table-column>
				    <el-table-column
				      label="手机"
				      prop="">
				    </el-table-column>
				  </el-table>
				  
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
      	organizationalStructureData:[],
      	companyName:"",
      	defaultProps:{
      		children: 'listChildren',
          label: 'name'
      	},
      	tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      getOrganizationalStructureData(){
      	this.$axios
        .$GET({
          api_name: "getCompanyDepartmentTree",
          params: {
            
          }
        })
        .then(res => {
						console.log(res,"res")
          if (res.data.code == "success") {
						
            let data = res.data.data[0].listChildren;
            
						this.companyName = res.data.data[0].name
						this.organizationalStructureData = res.data.data[0].listChildren;
						this.tableData5 = res.data.data[0].listChildren;
						console.log(data,"this.organizationalStructureData")
          } else {
            console.log("没有数值。。。。。");
          }
        });
      }
    },
    mounted(){
    	this.getOrganizationalStructureData();
    }
  };
</script>
<style lang="scss" scoped="scoped">

.list-wrap {
  //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.hardware-form .el-form-item {
  width: 24%;
  display: -webkit-inline-box;
  display: inline-flex;
  margin-right: 0;
}
.hardware-form .el-form-item:nth-of-type(3) {
  width: 33%;
}
.hardware-form .el-form-item:last-of-type {
  width: 15%;
}
.hardware-form {
  padding-left: 25px;
}
@media screen and (max-width: 1680px) {
  .list-wrap {
    /deep/.el-table {
      .el-table__body-wrapper {
        //导航90px 面包屑64px 距离底部20px 面板标题65px 查询form表单76 分页85 头部高度48px
        height: calc(100vh - 60px - 64px - 65px - 78px - 48px - 100px);
      }
    }
  }
}
</style>
<style type="text/css">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
