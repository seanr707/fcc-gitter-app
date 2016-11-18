import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions } from '../actions';
import ROOMS from '../rooms';

const Sidebar = ({ currentRoom, sideVisible, dispatch }) => {
  return (
    <div>
      <div className={sideVisible ? 'sidebar expanded' : 'sidebar'}>
        <div className="sidebar-items">
          {
            ROOMS.map((room, i) => {
              const classes = currentRoom && room.id === currentRoom.id
                ? 'sidebar-item selected'
                : 'sidebar-item';

              return <Link key={i} to={`/page/room/${room.id}`}><div className={classes} key={i}>{ room.title }</div></Link>;
            })
          }
        </div>
      </div>
      <div
        className={sideVisible ? 'sidebar-overlay' : 'sidebar-overlay hidden'}
        onClick={() => dispatch(actions.toggleSide())}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentRoom: state.reducer.get('currentRoom'),
    sideVisible: state.reducer.get('sideVisible')
  };
};

export default connect(mapStateToProps)(Sidebar)
