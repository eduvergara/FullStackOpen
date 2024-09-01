import axios from 'axios';
const baseUrl = '/api/persons';

// TODO: This is good, separating the API http calls into a service layer is good practice

//
// // Module for extracting Communication with the Backend
//

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const deleted = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

// definig object literals
export default { getAll, create, update, deleted };
