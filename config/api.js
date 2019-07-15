/* 
 * @Author: TanZer.hanyu 
 * @Date: 2019-05-10 15:28:08
 * --- api配置项 ---
 * */
const getTargetHost = (milieu) => {
  switch (milieu) {
    case 'test':
      return 'http://112.27.198.15:9873/userCenter/';
    case 'dev':
      //return 'http://172.19.12.52:9001'; //内网--贺伟
      return 'http://172.19.12.180:9000'; //内网-测试地址
      //return 'http://172.19.12.209:9832/api/v1/upms-service'; //内网
      //return 'http://112.27.198.15:9873'; //外网
      // return 'http://172.19.12.180:9000';
      //   return 'http://172.19.13.17:9001'; //内网--朱咸军
    case 'pro':
      return 'http://172.19.13.17:9001'; //内网--朱咸军

    default:
      return milieu;
  }
};

export default {
  // apiHost: "https://api.douban.com/", 
  apiHost: getTargetHost(process.env.milieu),
  api: {
    findMonitorDeviceStateDownList: "/userCenter/monitorDeviceState/findMonitorDeviceStateDownList", //硬件平台-下行控制列表
    findSubCenterValue: "/userCenter/monitorDeviceState/findSubCenterValue", //硬件平台-下行控制-运营中心下拉框
    hnlaSendDown: "/userCenter/monitorDeviceState/hnlaSendDown", //硬件平台-发送河南力安下行命令
    sendCommand: "/userCenter/monitorDeviceState/sendCommand", //硬件平台-发送北京乐鸟下行命令
    findMonitorDeviceStateExtByMonitorId: "/userCenter/monitorDeviceState/findMonitorDeviceStateExtByMonitorId", //根据监测设备ID获取设备阈值信息---立安
    findUnitValue: "/userCenter/monitorDeviceState/findUnitValue", //根据监测设备ID获取设备阈值信息---立安
    login: "/pcms/login/login", //系统登录,
    findUserByUserId: "/pcms/user/findUserByUserId", //根据用户id获取用户详情信息,
    getRopositoryRecordPage: "/userCenter/rep/getRopositoryRecordPage", // 获取出入库记录分页
    getHardwareTypePage: "/userCenter/hardwareType/getHardwareTypePage", //硬件类型
    deleteHardwareType: "/userCenter/hardwareType/deleteHardwareType", //删除硬件类型
    addHardwareType: "/userCenter/hardwareType/addHardwareType", //添加设备类型
    getHardwareTypeTree: "/userCenter/hardwareType/getHardwareTypeTree", //获取设备类型树
    updateHardwareType: "/userCenter/hardwareType/updateHardwareType", //更新设备类型
    findTotalNum: "/userCenter/homepage/findTotalNum", //首页-总数统计
    findEnterpriseUnitModelCount: "/userCenter/homepage/findEnterpriseUnitModelCount", //首页-服务模式分布
    newUnitForSixMonth: "/userCenter/homepage/newUnitForSixMonth", //新增企业趋势
    getEnterpriseDevice: "/userCenter/homepage/getEnterpriseDevice", //硬件设备供应分类
    findProjectDeviceList: "/userCenter/monitorDeviceStateInfo/findProjectDeviceList", //项目设备列表-表格数据
    findDeviceOfflineHisList: "/userCenter/monitorDeviceStateInfo/findDeviceOfflineHisList", //项目设备列表-表格数据
    findEnclosureManageList: "/userCenter/enclosureManage/findEnclosureManageList", //附件管理-表格数据
    findHardwareDeviceControlRecordList: "/userCenter/monitorDeviceState/findHardwareDeviceControlRecordList", //设备下行记录列表
    findRoleListBySysCode: "/pcms/role/findRoleListBySysCode", //根据系统code获取角色列表
    findUserListBySysCodeAndOrgCode: "/pcms/user/findUserListBySysCodeAndOrgCode", //根据系统CODE、组织机构CODE获取用户列表
    getAllParentTypeInfo: "/userCenter/hardwareType/getAllParentTypeInfo", //更新设备类型
    getDeviceRepositoryPage: "/userCenter/rep/getDeviceRepositoryPage", //,获取设备库存列表分页
    putInRepository: "/userCenter/rep/putInRepository", //入库
    putOutRepository: "/userCenter/rep/putOutRepository", //正常出库
    destroyOutRepository: "/userCenter/rep/destroyOutRepository", //销库出库
    getAllOrgInfo: "/userCenter/record/getAllOrgInfo", //获取所有的运营中心
    getUnitInfoByOrgCode: "/userCenter/record/getUnitInfoByOrgCode", //获取某运营中心下的单位信息
    backInToRepository: "/userCenter/rep/backInToRepository", //回退入库
    findDeviceInfoByDeviceId: "/userCenter/rep/findDeviceInfoByDeviceId", //查看设备安装信息
    downloadDeviceRepositoryExcel: "/userCenter/rep/downloadDeviceRepositoryExcel", //导出设备库存excel信息
    deleteUser: "/pcms/user/deleteUser", //删除用户信息
    resetPasswordByUserId: "/pcms/user/resetPasswordByUserId", //重置密码
    deleteEnclosureManageInfoById: "/userCenter/enclosureManage/deleteEnclosureManageInfoById", //附件管理-删除附件
    addEnclosureManageInfo: "/userCenter/enclosureManage/addEnclosureManageInfo", //附件管理-上传附件
    findRoleListBySysCodeAndPager: "/pcms/role/findRoleListBySysCodeAndPager", //角色管理-获取角色列表
    addRole: "/pcms/role/addRole", //角色管理-获取角色列表
    updateRole: "/pcms/role/updateRole", //角色管理-编辑权限
    deleteRole: "/pcms/role/deleteRole", //角色管理-删除角色
    findRoleById: "/pcms/role/findRoleById", //角色管理-获取角色信息详情
    addUser: "/pcms/user/addUser", //新增用户
    cancelUserByUserId: "/pcms/user/cancelUserByUserId", //根据用户ID/所属系统/所属机构注销用户，仅注销用户授权信息
    restoreUserByUserId: "pcms/user/restoreUserByUserId", //通过用户id与系统编码还原已注销用户信息（仅恢复授权信息）
    updateUser: '/pcms/user/updateUser', //修改用户基本信息
    findTreeBySysCode: "/pcms/res/findTreeBySysCode", //角色管理-获取角色信息详情
    findAllResourceBySysCode: "/pcms/res/findAllResourceBySysCode", //资源管理-根据系统CODE获取资源列表（patent=-1）
    updateVisibled: "/pcms/res/updateVisibled", //资源管理-设置资源可见/不可见
    deleteResource: "/pcms/res/deleteResource", //资源管理-删除资源
    findResourceBySysCode: "/pcms/res/findResourceBySysCode", //资源管理-根据系统CODE获取资源列表（添加）
    addResource: "/pcms/res/addResource", //资源管理-新增资源
    updateResourceA: "/pcms/res/updateResource", //资源管理-修改资源
    findResourceByRoleId: "/pcms/role/findResourceByRoleId", //角色管理-通过角色id获取资源列表 2显示全部里面已经勾选的
    giveRolesForResource: "/pcms/role/giveRolesForResource", //角色管理-点击确定按钮，3更新资源选中情况
    checkUserPassword: "/pcms/user/checkUserPassword", //修改密码-查询旧密码是否正确
    modifyUserPassword: "/pcms/user/modifyUserPassword", //修改密码-修改密码
    downloadDeviceRepositoryExcelByConditions: "/userCenter/rep/downloadDeviceRepositoryExcelByConditions", //按条件导出设备库存excel信息
  },

  // websocket地址
  wsHost: ""
}
