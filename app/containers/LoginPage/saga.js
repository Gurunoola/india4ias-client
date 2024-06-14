import { put, call, takeLatest, all } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest, constructEvents } from '../../services/axiosServices';
import { logger } from '../../services';
import { get } from 'lodash'
import { localConfigs } from '../../localConfigs';
const url = '/login';

const {
  LOGIN_GET_REQUESTED,
  LOGOUT_GET_REQUESTED,
  LOGOUT_GET_SUCCESS
} = EVENT.AUTH

const doLogin = data => {
  let isguest = false;
  if(data.data.email === 'guest@india4ias.com')
    isguest = true;
  const dataD = JSON.stringify({
    email: data.data.email,
    password: data.data.password,
  });
  return doServerRequest({ url, method: 'post', data: dataD, isguest });
};

function* userlogin(data) {
  const { response, error } = yield call(doLogin, data);
  const { event, message } = constructEvents(response, error, 'get', 'AUTH');
  const yeildedResonse = response ? response.data : []
  const resData = get(yeildedResonse, 'data', []);
  yield put({ type: event, result: {...resData } || undefined, message });
}

function* userlogout() {
  localStorage.removeItem('user');
  yield put({ type: LOGOUT_GET_SUCCESS });
  logger('User logged out', 'info');
}

export default function* loginSagas() {
  yield all([
    takeLatest(LOGIN_GET_REQUESTED, userlogin),
  ]);
}
