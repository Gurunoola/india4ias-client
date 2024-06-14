import { toast } from 'react-toastify';

import { localConfigs } from '../localConfigs';

export const allToastActions = {
  toastSuccess: (msg = 'Ok') => {
    toast.success(msg, {...localConfigs.toastConfig});
  },
  toastError: (msg = 'Error') => {
    toast.error(msg, localConfigs.toastConfig);
  },
  toastWarning: (msg = 'Warning') => {
    toast.warn(msg, localConfigs.toastConfig);
  },
  toastInfo: (msg = 'Info') => {
    toast.info(msg, localConfigs.toastConfig);
  },
  toastDefault: (msg = 'Default') => {
    toast(msg, localConfigs.toastConfig);
  },
};
