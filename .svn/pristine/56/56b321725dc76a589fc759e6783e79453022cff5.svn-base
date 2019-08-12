<template>
  <div>
    <el-tree :data="stationTree" show-checkbox node-key="id" :props="props1"></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stationTree: [],
      data1: [],
      props1: {
        label: "deptName"
      }
    };
  },
  mounted() {
    let that = this;
    that.queryList();
  },
  methods: {
    queryList() {
      let that = this;
      that.data1 = [
        {
          name: "研发部",
          deptName: "研发部",
          id: "2c9078c46a637f98016a85be6eeb044d",
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
          that.stationTree[i].disabled = true;
          that.stationTree[i].children = [];
        }

        for (var j = 0; j < that.data1.length; j++) {
          if (that.stationTree[i].id == that.data1[j].parentId) {
            that.stationTree[i].children.push(that.data1[j]);
          }
        }
      }
      console.log("22222", that.stationTree);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>