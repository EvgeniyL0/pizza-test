<template>
  <div class="profile">
    <server-error v-if="error" />
    <form class="profile__form" v-on:submit.prevent="updateData">
      <input type="text" name="name" v-model="employee.name" />
      <span class="profile__input-error-message" v-show="!validation.name">Введите фамилию и имя</span>
      <input type="text" name="phone" v-model="employee.phone" />
      <span
        class="profile__input-error-message"
        v-show="!validation.phone"
      >Введите телефон в формате +7 (ххх) ххх-хххх</span>
      <input type="text" name="birthday" v-model="employee.birthday" />
      <span
        class="profile__input-error-message"
        v-show="!validation.birthday"
      >Введите дату в формате ДД.ММ.ГГГГ</span>
      <select name="role" v-model="employee.role">
        <option v-for="(item, index) in roles" v-bind:key="index" v-bind:value="item">{{ item }}</option>
      </select>
      <label class="profile__custom-checkbox">
        <input type="checkbox" name="status" v-model="employee.isArchive" />
        <span>В архиве</span>
      </label>
      <fieldset>
        <button class="profile__button" type="submit" v-bind:disabled="notValid">
          <loader v-if="loading" />
          <p class="profile__button-label" v-else>Сохранить</p>
        </button>
        <button class="profile__button" v-on:click.prevent="$router.push('/')">Отмена</button>
      </fieldset>
    </form>
    <img src="../../assets/images/avatar.png" alt="employee-avatar" class="profile__avatar" />
  </div>
</template>

<script>
import { regexpName, regexpPhone, regexpDate } from "../../assets/constants.js";
import Loader from "../../components/Loader.vue";
import ServerError from "../../components/ServerError.vue";

export default {
  components: {
    Loader,
    ServerError
  },
  data() {
    return {
      employee: {},
      roles: [],
      loading: false,
      error: false
    };
  },
  computed: {
    validation() {
      return {
        name: regexpName.test(this.employee.name),
        phone: regexpPhone.test(this.employee.phone),
        birthday: regexpDate.test(this.employee.birthday)
      };
    },
    notValid() {
      const values = Object.values(this.validation);
      return values.some(item => item === false);
    }
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
        .catch(err => {
          this.error = true;
          this.loading = false;
        });
    }
  },
  created() {
    if (this.$store.state.employees.length !== 0) {
      Object.assign(this.employee, this.$store.getters.getEmployee(this.$route.params.id));
      this.roles = this.$store.getters.getRoles.slice();
      localStorage.setItem("employee", JSON.stringify(this.employee));
      localStorage.setItem("roles", JSON.stringify(this.roles));
    } else {
      this.employee = JSON.parse(localStorage.getItem("employee"));
      this.roles = JSON.parse(localStorage.getItem("roles"));
    }
  }
};
</script>

<style>
.profile {
  width: 70%;
  margin-left: auto;
  margin-top: 80px;
  margin-right: auto;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.profile__avatar {
  width: 128px;
  height: 128px;
  object-fit: cover;
  margin-left: 20px;
  margin-top: 20px;
}

.profile__form {
  position: relative;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile input {
  min-width: 250px;
  height: 30px;
  padding-left: 5px;
  margin-top: 25px;
}

.profile select {
  min-width: 180px;
  height: 30px;
  margin-left: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
  box-sizing: content-box;
}

.profile__form fieldset {
  display: flex;
  justify-content: space-between;
  width: 90%;
  border: none;
  padding: 0;
}

.profile__custom-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 25px;
}

.profile__custom-checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.profile__custom-checkbox > span::before {
  content: "";
  display: inline-block;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  border: 1px solid #a9a9a9;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.profile__custom-checkbox > input:checked + span::before {
  background-color: #00a11e;
  background-image: url("../../assets/images/checked.svg");
  border: none;
}

.profile__button {
  width: 100px;
  height: 40px;
  background-color: #00a11e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.profile__button:hover {
  background-color: #007e17;
}

.profile__button:disabled {
  background-color: #a9a9a9;
}

.profile__button-label {
  margin: 0;
}

.profile__input-error-message {
  display: block;
  font-size: 16px;
  color: red;
}

@media screen and (max-width: 768px) {
  .profile {
    font-size: 14px;
  }

  .profile__input-error-message {
    font-size: 14px;
  }
}

@media screen and (max-width: 625px) {
  .profile {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

  .profile__form {
    order: 1;
  }

  .profile__avatar {
    order: 0;
    margin: 0;
  }
}
</style>