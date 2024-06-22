import { connect } from 'react-redux';
import Enquiries from './index'; //change for new component
import { allToastActions, events } from './imports';

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    showProgressBar: (status) => {
      dispatch({ type: events.PROGRESS_BAR, status });
    },
    logout: (refreshToken) => {
      dispatch({ type: events.AUTH.LOGOUT_GET_REQUESTED, refreshToken: refreshToken });
    },
    ...allToastActions,

  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Enquiries); //change for new component
