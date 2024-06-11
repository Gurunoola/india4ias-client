import React, { useEffect, useState } from 'react';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import { getUserRole } from '../../services/userServices';
import { fileToBase64 } from '../../utils/fileToBase64';
import {get} from 'lodash'
import {
  useForm,
  ErrorMessage,
  ToolBar,
  labels,
  validationRules,
  basicValidationRules,
  basicNonRequired,
  Collapsiable,
  useHistory
} from './imports'

export function Edit({ showProgressBar, data, title, id, onView, onSubmit, setView, confirmDelete }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSaveAndNew, setIsSaveAndNew] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const isAdmin = true;
  const astrix = labels.REQUIRED_ASTRIX

  const history = useHistory();



  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    defaultValues: {}
  });
  const password = watch('password');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setValue('dp_path', base64);
    }
  };
  
  useEffect(() => {
    if(isAdmin) setIsEditable(getUserRole() === 'admin' || 'superAdmin' ? true : false)
    if (id && id !== 'new') {
      if (data) {
        setFormData(data)
        setTimeout(() => {
          reset({ ...data });
          showProgressBar(false)
        }, 100);
      } else {
        history.goBack();
      }
    } else {
      showProgressBar(false)
      setIsNewUser(true);
      setIsEditable(true)
    }

    

    
  }, [])

  const actionButtons = [
    !isNewUser && {
      iconOptions: { icon: 'trash3', type: 'danger', toolTip: { title: 'Delete', placement:'top'}  },
      type: '',
      onClick: (event) => {        
        confirmDelete(event, id)
      }
    },
    {
      title: ``,
      iconOptions: { icon: 'floppy', asSvg: true, type: 'secondary', toolTip: { title: `${labels.BUTTON_SAVE_CLOSE}`, placement: 'top' } },
      type: '',
      onClick: (event) => {
        document.getElementById('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    },
    {
      title: ``,
      iconOptions: { icon: 'arrow-repeat', type: 'secondary', toolTip: { title: `${labels.BUTTON_RESET}`, placement: 'top' } },
      type: '',
      onClick: (event) => {
        reset();

      }
    },
    {
      title: ``,
      iconOptions: { icon: 'x-lg', type: 'secondary', toolTip: { title: 'Close', placement: 'top' } },
      type: '',
      onClick: (event) => {
        setView('list')
      }
    }
  ].filter(Boolean);

  if (id === 'new') {
    actionButtons.splice(2, 0, {
      iconOptions: { icon: 'save', type: 'secondary', toolTip: { title: 'Save & Continue', placement: 'top' } },
      type: '',
      onClick: (event) => {
        setIsSaveAndNew((prev) => true)
        setTimeout(() => {
          document.getElementById('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }, 100);
      }
    });
  }

  function getForm() {
    return <>
      <form id='form' onSubmit={handleSubmit((data) => { onSubmit(data, isNewUser, isSaveAndNew) })}>
        <div className='bg-white p-3'>
          <div className="row">
            <div className='col-md-4 mb-4'>
              <label>Name{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("name", basicValidationRules)} />
              <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
           
            
            
            <div className='col-md-4 mb-4'>
              <label>{labels.EMAIL}{astrix}</label>
              <input type='text' disabled={!isNewUser} className='form-control' {...register("email", {  ...validationRules.required, ...validationRules.email })} />
              <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            { isNewUser ?  <><div className='col-md-4 mb-4'>
              <label>{labels.PASSWORD}{astrix}</label>
              <input type='password' className='form-control' {...register("password", { ...validationRules.required })} />
              <ErrorMessage errors={errors} name="password" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div><div className='col-md-4 mb-4'>
                <label>{labels.PASSWORD_CONFIRM}{astrix}</label>
                <input type='password' className='form-control' {...register("password_confirmation", { ...validationRules.required, validate: value =>
              value === password || 'The passwords do not match' })} />
                <ErrorMessage errors={errors} name="password_confirmation" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
              </div></> : undefined
            }
            
            <div className='col-md-4 mb-4'>
              <label>{labels.ROLE}{astrix}</label>
              <select disabled={!isEditable} className='form-control' {...register("role", { ...validationRules.required })}>
                <AsyncDropdown dataType={'roles'} value={get(formData, 'role')} />
              </select>
              {/* <input type='text' disabled={!isEditable} className='form-control' {...register("referralSource", basicValidationRules)} /> */}
              <ErrorMessage errors={errors} name="referral_source" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
             
          </div>
        </div>
      </form>
    </>
  }

  return (
    <>
      <ToolBar title='/' mode={isNewUser ? 'Create New' : 'Edit'} actionButtons={actionButtons} />
      <div className="pageContent bg-white ">
        {Object.keys(formData).length > 0 && getForm(formData)}
        {isNewUser && getForm()}
      </div>
    </>
  );
}
