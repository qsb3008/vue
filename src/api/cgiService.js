import { API } from './basic'

const verificationCode = () => {
  return API.post('LoginInfo/getVaildCode').catch(err => { console.warn(err) })
}

const login = (params) => {
  return API.post('LoginInfo/sendIn', params).catch(err => { console.warn(err) })
}

const getUserMenu = (params) => {
  return API.get('user/manage/getUserMenu').catch(err => { console.warn(err) })
}
const PagesOperationPageList = (params) => {
  return API.get('sys/PagesOperation/pageList').catch(err => { console.warn(err) })
}

const saveData = (params) => {
  return API.post('sys/PagesOperation/saveData/1', params).catch(err => { console.warn(err) })
}

const delData = (params) => {
  return API.post('sys/PagesOperation/delData/1', params).catch(err => { console.warn(err) })
}

const checkLoginIn = (params) => {
  return API.post('LoginInfo/checkLoginIn', params).catch(err => { console.warn(err) })
}

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
  verificationCode,
  login,
  getUserMenu,
  PagesOperationPageList,
  saveData,
  delData,
  checkLoginIn,
  userList,
  UserRoleSaveData,
  userRoleDelData
}
