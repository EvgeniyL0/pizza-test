import employees from './employees.json';

export const getEmployees = () =>
    new Promise((resolve, reject) => {
        const delay = parseInt(Math.random() * 1000);
        setTimeout(() => {
            resolve(employees);
        }, delay);
    });
