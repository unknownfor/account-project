const { request } = require('request');

module.exports = {
    // 获取短信验证码
    getSms: (data) => {
        return request('usermanager/verificationCode/v1/getSms', 'POST', data, false);
    },
    // 登录
    userLoginMsm: (data) => {
        return request('usermanager/login/v1/user-userLoginMsm', 'POST', data, false);
    },
    // 查询权限类型
    getAuthType: (data) => {
        return request('usermanager/query/getAuthType', 'POST', data, false);
    },
    // 查询部门职能
    getDepartmentFunctionType: (data) => {
        return request('usermanager/query/getDepartmentFunctionType', 'POST', data, false);
    },
    // 查询员工信息
    getEmployeeInfo: (data) => {
        return request('usermanager/employee/getEmployeeInfo', 'POST', data, false);
    },
    // 查询用户信息
    getEmployeeuserInfo: (data) => {
        return request('usermanager/employee/getEmployeeInfo-userid', 'POST', data, false);
    },
    // 获取花名册首页信息
    getEnterpriseEmployee: (data) => {
        return request('usermanager/employee/getEnterpriseEmployee', 'POST', data, false);
    },
    // 获取花名册记录
    getEnterpriseEmployeeHistory: (data) => {
        return request('usermanager/employee/getEnterpriseEmployeeHistory', 'POST', data);
    },
    // 获取部门列表
    queryEnterpriseDepartment: (data) => {
        return request('usermanager/enterprise-service/queryEnterpriseDepartment', 'POST', data, false);
    },
    // 添加部门
    addEnterpriseDepartment: (data) => {
        return request('usermanager/enterprise-service/addEnterpriseDepartment', 'POST', data, false);
    },
    // 删除部门
    deleteEnterpriseDepartment: (data) => {
        return request('usermanager/enterprise-service/deleteEnterpriseDepartment', 'POST', data, false);
    },
    // 修改部门
    modifyEnterpriseDepartment: (data) => {
        return request('usermanager/enterprise-service/modifyEnterpriseDepartment', 'POST', data, false);
    },
    //增加员工信息-管理员添加其他
    addEmployee: (data) => {
        return request('usermanager/employee/addEmployee', 'POST', data, false);
    },
    //增加员工信息-二维码邀请
    addEmployeeShare: (data) => {
        return request('usermanager/employee/addEmployee-share', 'POST', data, false);
    },
    //审批员工[主动申请加入公司的,微信邀请的]
    checkApplyJoinEnterprise: (data) => {
        return request('usermanager/employee/checkApplyJoinEnterprise', 'POST', data, false);
    },
    //设置员工离职
    dimission: (data) => {
        return request('usermanager/employee/dimission', 'POST', data, false);
    },
    //员工授权
    enterpriseGrantAuthorization: (data) => {
        return request('usermanager/employee/enterpriseGrantAuthorization', 'POST', data, false);
    },
    //修改员工信息-管理员修改其他人
    modifyEnterpriseEmployee: (data) => {
        return request('usermanager/employee/modifyEnterpriseEmployee', 'POST', data, false);
    },
    //完善员工信息[自己给自己]
    prefectEnterpriseEmployee: (data) => {
        return request('usermanager/employee/prefectEnterpriseEmployee', 'POST', data, false);
    },
    //管理员服务接口
    exchangeEnterpriseAdmin: (data) => {
        return request('usermanager/admin-service/exchangeEnterpriseAdmin', 'POST', data, false);
    },
    // //获取邀请码
    // getShareNum: (data) => {
    //   return request("usermanager/share/getShareNum", 'POST', data, false);
    // },
    //审批员工[主动申请加入公司的,微信邀请的]
    checkApplyJoinEnterprise: (data) => {
        return request('usermanager/employee/checkApplyJoinEnterprise', 'POST', data, false);
    },
    //app刷新token-app[选择或切换企业]
    flashToken: (data) => {
        return request('usermanager/login/flashToken', 'POST', data, false);
    },
    //查询当前公司[登录的公司]
    queryEnterpriseInfo: (data) => {
        return request('usermanager/user-service/v1/queryEnterpriseInfo', 'POST', data, false);
    },
    //查询关联企业
    getEnterpriseList: (data) => {
        return request('usermanager/user-service/getEnterpriseList', 'POST', data, false);
    },
    // 工资模块
    // 员工工资-[普通员工]
    queryEmployeeSalaryUser: (data) => {
        return request('manager/salaryservice/queryEmployeeSalary-user', 'POST', data, false);
    },
    // 工资表(员工列表)
    initialList: (data) => {
        return request('manager/salaryservice-employee/initial/list', 'POST', data, false);
    },
    // 待添加员工列表
    addQueryStaff: (data) => {
        return request('manager/salaryservice-employee/queryStaff', 'POST', data, false);
    },
    // 添加员工
    addSalaryStaff: (data) => {
        return request('manager/salaryservice-employee/addSalaryStaff', 'POST', data, false);
    },
    // 查询员工工资信息
    querySalaryStaff: (data) => {
        return request('manager/salaryservice-employee/querySalaryStaff', 'POST', data, false);
    },
    // 完善员工工资信息
    updateEmployeeStaffInfo: (data) => {
        return request('manager/salaryservice-employee/updateEmployeeStaffInfo', 'POST', data, false);
    },
    // 修改奖金/补偿金
    updateAcheBouns: (data) => {
        return request('manager/salaryservice-employee/updateAcheBouns', 'POST', data, false);
    },
    // 查询城市社保信息
    querySocialSecurity: (data) => {
        return request('platform/socialSecurity/querySocialSecurity', 'POST', data, false);
    },
    // 查询个人社保信息
    queryEmployeeNoun: (data) => {
        return request('manager/salaryservice-social/queryEmployeeNoun', 'POST', data, false);
    },
    // 完善员工社保公积金信息
    updateEmployeeNoun: (data) => {
        return request('manager/salaryservice-social/updateEmployeeNoun', 'POST', data, false);
    },
    // 修改是否缴纳社保[只能关闭,打开需要填写缴纳城市，时间]
    updateIsPaymentSS: (data) => {
        return request('manager/salaryservice-social/updateIsPaymentSS', 'POST', data, false);
    },
    // 查询个税专项和累计薪酬
    queryBuzhuButie: (data) => {
        return request('usermanager/special-opt/getSpecialInfo', 'POST', data, false);
    },
    // 查询补助补贴
    queryBuzhuButie: (data) => {
        return request('usermanager/employee-buzhubutie/queryBuzhuButie', 'POST', data, false);
    },
    // 添加补助补贴
    addSubsidy: (data) => {
        return request('usermanager/employee-buzhubutie/addSubsidy', 'POST', data, false);
    },
    // 取消员工补助补贴
    cancelSubsidy: (data) => {
        return request('usermanager/employee-buzhubutie/cancelSubsidy', 'POST', data, false);
    },
    // 查询月工资列表
    queryMonthSalaryList: (data) => {
        return request('manager/salaryservice-v2/queryMonthSalaryList-v2', 'POST', data, false);
    },
    // 工资报税v2-查询申报状态（税局端）
    shenbaoStatus: (data) => {
        return request('manager/baoshui-geshui/baoshui-v2-query-shenbao-status', 'POST', data, false);
    },
    // 查询企业信息接口[查询自己所在公司信息]
    queryEnterpriseInfoForUser: (data) => {
        return request('usermanager/enterprise-service/queryEnterpriseInfoForUser', 'POST', data, false);
    },
    // 查询企业登记信息
    queryRegsterDetail: (data) => {
        return request('usermanager/enterprise-service/queryRegsterDetail', 'POST', data, false);
    },
    // 完善企业信息
    perfectEnterpriseInfo: (data) => {
        return request('usermanager/enterprise-service/perfectEnterpriseInfo', 'POST', data, false);
    },
    // 校验申报密码
    checkShenBaoPassword: (data) => {
        return request('usermanager/enterprise-service/checkShenBaoPassword', 'POST', data, false);
    },
    // 查询是否建账
    reportInitQuery: (data) => {
        return request('manager/report-pastdetails/reportInitQuery', 'POST', data, false);
    },
    // 年收入不足6万人员查询
    deductPersonQuery: (data) => {
        return request('manager/deductConfirm/deductPersonQuery', 'POST', data, false);
    },
    // 年收入不足6万人员确认
    deductConfirm: (data) => {
        return request('manager/deductConfirm/confirm', 'POST', data, false);
    },
    // 制作工资
    makeSalary: (data) => {
        return request('manager/salaryservice-v2/makeSalary-v2', 'POST', data, false);
    },
    // 查询工资表-查询工资表综和v2(总表最左侧的综和)
    findSalaryComprehensive: (data) => {
        return request('manager/salaryservice-v2/findSalaryComprehensive-v2', 'POST', data, false);
    },
    // 查询工资表-查询工资表v2
    findEmployeeSalaryStatus: (data) => {
        return request('manager/salaryservice-v2/findEmployeeSalaryStatus-v2', 'POST', data, false);
    },
    // 查询算税记录(查询算税失败原因)
    querySalaryTaxCalculatRecord: (data) => {
        return request('manager/salaryservice-v2/querySalaryTaxCalculatRecord', 'POST', data, false);
    },
    // 重新算税
    recalculattax: (data) => {
        return request('manager/salaryservice-v2/re-calculat-tax', 'POST', data, false);
    }
};
