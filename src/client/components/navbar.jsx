import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions } from '../actions';

const Navbar = ({ dispatch, currentRoom, currentRoute, sideVisible, user }) => {
  const titleText = currentRoute === '/' || !currentRoom
    ? 'FCC Gitter Client'
    : currentRoom.title;

  /* May experiment with multiple colors later
  const navStyle = currentRoute !== '/'
    ? { background: '#4f4f84' } : null;
  */

  const menuStyle = sideVisible ? { transform: 'rotate(90deg)' } : null;

  return (
    <nav className="navbar navbar-default">
      <div style={menuStyle} className="nav-item sidebar-toggle" onClick={() => dispatch(actions.toggleSide())}>
        ☰
      </div>
      <div className="nav-item left">
        <span>
          <Link to="/">{ titleText }</Link>
        </span>
      </div>
      {
        user
          ? <div className="nav-item right">
            <a href={`https://github.com/${user.username}`} title="Go to your Github profile">
              <span style={{ display: 'flex' }}>
                <img className="navbar-avatar" src={user._json[0].avatarUrlSmall} alt="avatar" />
                { user.displayName }
              </span>
            </a>
          </div>
          : null
        }
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    currentRoom: state.reducer.get('currentRoom'),
    currentRoute: state.routing.locationBeforeTransitions.pathname,
    sideVisible: state.reducer.get('sideVisible'),
    user: state.reducer.get('user')
  };
};

export default connect(mapStateToProps)(Navbar);
