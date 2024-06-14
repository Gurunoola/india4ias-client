import { put, call, takeLatest, all, delay } from 'redux-saga/effects';
import { events as EVENT } from '../ConstantManager';
import { doServerRequest, constructEvents, getReducerEvent } from '../../services/axiosServices';
import { componentNameCaps } from './componentName';
import _ from 'lodash';

const url = `/configurations`;

const {
  LIST_GET_REQUESTED,
  GET_REQUESTED,
  DELETE_REQUESTED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
} = EVENT[componentNameCaps];

const doGetAll = options => {
  return doServerRequest({ url: `${url}`, method: 'get' });
};
function* getAll(params) {
  const { response, error } = yield call(doGetAll, params);
  const { event, message } = constructEvents(response, error, 'list', componentNameCaps);
  const data = _.get(response, 'data.results', []);
  const rest = _.omit(_.get(response, 'data', []), 'results');
  yield put({ type: event, result: {data: [...data], ...rest} || undefined, message });
};

const doGetOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'get' });
};
function* getOne(params) {
  const { response, error } = yield call(doGetOne, params);
  const { event, message } = constructEvents(response, error, 'get', componentNameCaps);
  const data = _.get(response, 'result.results', []);
  const rest = _.omit(response, 'result.results');
  yield put({ type: event, result: {...data, ...rest} || undefined, message });
};

const doUpdateOne = data => {
  const {type} = data;
  const payload = {
    config_data: {
      ...data.data
    }
  }
  return doServerRequest({ data: payload, url: `${url}/${type}`, method: 'put' });
};
function* updateOne(params) {
  const { response, error } = yield call(doUpdateOne, params.data);
  const { event, message } = constructEvents(response, error, 'update', componentNameCaps);
  yield put({ type: event, result: response && response.result || undefined, message });
};

const doAddOne = data => {
  return doServerRequest({ data: data.data, url: `${url}`, method: 'post' });
};
function* addOne(params) {

  const { response, error } = yield call(doAddOne, params);
  const { event, message } = constructEvents(response, error, 'post', componentNameCaps);
  const data = _.get(response, 'data', []);
  // const rest = _.omit(_.get(response, 'data', []), 'results');
  yield put({ type: event, result: {...data} || undefined, message });


  // const { response, error } = yield call(doAddOne, params);
  // const { event, message } = constructEvents(response, error, 'post', componentNameCaps);
  // yield put({ type: event, result: response && response.result || undefined, message });
};

const doRemoveOne = options => {
  const params = `/${options.id}`;
  return doServerRequest({ url: `${url}${params}`, method: 'delete' });
};
function* removeOne(params) {

  const { response, error } = yield call(doRemoveOne, params);
  const { event, message } = constructEvents(response, error, 'delete', componentNameCaps);
  const data = _.get(response, 'data.results', []);
  //const rest = _.omit(_.get(response, 'data', []), 'results');
  yield put({ type: event, result: {...data} || undefined, message });

  // const { response, error } = yield call(doRemoveOne, params);
  // const { event, message } = constructEvents(response, error, 'delete', componentNameCaps);
  // yield put({ type: event, result: response && response.result || undefined, message });
};

function* updateAll(params) { }
function* addMany(params) { }
function* removeMany(params) { }

export default function* configurationsSaga() {
  yield all([
    takeLatest(LIST_GET_REQUESTED, getAll),
    takeLatest(GET_REQUESTED, getOne),
    takeLatest(UPDATE_REQUESTED, updateOne),
    takeLatest(POST_REQUESTED, addOne),
    takeLatest(DELETE_REQUESTED, removeOne),
  ]);
}
