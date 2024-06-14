import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../LoginPage/Loadable';
import Logout from '../Logout/Loadable';
import Dashboard from '../DashboardPage/Loadable';
import Enquiries from '../EnquiriesView/Loadable'
import Users from '../UsersView/Loadable'
import EnquiriesForm from '../EnquiriesFormView/Loadable'
import ConfigurationForm from '../ConfigurationsView/Loadable';
import '../../css/baseStyles.css'; // base styleSheet with themes
import '../../css/rs-styles.css';
import '../../css/rg-styles.css';
import GlobalStyle from '../../globalStyles'; //overRiding styleSheet
import SideBar from '../SideBar';
import TopBar from '../TopBar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { verifyToken,getUserRole } from '../../services/userServices';
import './action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localConfigs } from '../../localConfigs';
import PageNotFound from '../PageNotFound';
import { BetaFlag } from '../../components';
import { events as EVENT } from './../ConstantManager';
import { getSpecificConfigurtaions } from '../EnquiriesView/imports';

let isUserVerified;
let globalConfigs = {}

export default function App(props) {
  const {routes} = localConfigs;
  const [showSideBar, setShowSideBar] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userRole = getUserRole();

  const {
    state: {
      ['app']: {
        type,
        message,
        result
      },
      configurations:{
        result: configResults
      }
    },
  } = props; 

  const clientConfig = getSpecificConfigurtaions(configResults, 'clientConfig');
  const brandConfig = getSpecificConfigurtaions(configResults, 'brandConfig');
  const appConfig = getSpecificConfigurtaions(configResults, 'appConfig');
  const backendConfig = getSpecificConfigurtaions(configResults, 'backendConfig');
  const roleBasedRootPage = getSpecificConfigurtaions(configResults, 'roleBasedRootPage');
  const routesConfig = getSpecificConfigurtaions(configResults, 'routesConfig');

  globalConfigs= {
    clientConfig,
    brandConfig,
    appConfig,
    backendConfig,
    roleBasedRootPage,
    routesConfig
  }

  const rootPage = roleBasedRootPage[userRole];
  const setWindowTitle = () => {
    window.document.title = clientConfig.name + " - " + clientConfig.tagLine; 
  }

  const setFavIcon = () => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = clientConfig.favIcon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }


  useEffect(()=>{  
    const isM = window.innerWidth <= 768;
    setFavIcon()
    props.sagaMethods.getAllConfigurations();
    props.sagaMethods.setIsMobile(isM);
    setIsMobile(isM)
    localStorage.setItem('isMobile', isM);
    let showSideBar = appConfig.showSideBarOnLoad;
    if(isM)
      showSideBar = appConfig.showSideBarMoblieOnLoad
    setShowSideBar( !appConfig.sideBarCollapsiable || showSideBar);
  },[])

  useEffect(()=>{
    switch(type){
      case EVENT.PROGRESS_BAR:
       setShowProgressBar()
      break;
    }

  },[type])

  useEffect(()=>{
    setWindowTitle()
  },[clientConfig])

  const checkRole = (page) => {
    return routesConfig && routesConfig[0] && routesConfig[0][page].roles.includes(userRole)
  };

  isUserVerified = !verifyToken(props);
  return (
    <>
      <ToastContainer autoClose={2000} />
      <BetaFlag betaFlag={appConfig.betaFlag} />
      <Switch>
        <Route exact path="/login" render={ (props) => <Login {...props} rootPage={rootPage} globalConfigs={globalConfigs} /> } />
        <Route exact path="/enquiryForm" render={ (props) => <EnquiriesForm {...props} rootPage={rootPage} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} globalConfigs={globalConfigs} /> } />
      
        {isUserVerified ? (
          <div className="App position-fixed w-100 h-100" id="wrapper">
            <SideBar 
              isMobile={isMobile} 
              showSideBar={showSideBar} 
              rootPage={rootPage} 
              setShowSideBar={setShowSideBar} 
              routes={routesConfig} 
              userRole={getUserRole()}
              brandConfig={brandConfig}  
            />
            <div id="content-wrapper" className="d-flex flex-column bg-gray-100">
              <div id="content">
                <TopBar
                  sideBarCollapsiable={appConfig.sideBarCollapsiable}
                  setShowSideBar={setShowSideBar}
                  showSideBar={showSideBar}
                  showProgress={showProgressBar}
                  globalConfigs={globalConfigs}
                />
                {showProgressBar ? <Box className="loader"><LinearProgress /></Box> : undefined }
                <div className="container-fluid-removed">
                <Switch>
                  {/* Home/Dashboard Route */}
                  <Route exact path="/" heading="Dashboard" render={ checkRole('dashboard') ? (props) => <Dashboard {...props} setShowProgressBar={setShowProgressBar} globalConfigs={globalConfigs} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>
                  
                  {/* Classes routes
                  <Route exact path="/classes" heading="Classes" render={ checkRole('classes') ? (props) => <Classes {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/> */}

                  {/* Enquiries routes */}
                  <Route exact path="/enquiries" heading="Enquiries" render={ checkRole('enquiries') ? (props) => <Enquiries {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar}/> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>

                  {/* Users routes */}
                  ConfigurationForm
                  <Route exact path="/users" heading="Users" render={ checkRole('userManagment') ? (props) => <Users {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} globalConfigs={globalConfigs} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>
                  <Route exact path="/settings" heading="Settings" render={ checkRole('settings') ? (props) => <ConfigurationForm {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} globalConfigs={globalConfigs} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>

                  {/* EnquirieFromView routes */}
                  {/* <Route exact path="/enquiriesForm" heading="Enquiries Form" render={ checkRole('guest') ? (props) => <EnquiriesForm {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/> */}

                  <Route exact path="/logout" render={ (props) => <Logout {...props} globalConfigs={globalConfigs} /> } />
                  <Route path="*" component={PageNotFound} globalConfigs={globalConfigs} />    
                  </Switch>
                  <GlobalStyle />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Redirect to={{ pathname: '/login' }} />
          </>
        )}
    </Switch>

    </>
  );
}

export const g = globalConfigs;