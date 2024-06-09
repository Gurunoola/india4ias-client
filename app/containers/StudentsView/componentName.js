import { toUpper, capitalize } from './imports';

export const componentNameSingular = 'student' //change for new component in lowercase
export const componentName = `${componentNameSingular}s` //change for new component plural
export const componentNameCaps = toUpper(componentName);
export const componentNameCapitalize= capitalize(componentNameSingular);