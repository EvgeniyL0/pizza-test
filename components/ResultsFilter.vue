<template>
  <form>
    <fieldset>
      <span>Сортировка по:</span>
      <label>
        Имя
        <input
          type="radio"
          name="sort"
          value="name"
          checked
          v-model="sort"
          v-on:change="$emit('change-sort', sort)"
        />
      </label>
      <label>
        Дата рождения
        <input
          type="radio"
          name="sort"
          value="birthday"
          v-model="sort"
          v-on:change="$emit('change-sort', sort)"
        />
      </label>
    </fieldset>
    <fieldset>
      <label for="role">Должность</label>
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
      <label for="status">В архиве</label>
      <input
        type="checkbox"
        name="status"
        v-model="isArchive"
        v-on:change="$emit('change-status', isArchive)"
      />
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      sort: "name",
      role: "all",
      isArchive: false,
    };
  },
};
</script>