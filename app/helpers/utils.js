import moment from "moment";
import { globalConfigs } from "../globalConfigs";
import { isUndefined, isNull} from 'lodash'
export const capitalizeString = (text) => {
    const temp = text.replace(/([A-Z])/g, " $1");
    const title = temp.charAt(0).toUpperCase() + temp.slice(1);
    return title;
}

export const getInitials = (name) => {
    const nameParts = name.trim().split(' ');
    const initials = nameParts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
}

export const dateFormat = (d, to='DD-MM-YYYY') => {
    return moment(d).format(to);
}

export const isUndefinedOrNull = (value) => {
    return isUndefined(value) || isNull(value);
}

export const isToday = (d)=>{
    const date = new Date(d);
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
};

export const getUploadImageUrl = (img)=>{
    const {appConfig: {uploadImageBaseUrl = '/' }} = globalConfigs
    return uploadImageBaseUrl+img;
}

export const alterView = (mode) => {
    let cl = 'col-md-12 mr-3';
    switch (mode) {
      case 'view':
      case 'new':
      case 'edit':
        cl = 'd-none col-md-4 mr-3';
      break;
  }
  return cl;
}