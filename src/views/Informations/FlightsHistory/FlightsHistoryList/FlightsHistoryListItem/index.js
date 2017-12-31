import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Table
} from "reactstrap";

class FlightsHistoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    const flight = event.target.innerText;

    this.props.handleChange(flight, 1);
  }

  /*  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
    return props.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown open"
      : "nav-item nav-dropdown";
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }*/

  render() {
    /*  let filteredFlights = this.state.Flights.filter(flight => {
      return (
        flight.dest.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });*/
    const { data } = this.props;
    return (
      <Row>
        <Table
          hover
          responsive
          className="table-outline mb-0 d-none d-sm-table"
        >
          <thead className="thead-light">
            <tr>
              <th>Flight Number</th>
              <th className="text-center">To</th>
              <th className="text-center">Time</th>
              <th className="text-center">Aircraft</th>
              <th className="text-right">Number of passengers</th>
            </tr>
          </thead>

          <tbody>
            {/*<tr onClick={this.handleClick}>
              <td>LYS | 20:55</td>
              <td className="text-center">
                DBX | 06:15<sup>+1</sup>
              </td>
              <td className="text-center">6 hrs 20 mins | Non-stop</td>
              <td className="text-center">B777 EK082</td>
              <td className="text-right">150 / 400</td>
            </tr>*/}
            {data.map(index => (
              <tr key={JSON.stringify(index)} onClick={this.handleClick}>
                <td>{index.Flight_number}</td>
                <td className="text-center">{index.Flight_number}</td>
                <td className="text-center">{index.airline}</td>
                <td className="text-center">{index.loadPerc}</td>
                <td className="text-right">{index.nbPass}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    );
  }
}

FlightsHistoryListItem.propTypes = {
  data: PropTypes.array.isRequired,
  formatDate: PropTypes.func.isRequired
};

export default FlightsHistoryListItem;
