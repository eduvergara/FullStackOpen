import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

const App = () => {
  // runs only once due "[]"
  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // useState hooks
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  // arrow function - event handler for adding a person to the app
  const addName = (event) => {
    event.preventDefault();

    // check if the name is already in the array
    if (persons.some((person) => person.name === newName)) {
      const personToUpdate = persons.find((n) => n.name === newName);
      if (
        window.confirm(
          `${personToUpdate.name} is already added to phonebook, replace the old number iwth a new one?`
        )
      ) {
        const updateToPerson = {
          ...personToUpdate,
          number: newNumber,
        };

        personsService
          .update(personToUpdate.id, updateToPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
            setNewName(""); // Clear the input fields
            setNewNumber(""); // Clear the input fields
          });
      }
      return;
    }

    // if name imput is empty
    if (newName === "") {
      return setNewName("");
    }

    // if number imput is empty
    if (newNumber === "") {
      return setNewNumber("");
    }

    // object with UI information
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    // add the person to the database
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deleteName = (id, name) => {
    // using template literals
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deleted(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    }
  };

  // event handlers for useState
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameSearch = (event) => {
    setNewSearch(event.target.value);
  };

  // Used to decide which value to assign to personsToShow.
  const personsToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        );

  return (
    // In the spirit of the single responsibility principle
    // All the UI sections are done in their own modules
    <div>
      <h2>Phonebook</h2>
      <Filter handleNameSearch={handleNameSearch} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Persons key={person.id} person={person} deleteName={deleteName} />
      ))}
    </div>
  );
};

export default App;
