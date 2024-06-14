import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ToolBar from './toolBar';
import { Tabs, VerticalTabs } from '../../components';
import { getFullConfigurtaions } from '../../helpers/utils'
import { logger } from '../../services';
import { componentName, componentNameCaps } from './componentName';
import FormBuilder from '../../components/formBuilder';
import { schema } from './schema';
import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
} from '../ConstantManager';

export default function Configurations(props) { //change for new component
  const params = useParams();
  const mode = params.mode || 'list';
  const history = useHistory();
  const {
    LIST_GET_REQUESTED,
    LIST_GET_SUCCESS,
    LIST_GET_FAILED,
    GET_REQUESTED,
    GET_SUCCESS,
    GET_FAILED,
    POST_REQUESTED,
    POST_SUCCESS,
    POST_FAILED,
    UPDATE_REQUESTED,
    UPDATE_SUCCESS,
    UPDATE_FAILED,
    DELETE_REQUESTED,
    DELETE_SUCCESS,
    DELETE_FAILED,
  } = EVENT[componentNameCaps];

  const { NETWORK_ERROR, RESET_EVENT } = EVENT

  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [globalConfigs, setGlobalConfigs] = useState({})
  const {
    setShowProgressBar: showProgressBar,
    setShowSideBar: showSideBar,
    state: {
      app: {
        isMobile
      },
      [componentName]: {
        type,
        message,
        result
      },
    },
  } = props;

  let data = [];

  // All toast actions
  const {
    getList,
    remove,
    update,
    post,
    resetEvent,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  result ? (data = result.data) : [];
  const defaultColSize = 200;
  const actionButtons = [
    {
      title: ``,
      type: '',
    }
  ];

  useEffect(() => {
    if (result)
      setGlobalConfigs(prev => (getFullConfigurtaions(result.data)));
  }, [result])

  useEffect(() => {
    showProgressBar(true)
    if (data && data.length === 0 || !data) {
      getList(1, 100)
    };
  }, []);

  useEffect(() => {
    let msg;
    switch (type) {
      case LIST_GET_SUCCESS:
        setListData(data)
        showProgressBar(false)
        logger("Getting list success", 'info')
        break;
      case GET_SUCCESS:
        showProgressBar(false)
        break;
      case POST_SUCCESS:
        msg = toastMessages.CREATED.SUCCESS;
        getList(1, 100) //render the list again
        history.push(`/${componentName}`)
        break;
      case POST_FAILED:
      case UPDATE_FAILED:
        toastError(toastMessages.CREATED.ERROR + message);
        resetEvent()
        showProgressBar(false)
        break;
      case UPDATE_SUCCESS:
        msg = toastMessages.UPDATES.SUCCESS;
        //history.goBack();
        getList() //render the list again
        break;
      case LIST_GET_FAILED:
        toastError(toastMessages.ERROR + message);
        showProgressBar(false)
        return
      case DELETE_SUCCESS:
        msg = toastMessages.DELETED.SUCCESS;
        setModalShow(false);
        history.push(`/${componentName}`)
        getList(1, 100) //render the list again
        break;
      case DELETE_FAILED:
        toastError(toastMessages.DELETED.ERROR + message);
        setModalShow(false);
        getList(1, 100) //render the list again
        break;
      case NETWORK_ERROR:
        showProgressBar(false)
        toastError(toastMessages.ERROR);
        break;
    }
    msg ? toastSuccess(msg) : undefined;
  }, [type]);


  const onSubmit = (formData) => {
    if (formData && formData.type) {
      update(formData);
    }

  };

  return <div className="overflow-hidden pl-3 pr-3">
    {
      (mode === 'list') ? <>
        <div className='shadow-sm bg-white rounded-sm mt-3 mb-3'>
          <ToolBar title={'Settings'} mode={''} actionButtons={actionButtons} />
        </div>
        <div className='row m-0 p-0'>
          <div className={`col-md-12 shadow-sm bg-white rounded-lg p-0 mb-3`}>
            <Tabs tabs={[
              {
                title: 'Application', content: <VerticalTabs isMobile={isMobile}
                  data={[
                    { title: 'General', icon: 'gear', content: globalConfigs && globalConfigs.appConfig && <FormBuilder type={'appConfig'} onFormSubmit={onSubmit} schema={schema.appConfig} data={globalConfigs.appConfig} /> },
                    { title: 'Backend', icon: "server", content: globalConfigs && globalConfigs.backendConfig && <FormBuilder type={'backendConfig'} onFormSubmit={onSubmit} schema={schema.appConfig.backendConfig} data={globalConfigs.backendConfig} /> },
                    { title: 'RolesRoot', icon: 'file-person', content: globalConfigs && globalConfigs.roleBasedRootPage && <FormBuilder type={'roleBasedRootPage'} onFormSubmit={onSubmit} schema={schema.appConfig.roleBasedRootPage} data={globalConfigs.roleBasedRootPage} /> },
                  ]}
                  defaultOpen='tab0'
                />
              },
              {
                title: 'Client', content: <VerticalTabs isMobile={isMobile}
                  data={[
                    { title: 'General', icon: 'gear', content: globalConfigs && globalConfigs.clientConfig && <FormBuilder type={'clientConfig'} onFormSubmit={onSubmit} schema={schema.clientConfig} data={globalConfigs.clientConfig} /> }
                  ]}
                />
              },
              {
                title: 'Brand', content: <VerticalTabs isMobile={isMobile}
                  data={[
                    { title: 'General', icon: 'gear', content: globalConfigs && globalConfigs.brandConfig && <FormBuilder type={'brandConfig'} onFormSubmit={onSubmit} schema={schema.brandConfig} data={globalConfigs.brandConfig} /> },
                  ]}
                  defaultOpen='tab0'
                />
              }
            ]} />
          </div>
        </div>
      </> : undefined}
  </div>
}
