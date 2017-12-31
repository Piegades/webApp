import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import Modal from "react-modal";

import * as userActions from "../../../redux/actions/userActions";
import ConnectUport from "../../../components/ConnectUport";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      showModal: false,
      modalStyle: {
        content: {
          position: "absolute",
          margin: "auto",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "400px",
          height: "470px",
          border: "0",
          background: "rgba(255,255,255,0)",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          textAlign: "center",
          fontSize: "17px"
        }
      }
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    /*if (this.props.user.name === null) {
      this.setState({ showModal: true });
    } else {
      this.setState({ redirectToReferrer: true });
      this.props.history.push("/dashboard");
    }*/
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="text-white bg-primary py-5 d-md-down-none">
                <h1 className="text-center">Connect with uPort</h1>
                <p className="text-center">
                  The app is available on{" "}
                  <a
                    href="https://itunes.apple.com/us/app/uport-identity-wallet-ethereum/id1123434510?mt=8"
                    target="_blank"
                    style={{ color: "#FFDC00" }}
                  >
                    iOS
                  </a>{" "}
                  and on{" "}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.uportMobile"
                    target="_blank"
                    style={{ color: "#FFDC00" }}
                  >
                    Android
                  </a>
                </p>

                <Col xs="12" className="text-center">
                  <Button
                    color="primary"
                    className="mt-3"
                    active
                    onClick={this.handleOpenModal}
                  >
                    Connect
                  </Button>
                </Col>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          isOpen={this.state.showModal}
          style={this.state.modalStyle}
          contentLabel="uPortLogin"
        >
          <ConnectUport />
          <i onClick={this.handleCloseModal} className="icon-close exit" />
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
