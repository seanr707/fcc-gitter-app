import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const keyUp = (sendMessage, updateInput) => node => {
  if (node && !node.onkeyup) {
    node.onkeyup = e => {
      // If Ctrl+Enter
      if ((e.keyCode === 13 && e.ctrlKey) || (e.keyCode === 13 && !e.shiftKey)) {
        // use similar items to submit function
        sendMessage({ text: node.value });
        updateInput('');
      }
    };
  }

  return node;
};

const submit = (sendMessage, updateInput, input) => e => {
  if (e) e.preventDefault();

  console.log(input);

  sendMessage({ text: input });
  updateInput('');
};

import { actions, thunkActions } from '../actions';

const Input = ({ dispatch, token, inputField, inputNode }) => {
  const actionBind = bindActionCreators(actions, dispatch);
  const thunkBind = bindActionCreators(thunkActions, dispatch);

  const updateInput = e => actionBind.updateInput(e.target.value);

  /*
  if (inputNode) {
    inputNode.onkeyup = e => {
      if (e.keyCode === 13 && e.ctrlKey) {
        // start your submit function
        console.log('It worked!');
      }
    };
  }
  */

  return (
    <div id="input">
      <div className="input-wrapper">
        <form style={{ display: 'flex' }} onSubmit={submit(thunkBind.sendMessage, actionBind.updateInput, inputField)}>
          <div style={{ padding: '5px', margin: '0 0 0 auto', width: '75%' }}>
            <textarea
              id="submit-field"
              type="text"
              className="submit-input"
              title="Send messages using the Gitter API"
              ref={keyUp(thunkBind.sendMessage, actionBind.updateInput)}
              value={inputField}
              onChange={updateInput}
              autoFocus
              required
            />
          </div>
          <div style={{ padding: '5px', margin: '20px auto 20px 0' }}>
            <button type="submit" className="btn btn-remove">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.reducer.get('token'),
    inputField: state.reducer.get('inputField'),
    inputNode: state.reducer.get('inputNode')
  };
};

export default connect(mapStateToProps)(Input);
