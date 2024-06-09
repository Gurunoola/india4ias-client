import React, { useEffect, useState } from 'react';
import { upperCase, capitalize, omit} from 'lodash'
import {
    ToolBar,
    get,labels,
    toastMessages,Icon,
    HtmlTableBuilder,
    Collapsiable, 
    isToday,
    dateFormat,
    getInitials
  } from './imports'

export function View({ setView, props, title, id, data, onEdit, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const {
    toastError,
  } = props.sagaMethods;

  const actionButtons = [
    {
      iconOptions: { icon: 'pencil',  type: 'secondary', toolTip: { title: 'Edit', placement:'top'}  },
      type: '',
      onClick: (event) => {
        onEdit(event, id, formData)
      }
    },
    {
      iconOptions: { icon: 'trash3', type: 'secondary', toolTip: { title: 'Delete', placement:'top'}  },
      type: '',
      onClick: (event) => {        
        confirmDelete(event, id)
      }
    },
    {
      iconOptions: { icon: 'x-lg',  type: 'secondary', toolTip: { title: 'Close', placement:'top'} },
      type: '',
      onClick: (event) => {
        setView('list')
      }
    },
  ];

  useEffect(() => {
    const fetchDataById = async (id) => {
      const { response, error } = await get(id)
      if (response && response.data) {
        setFormData(response.data)
      } else {
        toastError(toastMessages.ERROR + ': ' + error.message)
      }
    }

    if (!data && id && id !== 'new') {
      fetchDataById(id)
    } else {
      setFormData(data)
    }

  }, [id])

  return (
    <div className=''>
      <ToolBar title='/' mode={'View'} actionButtons={actionButtons} />
      <div className='col-md-12 p-4 bg-white text-center text-md-left text-lg-left '>
        <div className='row m-0 p-0'>
          <div className='col-md-2'>
            <svg width="100" height="100" >
              <circle cx="50" cy="50" r="50" className='bg-primary' />
              <text x="50%" y="50%" alignment-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#fff">
                {`${formData.name &&  upperCase(getInitials(formData.name))}`}
              </text>
            </svg>
          </div>
          <div className='col-md-5'>
            <h3 className='pl-3 text-primary text-capitalize mt-2'>{capitalize(formData.name)}</h3>
            <div className=''><Icon toolTip={{title: labels.PRIMARY_MOBILE, placement: 'top'}} icon={'telephone'} size='16px' type={'primary'} /> {formData.phoneNumber}</div>

          </div>
          <div className='col-md-5'>
          <h5><span className='badge'><span class=""><Icon toolTip={{title: labels.STATUS, placement: 'left'}} icon={'check-circle'} size='18px' type={'primary'}/></span> {capitalize(formData && formData.status)}</span></h5>
          <h5><span className='badge'><span class=""><Icon toolTip={{title: labels.RESCHEDULED_DATE, placement: 'left'}} icon={'calendar-event'} size='18px' type={'primary'}/></span> {capitalize(formData && dateFormat(formData.rescheduledDate))}</span></h5>
          <h5><span className='badge'><span class=""><Icon toolTip={{title: labels.GENDER, placement: 'left'}} icon={'gender-ambiguous'} size='18px' type={'primary'}/></span> {capitalize(formData && formData.gender)}</span></h5>
            {/* <div className='text-white p-1 badge bg-success'><Icon toolTip={{title: labels.STATUS, placement: 'left'}} icon={'check-circle'} size='14px' type={'primary'}/> &nbsp;{capitalize(formData && formData.status)}</div> */}
            {/* <div className='col p-1'><Icon toolTip={{title: labels.RESCHEDULED_DATE, placement: 'left'}} icon={'calendar-event'} size='14px' type={'primary'}/> | {dateFormat(formData.rescheduledDate)} 
            </div>
            <div className='col p-1'><Icon toolTip={{title: labels.GENDER, placement: 'left'}} icon={'gender-ambiguous'} size='14px' type={'primary'}/> | {capitalize(formData.gender)}</div> */}
          </div>
        </div>
      </div>
      <div className='col-md-12 p-0'>
        <Collapsiable disable={true} title={`${capitalize(title)} Details`} body={<HtmlTableBuilder json={omit({ ...formData }, ['name', 'phoneNumber', 'id', 'rescheduledDate', 'status', 'gender'])} cols={3} mode={'view'} />} defaultCollapse={true} />
      </div>
    </div>
  );
}