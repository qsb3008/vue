import { API } from '../basic'

const accessList = (params) => {
    return API.get('sys/AccessPwd/accessList').catch(err => { console.warn(err) })
  }

  const accessPwdSaveData = (params) => {
    return API.post('sys/AccessPwd/saveData/1', params).catch(err => { console.warn(err) })
  }

  const accessPwdDelData1 = (params) => {
    return API.post('sys/AccessPwd/delData/1', params).catch(err => { console.warn(err) })
  }

  export {
    accessList,
    accessPwdSaveData,
    accessPwdDelData1
  }