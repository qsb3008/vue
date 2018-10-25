import * as pagesOperation from './pagesOperation'
import * as userRole from './userRole'
import * as loginInfo from './loginInfo'
import * as orgApi from './org'
import * as sysApi from './sys'

const cgiService = Object.assign(
  { ...pagesOperation },
  { ...userRole },
  { ...loginInfo },
  { ...orgApi },
  { ...sysApi }
)

export default cgiService
