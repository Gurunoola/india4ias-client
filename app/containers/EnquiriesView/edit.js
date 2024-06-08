import React, { useEffect, useState } from 'react';
import AsyncDropdown from '../AsyncDropdown/Loadable';
import FormBuilder from '../../components/formBuilder';
import { getUserRole } from '../../services/userServices';
import {
  useForm,
  ErrorMessage,
  _,
  ToolBar,
  labels,
  validationRules,
  basicValidationRules,
  basicNonRequired,
  Collapsiable,
  useHistory
} from './imports'

export function Edit({ showProgressBar, data, title, id, onView, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSaveAndNew, setIsSaveAndNew] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const isAdmin = true;
  const astrix = labels.REQUIRED_ASTRIX

  const history = useHistory();



  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {}
  });
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
        onView(event, id)
      }
    }
  ];

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
              <label>{labels.NAME}{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("name", basicValidationRules)} />
              <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.GENDER}{astrix}</label>
              <select disabled={!isEditable} className='form-control' {...register("gender", basicValidationRules)}>
                <AsyncDropdown dataType={'gender'} />
              </select>
              <ErrorMessage errors={errors} name="gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DOB}{astrix}</label>
              <input type='date' disabled={!isEditable} className='form-control' {...register("dob", { ...validationRules.required})} />
              <ErrorMessage errors={errors} name="dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.PRIMARY_MOBILE}{astrix}</label>
              <input type='tel' disabled={!isEditable} className='form-control' {...register("phoneNumber", { ...validationRules.required, ...validationRules.phone })} />
              <ErrorMessage errors={errors} name="phoneNumber" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.SECONDARY_MOBILE}</label>
              <input type='tel' disabled={!isEditable} className='form-control' {...register("alternatePhoneNumber", { ...validationRules.phone })} />
              <ErrorMessage errors={errors} name="alternatePhoneNumber" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.EMAIL}{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("email", {  ...validationRules.required, ...validationRules.email })} />
              <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.ADDRESS}{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("address", {...validationRules.required, ...validationRules.minLength3, ...validationRules.maxLength100})} />
              <ErrorMessage errors={errors} name="address" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.QUALIFICATION}{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("qualification", basicValidationRules)} />
              <ErrorMessage errors={errors} name="qualification" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.COURSE}{astrix}</label>
              <select disabled={!isEditable} className='form-control' {...register("course", basicValidationRules)}>
                <AsyncDropdown dataType={'course'} />
              </select>
              <ErrorMessage errors={errors} name="course" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.OPTIONAL_SUBJECT}{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("optionalSubject", basicValidationRules)} />
              <ErrorMessage errors={errors} name="optionalSubject" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.ATTEMPTS_GIVEN}{astrix}</label>
              <input type='number' disabled={!isEditable} className='form-control' {...register("attemptsGiven", {...validationRules.required, ...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="attemptsGiven" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.REFERAL_SOURCE}{astrix}</label>
              <select disabled={!isEditable} className='form-control' {...register("referralSource", { ...validationRules.required })}>
                <AsyncDropdown dataType={'referralSource'} value={_.get(formData, 'referralSource')} />
              </select>
              {/* <input type='text' disabled={!isEditable} className='form-control' {...register("referralSource", basicValidationRules)} /> */}
              <ErrorMessage errors={errors} name="referralSource" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.COUNSELING_SATISFACTION}{astrix}</label>
              <input type='text' disabled={!isEditable} className='form-control' {...register("counselingSatisfaction", basicValidationRules)} />
              <ErrorMessage errors={errors} name="counselingSatisfaction" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.CONTACT_PREFRENCE}{astrix}</label>
              <select disabled={!isEditable} className='form-control' {...register("contactPreference", basicValidationRules)}>
                <AsyncDropdown dataType={'yesNo'} />
              </select>
              <ErrorMessage errors={errors} name="contactPreference" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.STATUS}{astrix}</label>
              <select className='form-control' {...register("status", basicValidationRules)}>
                <AsyncDropdown dataType={'status'} />
              </select>
              <ErrorMessage errors={errors} name="status" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.RESCHEDULED_DATE}{astrix}</label>
              <input type='date' className='form-control' {...register("rescheduledDate", basicValidationRules)} />
              <ErrorMessage errors={errors} name="rescheduledDate" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.REMARKS}</label>
              <input type='text' className='form-control' {...register("remarks", basicNonRequired)} />
              <ErrorMessage errors={errors} name="remarks" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
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
