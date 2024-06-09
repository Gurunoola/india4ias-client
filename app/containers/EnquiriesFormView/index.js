import React, { useEffect, useState } from 'react';
import { omit, isEqual, find, upperCase } from 'lodash';
import './styles.css';
import { 
  _ , 
  getList, post, 
  update, 
  remove, 
  Table, 
  config,
  ConfirmModal, 
  ToolBar, 
  Edit, 
  View, 
  componentNameCapitalize, 
  toastMessages,
  labels,
  Icon,
  alterView,
  isToday,
  dateFormat,
  globalConfigs
} from './imports';

export default function EnquiriesForm(props) {
  const title = componentNameCapitalize;
  const { appConfig, clientConfig } = globalConfigs;
  const {TABLE_LIMIT, TABLE_PAGE, POPULATE, DEFAULT_COL_SIZE} = config;
  const actionButtons = [];
  const columns = [
    { accessorKey: 'id', header: labels.USER_ID, size: DEFAULT_COL_SIZE },
    { accessorFn: (row) => `${row.name}`, header: 'Name', size: 100 },
    { accessorKey: 'phoneNumber', header: labels.CONTACT, size: 100 },
    {
      accessorKey: 'rescheduledDate',
      size: 100,
      header: `${labels.RESCHEDULED_DATE}`,
      filterVariant: 'date', // Set the filter type to date
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        return isToday(date) ? (
          <>
          <div className='badge bg-success text-white ml-1'> 
          {dateFormat(date)}
            </div>            
            </>
            ) : 
          dateFormat(date);
      },
    },
    { accessorKey: 'email', header: labels.EMAIL, size: 200 },
    { accessorKey: 'course', header: labels.COURSE, size: 100, filterVariant: 'multi-select', filterSelectOptions: [...globalConfigs.dropDownOptions.course] },
    { accessorKey: 'status', header: labels.STATUS, size: 100,  filterVariant: 'multi-select', filterSelectOptions: [...globalConfigs.dropDownOptions.status] },
    {
      accessorKey: 'dob',
      header: `${labels.DOB}`,
      filterVariant: 'date', // Set the filter type to date
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        return isToday(date) ? (
          <>
          <div className='badge bg-success text-white ml-1'> 
          {dateFormat(date)}
            </div>            
            </>
            ) : 
          dateFormat(date);
      },
    },
    { accessorKey: 'gender', header: labels.GENDER, size: 100 }
  ]
  
  // all states
  const [listData, setListData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inActionData, setInActionData] = useState({ id: undefined, data: undefined });
  const [screen, setScreen] = useState({ mode: 'list', class: 'col-md-12 mr-3' });
  const [paginations, setPaginations] = useState({});

  const {
    state: {
      ['asyncDropdown']: {
        result
      },
    },
  } = props;

  const {
    showProgressBar,
    toastSuccess,
    toastWarning,
    toastError
  } = props.sagaMethods;
  
  result ? (data = result.data) : [];

  const fetchList = async (page=TABLE_PAGE, limit=TABLE_LIMIT) => {
    showProgressBar(true)
    const {response, error} = await getList({ page, limit, populate: POPULATE })
    if (response && response.data.results) {
      setListData(response.data.results)
      setPaginations(omit(response.data, ['results']))
      showProgressBar(false)
    } else {
      showProgressBar(false)
      toastError(toastMessages.ERROR+': '+ error.message)
    }
  }

  useEffect(() => {
    showProgressBar();
    props.setShowSideBar(false)
    //fetchList();
  }, []);

  const amendScreenView = (mode) => {
    const cl = alterView(mode);
  setScreen({ mode: mode, class: cl });
}

  const onEdit = (event, id, data) => {
    event.stopPropagation();
    amendScreenView('edit')
    setInActionData({ id: id, data });
  };

  const onView = (event, id) => {
    console.log(listData)
    if (event)
      event.stopPropagation();
    if(id === 'new') {      
      amendScreenView('list')
      return
    }
    amendScreenView('view')
    setInActionData({ id: id });
  };

  const confirmDelete = (event, id) => {
    event.stopPropagation();
    setModalShow(true);
  };

  const onDelete = async (id) => {
    const {response, error} = await remove(id);
    if (response && response.status === 204) {
      toastSuccess(toastMessages.DELETED.SUCCESS)
      fetchList();
      showProgressBar(false)
      amendScreenView('list')
     
    } else {
      showProgressBar(false)
      toastError(toastMessages.DELETED.ERROR+': '+ error.message)
    }
  }

  const onSubmit = async (values, newUser = false, isSaveAndNew) => {
    showProgressBar(true);
    const action = newUser ? post : update;
    const id = newUser ? 'new' : inActionData.id;
    const data = { ...values };  
    if (!newUser) {
      const oldData = listData.find(p => p.id === id);
      if (isEqual(oldData, data)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }
      if (isEqual(oldData.dp_path, data.dp_path)) {
        delete(data.dp_path);
      }
    }  
    const { response, error } = await action(data);
    if (response && response.data) {
      // fetchList();
      if (newUser) {
        setInActionData({ id: 'new' });
        amendScreenView('new');
      }
      showProgressBar(false);
      toastSuccess(newUser ? 'Thanks for filling out our form!' : toastMessages.UPDATES.SUCCESS);
    } else {
      showProgressBar(false);
      toastError((newUser ? toastMessages.ERROR : toastMessages.UPDATES.ERROR) + ': ' + error.message);
    }
  };

  return <div className="overflow-hidden pl-3 pr-3">
    <div className='row mt-3 mb-3'>
      <div className='col text-center'>
        <img src={clientConfig.logo}  alt={clientConfig.name} className="logo"/><h4 className='p-3'>
          {upperCase('Enquiry Form')}
          </h4>  </div>
      
      
      
    </div>
    <div className='row m-0 p-0'>
      <div className={`bg-white rounded-lg p-0 mb-3 ${screen.class} `}>
      <Edit
          showProgressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          data={inActionData.data}
          title={title}
          id={'new'}
          onView={onView}
          onFormSubmit={onSubmit} />
      </div>
      {screen.mode === 'view' ? <div className='col  shadow-sm bg-white rounded-lg  p-0 mb-3 scrollAbleContent'>
        <View
          progressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          title={title}
          id={inActionData.id}
          data={find(listData, function(o) { return o.id === inActionData.id; })}
          onEdit={onEdit}
          confirmDelete={confirmDelete} />
      </div> : undefined}
      {screen.mode === 'edit' || screen.mode === 'new' ? <div className='col shadow-sm bg-white rounded-lg  p-0 mb-3 scrollAbleContent'>
        <Edit
          showProgressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          data={inActionData.data}
          title={title}
          id={inActionData.id}
          onView={onView}
          onSubmit={onSubmit} />
      </div> : undefined}
    </div>
    <ConfirmModal loadButton={false} theme={'danger'} show={modalShow} onClose={()=>{setModalShow(!modalShow); showProgressBar(false)}} onSubmit={()=>{ setModalShow(false); onDelete(inActionData.id)}}/>
  </div>

 
}
