import { labels } from "./containers/ConstantManager";

const backendConfig = {
  protocol: 'http',
  domain: 'localhost',
  port: 8000,
  commonHeaders: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }
}

const toastConfig = {
  position: 'bottom-left',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

const routes = {
  dashboard: { title: 'Dashboard', enabled: true, icon: 'columns-gap', path: '/', roles: ['admin', 'superAdmin']},
  enquiries : { title: 'Enquiries', enabled: true, icon: 'card-checklist', roles:['superAdmin', 'admin', 'user' ], path: '/enquiries'},
  enquiriesForm : { title: 'Enquiries Form', enabled: true, icon: 'card-checklist', roles:['guest' ], path: '/enquiriesForm'},
  userManagment : { title: 'User Managment', enabled: true, icon: 'person-check', roles:['superAdmin', 'admin'], path: '/users'},
  settings : { title: 'Settings', enabled: true, icon: 'sliders', roles:['superAdmin'], path: '/finance'},
}

const rolesRootPage = {
  superAdmin: '/',
  admin: '/',
  user: '/enquiries',
  guest:'/enquiriesForm'
}

const loggerConfigs = {
  tag: "V.E.D.I:",
  defaultSymbols: {
    trace: '??',
    success: '√',
    ok: '√',
    debug: 'i',
    info: 'i',
    warning: '‼',
    warn: '‼',
    error: '×'
  },
  terminalColors: {
    trace: '#3C9DFF',
    trace_: '#3C9DFF',
    success: '#26FF5C',
    success_: '#26FF5C',
    ok: '#26FF5C',
    ok_: '#26FF5C',
    debug: '#34DADA',
    debug_: '#34DADA',
    info: '#3C9DFF',
    info_: '#3C9DFF',
    warning: '#FFC926',
    warning_: '#FFC926',
    warn: '#FFC926',
    warn_: '#FFC926',
    error: '#F55256',
    error_: '#F55256',
  }
}

const httpCodes = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
  401: "Unauthorized",
  405: "Method Not Allowed",
  410: "Gone",
  304: "Not Modified",
  501: "Not Implemented"
}

const brandConfig = {
  name: 'V.E.D.I',
  abrivation: 'V.E.D.I',
  website: '/#',
  logo: require('./img/brand.svg'),
  icon: require('./img/brandLogoIcon.png'),
  favIcon: require('./img/favicon.png'),
  showPoweredBy: true,
}

const appConfig = {
  secretKey: "my-secret-key-2",
  betaFlag: true,
  showSideBarOnLoad: true,
  showSideBarMoblieOnLoad: false,
  sideBarCollapsiable: true,
  showTopSearch: false,
  showTopBarAlertIcon: false,
  showTopBarMessagesIcon: false,
  showTermsAndPrivacyPolicy: false,
  showRegistartionLink: false,
  uploadImageBaseUrl: `${backendConfig.protocol}://${backendConfig.domain}:${backendConfig.port}`
}

const dropDownOptions = {
  gender:['male', 'female', 'other'], 
  roles:['user', 'admin'],
  course:[ 'upsc','kpsc'],
  yesNo:[1, 0],
  status:['qualified', 'unqualified', 'converted', 'rescheduled'],
  bloodGroup:[ labels.BLOOD_GROUP_AP,labels.BLOOD_GROUP_AN,labels.BLOOD_GROUP_BP,labels.BLOOD_GROUP_BN,labels.BLOOD_GROUP_ABP,
   labels.BLOOD_GROUP_ABN,labels.BLOOD_GROUP_OP,labels.BLOOD_GROUP_ON],
  maritalStatus:[ labels.MARRIED, labels.UNMARRIED],
  relationship:[ labels.FATHER, labels.MOTHER, labels.GUARDIAN],
  referral_source: ['friends', 'facebook', 'instagram', 'youtube', 'newspaper', 'others']

}

const clientConfig = {
  name: "INDIA 4 IAS",
  tagLine: "For success in changing world",
  address: "INDIA 4 IAS Address",
  contact: "INDIA 4 IAS Contact",
  email: "INDIA 4 IAS Email",
  logo: require('./img/clientLogo.png'),
  logoIcon: require('./img/clientLogoIcon.png'),
  favIcon: require('./img/favicon.png'),
  website: "INDIA 4 IAS Website",
  socialMedia: "INDIA 4 IAS Social Media",
  about: "INDIA 4 IAS About",
  motto: "INDIA 4 IAS Motto",
  vision: "INDIA 4 IAS Vision",
  mission: "INDIA 4 IAS Mission",
  history: "INDIA 4 IAS History",
  affiliation: "INDIA 4 IAS Affiliation",
  board: "INDIA 4 IAS Board",
  principal: "INDIA 4 IAS Principal",
  vicePrincipal: "INDIA 4 IAS Vice Principal",
  chairman: "INDIA 4 IAS Chairman",
  dayStartTime: '8:00 AM',
  dayEndTime: '4:00 PM',
  classDuration: "45 min",
  breaks: [
    { breakNumber: 1, title:"Quick Break", startTime: '10:00', endTime: '10:15' },
    { breakNumber: 2, title: "Lunch Break", startTime: '12:15', endTime: '13:00' }
  ],
}

export const globalConfigs = {
  backendConfig,
  appConfig,
  toastConfig,
  loggerConfigs,
  routes,
  rolesRootPage,
  httpCodes,
  dropDownOptions,
  clientConfig,
  brandConfig
};


