import React, { useEffect, useState } from 'react';
import {get, toUpper, capitalize, has, toLower} from 'lodash';
import { localConfigs } from '../../localConfigs'
import Select from 'react-select'
import { Controller } from 'react-hook-form';

import {
  events as EVENT,
  defaults as DEFAULT,
  toastMessages,
  labels,
} from '../ConstantManager';

export default function AsyncDropdown(props) { //change for new component

  const { dropDownOptions } = localConfigs
  const {
    NETWORK_ERROR,
    CLASSES: {
      LIST_GET_SUCCESS: classesGetSuccess
    },
    TEACHERS: {
      LIST_GET_SUCCESS: teachersGetSuccess
    },
    SUBJECTS: {
      LIST_GET_SUCCESS: subjectsGetSuccess
    }
  } = EVENT;

  // all states
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);

  const {
    isMulti = false,
    dataType,
    name,
    state,
    defaultValue,
    register,
    validate,
    control,
    rules,
    errorMessage
  } = props;

  const optionsValues = {
    "classes": ['id', 'name', 'section'],
    "teachers": ['id', 'firstName', 'lastName'],
    "subjects": ['id', 'name']
  }

  // All toast actions
  const {
    getRolesList,
    getAcademicYearsList,
    getClassesList,
    getTeachersList,
    getSubjectsList,
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo
  } = props.sagaMethods;

  let result = undefined;

  useEffect(() => {
    switch (dataType) {
      case 'classes':
        result = get(state, 'asyncDropdown.classes.result.data', undefined);
        if (!result) { getClassesList(); getTeachersList(); }
        break;
      case 'teachers':
        result = get(state, 'asyncDropdown.teachers.result.data', undefined);
        if (!result) { getTeachersList(); getClassesList() }
        break;
      case 'subjects':
        result = get(state, 'asyncDropdown.classes.result.data', undefined);
        if (!result) { getSubjectsList(); }
        break;
      case 'bloodGroup':
        setOptions(prepOptions(dropDownOptions.bloodGroup, true));
        setLoading(false);
        break;
      case 'maritalStatus':
        setOptions(prepOptions(dropDownOptions.maritalStatus, true));
        setLoading(false);
        break;
      case 'gender':
        setOptions(prepOptions(dropDownOptions.gender, true));
        setLoading(false);
        break;
      case 'roles':
        setOptions(prepOptions(dropDownOptions.roles, true));
        setLoading(false);
        break;
      case 'course':
        setOptions(prepOptions(dropDownOptions.course, true));
        setLoading(false);
        break;
      case 'status':
        setOptions(prepOptions(dropDownOptions.status, true));
        setLoading(false);
        break;
      case 'referral_source':
        setOptions(prepOptions(dropDownOptions.referral_source, true));
        setLoading(false);
        break;
      case 'yesNo':
        setOptions(prepOptions(dropDownOptions.yesNo, true));
        setLoading(false);
    }
  }, [])

  useEffect(() => {
    const d = get(state, `asyncDropdown.${dataType}.type`)
    switch (d) {
      case teachersGetSuccess:
      case classesGetSuccess:
      case subjectsGetSuccess:
        if (get(state, `asyncDropdown.${dataType}.result.data`))
          setOptions(prepOptions(get(state, `asyncDropdown.${dataType}.result.data`)));
        else
          setOptions([], null);
        setLoading(false);
        break;
    }
  }, [state]);

  // Define the labelPrep function
function labelPrep(element) {
  // Customize the transformation logic as needed
  if (element === 1) {
    return 'YES';
  } else if (element === 0) {
    return 'NO';
  } else {
    return element;
  }
}

  const prepOptions = (data = [], isLocal = false) => {
    const retData = [];
    if (isLocal) {
      data.forEach(element => {
        retData.push({
          value: dataType === 'bloodGroup' ? toUpper(element) : toLower(element),
          label: dataType === 'bloodGroup' ? toUpper(element) : capitalize(labelPrep(element)),
        })
      });
      return retData;
    }
    data.forEach(element => {
      retData.push({
        value: element[optionsValues[dataType][0]],
        label: `${element[optionsValues[dataType][1]]} ${element[optionsValues[dataType][2]] || ''}` || undefined
      })
    });
    return retData;
  }

  const getSelect = (values) => {
    if (values === undefined) return [];
    const k = [];
    if (isMulti) {
      values.forEach(element => {
        if (has(element, 'id')) {
          k.push({ value: element.id, label: `${element.name} ${element.section}` });
        }
        else {
          k.push(element)
        }
      });
      return k;
    }
    else return values
  }

  if (!isMulti) {
    return loading ? <option selected={true}>{labels.LOADING}</option> : <>
    <option value="">{labels.PLEASE_SELECT}</option>
      {
      options.map(item=>{
        let selected = false;
        if(item.value === props.value)
          selected = true;
        return <option selected={selected} value={item.value}>{item.label}</option>
      })
    }
    </>
  } else {
    return <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Select
            id="classes"
            closeMenuOnSelect={false}
            placeholder="Choose option"
            isMulti={isMulti}
            options={options}
            value={getSelect(field.value)}
            onChange={value => field.onChange(value)}
            on
          />
        )}
      /></>
  }
}