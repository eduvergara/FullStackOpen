const PersonForm = (props) => {
  // Renders the 'add a new' UI section
  // When the 'add' button is clicked,
  // the event is handled by addName event handler in App Module
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName} />
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
