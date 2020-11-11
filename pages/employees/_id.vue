<template>
  <form>
    <label for="name">Сотрудник</label>
    <input type="text" name="name" v-model="employee.name" />
    <label for="phone">Телефон</label>
    <input type="text" name="phone" v-model="employee.phone" />
    <label for="birthday">Дата рождения</label>
    <input type="text" name="birthday" v-model="employee.birthday" />
    <label for="role">Должность</label>
    <select name="role" v-model="employee.role">
      <option
        v-for="(item, index) in $store.getters.getRoles"
        v-bind:key="index"
        v-bind:value="item"
      >{{ item }}</option>
    </select>
    <label for="status">В архиве</label>
    <input type="checkbox" name="status" v-model="employee.isArchive" />
    <button type="button" v-on:click="updateData">Сохранить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      employee: {}
    };
  },
  methods: {
    updateData() {
      this.$store.dispatch("editItem", this.employee).then(res => {
        console.log(res);
        this.$router.push("/");
      });
    }
  },
  created() {
    Object.assign(
      this.employee,
      this.$store.getters.getEmployee(this.$route.params.id)
    );
  }
};
</script>