import React from 'react';
import { connect } from 'react-redux';

const Loading = ({ dispatch }) => {
  return (
    <div id="loading-container">
      <div id="loading-animation" />
      <div id="loading-text">
        Loading...
      </div>
    </div>
  );
};

export default connect()(Loading);
