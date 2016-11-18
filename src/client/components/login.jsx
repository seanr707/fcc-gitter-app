import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { thunkActions } from '../actions';
import ROOMS from '../rooms';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.thunkBind = bindActionCreators(thunkActions, this.props.dispatch);
  }

  render() {
    return (
      <div id="login" className="container">
        {
          !this.props.token
            ? <div className="center">
              <a href="/auth/gitter">
              {/* Temporary fix until better button is made */}
                <button className="btn btn-submit" style={{ width: '200px', margin: '40px auto' }}>Login to Gitter</button>
              </a>
            </div>
            : <div>
              <h2 className="center">Welcome, please look at the sidebar for our rooms.</h2>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.reducer.get('token'),
    user: state.reducer.get('user'),
    messages: state.reducer.get('messages')
  };
};

export default connect(mapStateToProps)(Login);
