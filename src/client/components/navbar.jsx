import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions } from '../actions';

const Navbar = ({ dispatch, currentRoom, currentRoute, sideVisible }) => {
  const titleText = currentRoute === '/' || !currentRoom
    ? 'FreeCodeCamp Gitter Client'
    : currentRoom.title;

  const navStyle = currentRoute !== '/'
    ? { background: '#4f4f84' } : null;

  const menuStyle = sideVisible ? { transform: 'rotate(90deg)' } : null;

  return (
    <nav className="navbar navbar-default" style={navStyle}>
      <div style={menuStyle} className="nav-item sidebar-toggle" onClick={() => dispatch(actions.toggleSide())}>
        ☰
      </div>
      <div className="nav-item left">
        <span>
          <Link to="/">{ titleText }</Link>
        </span>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    currentRoom: state.reducer.get('currentRoom'),
    currentRoute: state.routing.locationBeforeTransitions.pathname,
    sideVisible: state.reducer.get('sideVisible')
  };
};

export default connect(mapStateToProps)(Navbar);
