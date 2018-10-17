import * as pagesOperation from './pagesOperation'
import * as userRole from './userRole'
import * as loginInfo from './loginInfo'
import * as orgApi from './org'

const cgiService = Object.assign(
    { ...pagesOperation },
    { ...userRole },
    { ...loginInfo },
    { ...orgApi }
)

export default cgiService
