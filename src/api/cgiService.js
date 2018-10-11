import * as pagesOperation from './pagesOperation'
import * as userRole from './userRole'
import * as loginInfo from './loginInfo'

const cgiService = Object.assign({ ...pagesOperation }, { ...userRole }, { ...loginInfo })

export default cgiService
