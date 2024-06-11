import { connect } from 'react-redux';
import Users from './index'; //change for new component
import { allToastActions, events } from './imports';

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  sagaMethods: {
    showProgressBar: (status) => {
      dispatch({ type: events.PROGRESS_BAR, status });
    },
    ...allToastActions,

  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users); //change for new component
