import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ shown, title, text }) => (
  <div className={shown ? 'dataSaved-notification active' : 'dataSaved-notification'}>
    <span className="title">{title}</span>
    {text ? <span>{text}</span> : ''}
  </div>
);

Notification.propTypes = {
  // shown: PropTypes.boolean,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Notification;
