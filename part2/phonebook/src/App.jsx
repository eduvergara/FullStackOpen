import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

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
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // arrow function - event handler for adding a person to the app
  const addName = (event) => {
    event.preventDefault();

    // check if the name is already in the array
    if (persons.some((person) => person.name === newName)) {
      const personToUpdate = persons.find((n) => n.name === newName);
      if (
        // wait the confirmation message to be true to continue updating the phone name
        // of a person already on the DB
        window.confirm(
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        // update the number property of the person record on the DB
        const updateToPerson = {
          ...personToUpdate,
          number: newNumber,
        };

        // call the Persons.js to makes updates on the DB
        personsService
          .update(personToUpdate.id, updateToPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );

            // update phone message confirmation of person already on the server
            setConfirmationMessage(
              `'${newName}' phone number was updated on the server`
            );

            // to show the message for 5 message before hiding it
            setTimeout(() => {
              setConfirmationMessage(null);
            }, 2500);

            setNewName(""); // Clear the input fields
            setNewNumber(""); // Clear the input fields
          })
          .catch(() => {
            // catch the error if updating an already deleted person from the db
            setErrorMessage(`'${newName}' was already deleted from the server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 2500);

            // retrieve the persons, but not sure if the best way to do it
            personsService.getAll().then((initialPersons) => {
              setPersons(initialPersons);
            });
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
    };

    // add the person to the database
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));

      // newName message confirmation
      setConfirmationMessage(`'${newName}' was added to the server`);

      // to show the message for 5 message before hiding it
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 2500);

      // updates the useState
      setNewName("");
      setNewNumber("");
    });
  };

  const deleteName = (id, name) => {
    // using template literals
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deleted(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });

      // update message confirmation of person already deleted from the server
      setConfirmationMessage(`'${name}' deleted from the server`);

      // to show the message for 5 message before hiding it
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 2500);
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
      <Notification message={confirmationMessage} />
      <ErrorNotification message={errorMessage} />
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
