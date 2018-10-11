import { API } from '../basic'
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
const getPlatePageUrl = (params) => {
  return API.post('sys/PagesOperation/getPlatePageUrl', params).catch(err => { console.warn(err) })
}

export {
  PagesOperationPageList,
  PagesOperationPageTree,
  saveData,
  delData,
  getPlatePageUrl
}
