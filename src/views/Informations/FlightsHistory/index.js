import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row } from "reactstrap";
import SwipeableViews from "react-swipeable-views";

//import Search from "./Search/Search";
import FlightsHistoryList from "./FlightsHistoryList";
import PassengersList from "./PassengersList";
//import Notification from "../Notification/index";

//import notifActions from '../../../actions/notificationsActions';

class FlightsHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      flight: null,
      index: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }
  handleChange(flight, value) {
    this.setState({
      flight,
      index: value
    });
  }
  handleChangeIndex(index) {
    this.setState({
      index
    });
  }

  render() {
    const { index, flight } = this.state;
    return (
      <Row>
        {/*<Notification
          title={"Records saved"}
          shown={this.props.notifications.sentOk}
        />
        <Search value={index} handleChange={this.handleChange} />*/}
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          disabled={true}
        >
          <FlightsHistoryList handleChange={this.handleChange} />
          <PassengersList handleChange={this.handleChange} />
        </SwipeableViews>
      </Row>
    );
  }
}

FlightsHistory.propTypes = {
  notifications: PropTypes.object,
  saveData: PropTypes.func
};

const mapStateToProps = state => state;
/*const mapDispatchToProps = dispatch =>
  bindActionCreators(notifActions, dispatch);*/
export default withRouter(connect(mapStateToProps)(FlightsHistory));
