const PersonForm = (props) => {
  // Renders the 'add a new' UI section
  // When the 'add' button is clicked,
  // the event is handled by addName event handler in App Module
  return (
    <form onSubmit={props.addName} className="add-form">
      <div className="add-data-input">
        name: <input value={props.newName} style={{ borderColor: props.isValidName ? "green" : "red" }}onChange={props.handleNewName} />
      </div>
      <div className="add-data-input">
        phone:
        <input value={props.newNumber} style={{ borderColor: props.isValidPhone ? "green" : "red" }} onChange={props.handleNewNumber} />
      </div>
      <div className="add-number-reference">
        10 digits phone number
      </div>
      <div className="add-button">
        <button type="submit" className="btn">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
