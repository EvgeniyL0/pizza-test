export const state = () => ({
  employees: []
});

export const getters = {
  getEmployee: state => id => {
    return state.employees.find(item => item.id == id);
  },
  getRoles(state) {
    const roles = ['все'];
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
    if (employee !== undefined) {
      for (let key in employee) {
        employee[key] = payload[key];
      }
    }
  }
};

export const actions = {
  copyItemsToStore(context) {
    return fetch('https://pizza-base-22029-default-rtdb.firebaseio.com/employees.json')
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        data.forEach(item => {
          context.commit('addItem', Object.assign({}, item));
        });
      })
  },
  editItem(context, payload) {
    return fetch(`https://pizza-base-22029-default-rtdb.firebaseio.com/employees/${payload.id - 1}.json`, {
      method: "PATCH",
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.ok) {
          context.commit('editItem', payload);
        }
      })
  },
  addItem(context, payload) {
    return fetch(`https://pizza-base-22029-default-rtdb.firebaseio.com/employees/${payload.id - 1}.json`, {
      method: "PUT",
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.ok) {
          context.commit('addItem', Object.assign({}, payload));
        }
      })
  }
};