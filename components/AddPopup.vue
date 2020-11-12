<template>
  <div class="add-popup" v-on:click.self="$emit('close-popup')">
    <form class="add-popup__form">
      <img
        class="add-popup__close-icon"
        src="../assets/images/close.svg"
        alt="close-icon"
        v-on:click="$emit('close-popup')"
      />
      <fieldset>
        <input
          type="text"
          name="name"
          placeholder="Фамилия и Имя"
          v-model="newEmployee.name"
        />
        <span class="add-popup__error-message" v-show="!validation.name"
          >Введите фамилию и имя</span
        >
      </fieldset>
      <fieldset>
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          v-model="newEmployee.phone"
        />
        <span class="add-popup__error-message" v-show="!validation.phone"
          >Введите телефон в формате +7 (ххх) ххх-хххх</span
        >
      </fieldset>
      <fieldset>
        <input
          type="text"
          name="birthday"
          class="add-popup__input"
          placeholder="Дата рожд."
          v-model="newEmployee.birthday"
        />
        <span class="add-popup__error-message" v-show="!validation.birthday"
          >Введите дату в формате ДД.ММ.ГГГГ</span
        >
      </fieldset>
      <fieldset>
        <label for="role">Должность:</label>
        <select name="role" v-model="newEmployee.role">
          <option
            v-for="(item, index) in $store.getters.getRoles"
            v-bind:key="index"
            v-bind:value="item"
          >
            {{ item }}
          </option>
        </select>
        <span class="add-popup__error-message" v-show="!validation.role"
          >Выберите должность</span
        >
      </fieldset>
      <button
        class="add-popup__button"
        v-on:click.prevent="$emit('add-new', newEmployee)"
        v-bind:disabled="formValidity"
      >
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
import { regexpName, regexpPhone, regexpDate } from "../assets/constants.js";

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
    validation() {
      return {
        name: regexpName.test(this.newEmployee.name),
        phone: regexpPhone.test(this.newEmployee.phone),
        birthday: regexpDate.test(this.newEmployee.birthday),
        role: this.newEmployee.role !== "",
      };
    },
    formValidity() {
      const values = Object.values(this.validation);
      return values.some((item) => item === false);
    },
  },
  created() {
    const numberOfItems = this.$store.state.employees.length;
    this.newEmployee.id = this.$store.state.employees[numberOfItems - 1].id;
  },
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

.add-popup__form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 430px;
  min-height: 430px;
  padding: 30px;
  background-color: white;
  border-radius: 4px;
  text-align: center;
}

.add-popup input {
  width: 300px;
  height: 30px;
  padding-left: 5px;
  margin-left: 20px;
}

.add-popup select {
  width: 180px;
  height: 30px;
  margin-top: 10px;
  box-sizing: content-box;
}

.add-popup__form fieldset {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: none;
  padding: 0;
}

.add-popup__button {
  width: 250px;
  height: 50px;
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

.add-popup__button:disabled {
  background-color: #a9a9a9;
}

.add-popup__close-icon {
  position: absolute;
  top: -27px;
  right: -27px;
  cursor: pointer;
}

.add-popup__error-message {
  font-size: 16px;
  color: red;
}
</style>