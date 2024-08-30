import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";
import "/src/App.css";

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
  const [isValidName, setIsValidName] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [newSearch, setNewSearch] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // arrow function - event handler for adding a person to the app
  const addName = (event) => {
    event.preventDefault();

    // Handling Case Insensitivity
    const newNameLowerCase = newName.trim().toLowerCase().replace(/\s+/g, ' ');
    const newNameCapitalized = newNameLowerCase.charAt(0).toUpperCase() + newNameLowerCase.slice(1);
    const numberTrimmed = newNumber.trim()
     

    // check if the name is already in the array
    if (persons.some((person) => person.name === newNameCapitalized)) {
      const personToUpdate = persons.find((n) => n.name === newNameCapitalized);
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
          number: numberTrimmed,
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
            }, 4000);

            setNewName(""); // Clear the input fields
            setNewNumber(""); // Clear the input fields
            setIsValidPhone(false);
            setIsValidName(false);
          })
          .catch((e) => {
            // catch the error if updating an already deleted person from the db
            
            const validationErrors = e.response.data.validationErrorsDetails
            const validationErrorsToSet = []
    
            // added
            validationErrors.forEach(element => {
    
              if (element === `person not found`){
                validationErrorsToSet.push(`'${newName}' was already deleted from the Phonebook`)
              } else if (element === "number"){
                validationErrorsToSet.push(`number formatting error`)
              }
              setErrorMessage(validationErrorsToSet)

            })

            setTimeout(() => {
              setErrorMessage(null);
            }, 4000);

            // retrieve the persons after the error (to update the list)
            personsService.getAll().then((initialPersons) => {
              setPersons(initialPersons);
            });
          });
      }

      return;
    }

    // if name imput is empty
    if (newName.trim() === "") {
      return setNewName("");
    }

    // if number imput is empty
    if (newNumber.trim() === "") {
      return setNewNumber("");
    }

    // object with UI information
    const personObject = {
      name: newNameCapitalized,
      number: numberTrimmed,
    };

    // add the person to the database
    personsService.create(personObject)
      .then((returnedPerson) => {

        setPersons(persons.concat(returnedPerson));

        // newName message confirmation
        setConfirmationMessage(`'${newName}' added to the Phonebook`);

        // to show the message for 5 message before hiding it
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 4000);

        // updates the useState
        setNewName("");
        setNewNumber("");
        setIsValidPhone(false);
        setIsValidName(false);
      })
      .catch((e) => {
      // catch errors if adding a new person name of phone number have formating error
        const validationErrors = e.response.data.validationErrorsDetails
        const validationErrorsToSet = []

        validationErrors.forEach(element => {

          if(element === "name"){
            validationErrorsToSet.push(`name formatting error`)
          } else if (element === "number"){
            validationErrorsToSet.push(`number formatting error`)
          } else if (element === "duplicate phone number"){
            validationErrorsToSet.push(`phone number already on phonebook`)
          }
          setErrorMessage(validationErrorsToSet)

        });

        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);

      })
  };

  const deleteName = (id, name) => {
    // using template literals
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deleted(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        
        // update message confirmation of person already deleted from the server
        setConfirmationMessage(`'${name}' deleted from the Phonebook`);

        // to show the message for 5 message before hiding it
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 4000);

      })
      .catch((e) => {
      // catch error if deleting a person already deleted from the database
        const validationErrors = e.response.data.validationErrorsDetails
        const validationErrorsToSet = []
      
        validationErrors.forEach(element => {
          if(element === 'person already deleted'){
            validationErrorsToSet.push(`'${name}' was already deleted from the Phonebook`)
          } 
          setErrorMessage(validationErrorsToSet)

          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);

          // retrieve the persons after the error (to update the list)
          personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
          });

        });

      });

    }
  };

 // Regex to validate name
 const validateName = (name) => {
  return /^[A-Za-z\s]{1,70}$/.test(name);
 };

  // event handlers for useState
  const handleNewName = (event) => {
    const newName = event.target.value;
    setNewName(newName);
    const nameTrim = newName.trim()
    setIsValidName(validateName(nameTrim));
  };

  // Regex to validate phone number
  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone)
  };

  const handleNewNumber = (event) => {
    const newPhone = event.target.value;
    setNewNumber(newPhone);
    const numberTrim = newPhone.trim()
    setIsValidPhone(validatePhoneNumber(numberTrim));
  };

  const handleNameSearch = (event) => {
    setNewSearch(event.target.value);
  };

  // Used to decide which value to assign to personsToShow.
  const personsToShow =
    newSearch === ""
      ? persons
      : persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase()) ||
        person.number.includes(newSearch)
    );

  return (
    // In the spirit of the single responsibility principle
    // All the UI sections are done in their own modules
    <div className="container">
      <h1>Phonebook</h1>
      <Notification message={confirmationMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleNameSearch={handleNameSearch} />
      <h2>Add a new person</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        isValidPhone={isValidPhone}
        isValidName={isValidName}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Phone List</h2>
      <div className="phone-list">
        {personsToShow.map((person) => (
          <Persons key={person.id} person={person} deleteName={deleteName} />
        ))}
      </div>
      
    </div>
  );
};

export default App;
