import {
  logger,
  doServerRequest,
  config
} from './imports';

const { API_ROUTE, PAGE, PER_PAGE } = config;
const getList = async ({ perPage = PER_PAGE, page = PAGE, filterParams, sortParams }) => {
  const url = `/${API_ROUTE}?per_page=${perPage}&page=${page}`;
  const finalUrlTemp = filterParams ? url + '&' + filterParams : url;
  const finalUrl = sortParams ? finalUrlTemp + '&' + sortParams : finalUrlTemp;
  const { response, error } = await doServerRequest({
    url: finalUrl,
    method: 'GET',
  });
  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
  }

  return { response, error };
}

const get = async (id) => {
  const { response, error } = await doServerRequest({
    url: `/${API_ROUTE}/${id}`,
    method: 'GET',
  });

  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
  }

  return { response, error };
}

const post = async (data) => {
  const { response, error } = await doServerRequest({
    url: `/${API_ROUTE}`,
    method: 'POST',
    data,
  });
  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
  }
  return { response, error };
}

const update = async (data) => {
  const { id } = data;
  delete data.id;
  const { response, error } = await doServerRequest({
    url: `/${API_ROUTE}/${id}?_method=PUT`,
    method: 'POST',
    data,
  });
  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
  }
  return { response, error };
}

const remove = async (id) => {
  const { response, error } = await doServerRequest({
    url: `/${API_ROUTE}/${id}`,
    method: 'DELETE',
  });

  if (error) {
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
  }

  return { response, error };
}

export {
  getList,
  get,
  post,
  update,
  remove,
};



