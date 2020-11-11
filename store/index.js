import { getEmployees, editEmployee } from '../assets/request.js';

export const state = () => ({
  employees: []
});

export const getters = {
  getEmployee: state => id => {
    return state.employees.find(item => item.id == id);
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
  },
  editItem(state, payload) {
    const employee = state.employees.find(item => item.id == payload.id);
    for (let key in employee) {
      employee[key] = payload[key];
    }
  }
};

export const actions = {
  copyItemsToStore(context) {
    return getEmployees()
      .then(data => {
        data.forEach(item => {
          context.commit('addItem', Object.assign({}, item));
        });
      })
  },
  editItem(context, payload) {
    return editEmployee()
      .then(res => {
        context.commit('editItem', payload);
        return res;
      })
  },
  addItem(context, payload) {
    context.commit('addItem', Object.assign({}, payload));
  }
};