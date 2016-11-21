import axios from 'axios';

export const actionTypes = {
  APPEND_INPUT: 'APPEND_INPUT',
  STORE_INPUT_NODE: 'STORE_INPUT_NODE',
  STORE_NOTIFICATION: 'STORE_NOTIFICATION',
  STORE_TOKEN: 'STORE_TOKEN',
  STORE_USER: 'STORE_USER',
  TOGGLE_SIDE: 'TOGGLE_SIDE',
  UPDATE_INPUT: 'UPDATE_INPUT',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  UPDATE_ROOM: 'UPDATE_ROOM'
};

export const actions = {
  appendInput: (amendment) => {
    return {
      type: actionTypes.APPEND_INPUT,
      amendment
    };
  },
  storeInputNode: (node) => {
    return {
      type: actionTypes.STORE_INPUT_NODE,
      node
    };
  },
  storeNotifcation: (id) => {
    return {
      type: actionTypes.STORE_NOTIFICATION,
      id
    };
  },
  storeToken: (token) => {
    return {
      type: actionTypes.STORE_TOKEN,
      token
    };
  },
  storeUser: (user) => {
    return {
      type: actionTypes.STORE_USER,
      user
    };
  },
  toggleSide: () => {
    return {
      type: actionTypes.TOGGLE_SIDE
    };
  },
  updateInput: (input) => {
    return {
      type: actionTypes.UPDATE_INPUT,
      input
    };
  },
  updateMessage: (message) => {
    return {
      type: actionTypes.UPDATE_MESSAGE,
      message
    };
  },
  updateMessages: (messages) => {
    return {
      type: actionTypes.UPDATE_MESSAGES,
      messages
    };
  },
  updateRoom: (room) => {
    return {
      type: actionTypes.UPDATE_ROOM,
      room
    };
  }
};

export const thunkActions = {
  fetchToken: () => {
    return dispatch => {
      axios.get('/auth/check').then(
        res => {
          if (res.data) {
            dispatch(actions.storeToken(res.data.token));
            dispatch(actions.storeUser(res.data.profile));
            dispatch(thunkActions.fetchAllMessages());
          }
        },
        err => console.error(err)
      );
    };
  },
  fetchAllMessages: () => {
    return (dispatch, getState) => {
      const { reducer } = getState();
      const roomId = reducer.get('currentRoom').id;
      const userToken = reducer.get('token');

      axios.get(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?access_token=${userToken}&limit=50`).then(
        res => dispatch(actions.updateMessages(res.data)),
        err => console.error(err)
      );
    };
  },
  sendMessage: (message) => {
    return (dispatch, getState) => {
      const { reducer } = getState();
      const roomId = reducer.get('currentRoom').id;
      const userToken = reducer.get('token');

      axios.post(`https://api.gitter.im/v1/rooms/${roomId}/chatMessages?access_token=${userToken}`, message).then(
        res => dispatch(thunkActions.fetchAllMessages()),
        err => console.error(err)
      );
    };
  },
  // Allow user to see loading symbol while we fetch new data from API
  switchRoom: (room) => {
    return dispatch => {
      dispatch(actions.updateRoom(room));
      dispatch(actions.updateMessages(null));
      dispatch(thunkActions.fetchAllMessages());
    };
  }
};
