import { connect } from 'react-redux';
import { hideScheduleModal } from '../actions/actions.js';
import TypeFastScheduleModal from '../components/TypeFastScheduleModal';

const mapStateToProps = (state, ownProps) => {
  return {
    showModal: state.showScheduleModal,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    close:() => {
      console.log('hide modal');
      dispatch(hideScheduleModal());
    }
  };
};

const TypeFastScheduleModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastScheduleModal);

export default TypeFastScheduleModalContainer;
