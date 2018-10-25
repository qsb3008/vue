import { API } from '../basic'

// 访问策略
const accessList = (params) => {
  return API.get('sys/AccessPwd/accessList').catch(err => { console.warn(err) })
}

const accessPwdSaveData = (params) => {
  return API.post('sys/AccessPwd/saveData/1', params).catch(err => { console.warn(err) })
}

const accessPwdDelData1 = (params) => {
  return API.post('sys/AccessPwd/delData/1', params).catch(err => { console.warn(err) })
}
// 密码策略
const pwdList = (params) => {
  return API.get('sys/AccessPwd/pwdList').catch(err => { console.warn(err) })
}

const accessPwdSaveData2 = (params) => {
  return API.post('sys/AccessPwd/saveData/2', params).catch(err => { console.warn(err) })
}

const accessPwdDelData2 = (params) => {
  return API.post('sys/AccessPwd/delData/2', params).catch(err => { console.warn(err) })
}

const getRolePageOperation = (id) => {
  return API.get('sys/userRole/getRolePageOperation/' + id).catch(err => { console.warn(err) })
}
/**
 * 给角色授权页面操作 
 * @param roleid=20000
 * @param pageids=[10001,10002]
 * @param pageoperation=[10001-add,10002-modify]
 * 如果 pageids 和 pageoperation 为空 则 删除授权
 */
const grantRolePageOperation = (params) => {
  return API.post('sys/userRole/grantRolePageOperation', params).catch(err => { console.warn(err) })
}

const getUserProfile = (id) => {
  return API.get('sys/userRole/getUserProfile/' + id).catch(err => { console.warn(err) })
}

export {
  accessList,
  accessPwdSaveData,
  accessPwdDelData1,
  pwdList,
  accessPwdSaveData2,
  accessPwdDelData2,
  getRolePageOperation,
  grantRolePageOperation,
  getUserProfile
}
