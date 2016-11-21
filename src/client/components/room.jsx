import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions, thunkActions } from '../actions';
import ROOMS from '../rooms';
import { Input, Loading, Login, Message } from './index';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.actionBind = bindActionCreators(actions, this.props.dispatch);
    this.thunkBind = bindActionCreators(thunkActions, this.props.dispatch);
  }

  componentDidMount() {
    if (!this.props.messages) {
      this.actionBind.updateRoom(ROOMS.find(room => room.id === this.props.params.roomId));
    }

    this.updateLoop = setInterval(() => {
      if (this.props.token) {
        this.thunkBind.fetchAllMessages();
      }
    }, 2000);

    // Check for desktop notifications
    if (!Notification) {
      console.log('Desktop notifications not available...');
    } else if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateLoop);
  }

  render() {
    if (!this.props.token) {
      return <Login />;
    }

    if (!this.props.messages) return <Loading />;

    const { messages } = this.props;

    return (
      <div>
        <div id="messages">
          { messages
            ? messages.map((msg, i) => <Message message={msg} key={i} appendInput={this.actionBind.appendInput} />)
            : null
          }
        </div>
        <Input />
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

export default connect(mapStateToProps)(Room);
