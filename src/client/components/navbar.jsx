import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Navbar = ({ dispatch, currentRoom, currentRoute }) => {
  const titleText = currentRoute === '/' || !currentRoom
    ? 'FreeCodeCamp Gitter Client'
    : currentRoom.title;

  return (
    <nav className="navbar navbar-default">
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
    currentRoute: state.routing.locationBeforeTransitions.pathname
  };
};

export default connect(mapStateToProps)(Navbar);
