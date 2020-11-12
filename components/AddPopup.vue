<template>
  <div class="add-popup" v-on:click.self="$emit('close-popup')">
    <form class="add-popup__form">
      <span>Форма добавления нового сотрудника</span>
      <fieldset>
        <label for="name">Фамилия и Имя:</label>
        <input type="text" name="name" v-model="newEmployee.name" />
      </fieldset>
      <span v-show="!validation.name">Введите фамилию и имя</span>
      <fieldset>
        <label for="phone">Телефон:</label>
        <input type="tel" name="phone" v-model="newEmployee.phone" />
      </fieldset>
      <span v-show="!validation.phone">Введите телефон в формате +7 (ххх) ххх-хххх</span>
      <fieldset>
        <label for="birthday">Дата рожд.:</label>
        <input type="text" name="birthday" class="add-popup__input" v-model="newEmployee.birthday" />
      </fieldset>
      <span>Введите дату в формате ДД.ММ.ГГГГ</span>
      <fieldset>
        <label for="role">Должность:</label>
        <select name="role" v-model="newEmployee.role">
          <option
            v-for="(item, index) in $store.getters.getRoles"
            v-bind:key="index"
            v-bind:value="item"
          >{{ item }}</option>
        </select>
      </fieldset>
      <button class="add-popup__button"
        v-on:click.prevent="$emit('add-new', newEmployee)"
        v-bind:disabled="formValidity"
      >Добавить</button>
    </form>
  </div>
</template>

<script>
const regexpName = /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?\s[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?$/;
const regexpPhone = /^\+7\s\(\d{3}\)\s\d{3}-\d{4}$/;
const regexpDate = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;

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
  computed: {
    validation() {
      return {
        name: regexpName.test(this.newEmployee.name),
        phone: regexpPhone.test(this.newEmployee.phone),
        birthday: regexpDate.test(this.newEmployee.birthday),
        role: this.newEmployee.role !== ""
      };
    },
    formValidity() {
      const values = Object.values(this.validation);
      return values.some(item => item === false);
    }
  },
  created() {
    const numberOfItems = this.$store.state.employees.length;
    this.newEmployee.id = this.$store.state.employees[numberOfItems - 1].id;
  }
};
</script>

<style>
.add-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-popup input {
  width: 60%;
  height: 30px;
}

.add-popup select {
  width: 60%;
  height: 30px;
  box-sizing: content-box;
}

.add-popup__form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 430px;
  height: 450px;
  padding: 30px;
  background-color: white;
  border-radius: 4px;
  text-align: center;
}

.add-popup__form fieldset {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  padding: 0;
}

.add-popup__button {
  width: 150px;
  height: 32px;
  background-color: #00a11e;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
}

.add-popup__button:hover {
  background-color: #007e17;
}
</style>