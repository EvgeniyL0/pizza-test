<template>
  <div class="profile">
    <server-error v-if="error" />
    <form class="profile__form" @submit.prevent="updateData">
      <input
        type="text"
        name="name"
        class="profile__input"
        v-model="employee.name"
      />
      <span
        :class="[
          'profile__error-message',
          { 'profile__error-message_show': !validation.name },
        ]"
        >Введите фамилию и имя</span
      >
      <input
        type="text"
        name="phone"
        class="profile__input"
        v-model="employee.phone"
      />
      <span
        :class="[
          'profile__error-message',
          { 'profile__error-message_show': !validation.phone },
        ]"
        >Введите телефон в формате +7 (ххх) ххх-хххх</span
      >
      <input
        type="text"
        name="birthday"
        class="profile__input"
        v-model="employee.birthday"
      />
      <span
        :class="[
          'profile__error-message',
          { 'profile__error-message_show': !validation.birthday },
        ]"
        >Введите дату в формате ДД.ММ.ГГГГ</span
      >
      <select name="role" class="profile__select" v-model="employee.role">
        <option v-for="(item, index) in roles" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
      <label class="profile__custom-checkbox">
        <input type="checkbox" name="status" v-model="employee.isArchive" />
        <span>В архиве</span>
      </label>
      <fieldset>
        <button
          class="profile__button"
          type="submit"
          :disabled="notValid || loading"
        >
          <loader v-if="loading" />
          <span v-else>Сохранить</span>
        </button>
        <button class="profile__button" @click.prevent="$router.push('/')">
          Отмена
        </button>
      </fieldset>
    </form>
    <img
      src="../../assets/images/avatar.png"
      alt="employee-avatar"
      class="profile__avatar"
    />
  </div>
</template>

<script>
import { regexpName, regexpPhone, regexpDate } from "../../assets/constants.js";
import Loader from "../../components/Loader.vue";
import ServerError from "../../components/ServerError.vue";

export default {
  components: {
    Loader,
    ServerError,
  },
  data() {
    return {
      employee: {},
      roles: [],
      loading: false,
      error: false,
    };
  },
  computed: {
    validation() {
      return {
        name: regexpName.test(this.employee.name),
        phone: regexpPhone.test(this.employee.phone),
        birthday: regexpDate.test(this.employee.birthday),
      };
    },
    notValid() {
      const values = Object.values(this.validation);
      return values.some((item) => item === false);
    },
  },
  methods: {
    updateData() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("editItem", this.employee)
        .then(() => {
          this.loading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          this.error = true;
          this.loading = false;
        });
    },
  },
  created() {
    if (this.$store.state.employees.length !== 0) {
      Object.assign(
        this.employee,
        this.$store.getters.getEmployee(this.$route.params.id)
      );
      this.roles = this.$store.getters.getRoles.slice();
      localStorage.setItem("employee", JSON.stringify(this.employee));
      localStorage.setItem("roles", JSON.stringify(this.roles));
    } else {
      this.employee = JSON.parse(localStorage.getItem("employee"));
      this.roles = JSON.parse(localStorage.getItem("roles"));
    }
  },
};
</script>

<style lang="scss">
@import "assets/styles/blocks/button.scss",
  "assets/styles/blocks/form-input.scss",
  "assets/styles/blocks/form-checkbox.scss", "assets/styles/variables";

.profile {
  width: 70%;
  margin-left: auto;
  margin-top: 80px;
  margin-right: auto;
  display: flex;
  justify-content: center;
  font-family: $fonts;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 625px) {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
}

.profile__avatar {
  width: 128px;
  height: 128px;
  object-fit: cover;
  margin-left: 20px;
  margin-top: 20px;

  @media screen and (max-width: 625px) {
    order: 0;
    margin: 0;
  }
}

.profile__form {
  position: relative;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  fieldset {
    display: flex;
    justify-content: space-between;
    width: 90%;
    border: none;
    padding: 0;
  }

  @media screen and (max-width: 625px) {
    order: 1;
  }
}

.profile__input {
  @extend %form-input;
  min-width: 250px;
  height: 30px;
  margin-top: 25px;
}

.profile__select {
  @extend %form-input;
  min-width: 180px;
  height: 30px;
  margin-left: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
}

.profile__custom-checkbox {
  @extend %form-checkbox;
  margin-bottom: 25px;
}

.profile__button {
  @extend %button;
  width: 100px;
  height: 40px;
}

.profile__error-message {
  display: block;
  font-size: 16px;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
}

.profile__error-message_show {
  @extend .profile__error-message;
  color: #ef4444;
}
</style>