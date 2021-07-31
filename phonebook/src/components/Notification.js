const Notification = ({ message, msgstyle }) => {
  if (message === null) {
    return null;
  }

  if (msgstyle === "errorStyle") {
    return <div className="errorStyle">{message}</div>;
  } else {
    return <div className="notificationStyle">{message}</div>;
  }
};

export default Notification;
