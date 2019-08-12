<template>
  <div class="DialogSettingWrap">
    <el-dialog
      :title="title"
      :visible.sync="dialogSettingVisible"
      :close-on-click-modal="clickModalFlag"
      :close-on-press-escape="clickModalFlag"
      width="768px">
      <div class="setting-warpper">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            ref="transfer"
            v-loading="isLoading"
            :left-default-checked="leftChecked"
            :right-default-checked="rightChecked"
            :titles="['待选择监测区域配置', '已选择监测区域配置']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="dataCheck">
            <span slot-scope="{ option }">{{ option.label }}</span>
          </el-transfer>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelButton">取 消</el-button>
        <el-button type="primary" @click="saveOperatorOrgMinitor">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        parentVal:{},
        dialogSettingVisible: false,
        isLoading:false,
        title:'设置',
        searchInput:'',
        dataCheck:[],
        value: [],
        rightChecked:[],
        leftChecked:[],
        clickModalFlag:false
      };
    },
    mounted() {

    },
    computed: {},
    methods: {
      /**
       * 弹框显示
       */
      initSettingInfo(val){
        const that= this;
        that.dialogSettingVisible=true;
        that.leftChecked =[];
        that.rightChecked=[];
        that.parentVal = val;
        that.value=[];
        that.dataCheck=[];
        that.title = `设置 (${val.subCenterName})`;
        that.$nextTick(function () {//清除穿梭框的搜索区域
          that.$refs.transfer.clearQuery('left');
          that.$refs.transfer.clearQuery('right');
        });
        that.getData();
      },
      /**
       * 数据获取
       */
      getData(){
        const that= this;
        let newArry=[];
        that.isLoading = true;
        that.$axios
          .$POST_NEW({
            api_name: "queryToBeSelectedOperatorOrgList",
            params:{
              subCenterCode: that.parentVal.subCenterCode,
              subCenterName: '',
              isNum:''
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              that.isLoading = false;
              let data = res.data.data;
              that.dataCheck =  data.orgList.map(item=>{
                return{
                  key : item.org_code,
                  label: item.org_name,
                  selected:item.selected
                }
              });
              newArry =  data.orgList.filter(item=>{
                return item.selected== 1
              });
              //console.log(newArry)
              if(newArry.length > 0){
                that.value=[];
                for(let i=0; i<newArry.length; i++){
                  that.value.push(newArry[i].org_code)
                }
              }
              //console.log(that.value)

            } else {
              that.isLoading = false;
              that.dataCheck = [];
              //console.log("没有数值。。。。。");
            }
          });
      },
      /**
       * 穿梭框 change 事件
       * @param value   右侧已选择的值
       * @param direction  动作是left 还是 right
       * @param movedKeys  进行穿梭之前选中的值
       */
      handleChange(value, direction, movedKeys) {
        const that = this;
        //console.log(44,value, direction, movedKeys);
        that.value = value
      },
      /**
       * 保存确定按钮
       */
      saveOperatorOrgMinitor(){
        const that = this;
        if(that.value.length == 0){
          that.$message({
            message: '请选择检测的运营中心',
            type: 'error'
          });
          return
        }
        that.isLoading = true;
        let newArr = that.dataCheck.filter(item=>that.value.includes(item.key)).map(item=>{
          return {
            orgCode:item.key,
            orgName:item.label
          }
        });
        that.$axios
          .$POST_NEW({
            api_name: "saveOperatorOrgMinitor",
            params:{
              subCenterCode:that.parentVal.subCenterCode,
              subCenterName:that.parentVal.subCenterName,
              monitorOperators:JSON.stringify(newArr)
            }
          })
          .then(res => {
            if (res.data.code == "success") {
              that.isLoading = false;
              that.leftChecked =[],
              that.rightChecked=[],
              that.dialogSettingVisible=false;
              that.$message({
                message: '成功',
                type: 'success'
              });
              that.$emit('loadData');
            } else {
              that.isLoading = false;
              that.$message({
                message: '失败',
                type: 'error'
              });
            }
          });
      },
      /**
       * 取消按钮事件
       */
      cancelButton(){
        const that = this;
        that.dialogSettingVisible = false;
      }
    }
  };
</script>
<style lang="scss" scoped="scoped">
  .DialogSettingWrap{
    font-family:MicrosoftYaHei;
    /deep/.el-dialog__body{
      padding: 10px 0;
      border-bottom: 1px solid #e1e5eb;
    }
    /deep/.el-dialog__footer{
      padding: 15px 20px;
    }
    .setting-warpper{
       text-align: center;
      /deep/.el-transfer-panel{
         width: 300px;
      }
    }
    /deep/.el-transfer-panel__list{
      width: 330px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    /deep/.el-checkbox.el-transfer-panel__item{
      width: 273px ;
    }
  }

</style>



