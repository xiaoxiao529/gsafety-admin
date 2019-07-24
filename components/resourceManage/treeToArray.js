import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}

export const getTree = (data, root, idTxt, pidTxt, pushTxt) => {
  var idTxt = idTxt || 'id';
  var pidTxt = pidTxt || 'pid';
  var pushTxt = pushTxt || 'children';
  // 递归方法
  function getNode(id) {
    var node = []
    for (var i = 0; i < data.length; i++) {
      if (data[i][pidTxt] == id) {
        data[i][pushTxt] = getNode(data[i][idTxt])
        node.push(data[i])
      }
    }
    if (node.length == 0) {
      return
    } else {
      return node
    }
  }
  // 使用根节点
  return getNode(root)
}

export const columns = [{
    text: "序号",
    value: "resOrder",
    width: 100
  },
  {
    text: "资源名称",
    value: "resName",
    width: 150
  },
  //  {
  //   text: "资源别名",
  //   value: "resAlias",
  //   width: 120
  // }, 
  {
    text: "类型",
    value: "resType",
    width: 70
  }, {
    text: "链接地址",
    value: "resUrl",
    width: 210
  },

  // {
  //   text: "请求方式",
  //   value: "resRequestType",
  //   width: 100
  // },
  // {
  //   text: "图标",
  //   value: "resIcon",
  //   width: 100
  // }, 
  {
    text: "状态",
    value: "isVisibled",
    width: 100
  },
  {
    text: "操作",
    value: '',
    width: 200
  },
]

// export const columns= [
//   {
//     text: "序号",
//     value: "resOrder",
//     width: 70
//   },
//   {
//     text: "资源名称",
//     value: "resName",
//     width: 180
//   },{
//     text: "资源别名",
//     value: "resAlias",
//     width: 150
//   },{
//     text: "类型",
//     value: "resType",
//     width: 70
//   },{
//     text: "链接地址",
//     value: "resUrl",
//     width: 200
//   },{
//     text: "权限标识",
//     value: "resIdent",
//     width: 100
//   },{
//     text: "请求方式",
//     value: "resRequestType",
//     width: 100
//   },{
//     text: "图标",
//     value: "resIcon",
//     width: 100
//   },{
//     text: "状态",
//     value: "isVisibled",
//     width: 100
//   },{
//     text: "操作",
//     value: '',
//     width: 300
//   },
// ]
