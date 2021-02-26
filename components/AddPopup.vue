<template>
  <div class="add-popup">
    <form
      class="add-popup__form"
      @submit.prevent="$emit('add-new', newEmployee)"
      @input.once="needsValidation = true"
    >
      <img
        class="add-popup__close-icon"
        src="../assets/images/close.svg"
        alt="close-icon"
        @click="$emit('close-popup')"
      />
      <fieldset>
        <label for="name">Фамилия Имя:</label>
        <input
          type="text"
          name="name"
          class="add-popup__input"
          v-model="newEmployee.name"
        />
        <span
          :class="[
            'add-popup__error-message',
            {
              'add-popup__error-message_show':
                !validation.name && needsValidation,
            },
          ]"
          >Введите фамилию и имя</span
        >
      </fieldset>
      <fieldset>
        <label for="phone">Телефон:</label>
        <input
          type="tel"
          name="phone"
          class="add-popup__input"
          v-model="newEmployee.phone"
        />
        <span
          :class="[
            'add-popup__error-message',
            {
              'add-popup__error-message_show':
                !validation.phone && needsValidation,
            },
          ]"
          >Введите телефон в формате +7 (ххх) ххх-хххх</span
        >
      </fieldset>
      <fieldset>
        <label for="birthday">Дата рождения:</label>
        <input
          type="text"
          name="birthday"
          class="add-popup__input"
          v-model="newEmployee.birthday"
        />
        <span
          :class="[
            'add-popup__error-message',
            {
              'add-popup__error-message_show':
                !validation.birthday && needsValidation,
            },
          ]"
          >Введите дату в формате ДД.ММ.ГГГГ</span
        >
      </fieldset>
      <fieldset>
        <label for="role">Должность:</label>
        <select
          class="add-popup__select"
          name="role"
          v-model="newEmployee.role"
        >
          <option
            v-for="(item, index) in $store.getters.getRoles.slice(1)"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
        <span
          :class="[
            'add-popup__error-message',
            {
              'add-popup__error-message_show':
                !validation.role && needsValidation,
            },
          ]"
          >Выберите должность</span
        >
      </fieldset>
      <button
        class="add-popup__button"
        type="submit"
        :disabled="notValid || loading"
      >
        <loader v-if="loading" />
        <span v-else>Добавить</span>
      </button>
    </form>
  </div>
</template>

<script>
import { regexpName, regexpPhone, regexpDate } from "../assets/constants.js";
import Loader from "../components/Loader.vue";

export default {
  components: {
    Loader,
  },
  props: {
    loading: Boolean,
  },
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
      needsValidation: false,
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
    notValid() {
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

<style lang="scss">
@import "assets/styles/blocks/button.scss",
  "assets/styles/blocks/form-input.scss";

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
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    padding: 0;
    label {
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 350px;
  }

  @media screen and (max-width: 580px) {
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
  }

  @media screen and (max-width: 425px) {
    width: 280px;
  }
}

.add-popup__input {
  @extend %form-input;
  width: 300px;
  height: 35px;

  @media screen and (max-width: 580px) {
    width: 230px;
  }
}

.add-popup__select {
  @extend %form-input;
  width: 180px;
  height: 35px;
  box-sizing: content-box;
}

.add-popup__error-message {
  font-size: 16px;
  color: white;
  margin-bottom: 15px;

  @media screen and (max-width: 580px) {
    font-size: 14px;
  }
}

.add-popup__error-message_show {
  @extend .add-popup__error-message;
  color: #ef4444;
}

.add-popup__button {
  @extend %button;
  width: 230px;
  height: 50px;
  margin-top: 15px;

  @media screen and (max-width: 580px) {
    width: 200px;
  }
}

.add-popup__close-icon {
  position: absolute;
  top: -27px;
  right: -27px;
  cursor: pointer;

  @media screen and (max-width: 580px) {
    top: -20px;
    right: -20px;
    width: 20px;
    height: 20px;
  }
}
</style>