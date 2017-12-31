import kjua from "kjua";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uport } from "../../modules/uportService";
import * as userActions from "../../redux/actions/userActions";

class ConnectUport extends React.Component {
  componentDidMount() {
    uport
      .requestCredentials(
        {
          requested: ["name", "phone", "country", "avatar"],
          notifications: true
        },
        uri => {
          // Create QR
          const qr = kjua({
            text: uri,
            fill: "#000000",
            size: 350, //400
            back: "rgba(255,255,255,0)"
            //rounded: 100
          });

          // Create wrapping link for mobile touch
          const aTag = document.createElement("a");
          aTag.href = uri;

          // Nest QR in <a> and inject
          aTag.appendChild(qr);
          document.querySelector("#kqr").appendChild(aTag);
        }
      )
      .then(userProfile => {
        this.props.login(userProfile);
        this.props.history.push("/dashboard");
      });
  }

  render() {
    return (
      <div>
        <h4>Connect with uPort</h4>
        <h6>Scan QR code with mobile app</h6>
        <div id="kqr" />
      </div>
    );
  }
}

ConnectUport.propTypes = {
  login: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConnectUport)
);
