import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../LoginPage/Loadable';
import Logout from '../Logout/Loadable';
import Dashboard from '../DashboardPage/Loadable';
import Enquiries from '../EnquiriesView/Loadable'
import EnquiriesForm from '../EnquiriesFormView/Loadable'
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
import { globalConfigs } from '../../globalConfigs';
import PageNotFound from '../PageNotFound';
import { BetaFlag } from '../../components';
import { events as EVENT } from './../ConstantManager';

let isUserVerified;

export default function App(props) {
  const {appConfig, routes, rolesRootPage, clientConfig} = globalConfigs;
  const [showSideBar, setShowSideBar] = useState(appConfig.showSideBarOnLoad);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userRole = getUserRole();
  const rootPage = rolesRootPage[userRole];
  const setWindowTitle = () => {
    window.document.title = clientConfig.name + " - " + clientConfig.tagLine; 
  }

  const {
    state: {
      ['app']: {
        type,
        message,
        result
      },
    },
  } = props; 

  const setFavIcon = () => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = clientConfig.favIcon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }


  useEffect(()=>{  
    const isM = window.innerWidth <= 768;
    setWindowTitle()
    setFavIcon()
    window.document.title = clientConfig.name + " - " + clientConfig.tagLine;
    setIsMobile(isM)
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

  const checkRole = (page) => {
    return routes[page].roles.includes(userRole)
  };

  isUserVerified = !verifyToken(props);
  return (
    <>
      <ToastContainer autoClose={2000} />
      <BetaFlag />
      <Switch>
        <Route exact path="/login" render={ (props) => <Login {...props} rootPage={rootPage} /> } />
        <Route exact path="/enquiryForm" render={ (props) => <EnquiryForm {...props} rootPage={rootPage} /> } />
      </Switch>
        {isUserVerified ? (
          <div className="App position-fixed w-100 h-100" id="wrapper">
            <SideBar isMobile={isMobile} showSideBar={showSideBar} rootPage={rootPage} setShowSideBar={setShowSideBar} routes={globalConfigs.routes} userRole={getUserRole()}  />
            <div id="content-wrapper" className="d-flex flex-column bg-gray-100">
              <div id="content">
                <TopBar
                  sideBarCollapsiable={appConfig.sideBarCollapsiable}
                  setShowSideBar={setShowSideBar}
                  showSideBar={showSideBar}
                  showProgress={showProgressBar}
                />
                {showProgressBar ? <Box className="loader"><LinearProgress /></Box> : undefined }
                <div className="container-fluid-removed">
                <Switch>
                  {/* Home/Dashboard Route */}
                  <Route exact path="/" heading="Dashboard" render={ checkRole('dashboard') ? (props) => <Dashboard {...props} setShowProgressBar={setShowProgressBar} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>
                  
                  {/* Classes routes
                  <Route exact path="/classes" heading="Classes" render={ checkRole('classes') ? (props) => <Classes {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/> */}

                  {/* Enquiries routes */}
                  <Route exact path="/enquiries" heading="Enquiries" render={ checkRole('enquiries') ? (props) => <Enquiries {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>

                  {/* EnquirieFromView routes */}
                  <Route exact path="/enquiriesForm" heading="Enquiries Form" render={ checkRole('enquiriesForm') ? (props) => <EnquiriesForm {...props} setShowProgressBar={setShowProgressBar} setShowSideBar={setShowSideBar} /> : (props) => <PageNotFound {...props} unauthorized={true} /> }/>

                  <Route exact path="/logout" render={ (props) => <Logout {...props} /> } />
                  <Route path="*" component={PageNotFound} />    
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


    </>
  );
}
