import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import * as userActions from "../../../redux/actions/userActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Jean Mouloud",
      email: "GG",
      password: "1234567890",
      repeatPassword: "1234567890"
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(
      this
    );
    this.signup = this.signup.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleRepeatPasswordChange(event) {
    this.setState({ repeatPassword: event.target.value });
  }

  signup(event) {
    event.preventDefault();

    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const repeatPassword = this.state.repeatPassword;

    console.log(this.props);

    if (password !== repeatPassword) {
      alert("The password should to be the same");
      return;
    }
    if (password < 8) {
      alert("The password should have more than 8 charachters");
      return;
    }

    //  if (this.props.isConnected === true) {
    this.props.signup(email, password).then(response => {
      this.setState({ isLoading: false });
      if (response === "SIGN_UP_FAILED") {
        alert("The Login have fail. Retry");
        return;
      } else {
        this.setState({ isLoggedIn: true });
        this.props.history.push("/dashboard");
        /*  setTimeout(() => {

      }, 1000);*/
      }
    });
    /*  } else {
      alert("You are currently offline");
    }*/
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <i className="icon-user" />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>@</InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <i className="icon-lock" />
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon>
                      <i className="icon-lock" />
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      value={this.state.repeatPassword}
                      onChange={this.handleRepeatPasswordChange}
                    />
                  </InputGroup>
                  <Button color="success" block onClick={this.signup}>
                    Create Account
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  signup: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
