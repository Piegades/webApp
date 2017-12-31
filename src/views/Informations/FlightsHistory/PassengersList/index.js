import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import PassengersListItem from "./PassengersListItem";
//import Spinner from '../../../Layout/Spinner/index';

//import * as fetchDatActions from '../../../../actions/fetchDataActions';

import { Row, Card, CardHeader, CardBody } from "reactstrap";

class PassengersList extends React.Component {
  constructor() {
    super();
    this.formatData = this.formatData.bind(this);
  }
  componentWillMount() {
    // this.props.fetchData('illnessesHistory');
  }
  componentDidUpdate(prevProps) {
    if (prevProps.urlLocation !== this.props.urlLocation) {
      // this.props.fetchData('illnessesHistory');
    }
  }
  formatDate(inputDate) {
    const date = new Date(inputDate);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  formatData() {
    if (!this.props.data.illnessesHistory) {
      return [];
    }
    return this.props.data.illnessesHistory;
  }

  render() {
    const { data } = this.props;

    if (data.isFetching) {
      return (
        <section>
          <Spinner />
        </section>
      );
    }

    if (!data.isFetching && this.formatData === null) {
      return (
        <section>
          <div className="no-data">
            <h1>Connect Piegades to your Passengers database.</h1>
          </div>
        </section>
      );
    }

    return (
      <Card>
        <CardHeader>Passengers of flight 4555-EK</CardHeader>
        <CardBody>
          <PassengersListItem
            data={this.formatData()}
            formatDate={this.formatDate}
            handleChange={this.props.handleChange}
          />
        </CardBody>
      </Card>
    );
  }
}

PassengersList.propTypes = {
  data: PropTypes.object.isRequired,
  fetchData: PropTypes.func,
  urlLocation: PropTypes.string
};

const mapStateToProps = state => state;
/*const mapDispatchToProps = dispatch =>
  bindActionCreators(fetchDatActions, dispatch);*/
export default withRouter(connect(mapStateToProps)(PassengersList));
