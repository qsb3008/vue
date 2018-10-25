import { API } from '../basic'

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

export {
  verificationCode,
  login,
  sendOut,
  checkLoginIn,
  getUserMenu
}
