import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personsService from './services/persons';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';
import '/src/App.css';

// TODO: You should trim/slim down this component,
// There is a lot of code in here, try to split into smaller component
// Also, if you see utility functions, try to add those to a "utils" directory
// In software development (very important in a team), code readability is a big thing
// The easier, simple and cleaner you code to understand the better it is for developers

const App = () => {
	// runs only once due "[]"
	useEffect(() => {
		personsService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	// TODO: Challenge for you, should some of those state below,
	// Be handled at the form component (child), or here (parent component)
	// Please tell me the reason for either yes or no.
	// No need to refactor the code in this iteration.

	// useState hooks
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [isValidName, setIsValidName] = useState(false);
	const [newNumber, setNewNumber] = useState('');
	const [isValidPhone, setIsValidPhone] = useState(false);
	const [newSearch, setNewSearch] = useState('');
	const [confirmationMessage, setConfirmationMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	// TODO: This method is very confusing and bloated, it's doing too many things that it shouldn't
	// Try to think about the core functionality of a method, i.e. what it must do
	// If you find yourself seeing something that doesn't make sense, then it prob shouldn't be there.

	// arrow function - event handler for adding a person to the app
	const addName = (event) => {
		event.preventDefault();

		// TODO: Another challenge, should this input mutation be handles at the form component,
		// Or in here, please tell me the reason for either yes or no.
		// No need to refactor the code in this iteration.

		// Handling Case Insensitivity
		const newNameLowerCase = newName.trim().toLowerCase().replace(/\s+/g, ' ');
		const newNameCapitalized =
			newNameLowerCase.charAt(0).toUpperCase() + newNameLowerCase.slice(1);
		const numberTrimmed = newNumber.trim().replace(/\s+/g, '');

		// TODO: Here is an example of the point above, it's fine to pre-check if an user exists,
		// But "addName", should be concerned/responsible to add a new entity i.e. name and number,
		// Not updating an existing entity, that job should be the concern of the update method.

		// check if the name is already in the array
		if (persons.some((person) => person.name === newNameCapitalized)) {
			const personToUpdate = persons.find((n) => n.name === newNameCapitalized);

			// I suggest updating the logic,
			// So that your validation is just concerned if an entity exists or not,
			// Then notify the user

			if (
				// wait the confirmation message to be true to continue updating the phone name
				// of a person already on the DB
				window.confirm(
					`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				// TODO: Update should be on a separated method that is concerned with updating
				// An existing entity

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
							`'${newNameCapitalized}' phone number was updated on the server`
						);

						// to show the message for 5 message before hiding it
						setTimeout(() => {
							setConfirmationMessage(null);
						}, 4000);

						setNewName(''); // Clear the input fields
						setNewNumber(''); // Clear the input fields
						setIsValidPhone(false);
						setIsValidName(false);
					})
					.catch((e) => {
						// catch the error if updating an already deleted person from the db

						const validationErrors = e.response.data.validationErrorsDetails;
						const validationErrorsToSet = [];

						// added
						validationErrors.forEach((element) => {
							if (element === `person not found`) {
								validationErrorsToSet.push(
									`'${newNameCapitalized}' was already deleted from the Phonebook`
								);
							} else if (element === 'number') {
								validationErrorsToSet.push(`number formatting error`);
							}
							setErrorMessage(validationErrorsToSet);
						});

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
		if (newName.trim() === '') {
			return setNewName('');
		}

		// if number imput is empty
		if (newNumber.trim() === '') {
			return setNewNumber('');
		}

		// object with UI information
		const personObject = {
			name: newNameCapitalized,
			number: numberTrimmed,
		};

		// TODO: addName here is it's core responsibility
		// And that's all it should be doing

		// add the person to the database
		personsService
			.create(personObject)
			.then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));

				// newName message confirmation
				setConfirmationMessage(
					`'${newNameCapitalized}' added to the Phonebook`
				);

				// to show the message for 5 message before hiding it
				setTimeout(() => {
					setConfirmationMessage(null);
				}, 4000);

				// updates the useState
				setNewName('');
				setNewNumber('');
				setIsValidPhone(false);
				setIsValidName(false);
			})
			.catch((e) => {
				// catch errors if adding a new person name of phone number have formating error
				const validationErrors = e.response.data.validationErrorsDetails;
				const validationErrorsToSet = [];

				validationErrors.forEach((element) => {
					if (element === 'name') {
						validationErrorsToSet.push(`name formatting error`);
					} else if (element === 'number') {
						validationErrorsToSet.push(`number formatting error`);
					} else if (element === 'duplicate phone number') {
						validationErrorsToSet.push(`phone number already on phonebook`);
					}
					setErrorMessage(validationErrorsToSet);
				});

				setTimeout(() => {
					setErrorMessage(null);
				}, 4000);
			});
	};

	const deleteName = (id, name) => {
		// using template literals
		if (window.confirm(`Delete ${name}?`)) {
			personsService
				.deleted(id)
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
					const validationErrors = e.response.data.validationErrorsDetails;
					const validationErrorsToSet = [];

					validationErrors.forEach((element) => {
						if (element === 'person already deleted') {
							validationErrorsToSet.push(
								`'${name}' was already deleted from the Phonebook`
							);
						}
						setErrorMessage(validationErrorsToSet);

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

	// TODO: Those "validate" appears to be helpers "utils" functions/methods
	// I suggest moving then to it's own "util" directory
	// It would make this component less busy/cluttered

	// Regex to validate name
	const validateName = (name) => {
		return /^[A-Za-z\s]{1,70}$/.test(name);
	};

	// event handlers for useState
	const handleNewName = (event) => {
		const newName = event.target.value;
		setNewName(newName);
		const nameTrim = newName.trim();
		setIsValidName(validateName(nameTrim));
	};

	// Regex to validate phone number
	const validatePhoneNumber = (phone) => {
		return /^\d{10}$/.test(phone);
	};

	const handleNewNumber = (event) => {
		const newPhone = event.target.value;
		setNewNumber(newPhone);
		const numberTrim = newPhone.trim().replace(/\s+/g, '');
		setIsValidPhone(validatePhoneNumber(numberTrim));
	};

	const handleNameSearch = (event) => {
		setNewSearch(event.target.value);
	};

	// Used to decide which value to assign to personsToShow.
	const personsToShow =
		newSearch === ''
			? persons
			: persons.filter(
					(person) =>
						person.name.toLowerCase().includes(newSearch.toLowerCase()) ||
						person.number.includes(newSearch)
			  );

	return (
		// In the spirit of the single responsibility principle
		// All the UI sections are done in their own modules
		<div className='container'>
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
			<div className='phone-list'>
				{personsToShow.map((person) => (
					<Persons key={person.id} person={person} deleteName={deleteName} />
				))}
			</div>
		</div>
	);
};

export default App;
