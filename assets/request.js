import employees from './employees.json';

const delay = parseInt(Math.random() * 1000);

export const getEmployees = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(employees);
		}, delay);
	});

export const editEmployee = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Данные успешно отредактированы");
		}, delay);
	})
