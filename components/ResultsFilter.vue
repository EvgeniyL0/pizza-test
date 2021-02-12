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
            @change="$emit('change-sort', sort)"
          />
          <span>Имя</span>
        </label>
        <label class="filter__custom-radio">
          <input
            type="radio"
            name="sort"
            value="birthday"
            v-model="sort"
            @change="$emit('change-sort', sort)"
          />
          <span>Дата рожд.</span>
        </label>
      </fieldset>
      <fieldset>
        <label for="role">Должность:</label>
        <select
          name="role"
          class="filter__select"
          v-model="role"
          @change="$emit('change-role', role)"
        >
          <option
            v-for="(item, index) in $store.getters.getRoles"
            :key="index"
            :value="item"
          >{{ item }}</option>
        </select>
      </fieldset>
      <fieldset>
        <label class="filter__custom-checkbox">
          <input
            type="checkbox"
            name="status"
            v-model="isArchive"
            @change="$emit('change-status', isArchive)"
          />
          <span>В архиве</span>
        </label>
      </fieldset>
      <fieldset>
        <button type="button" class="filter__button" @click="openPopup = true">
          <img src="../assets/images/person-plus.svg" alt />
        </button>
      </fieldset>
    </form>
    <add-popup
      v-if="openPopup"
      @add-new="addNewEmployee"
      @close-popup="closePopup"
      :loading="showLoader"
    />
  </div>
</template>

<script>
import AddPopup from "../components/AddPopup.vue";
import ServerError from "../components/ServerError.vue";

export default {
  components: {
    AddPopup,
    ServerError
  },
  data() {
    return {
      sort: "name",
      role: "all",
      isArchive: false,
      openPopup: false,
      showLoader: false,
      error: false
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
        .catch(err => {
          this.showLoader = false;
          this.error = true;
          newEmployee.id -= 1;
        });
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/blocks/button", "assets/styles/blocks/input";

.filter {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;

  @media screen and (max-width: 580px) {
    margin-bottom: 10px;
  }
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
  fieldset {
    padding: 0;
    border: none;

    @media screen and (max-width: 580px) {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.filter__custom-radio {
  cursor: pointer;
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  span {
    display: inline-block;
    margin-left: 5px;
    text-align: center;
    border-radius: 2px;

    @media screen and (max-width: 768px) {
      margin-left: 3px;
    }
  }
  input:checked + span {
    font-weight: bold;
  }
}

.filter__custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    margin-right: 8px;
    border: 1px solid #d1d5db;
    border-radius: 2px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  input:checked + span::before {
    background-color: #2563eb;
    background-image: url("../assets/images/checked.svg");
    border: none;
  }
}

.filter__select {
  @extend .input;
  width: 90px;
  margin-left: 10px;
  box-sizing: content-box;
}

.filter__button {
  @extend .button;
  width: 50px;
  height: 30px;

  @media screen and (max-width: 768px) {
    width: 50px;
  }
}
</style>