import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions, thunkActions } from '../actions';
import ROOMS from '../rooms';

const Sidebar = ({ currentRoom, sideVisible, dispatch }) => {
  const toggleSideAndUpdate = room => {
    dispatch(actions.toggleSide());
    dispatch(thunkActions.switchRoom(room));
  };

  /*
  const toggleAndSwitch = () => {
    dispatch(actions.toggleSide())
  }
  */
  return (
    <div>
      <div className={sideVisible ? 'sidebar expanded' : 'sidebar'}>
        <div className="sidebar-items">
          {
            ROOMS.map((room, i) => {
              const classes = currentRoom && room.id === currentRoom.id
                ? 'sidebar-item selected'
                : 'sidebar-item';

              return (
                <Link to={`/page/room/${room.id}`} key={i} onClick={() => toggleSideAndUpdate(room)}>
                  <div className={classes}>{ room.title }</div>
                </Link>
              );
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

export default connect(mapStateToProps)(Sidebar);
