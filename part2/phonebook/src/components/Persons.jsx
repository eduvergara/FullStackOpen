const Person = ({ person, deleteName }) => {
  return (
    // when delete button is clicked, event handler deleteName in App module
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteName(person.id, person.name)}>delete</button>
    </div>
  );
};

export default Person;
