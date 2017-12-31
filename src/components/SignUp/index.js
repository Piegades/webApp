import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  signup(event) {
    event.preventDefault();

    const email = this.email.value;
    const password = this.password.value;

    this.props.signup(email, password);
    setTimeout(() => {
      this.form.reset();
    }, 2000);
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form className="" onSubmit={this.signup} ref={el => (this.form = el)}>
          <label className="">
            Email
            <input
              type="email"
              ref={email => (this.email = email)}
              placeholder="Enter your email"
            />
          </label>
          <label className="">
            Password
            <input
              type="password"
              ref={password => (this.password = password)}
              placeholder="Enter your password"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(appActions, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
