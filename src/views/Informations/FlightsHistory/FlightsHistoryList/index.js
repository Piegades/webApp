import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import FlightsHistoryListItem from "./FlightsHistoryListItem";
//import Spinner from '../../../Layout/Spinner/index';

import * as flightAwareActions from "../../../../redux/actions/flightAwareActions";

import { Row, Card, CardHeader, CardBody } from "reactstrap";

class FlightsHistoryList extends React.Component {
  constructor() {
    super();
    this.formatData = this.formatData.bind(this);
  }
  componentWillMount() {
    this.props.getSchudeledFlight();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.urlLocation !== this.props.urlLocation) {
      this.props.getSchudeledFlight();
    }
  }
  formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  formatData() {
    if (this.props.flightAware.flights === null) {
      return [];
    }
    console.log(this.props.flightAware.flights);
    return this.props.flightAware.flights;
  }

  render() {
    const { flightAware } = this.props;

    if (flightAware.isFetching) {
      return (
        <section>
          <Spinner />
        </section>
      );
    }

    if (!flightAware.isFetching && flightAware.formatData === null) {
      return (
        <section>
          <div className="no-data">
            <h1>Connect Piegades to your flights database.</h1>
          </div>
        </section>
      );
    }

    return (
      <Card>
        <CardHeader>Flight on departure of Dubai</CardHeader>
        <CardBody>
          <FlightsHistoryListItem
            data={this.formatData()}
            formatDate={this.formatDate}
            handleChange={this.props.handleChange}
          />
        </CardBody>
      </Card>
    );
  }
}

FlightsHistoryList.propTypes = {
  flightAware: PropTypes.object,
  fetchData: PropTypes.func,
  urlLocation: PropTypes.string
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch =>
  bindActionCreators(flightAwareActions, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FlightsHistoryList)
);
