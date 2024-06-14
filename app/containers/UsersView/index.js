import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isEqual, find, toLower } from 'lodash';
import {
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
  alterView,
  isToday,
  dateFormat,
  localConfigs,
  getUploadImageUrl,
  ProfileImage
} from './imports';

export default function Users(props) {
  const title = componentNameCapitalize;
  const { PAGE, PER_PAGE, DEFAULT_COL_SIZE } = config;
  const actionButtons = [
    {
      title: `${labels.BUTTON_NEW} ${componentNameCapitalize}`,
      iconOptions: { icon: 'plus', type: 'white' },
      type: 'primary',
      onClick: () => {
        setInActionData({ id: 'new' });
        amendScreenView('new')
      },
    }
  ];

  const columns = [
    { accessorKey: 'id', header: labels.USER_ID, size: DEFAULT_COL_SIZE },
    {
      accessorKey: 'dp_path',
      header: 'Image',
      size: 50,
      Cell: ({ cell, row }) => {
        const val = cell.getValue();
        const name = row.original.name;
        if(val && val!= null)
          return <ProfileImage size={40} image={getUploadImageUrl(cell.getValue())} />
        else 
          return <ProfileImage size={40} text={name} />
      },
    },
    { accessorFn: (row) => `${row.name}`, header: 'Name', size: 200 },
    { accessorKey: 'email', header: labels.EMAIL, size: 200 },
    { accessorKey: 'role', header: labels.ROLE, size: 100 }
  ]
  
  // all states
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inActionData, setInActionData] = useState({ id: undefined, data: undefined });
  const [screen, setScreen] = useState({ mode: 'list', class: 'col-md-12 mr-3' });
  const [page, setPage] = useState(PAGE);
  const [perPage] = useState(PER_PAGE);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState([]);
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

  const fetchData = async (page, perPage, filters, sorting=[]) => {
    setIsLoading(true);
    try {
      const filterParams = filters.map(filter => `${toLower(filter.id)}=${filter.value}`).join('&');
      const sortParams = sorting.length > 0 ? `sort_by=${toLower(sorting[0].id)}&sort_order=${sorting[0].desc ? 'desc' : 'asc'}` : '';
      const { response } = await getList({ page, perPage, filterParams, sortParams });
      const newData = response.data.data;
      setData(prevData => {
        const mergedData = page === 1 ? newData : [...prevData, ...newData];
        const uniqueData = Array.from(new Set(mergedData.map(item => item.id)))
          .map(id => mergedData.find(item => item.id === id));
        return uniqueData;
      });  
      setTotalCount(response.data.meta.total);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page === 0)
      setData([]);
    fetchData(page, perPage, filters);
  }, [page, perPage, filters]);

  const amendScreenView = (mode) => {
    const cl = alterView(mode);
    setScreen({ mode: mode, class: cl });
  }

  const handleScroll = useCallback((e) => {
    if (isLoading || totalCount === data.length) return;

    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading, data.length, totalCount]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset page to 0 to re-fetch data with the new filters
  };

  const onEdit = (event, id, data) => {
    event.stopPropagation();
    amendScreenView('edit')
    setInActionData({ id: id, data });
  };

  const onView = (event, id) => {
    if (event)
      event.stopPropagation();
    if(id === 'new') {      
      amendScreenView('list')
      return
    }
    //amendScreenView('edit')
    //setInActionData({ id: id });
    onEdit(event, id, find(data, function(o) { return o.id === id; }) )
  };

  const confirmDelete = (event, id) => {
    event.stopPropagation();
    setModalShow(true);
  };

  const onDelete = async (id) => {
    const { response } = await remove(id);
    if (response && response.status === 204) {
      setPage(1);
      await fetchData(1, perPage, filters); 
      toastSuccess(toastMessages.DELETED.SUCCESS)
      showProgressBar(false)
      amendScreenView('list')

    } else {
      showProgressBar(false)
      toastError(toastMessages.DELETED.ERROR)
    }
  }

  const onSubmit = async (values, newUser = false, isSaveAndNew) => {
    showProgressBar(true);
    const action = newUser ? post : update;
    const id = newUser ? 'new' : inActionData.id;
    const _data = { ...values };
    if (!newUser) {
      const oldData = data.find(p => p.id === id);
      delete(_data.email)
      if (isEqual(oldData, _data)) {
        toastWarning(toastMessages.UPDATES.NO_CHANGES_MADE);
        showProgressBar(false);
        return;
      }
      if (isEqual(oldData.dp_path, _data.dp_path)) {
        delete _data.dp_path;
      }
    }
    const { response, error } = await action(_data);
    if (response && response.data) {
      setPage(1);  // Reset page to 1 to refresh data
      await fetchData(1, perPage, filters);  // Fetch data to ensure the latest data is loaded
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
      <div className={`shadow-sm bg-white rounded-lg p-0 mb-3 ${screen.class} `}>
        <Table
          enableRowActions={false}
          onEdit={onEdit}
          onView={onView}
          columns={columns}
          tabledata={data}
          showColumnFilters={false}
          page={page}
          pageSize={perPage}
          rowCount={totalCount}
          handleScroll={handleScroll}
          handleFilterChange={handleFilterChange}
        />
      </div>
      {screen.mode === 'view' ? <div className='col  shadow-sm bg-white rounded-lg  p-0 mb-3 scrollAbleContent'>
        <View
          progressBar={showProgressBar}
          setView={amendScreenView}
          props={props}
          title={title}
          id={inActionData.id}
          data={find(data, function (o) { return o.id === inActionData.id; })}
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
          onSubmit={onSubmit}
          confirmDelete={confirmDelete}
        />
      </div> : undefined}
    </div>
    <ConfirmModal loadButton={false} theme={'danger'} show={modalShow} onClose={() => { setModalShow(!modalShow); showProgressBar(false) }} onSubmit={() => { setModalShow(false); onDelete(inActionData.id) }} />
  </div>
}
