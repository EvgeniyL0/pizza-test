import employees from './employees.json';

const delay = parseInt(Math.random() * 1000);

export const getEmployees = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(employees);
		}, delay);
	});

export const editEmployee = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve("Successfully updated!");
		}, delay);
	})

export const addEmployee = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve("Successfully added!");
		}, delay);
	})
