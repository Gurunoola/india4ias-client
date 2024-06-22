import { labels } from "./containers/ConstantManager";

const backendConfig = {
  protocol: 'http',
  // domain: 'api.vocable.pro',
  domain: 'localhost',
  port: 8000,
  commonHeaders: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }
}

const secretKey = "my-secret-key-2";

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
  204: "No Content",
  304: "Not Modified",
  401: "Unauthorized",
  404: "Not Found",
  405: "Method Not Allowed",
  410: "Gone",
  500: "Internal Server Error",
  501: "Not Implemented"
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

const toastConfig = {
  position: 'bottom-left',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
}

const assets = {
  client: {
    logo: require('./img/clientLogo.png'),
    logoIcon: require('./img/clientLogoIcon.png'),
    favIcon: require('./img/favicon.png'),
  }, 
  brand: {
    logo: require('./img/brand.svg'),
    icon: require('./img/brandLogoIcon.png'),
    favIcon: require('./img/favicon.png'),
  },
  uploadImageBaseUrl: `${backendConfig.protocol}://${backendConfig.domain}`
}



export const localConfigs = {
  secretKey,
  backendConfig,
  loggerConfigs,
  httpCodes,
  dropDownOptions,
  assets,
  toastConfig
};


