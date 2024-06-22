export const schema = {
    appConfig: {
      betaFlag: { type: 'boolean', required: false },
      showSideBarOnLoad: { type: 'boolean', required: false },
      showSideBarMoblieOnLoad: { type: 'boolean', required: false },
      sideBarCollapsiable: { type: 'boolean', required: false },
      showTopSearch: { type: 'boolean', required: false },
      showTopBarAlertIcon: { type: 'boolean', required: false },
      showTopBarMessagesIcon: { type: 'boolean', required: false },
      showTermsAndPrivacyPolicy: { type: 'boolean', required: false },
      showRegistartionLink: { type: 'boolean', required: false },
      showForgotPassword: { type: 'boolean', required: false },
    //   secretKey: { type: 'password', required: true },
    //   uploadImageBaseUrl: { type: 'string', required: true },
      backendConfig: {
        protocol: { type: 'string', required: true },
        domain: { type: 'string', required: true },
        port: { type: 'number', required: false },
        commonHeaders: {
          'Content-Type': { type: 'string', required: true },
          'accept': { type: 'string', required: true },
          'Access-Control-Allow-Origin': { type: 'string', required: false },
          'Access-Control-Allow-Headers': { type: 'string', required: false }
        }
      },
      toastConfig: {
        position: {
          type: 'select', required: true,
          options: {
            bottomLeft: 'bottom-left',
            bottomRight: 'Dark'
          }
        },
        autoClose: { type: 'number', required: false },
        hideProgressBar: { type: 'boolean', required: false },
        closeOnClick: { type: 'boolean', required: false },
        pauseOnHover: { type: 'boolean', required: false },
        draggable: { type: 'boolean', required: false },
        theme: { type: 'string', required: true }
      },
      routesConfig: {
          title: { type: 'string', required: true },
          enabled: { type: 'boolean', required: true },
          icon: { type: 'string', required: false },
      },
      roleBasedRootPage: {
        superAdmin: { type: 'string', required: true },
        admin: { type: 'string', required: true },
        user: { type: 'string', required: true },
        guest: { type: 'string', required: true }
      },
      loggerConfigs: {
        tag: { type: 'string', required: true },
        defaultSymbols: {
          trace: { type: 'string', required: false },
          success: { type: 'string', required: false },
          ok: { type: 'string', required: false },
          debug: { type: 'string', required: false },
          info: { type: 'string', required: false },
          warning: { type: 'string', required: false },
          warn: { type: 'string', required: false },
          error: { type: 'string', required: false }
        }
      }
    },
    brandConfig: {
      name: { type: 'string', required: true },
      abrivation: { type: 'string', required: false },
      website: { type: 'string', required: true },
      logo: { type: 'string', required: false },
      icon: { type: 'string', required: false },
      // favIcon: { type: 'file', required: false },
      showPoweredBy: { type: 'boolean', required: false }
    },
    clientConfig: {
      name: { type: 'string', required: true },
      tagLine: { type: 'string', required: false },
      address: { type: 'string', required: true },
      contact: { type: 'string', required: true },
      email: { type: 'email', required: true },
      logo: { type: 'string', required: true },
      icon: { type: 'string', required: true },
      favIcon: { type: 'string', required: true },
    //   website: { type: 'string', required: true },
    //   socialMedia: { type: 'string', required: false },
    //   about: { type: 'string', required: false },
    //   motto: { type: 'string', required: false },
    //   vision: { type: 'string', required: false },
    //   mission: { type: 'string', required: false },
    //   history: { type: 'string', required: false },
    //   affiliation: { type: 'string', required: false },
    //   board: { type: 'string', required: false },
    //   principal: { type: 'string', required: false },
    //   vicePrincipal: { type: 'string', required: false },
    //   chairman: { type: 'string', required: false },
    //   dayStartTime: { type: 'string', required: true },
    //   dayEndTime: { type: 'string', required: true },
    //   classDuration: { type: 'string', required: true },
    //   breaks: { type: 'json', required: false }  // Assuming a JSON editor for 'breaks'
   }
  };