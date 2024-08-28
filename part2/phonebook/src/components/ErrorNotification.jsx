const ErrorNotification = ({ message }) => {

  if (message === null) {
    return null;
  } 

  return (
    <div className="errorNotification">
      {message.map((person) => (
        <div key={person}>
          {person}
        </div>
      ))}
    </div>
  );

};

export default ErrorNotification;

