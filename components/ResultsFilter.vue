<template>
  <div class="filter">
    <server-error v-if="error" />
    <form class="filter__form">
      <fieldset>
        <span>Сортировать по:</span>
        <label class="filter__custom-radio">
          <input
            type="radio"
            name="sort"
            value="name"
            checked
            v-model="sort"
            v-on:change="$emit('change-sort', sort)"
          />
          <span>Имя</span>
        </label>
        <label class="filter__custom-radio">
          <input
            type="radio"
            name="sort"
            value="birthday"
            v-model="sort"
            v-on:change="$emit('change-sort', sort)"
          />
          <span>Дата рожд.</span>
        </label>
      </fieldset>
      <fieldset>
        <label for="role">Должность:</label>
        <select
          name="role"
          v-model="role"
          v-on:change="$emit('change-role', role)"
        >
          <option
            v-for="(item, index) in $store.getters.getRoles"
            v-bind:key="index"
            v-bind:value="item"
          >
            {{ item }}
          </option>
        </select>
      </fieldset>
      <fieldset>
        <label class="filter__custom-checkbox">
          <input
            type="checkbox"
            name="status"
            v-model="isArchive"
            v-on:change="$emit('change-status', isArchive)"
          />
          <span>В архиве</span>
        </label>
      </fieldset>
      <fieldset>
        <button
          type="button"
          class="filter__button"
          v-on:click="openPopup = true"
        >
          +
        </button>
      </fieldset>
    </form>
    <add-popup
      v-if="openPopup"
      v-on:add-new="addNewEmployee"
      v-on:close-popup="closePopup"
      v-bind:loading="showLoader"
    />
  </div>
</template>

<script>
import AddPopup from "../components/AddPopup.vue";
import ServerError from "../components/ServerError.vue";

export default {
  components: {
    AddPopup,
    ServerError,
  },
  data() {
    return {
      sort: "name",
      role: "all",
      isArchive: false,
      openPopup: false,
      showLoader: false,
      error: false,
    };
  },
  methods: {
    closePopup() {
      this.openPopup = false;
      this.error = false;
    },
    addNewEmployee(newEmployee) {
      newEmployee.id += 1;
      this.error = false;
      this.showLoader = true;
      this.$store
        .dispatch("addItem", newEmployee)
        .then(() => {
          this.showLoader = false;
          this.openPopup = false;
        })
        .catch((err) => {
          this.showLoader = false;
          this.error = true;
        });
    },
  },
};
</script>

<style>
.filter {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}

.filter__form {
  width: 80%;
  margin-left: auto;
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter__form fieldset {
  padding: 0;
  border: none;
}

.filter__custom-radio {
  cursor: pointer;
}

.filter__custom-radio > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.filter__custom-radio > span {
  display: inline-block;
  margin-left: 5px;
  text-align: center;
  border-radius: 2px;
}

.filter__custom-radio > input:checked + span {
  font-weight: bold;
}

.filter__custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.filter__custom-checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.filter__custom-checkbox > span::before {
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

.filter__custom-checkbox > input:checked + span::before {
  background-color: #00a11e;
  background-image: url("../assets/images/checked.svg");
  border: none;
}

.filter__button {
  width: 60px;
  height: 30px;
  background-color: #00a11e;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
}

.filter__button:hover {
  background-color: #007e17;
}

@media screen and (max-width: 1024px) {
  .filter__form {
    width: 90%;
  }
}

@media screen and (max-width: 768px) {
  .filter__form {
    font-size: 14px;
  }

  .filter__custom-radio > span {
    margin-left: 3px;
  }

  .filter__button {
    width: 50px;
  }
}

@media screen and (max-width: 580px) {
  .filter {
    margin-bottom: 10px;
  }

  .filter__form {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter__form fieldset {
    margin-bottom: 20px;
  }

  .filter__form fieldset:last-of-type {
    margin-bottom: 0;
  }
}
</style>