import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { thunkActions } from '../actions';
import { Navbar } from './index';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.thunkBind = bindActionCreators(thunkActions, this.props.dispatch);
  }

  componentDidMount() {
    this.thunkBind.fetchToken();
    // this.thunkBind.fetchAllMessages();
  }

  render() {
    return (
      <div id="root">
        <Navbar />
        {/* Margin for Navbar space */}
        <div style={{ marginTop: '50px' }}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Main);
