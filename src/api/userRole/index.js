import { API } from '../basic'
// 页面管理
const roleList = (params) => {
  return API.get('sys/UserRole/roleList').catch(err => { console.warn(err) })
}
const roleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/2', params).catch(err => { console.warn(err) })
}
const roleDelData = (params) => {
  return API.post('sys/UserRole/delData/2', params).catch(err => { console.warn(err) })
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

export {
  roleList,
  roleSaveData,
  roleDelData,
  userList,
  UserRoleSaveData,
  userRoleDelData
}
