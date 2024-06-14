import { connect } from 'react-redux';
import Configurations from './index'; //change for new component
import { events as EVENT } from '../ConstantManager';
import { allToastActions } from '../../components/toastActions';
import { componentNameCaps } from './componentName';

const {
  LIST_GET_REQUESTED,
  GET_REQUESTED,
  POST_REQUESTED,
  UPDATE_REQUESTED,
  DELETE_REQUESTED,
} = EVENT[componentNameCaps];

const { RESET_EVENT} = EVENT

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    getList: (page, pageLimit) => {
      dispatch({ type: LIST_GET_REQUESTED, options: { page, pageLimit } });
    },
    get: id => {
      dispatch({ type: GET_REQUESTED, id });
    },
    post: data => {
      dispatch({ type: POST_REQUESTED, data });
    },
    update: ({data, type}) => {
      dispatch({ type: UPDATE_REQUESTED, data:{data, type} });
    },
    remove: id => {
      dispatch({ type: DELETE_REQUESTED, id });
    },
    ...allToastActions,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configurations); //change for new component
