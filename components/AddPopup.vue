<template>
  <div class="add-popup">
    <form class="add-popup__form" v-on:submit.prevent="checkValidation">
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
          placeholder="Фамилия Имя"
          v-model="newEmployee.name"
          v-on:input.once="firstLoad = false"
        />
        <span class="add-popup__error-message" v-show="!validation.name">Введите фамилию и имя</span>
      </fieldset>
      <fieldset>
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          v-model="newEmployee.phone"
          v-on:input.once="firstLoad = false"
        />
        <span
          class="add-popup__error-message"
          v-show="!validation.phone"
        >Введите телефон в формате +7 (ххх) ххх-хххх</span>
      </fieldset>
      <fieldset>
        <input
          type="text"
          name="birthday"
          class="add-popup__input"
          placeholder="Дата рождения"
          v-model="newEmployee.birthday"
          v-on:input.once="firstLoad = false"
        />
        <span
          class="add-popup__error-message"
          v-show="!validation.birthday"
        >Введите дату в формате ДД.ММ.ГГГГ</span>
      </fieldset>
      <fieldset>
        <label for="role">Должность:</label>
        <select name="role" v-model="newEmployee.role">
          <option
            v-for="(item, index) in $store.getters.getRoles"
            v-bind:key="index"
            v-bind:value="item"
          >{{ item }}</option>
        </select>
        <span class="add-popup__error-message" v-show="!validation.role">Выберите должность</span>
      </fieldset>
      <button class="add-popup__button" type="submit" v-bind:disabled="notValid">
        <loader v-if="loading" />
        <p v-else>Добавить</p>
      </button>
    </form>
  </div>
</template>

<script>
import { regexpName, regexpPhone, regexpDate } from "../assets/constants.js";
import Loader from "../components/Loader.vue";

export default {
  components: {
    Loader
  },
  props: ["loading"],
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
    notValid() {
      const values = Object.values(this.validation);
      return values.some(item => item === false);
    }
  },
  methods: {
    checkValidation() {
      if (!this.notValid) {
        this.$emit("add-new", this.newEmployee);
      }
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

.add-popup__form fieldset {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 0;
}

.add-popup input {
  width: 300px;
  height: 30px;
  padding-left: 5px;
}

.add-popup select {
  width: 180px;
  height: 30px;
  margin-top: 10px;
  box-sizing: content-box;
}

.add-popup__button {
  width: 230px;
  height: 50px;
  background-color: #00a11e;
  color: white;
  border: none;
  border-radius: 6px;
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

@media screen and (max-width: 768px) {
  .add-popup__form {
    width: 350px;
  }
}

@media screen and (max-width: 580px) {
  .add-popup__form {
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
  }

  .add-popup input {
    width: 230px;
  }

  .add-popup__error-message {
    font-size: 14px;
  }

  .add-popup__button {
    width: 200px;
  }

  .add-popup__close-icon {
    top: -20px;
    right: -20px;
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 425px) {
  .add-popup__form {
    width: 280px;
  }
}
</style>