<template>
  <div>
    <form>
      <span>Форма добавления нового сотрудника</span>
      <label for="name">Сотрудник</label>
      <input
        type="text"
        name="name"
        pattern="^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?$"
        minlength="2"
        maxlength="20"
        required
        v-model="newEmployee.name"
      />
      <label for="phone">Телефон</label>
      <input
        type="tel"
        name="phone"
        pattern="^\+7\s\(\d{3}\)\s\d{3}-\d{4}$"
        required
        v-model="newEmployee.phone"
      />
      <label for="birthday">Дата рожд.</label>
      <input
        type="date"
        name="birthday"
        placeholder="Дата рожд."
        required
        v-model="newEmployee.birthday"
      />
      <label for="role">Должность</label>
      <select name="role" required v-model="newEmployee.role">
        <option
          v-for="(item, index) in $store.getters.getRoles"
          v-bind:key="index"
          v-bind:value="item"
        >
          {{ item }}
        </option>
      </select>
      <button v-on:click.prevent="addNewEmployee" v-bind:disabled="formValidity">
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEmployee: {
        id: "",
        name: "",
        isArchive: false,
        role: "",
        phone: "",
        birthday: "",
      },
    };
  },
  computed: {
    formValidity() {
      const values = Object.values(this.newEmployee);
      return values.includes("");
    },
  },
  methods: {
    addNewEmployee() {
      this.newEmployee.id += 1;
      this.$store.dispatch("addItem", this.newEmployee);
    },
  },
  created() {
    const numberOfItems = this.$store.state.employees.length;
    this.newEmployee.id = this.$store.state.employees[numberOfItems - 1].id;
  },
};
</script>