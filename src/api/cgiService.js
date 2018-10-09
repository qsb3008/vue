import { API } from './basic'
// 登录验证码
const verificationCode = () => {
  return API.post('LoginInfo/getVaildCode').catch(err => { console.warn(err) })
}
// 登录
const login = (params) => {
  return API.post('LoginInfo/sendIn', params).catch(err => { console.warn(err) })
}
// 登出
const sendOut = (params) => {
  return API.post('LoginInfo/sendOut', params).catch(err => { console.warn(err) })
}
// 查询登录状态
const checkLoginIn = (params) => {
  return API.post('LoginInfo/checkLoginIn', params).catch(err => { console.warn(err) })
}
// 菜单
const getUserMenu = (params) => {
  return API.get('user/manage/getUserMenu').catch(err => { console.warn(err) })
}
// 页面管理
const PagesOperationPageList = (params) => {
  return API.get('sys/PagesOperation/pageList').catch(err => { console.warn(err) })
}
const PagesOperationPageTree = (params) => {
  return API.get('sys/PagesOperation/pageTree').catch(err => { console.warn(err) })
}
const saveData = (params) => {
  return API.post('sys/PagesOperation/saveData/1', params).catch(err => { console.warn(err) })
}
const delData = (params) => {
  return API.post('sys/PagesOperation/delData/1', params).catch(err => { console.warn(err) })
}
// 用户管理
const userList = (params) => {
  return API.get('sys/UserRole/userList').catch(err => { console.warn(err) })
}
const UserRoleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/1', params).catch(err => { console.warn(err) })
}
const userRoleDelData = (params) => {
  return API.post('sys/UserRole/delData/1', params).catch(err => { console.warn(err) })
}
// 平台角色管理
const roleList = (params) => {
  return API.get('sys/UserRole/roleList').catch(err => { console.warn(err) })
}
const roleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/2', params).catch(err => { console.warn(err) })
}
const roleDelData = (params) => {
  return API.post('sys/UserRole/delData/2', params).catch(err => { console.warn(err) })
}

export {
  verificationCode,
  login,
  getUserMenu,
  PagesOperationPageList,
  saveData,
  delData,
  checkLoginIn,
  userList,
  UserRoleSaveData,
  userRoleDelData,
  PagesOperationPageTree,
  sendOut,
  roleList,
  roleSaveData,
  roleDelData
}
