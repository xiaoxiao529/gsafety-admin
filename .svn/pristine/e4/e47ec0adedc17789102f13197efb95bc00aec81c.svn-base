 /*
 * @Author: TanZer.hanyu
 * @Date: 2019-05-10 15:28:08
 * --- api配置项 ---
 * */
const getTargetHost = (milieu) => {
  switch (milieu) {
    case 'dev':
      //return 'http://172.19.12.52:9001'; //内网--贺伟
      //return 'http://172.19.13.17:8099'; //内网--朱先君
    //return 'http://172.19.12.180:9000'; //内网-测试地址
		//return 'http://172.19.12.24:9002'; //组织架构
		return 'http://172.19.12.209:9832/api/v1'; 
    case 'test': // 测试
      return 'http://172.19.12.209:9832/api/v1';
    case 'pro': // 生产
      return 'http://112.27.198.15:9873';
    case 'pre': // 预生产
      return 'http://112.27.198.15:9873';
    default:
      return milieu;
  }	
};

export default {
  // apiHost: "https://api.douban.com/",
  apiHost: getTargetHost(process.env.milieu),
  api: {
    findMonitorDeviceStateDownList: "/user-center-service/monitorDeviceState/findMonitorDeviceStateDownList", //硬件平台-下行控制列表
    findSubCenterValue: "/user-center-service/monitorDeviceState/findSubCenterValue", //硬件平台-下行控制-运营中心下拉框
    hnlaSendDown: "/user-center-service/monitorDeviceState/hnlaSendDown", //硬件平台-发送河南力安下行命令
    sendCommand: "/user-center-service/monitorDeviceState/sendCommand", //硬件平台-发送北京乐鸟下行命令
    findMonitorDeviceStateExtByMonitorId: "/user-center-service/monitorDeviceState/findMonitorDeviceStateExtByMonitorId", //根据监测设备ID获取设备阈值信息---立安
    findUnitValue: "/user-center-service/monitorDeviceState/findUnitValue", //根据监测设备ID获取设备阈值信息---立安
    login: "/upms-service/login/login", //系统登录,
    findUserByUserId: "/upms-service/user/findUserByUserId", //根据用户id获取用户详情信息,
    getRopositoryRecordPage: "/user-center-service/rep/getRopositoryRecordPage", // 获取出入库记录分页
    getDeviceByRecordId: "/user-center-service/rep/getDeviceByRecordId", //出入库记录-查询出入库记录所涉及的设备信息
    getHardwareTypePage: "/user-center-service/hardwareType/getHardwareTypePage", //硬件类型
    deleteHardwareType: "/user-center-service/hardwareType/deleteHardwareType", //删除硬件类型
    addHardwareType: "/user-center-service/hardwareType/addHardwareType", //添加设备类型
    getHardwareTypeTree: "/user-center-service/hardwareType/getHardwareTypeTree", //获取设备类型树
    updateHardwareType: "/user-center-service/hardwareType/updateHardwareType", //更新设备类型
    findTotalNum: "/user-center-service/homepage/findTotalNum", //首页-总数统计
    findEnterpriseUnitModelCount: "/user-center-service/homepage/findEnterpriseUnitModelCount", //首页-服务模式分布
    newUnitForSixMonth: "/user-center-service/homepage/newUnitForSixMonth", //新增企业趋势
    getEnterpriseDevice: "/user-center-service/homepage/getEnterpriseDevice", //硬件设备供应分类
    findProjectDeviceList: "/user-center-service/monitorDeviceStateInfo/findProjectDeviceList", //项目设备列表-表格数据
    findDeviceOfflineHisList: "/user-center-service/monitorDeviceStateInfo/findDeviceOfflineHisList", //项目设备列表-表格数据
    findDeviceIdValue: "/user-center-service/monitorDeviceStateInfo/findDeviceIdValue", //项目设备列表-获取一二级设备下拉框
    findEnclosureManageList: "/user-center-service/enclosureManage/findEnclosureManageList", //附件管理-表格数据
    findHardwareDeviceControlRecordList: "/user-center-service/monitorDeviceState/findHardwareDeviceControlRecordList", //设备下行记录列表
    findRoleListBySysCode: "/upms-service/role/findRoleListBySysCode", //根据系统code获取角色列表
    findUserListBySysCodeAndOrgCode: "/upms-service/user/findUserListBySysCodeAndOrgCode", //根据系统CODE、组织机构CODE获取用户列表
    getAllParentTypeInfo: "/user-center-service/hardwareType/getAllParentTypeInfo", //更新设备类型
    getDeviceRepositoryPage: "/user-center-service/rep/getDeviceRepositoryPage", //,获取设备库存列表分页
    putInRepository: "/user-center-service/rep/putInRepository", //入库
    putOutRepository: "/user-center-service/rep/putOutRepository", //正常出库
    destroyOutRepository: "/user-center-service/rep/destroyOutRepository", //销库出库
    getAllOrgInfo: "/user-center-service/record/getAllOrgInfo", //获取所有的运营中心
    getUnitInfoByOrgCode: "/user-center-service/record/getUnitInfoByOrgCode", //获取某运营中心下的单位信息
    backInToRepository: "/user-center-service/rep/backInToRepository", //回退入库
    downloadDeviceRepositoryExcel: "/user-center-service/rep/downloadDeviceRepositoryExcel", //导出设备库存excel信息
    deleteUser: "/upms-service/user/deleteUser", //删除用户信息
    resetPasswordByUserId: "/upms-service/user/resetPasswordByUserId", //重置密码
    deleteEnclosureManageInfoById: "/user-center-service/enclosureManage/deleteEnclosureManageInfoById", //附件管理-删除附件
    addEnclosureManageInfo: "/user-center-service/enclosureManage/addEnclosureManageInfo", //附件管理-上传附件
    findRoleListBySysCodeAndPager: "/upms-service/role/findRoleListBySysCodeAndPager", //角色管理-获取角色列表
    addRole: "/upms-service/role/addRole", //角色管理-获取角色列表
    updateRole: "/upms-service/role/updateRole", //角色管理-编辑权限
    deleteRole: "/upms-service/role/deleteRole", //角色管理-删除角色
    findRoleById: "/upms-service/role/findRoleById", //角色管理-获取角色信息详情
    addUser: "/upms-service/user/addUser", //新增用户
    cancelUserByUserId: "/upms-service/user/cancelUserByUserId", //根据用户ID/所属系统/所属机构注销用户，仅注销用户授权信息
    restoreUserByUserId: "upms-service/user/restoreUserByUserId", //通过用户id与系统编码还原已注销用户信息（仅恢复授权信息）
    modifyUser: '/upms-service/user/updateUser', //修改用户基本信息
    findAllResourceBySysCode: "/upms-service/res/findAllResourceBySysCode", //资源管理-根据系统CODE获取资源列表（patent=-1）
    deleteResource: "/upms-service/res/deleteResource", //资源管理-删除资源
    findResourceBySysCode: "/upms-service/res/findResourceBySysCode", //资源管理-根据系统CODE获取资源列表（添加）
    addResource: "/upms-service/res/addResource", //资源管理-新增资源
    updateResourceA: "/upms-service/res/updateResource", //资源管理-修改资源
    updateVisibled: "/upms-service/res/updateVisibled", //资源管理-设备资源可见/不可见
    findTreeBySysCode: "/upms-service/res/findTreeBySysCode", //角色管理-获取角色资源列表  1显示全部的
    findResourceByRoleId: "/upms-service/role/findResourceByRoleId", //角色管理-通过角色id获取资源列表 2显示全部里面已经勾选的
    giveRolesForResource: "/upms-service/role/giveRolesForResource", //角色管理-点击确定按钮，3更新资源选中情况
    checkUserPassword: "/upms-service/user/checkUserPassword", //修改密码-查询旧密码是否正确
    modifyUserPassword: "/upms-service/user/modifyUserPassword", //修改密码-修改密码

    queryOperationOrgList: "/mainOperationOrgController/queryOperationOrgList", //查询运营中心列表
    queryDistrictCascodeProvince: "/mainOperationOrgController/queryDistrictCascodeProvince", //查询区域
    deleteOperationOrgByOrgCode: "/mainOperationOrgController/deleteOperationOrgByOrgCode", //删除运营中心
    updateOperationOrgServerStatusByOrgCode: "/mainOperationOrgController/updateOperationOrgServerStatusByOrgCode", //改变运营中心状态
    queryOperationOrgByOrgCode: "/mainOperationOrgController/queryOperationOrgByOrgCode", //编辑运营中心
    queryDistrictCascode: "/serviceunit/queryDistrictCascode", //服务区域
    downloadAttachById: "/mainOperationOrgController/downloadAttachById", //下载文件
    findAllSubCenterCode: "/generalownerunit/findAllSubCenterCode", //查询全部运营中心
    queryEnterpriseUnitList: "/generalownerunit/queryEnterpriseUnitList", //查询业主单位列表
    queryFreeUnitUpdateApplyList: "/generalfreeunitupdateapply/queryFreeUnitUpdateApplyList", //免费企业升级申请列表
    updateEnterpriseStatus: "/generalownerunit/updateEnterpriseStatus", //变更企业状态
    queryGeneralOrgServiceType: "/unitServiceType/queryGeneralOrgServiceType", //业主单位管理高级搜索
    findAllParentUnit: "/generalownerunit/findAllParentUnit", //所属集团数据
    applyRefuse: "/freeunitupdateapply/applyRefuse", //拒绝企业升级
    applyDispatch: "/generalfreeunitupdateapply/applyDispatch", //分配运营中心

    ownerunitupdateEnterpriseStatus: "/ownerunit/updateEnterpriseStatus", //删除运营中心企业
    queryServiceAgreementByUnitId: "/ownerunit/queryServiceAgreementByUnitId", //变更服务
    editEnterpriseUnitById: "/ownerunit/editEnterpriseUnitById", //编辑业主单位信息接口
    uploadEnterpriseAttach: "/ownerunit/uploadEnterpriseAttach", //业主单位上传合同

    downloadDeviceRepositoryExcelByConditions: '/user-center-service/rep/downloadDeviceRepositoryExcelByConditions', //根据条件导出设备excel信息

    getSystemListNoPage: "/upms-service/system/getSystemListNoPage", //工具平台-权限平台
    findOrgBySysCode: "/upms-service/org/findOrgBySysCode", //工具平台-权限平台
    getSystemList: "/upms-service/system/getSystemList", //工具平台-权限平台
    addSystem: "/upms-service/system/addSystem", //工具平台-权限平台
    updateSystem: "/upms-service/system/updateSystem", //工具平台-权限平台
    updateSysStatus: "/upms-service/system/updateSysStatus", //工具平台-权限平台
    deleteSystem: "/upms-service/system/deleteSystem", //工具平台-权限平台

    findActualUserList: "/userInfor/findActualUserList", //实际用户
    getAuthSystemList: "/userInfor/getAuthSystemList", //关联应用

    queryInformationSource: "/serviceinformation/queryInformationSource", //资讯管理-查询资讯来源
    queryInformationList: "/serviceinformation/queryInformationList", //资讯管理-查询资讯列表
    queryInformationById: "/serviceinformation/queryInformationById", //资讯管理-资讯预览
    updateInformationStatus: "/serviceinformation/updateInformationStatus", //资讯管理-资讯预览
    getOperationOrgTree: "/user/getOperationOrgTree", //运营中心-企业用户 - 运营中心用户 -左侧树结构
    queryUserListBySysCodeAndOrgCode: "/user/queryUserListBySysCodeAndOrgCode", //运营中心-企业用户 - 运营中心用户 -左侧树结构
    saveOrUpdateUser: "/user/saveOrUpdateUser", //运营中心-企业用户 - 运营中心用户 -新增或者修改用户
    findRoleListBySysCodeAndOrgCode: "/user/findRoleListBySysCodeAndOrgCode", //运营中心-企业用户 - 运营中心用户 -根据系统code与组织机构code获取角色列表
    findAdminUser: "/user/findAdminUser", //运营中心-企业用户 - 运营中心用户 -根据系统CODE、组织机构CODE获取管理员账号
    resetPasswordByUserIdBusiness: "/user/resetPasswordByUserId", //运营中心-企业用户 - 运营中心用户 -密码重置
    getLock: "/user/lockOrUnlockUserAuthBySysCodeAndOrgCode", //运营中心-企业用户 - 运营中心用户 -锁定账号
    findUserByUserTelphone: "/user/findUserByUserTelphone", //运营中心-企业用户 - 运营中心用户 -验证手机号是否已存在



    getAppSystemListNoPage: "/userInfor/getSystemListNoPage", //有效用户-所属应用
    findUserOrgBySysCode: "/userInfor/findOrgBySysCode", //有效用户-所属单位下拉
    findUserInfoListBySysCodeAndOrgCode: "/userInfor/findUserListBySysCodeAndOrgCode", //有效用户-列表
    lockOrUnlock: "/user/lockOrUnlockUserAuthBySysCodeAndOrgCode", //锁定和解锁
    userfindUserByUserId: '/userInfor/findUserByUserId', //获取用户信息


    enableServiceUnit:"/generalserviceunit/enableServiceUnit",//服务机构管理停用按钮
    queryUserType: '/userTypeController/queryUserType', //用户类型配置-用户类型获取
    queryRole: '/userTypeController/queryRole', //用户类型配置-角色获取
    querySaveUserTypeConInfo: '/userTypeController/querySaveUserTypeConInfo', //用户类型配置-查询已保存用户类型配置
    saveUserTypeConInfo: '/userTypeController/saveUserTypeConInfo', //用户类型配置-保存用户类型配置
	getCompanyDepartmentTree:"/user-center-service/companyDepartment/getCompanyDepartmentTree",  //获取组织架构数据
    syncCompanyDepartmentTreeData:"/user-center-service/companyDepartment/syncCompanyDepartmentTreeData", //同步组织架构数据

    queryOperatorOrgList:'/operationOrgMonitor/queryOperatorOrgList',//监测区域设置-运营中心以及被监测运营中心列表
    queryToBeSelectedOperatorOrgList:'/operationOrgMonitor/queryToBeSelectedOperatorOrgList',//监测区域设置-待选择运营中心
    saveOperatorOrgMinitor:'/operationOrgMonitor/saveOperatorOrgMinitor',//监测区域设置-保存
  },

  // websocket地址
  wsHost: ""
}
