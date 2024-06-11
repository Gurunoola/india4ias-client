import { toUpper, capitalize } from 'lodash';

export const componentNameSingular = 'users' //change for new component in lowercase
export const componentName = `users` //change for new component plural
export const componentNameCaps = toUpper(componentName);
export const componentNameCapitalize= capitalize(componentNameSingular);