import React from 'react';
import { connect } from 'react-redux';
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
            ? <a href="/auth/gitter">Login</a>
            : <div>
              <h3>Check out our rooms!</h3>
              <ul>
                {
                  ROOMS.map((room, i) => {
                    return (
                      <li key={i}>
                        <a href={`/page/room/${room.id}`}>
                          { room.title }
                        </a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.reducer.get('token'),
    messages: state.reducer.get('messages')
  };
};

export default connect(mapStateToProps)(Login);
