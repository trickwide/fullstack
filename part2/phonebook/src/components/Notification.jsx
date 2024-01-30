/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
  if (message === null) return null;

  if (message.includes("removed from server")) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
