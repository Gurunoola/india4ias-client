import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import validationRules from '../../app/containers/ConstantManager/validationRules';
import {camelCaseToSpaces} from '../helpers/utils'

const FormBuilder = ({ type, schema, data, onFormSubmit }) => {

    const [d, setD] = useState(data);
    const { handleSubmit, control, register, formState: { errors } } = useForm({
        defaultValues: {...d} || {}
    });

    useEffect(()=>{
        setD(data);
    },[data])

    const getValidationRules = (name, isRequired) => {
        let rules = validationRules[name] || {};
        if (isRequired) {
            rules = { ...rules, ...validationRules.required };
        }
        return rules;
    };

    const renderField = (name, fieldSchema) => {
        const { type, required, options } = fieldSchema;
        const rules = getValidationRules(name, required);

        switch (type) {
            case 'string':
            case 'text':
            case 'email':
            case 'number':
            case 'password':
                return (
                    <div className="col-md-4 mb-4" key={name}>
                        <label>{camelCaseToSpaces(name)}{required ? '*' : ''}</label>
                        <input type={type} className='form-control' {...register(name, rules)} />
                        {errors[name] && <p className='text-danger fs-6 fst-italic'>{errors[name].message}</p>}
                    </div>
                );
            case 'select':
                return (
                    <div className="col-md-4 mb-4" key={name}>
                        <label>{camelCaseToSpaces(name)}{required ? '*' : ''}</label>
                        <Controller
                            name={name}
                            control={control}
                            rules={rules}
                            render={({ field }) => (
                                <select className='form-control' {...field}>
                                    {Object.entries(options).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors[name] && <p className='text-danger fs-6 fst-italic'>{errors[fullPath].message}</p>}
                    </div>
                );
            case 'boolean':
                return (
                    <div className="col-md-4 mb-4" key={name}>
                        
                        <Controller
                            name={name}
                            control={control}
                            rules={rules}
                            render={({ field }) => (
                                <div className="form-check form-switch">
                                    <input id={name} className="form-check-input" type="checkbox" {...field} checked={field.value} />
                                    <label for={name}>{camelCaseToSpaces(name)}{required ? '*' : ''}</label>
                                </div>
                            )}
                        />
                        {errors[name] && <p className='text-danger fs-6 fst-italic'>{errors[name].message}</p>}
                    </div>
                );
            case 'file':
                return (
                    <div className="col-md-4 mb-4" key={name}>
                        <label for={name}>{camelCaseToSpaces(name)}{required ? '*' : ''}</label>
                        <input type="file" className='form-control' {...register(name, rules)} />
                        {errors[name] && <p className='text-danger fs-6 fst-italic'>{errors[name].message}</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    const onSubmit = (formData) => {
        onFormSubmit({data: formData, type});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='p-2'>
            <div className="row">
                { Object.keys(schema).map((key) => renderField(key, schema[key]))}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default FormBuilder;