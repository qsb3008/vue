import { API } from './basic'

const verificationCode = () => {
  return API.post('LoginInfo/getVaildCode').catch(err => { console.warn(err) })
}

const login = (params) => {
  return API.post('LoginInfo/sendIn', params).catch(err => { console.warn(err) })
}

export {
  verificationCode,
  login
}
