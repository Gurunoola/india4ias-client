import React, { useEffect, useState } from 'react';
import { capitalize, omit } from 'lodash'
import {
  ToolBar,
  get, labels,
  toastMessages, Icon,
  HtmlTableBuilder,
  Collapsiable,
  isToday,
  dateFormat,
  getInitials,
  getUploadImageUrl,
  ProfileImage
} from './imports'

export function View({ setView, props, title, id, data, onEdit, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const {
    toastError,
  } = props.sagaMethods;

  const actionButtons = [
    {
      iconOptions: { icon: 'pencil', type: 'secondary', toolTip: { title: 'Edit', placement: 'top' } },
      type: '',
      onClick: (event) => {
        onEdit(event, id, formData)
      }
    },
    {
      iconOptions: { icon: 'trash3', type: 'danger', toolTip: { title: 'Delete', placement: 'top' } },
      type: '',
      onClick: (event) => {
        confirmDelete(event, id)
      }
    },
    {
      iconOptions: { icon: 'x-lg', type: 'secondary', toolTip: { title: 'Close', placement: 'top' } },
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
            {
              formData.dp_path !== null ? <ProfileImage clickable={true} image={getUploadImageUrl(formData.dp_path)} /> : <ProfileImage text={formData.name} />
            }
          </div>
          <div className='col-md-5'>
            <h3 className='pl-3 text-primary text-capitalize mt-2'>{formData && capitalize(formData.name)}</h3>
            <div className=''><Icon toolTip={{ title: labels.PRIMARY_MOBILE, placement: 'top' }} icon={'telephone'} size='16px' type={'primary'} /> {formData && formData.phone_number}</div>
          </div>
          <div className='col-md-5'>
            <h5><span className='badge'><span class=""><Icon toolTip={{ title: labels.STATUS, placement: 'left' }} icon={'check-circle'} size='18px' type={'primary'} /></span> {capitalize(formData && formData.status)}</span></h5>
            <h5><span className='badge'><span class=""><Icon toolTip={{ title: labels.RESCHEDULED_DATE, placement: 'left' }} icon={'calendar-event'} size='18px' type={'primary'} /></span> {capitalize(formData && dateFormat(formData.rescheduled_date))}</span></h5>
            <h5><span className='badge'><span class=""><Icon toolTip={{ title: labels.GENDER, placement: 'left' }} icon={'gender-ambiguous'} size='18px' type={'primary'} /></span> {capitalize(formData && formData.gender)}</span></h5>
          </div>
        </div>
      </div>
      <div className='col-md-12 p-0'>
        <Collapsiable disable={true} title={`${capitalize(title)} Details`} body={<HtmlTableBuilder json={formData && omit({ ...formData }, ['name', 'phoneNumber', 'id', 'rescheduled_date', 'status', 'gender', 'created_at', 'updated_at', 'deleted', 'dp_path'])} cols={3} mode={'view'} />} defaultCollapse={true} />
      </div>
    </div>
  );
}