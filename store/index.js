import { getEmployees } from '../assets/request.js';

export const state = () => ({
  employees: []
});

export const getters = {
  getEmployee: state => id => {
    return state.employees.find(item => item.id === id);
  },
  getRoles(state) {
    const roles = ['all'];
    state.employees.forEach(item => {
      if (!roles.includes(item.role)) roles.push(item.role); 
    });
    return roles;
  }
};

export const mutations = {
  addItem(state, payload) {
    state.employees.push(payload);
  }
};

export const actions = {
  addItems(context) {
    return getEmployees()
      .then(data => {
        data.forEach(item => {
          context.commit('addItem', Object.assign({}, item));
        });
      })
  }
};