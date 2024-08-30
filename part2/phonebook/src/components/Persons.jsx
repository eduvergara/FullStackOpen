const Person = ({ person, deleteName }) => {
  return (
    // when delete button is clicked, event handler deleteName in App module
    <div className="person-on-list">
      <p className="long-name">{person.name} {person.number}{" "}</p>
      <button onClick={() => deleteName(person.id, person.name)} className="btn">delete</button>
    </div>
  );
};

export default Person;
