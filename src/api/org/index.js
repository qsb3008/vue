import { API } from '../basic'
// 组织结构列表
const OrgList = (params) => {
  return API.get('sys/OrgGroup/orgList').catch(err => { console.warn(err) })
}
const OrgTree = (params) => {
  return API.get('sys/OrgGroup/orgTree').catch(err => { console.warn(err) })
}
// 新增机构
const orgSaveData1 = (params) => {
    return API.post('sys/OrgGroup/saveData/1', params).catch(err => { console.warn(err) })
}

const orgDelData1 = (params) => {
  return API.post('sys/OrgGroup/delData/1', params).catch(err => { console.warn(err) })
}

// 分组
const groupData = (params) => {
  return API.get('sys/OrgGroup/groupList').catch(err => { console.warn(err) })
}
const groupTree = (params) => {
  return API.get('sys/OrgGroup/groupTree').catch(err => { console.warn(err) })
}
const groupSaveData = (params) => {
    return API.post('sys/OrgGroup/saveData/2', params).catch(err => { console.warn(err) })
}
const groupDelData = (params) => {
  return API.post('sys/OrgGroup/delData/2', params).catch(err => { console.warn(err) })
}

export {
    OrgList,
    orgSaveData1,
    orgDelData1,
    OrgTree,
    groupData,
    groupTree,
    groupSaveData,
    groupDelData
}
