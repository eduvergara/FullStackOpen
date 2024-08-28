const Person = ({ person, deleteName }) => {
  return (
    // when delete button is clicked, event handler deleteName in App module
    <div className="person-on-list">
      {person.name} {person.number}{" "}
      <button onClick={() => deleteName(person.id, person.name)} className="btn">delete</button>
    </div>
  );
};

export default Person;
