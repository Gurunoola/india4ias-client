import React, { useEffect, useState } from 'react';
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

export default function Enquiries(props) {
  const title = componentNameCapitalize;
  const {TABLE_LIMIT, TABLE_PAGE, POPULATE, DEFAULT_COL_SIZE} = config;
  const actionButtons = [
    {
      title: `${labels.BUTTON_NEW} ${componentNameCapitalize}`,
      iconOptions: { icon: 'plus', type: 'white'},
      type: 'primary',
      onClick: () => {
        setInActionData({ id: 'new' });
        amendScreenView('new')
      },
    }
  ];
  const columns = [
    { accessorKey: 'id', header: labels.USER_ID, size: DEFAULT_COL_SIZE },
    { accessorFn: (row) => `${row.name}`, header: 'Name', size: 200 },
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

  const fetchList = async (page=TABLE_PAGE, per_page=TABLE_LIMIT) => {
    showProgressBar(true)
    const {response, error} = await getList({ page, limit: per_page })
    if (response && response.data.results) {
      // setListData(response.data.results)
      setListData(prevList => ([...prevList, ...response.data.results]))
      console.log(listData)
      setPaginations(_.omit(response.data, ['results']))
      showProgressBar(false)
    } else {
      showProgressBar(false)
      toastError(toastMessages.ERROR+': '+ error.message)
    }
  }

  useEffect(() => {
    showProgressBar();
    fetchList();
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

  const onPageChange = (nextPage, pageSize) => {
    fetchList(nextPage, TABLE_LIMIT);
  }

  const onSubmit = async (values, newUser = false, isSaveAndNew) => {
    showProgressBar(true);
    const action = newUser ? post : update;
    const id = newUser ? 'new' : inActionData.id;
    const data = { ...values };  
    if (!newUser) {
      const oldData = listData.find(p => p.id === id);
      if (_.isEqual(oldData, data)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }
    }  
    const { response, error } = await action(data);
    if (response && response.data) {
      fetchList();
      if (newUser && isSaveAndNew) {
        setInActionData({ id: 'new' });
        amendScreenView('new');
      } else {
        setInActionData({ id: response.data.id });
        amendScreenView('list');
      }
      showProgressBar(false);
      toastSuccess(newUser ? toastMessages.CREATED.SUCCESS : toastMessages.UPDATES.SUCCESS);
    } else {
      showProgressBar(false);
      toastError((newUser ? toastMessages.ERROR : toastMessages.UPDATES.ERROR) + ': ' + error.message);
    }
  };

  return <div className="overflow-hidden pl-3 pr-3">
    <div className='shadow-sm bg-white rounded-lg mt-3 mb-3'>
      <ToolBar title={title} mode={''} actionButtons={actionButtons} />
    </div>
    <div className='row m-0 p-0'>
      <div className={`shadow-sm bg-white rounded-lg p-0 mb-3 ${screen.class} scrollAbleContent `}>
        <Table
          enableRowActions={false}
          onEdit={onEdit}
          onView={onView}
          columns={columns}
          tabledata={listData}
          onPageChange={onPageChange}
          showColumnFilters={false}
        />
      </div>
      {screen.mode === 'view' ? <div className='col  shadow-sm bg-white rounded-lg  p-0 mb-3 scrollAbleContent'>
        <View
          progressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          title={title}
          id={inActionData.id}
          data={_.find(listData, function(o) { return o.id === inActionData.id; })}
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
