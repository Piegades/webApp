import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  Badge,
  NavItem,
  NavLink as RsNavLink,
  Nav,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
  Input,
  Table
} from "reactstrap";

import * as aeroTagActions from "../../../../../redux/actions/aeroTagActions";

class PassengersListItem extends React.Component {
  constructor(props) {
    super(props);
    this.aeroTag = this.aeroTag.bind(this);
  }

  aeroTag() {
    this.props.generateAeroTag().then(data => {
      qrcode = data;
    });
  }

  render() {
    /* For the test */
    const passengers = [
      {
        _id: "0",
        firstName: "Mokhtar",
        lastName: "Bacha",
        passportNumber: "15xxxx",
        ethereumAddress: "0x",
        numberOfBagagges: "1"
      },
      {
        _id: "1",
        firstName: "Mokhtar",
        lastName: "Bacha",
        passportNumber: "15xxxx",
        ethereumAddress: "0x",
        numberOfBagagges: "1"
      },
      {
        _id: "2",
        firstName: "Mokhtar",
        lastName: "Bacha",
        passportNumber: "15xxxx",
        ethereumAddress: "0x",
        numberOfBagagges: "1"
      },
      {
        _id: "3",
        firstName: "Mokhtar",
        lastName: "Bacha",
        passportNumber: "15xxxx",
        ethereumAddress: "0x",
        numberOfBagagges: "1"
      }
    ];
    return (
      <Row>
        <Table
          hover
          responsive
          className="table-outline mb-0 d-none d-sm-table"
        >
          <thead className="thead-light">
            <tr>
              <th>First Name</th>
              <th className="text-center">Lastname</th>
              <th className="text-center">Passport Number</th>
              <th className="text-center">Ethereum Address</th>
              <th className="text-center">Number of Bagagges</th>
              <th className="text-right">Generate NFC tag</th>
            </tr>
          </thead>

          <tbody>
            {passengers.map(index => (
              <tr key={index._id}>
                <td>{index.firstName}</td>
                <td className="text-center">{index.lastName}</td>
                <td className="text-center">{index.passportNumber}</td>
                <td className="text-center">{index.ethereumAddress}</td>
                <td className="text-center">{index.numberOfBagagges}</td>
                <td className="text-right">
                  <Button onClick={this.aeroTag}>Generate</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    );
  }
}

PassengersListItem.propTypes = {
  //data: PropTypes.array.isRequired,
  //formatDate: PropTypes.func.isRequired
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch =>
  bindActionCreators(aeroTagActions, dispatch);
export default withRouter(connect(mapStateToProps)(PassengersListItem));
