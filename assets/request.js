import employees from './employees.json';
import { reject } from 'q';

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
			resolve("Successfully updated!");
		}, delay);
	})

export const addEmployee = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Successfully added!");
		}, delay);
	})
