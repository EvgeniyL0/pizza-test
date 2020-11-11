<template>
  <div>
    <form >
      <span>Форма добавления нового сотрудника</span>
      <label for="name">Сотрудник</label>
      <input type="text" name="name" v-model="newEmployee.name" required />
      <label for="phone">Телефон</label>
      <input type="text" name="phone" v-model="newEmployee.phone" required />
      <label for="birthday">Дата рождения</label>
      <input type="text" name="birthday" v-model="newEmployee.birthday" required />
      <label for="role">Должность</label>
      <select name="role" v-model="newEmployee.role">
        <option
          v-for="(item, index) in $store.getters.getRoles"
          v-bind:key="index"
          v-bind:value="item"
        >{{ item }}</option>
      </select>
      <button type="submit" v-on:click.prevent="addNewEmployee">Добавить</button>
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
        birthday: ""
      }
    };
  },
  methods: {
    addNewEmployee() {
      const lastId = this.$store.getters.getLastId;
      this.newEmployee.id = lastId + 1;
      console.log(this.newEmployee.id);
      this.$store.dispatch("addItem", this.newEmployee);
    }
  }
};
</script>