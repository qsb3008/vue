import { API } from '../basic'
// 页面管理
const roleList = (params) => {
  return API.post('sys/UserRole/roleList', params).catch(err => { console.warn(err) })
}
const roleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/2', params).catch(err => { console.warn(err) })
}
const roleDelData = (params) => {
  return API.post('sys/UserRole/delData/2', params).catch(err => { console.warn(err) })
}
// 用户管理
const userList = (params) => {
  return API.post('sys/UserRole/userList', params).catch(err => { console.warn(err) })
}
const UserRoleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/1', params).catch(err => { console.warn(err) })
}
const userRoleDelData = (params) => {
  return API.post('sys/UserRole/delData/1', params).catch(err => { console.warn(err) })
}
/**
 * 用户管理：给用户赋值角色
 * @param roleid Array 
 * @param userid String 
 */
const grentUserRole = (params) => {
  return API.post('sys/userRole/grentUserRole', params).catch(err => { console.warn(err) })
}
/**
 * 角色管理添加用户
 * @param roleid String
 * @param userid Array
 * @param  
 */
const setRoleUser = (params) => {
  return API.post('sys/userRole/setRoleUser', params).catch(err => { console.warn(err) })
}

export {
  roleList,
  roleSaveData,
  roleDelData,
  userList,
  UserRoleSaveData,
  userRoleDelData,
  grentUserRole,
  setRoleUser
}
