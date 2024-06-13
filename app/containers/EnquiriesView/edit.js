import React, { useEffect, useState } from 'react';
import AsyncDropdown from '../AsyncDropdown/Loadable';
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

export function Edit({ showProgressBar, data, title, id, onView, onSubmit, role }) {
  const [formData, setFormData] = useState({});
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSaveAndNew, setIsSaveAndNew] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const isAdmin = true;
  const astrix = labels.REQUIRED_ASTRIX

  const history = useHistory();



  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
//       "name":"Test",
// "gender":"male",
// "dob":"1994-01-04",
// "phone_number":"9740431433",
// "email":"guru@h.com",
// "address":"hgfhgfh",
// "qualification":"fghgfhgf",
// "course":"jhgjhg",
// "attempts_given":"1",
// "referral_source":"facebook",
// "counseling_satisfaction":"yes",
// "contact_preference":"1",
    }    
  });


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setValue('dp_path', base64);
    }
  };
  
  useEffect(() => {
    setIsDisabled(role !== 'admin');
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
    }
  }, [])

  useEffect(()=>{
    if(isNewUser)
      setIsDisabled(false)
  },[isNewUser])

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
              <input type='text' disabled={isDisabled} className='form-control' {...register("name", basicValidationRules)} />
              <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.GENDER}{astrix}</label>
              <select disabled={isDisabled} className='form-control' {...register("gender", basicValidationRules)}>
                <AsyncDropdown dataType={'gender'} />
              </select>
              <ErrorMessage errors={errors} name="gender" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.DOB}{astrix}</label>
              <input type='date' disabled={isDisabled} className='form-control' {...register("dob", { ...validationRules.required})} />
              <ErrorMessage errors={errors} name="dob" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.PRIMARY_MOBILE}{astrix}</label>
              <input type='tel' disabled={isDisabled} className='form-control' {...register("phone_number", { ...validationRules.required, ...validationRules.phone })} />
              <ErrorMessage errors={errors} name="phone_number" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.SECONDARY_MOBILE}</label>
              <input type='tel' disabled={isDisabled} className='form-control' {...register("alternate_phone_number", { ...validationRules.phone })} />
              <ErrorMessage errors={errors} name="alternate_phone_number" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.EMAIL}{astrix}</label>
              <input type='text' disabled={isDisabled} className='form-control' {...register("email", {  ...validationRules.required, ...validationRules.email })} />
              <ErrorMessage errors={errors} name="email" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.ADDRESS}{astrix}</label>
              <input type='text' disabled={isDisabled} className='form-control' {...register("address", {...validationRules.required, ...validationRules.minLength3, ...validationRules.maxLength100})} />
              <ErrorMessage errors={errors} name="address" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.QUALIFICATION}{astrix}</label>
              <input type='text' disabled={isDisabled} className='form-control' {...register("qualification", basicValidationRules)} />
              <ErrorMessage errors={errors} name="qualification" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.COURSE}{astrix}</label>
              <select disabled={isDisabled} className='form-control' {...register("course", basicValidationRules)}>
                <AsyncDropdown dataType={'course'} />
              </select>
              <ErrorMessage errors={errors} name="course" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.OPTIONAL_SUBJECT}{astrix}</label>
              <input type='text' disabled={isDisabled} className='form-control' {...register("optional_subject", basicValidationRules)} />
              <ErrorMessage errors={errors} name="optional_subject" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.ATTEMPTS_GIVEN}{astrix}</label>
              <input type='number' disabled={isDisabled} className='form-control' {...register("attempts_given", {...validationRules.required, ...validationRules.maxLength50})} />
              <ErrorMessage errors={errors} name="attempts_given" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.REFERAL_SOURCE}{astrix}</label>
              <select disabled={isDisabled} className='form-control' {...register("referral_source", { ...validationRules.required })}>
                <AsyncDropdown dataType={'referral_source'} value={get(formData, 'referral_source')} />
              </select>
              {/* <input type='text' disabled={!isEditable} className='form-control' {...register("referralSource", basicValidationRules)} /> */}
              <ErrorMessage errors={errors} name="referral_source" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.COUNSELING_SATISFACTION}{astrix}</label>
              <input type='text' disabled={isDisabled} className='form-control' {...register("counseling_satisfaction", basicValidationRules)} />
              <ErrorMessage errors={errors} name="counseling_satisfaction" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.CONTACT_PREFRENCE}{astrix}</label>
              <select disabled={isDisabled} className='form-control' {...register("contact_preference", {...validationRules.required})}>
                <AsyncDropdown dataType={'yesNo'} />
              </select>
              <ErrorMessage errors={errors} name="contact_preference" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.STATUS}{astrix}</label>
              <select className='form-control' {...register("status")}>
                <AsyncDropdown dataType={'status'} />
              </select>
              <ErrorMessage errors={errors} name="status" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.RESCHEDULED_DATE}{astrix}</label>
              <input type='date' className='form-control' {...register("rescheduled_date")} />
              <ErrorMessage errors={errors} name="rescheduled_date" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>{labels.REMARKS}</label>
              <input type='text' className='form-control' {...register("remarks", basicNonRequired)} />
              <ErrorMessage errors={errors} name="remarks" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
            </div>
            <div className='col-md-4 mb-4'>
              <label>Upload Photo:</label>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <input type="hidden" {...register('dp_path', { required: true })} />
              <ErrorMessage errors={errors} name="dp_path" render={({ message }) => <p className='text-danger fs-6 fst-italic'>{message}</p>} />
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
