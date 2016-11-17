import { Map } from 'immutable';

import { actionTypes } from '../actions';

const initialState = Map({
  currentRoom: null,
  token: null,
  user: null,
  messages: null,
  sideVisible: false,
  inputField: '',
  inputNode: null,
  notified: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.APPEND_INPUT:
    return state.set('inputField', state.get('inputField') + action.amendment);

  case actionTypes.STORE_INPUT_NODE:
    return state.set('inputNode', action.node);

  case actionTypes.STORE_NOTIFICATION:
    return state.set('notified', state.get('notified').concat(action.id));

  case actionTypes.STORE_TOKEN:
    return state.set('token', action.token);

  case actionTypes.STORE_USER:
    return state.set('user', action.user);

  case actionTypes.TOGGLE_SIDE:
    return state.set('sideVisible', !state.get('sideVisible'));

  case actionTypes.UPDATE_INPUT:
    return state.set('inputField', action.input);

  case actionTypes.UPDATE_MESSAGE:
    return state.set('messages', state.get('messages').map(message => {
      if (message.id === action.message.id) return action.message;
      return message;
    }));

  case actionTypes.UPDATE_MESSAGES:
    return state.set('messages', action.messages);

  case actionTypes.UPDATE_ROOM:
    return state.set('currentRoom', action.room);

  default:
    return state;
  }
};
