import { events as EVENT } from '../ConstantManager';
import { componentName, componentNameCaps } from './componentName';

const {
  LIST_GET_SUCCESS,
  LIST_GET_FAILED,
  GET_SUCCESS,
  GET_FAILED,
  POST_SUCCESS,
  POST_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_SUCCESS,
  DELETE_FAILED,
} = EVENT[componentNameCaps];

export const baseReducer = (state = [], sagaResponse) => { // change for new component
  const { type } = sagaResponse
  switch (type) {
    case LIST_GET_FAILED:
    case GET_FAILED:
    case POST_FAILED:
    case UPDATE_FAILED:
    case DELETE_FAILED:
      return {...sagaResponse, fetching: false };
    case LIST_GET_SUCCESS:
    case GET_SUCCESS:
    case POST_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
      return { ...sagaResponse, fetching: false };
    default:
      return state;
  }
};

export default baseReducer;