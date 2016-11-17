import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MarkdownIt from 'markdown-it';
import Emoji from 'markdown-it-emoji';

import { actions } from '../actions';

const md = MarkdownIt().use(Emoji);

const markup = text => ({ __html: md.render(text) });

const getBackground = (user, author, mentions, message) => {
  const mention = mentions.find(x => x.userId === user.id);

  if (mention) {
    return { background: '#aa3521' };
  } else if (user.id === author.id) {
    return { background: '#dfdfdf', color: '#505050' };
  }
  return null;
};

const checkNotify = (user, message, storeNotifcation) => {
  const mention = message.mentions.find(x => x.userId === user.id);

  // console.log(message);
  // console.log(message.notified);

  if (mention && !message.notified) {
    notify(message.fromUser, message);

    return storeNotifcation(message.id);
  } else {
    return null;
  }
};

const notify = (author, message) => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    const notification = new Notification(`New mention from @${author.username}`, {
      icon: author.avatarUrlMedium,
      body: message.text
    });

    notification.onclick = function () {
      window.open('http://stackoverflow.com/a/13328397/1269037');
    };
  }
};

const Message = ({ message, appendInput, user, notified, dispatch }) => {
  const actionBind = bindActionCreators(actions, dispatch);

  const date = new Date(message.sent) < Date.now() - 1000 * 3600 * 24
    ? new Date(message.sent).toLocaleString()
    : new Date(message.sent).toLocaleTimeString();

  const click = () => {
    appendInput(`@${message.fromUser.username} `);
    document.getElementById('submit-field').click();
  };

  let background = getBackground(user, message.fromUser, message.mentions, message);

  if (!notified.find(id => id === message.id)) {
    // Check if we need to notifiy user of new message
    // Timeout used to prevent to many unnecessary re-renders
    setTimeout(() => checkNotify(user, message, actionBind.storeNotifcation), 500);
  }

  return (
    <div className="message-container">
      <div className="message markdown" style={background} dangerouslySetInnerHTML={markup(message.text)} />
      <div className="message-info-container">
        <div className="message-timestamp col-6">{ date }</div>
        <div
          className="message-author-container"
          onClick={click}
        >
          <span className="message-author">
            { `${message.fromUser.displayName} (@${message.fromUser.username})` }
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.reducer.get('user'),
    notified: state.reducer.get('notified')
  };
};

export default connect(mapStateToProps)(Message);
