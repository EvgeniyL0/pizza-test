<template>
  <table class="results-table">
    <thead>
      <tr class="results-table__row">
        <th>Имя</th>
        <th>Должность</th>
        <th>Дата рожд.</th>
        <th>Телефон</th>
        <th>В архиве</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr class="results-table__row" v-for="item in list" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.role }}</td>
        <td>{{ item.birthday }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.isArchive ? "да" : "нет" }}</td>
        <td>
          <nuxt-link :to="`/employees/${item.id}`">
            <img src="../assets/images/edit.svg" alt="edit-icon" />
          </nuxt-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="scss">
.results-table {
  width: 80%;
  margin: auto;
  text-align: center;
  border-collapse: collapse;
  thead {
    th {
      border-bottom: 1px solid #d1d5db;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
}

.results-table__row {
  height: 50px;
  &:nth-child(even) {
    background-color: #eff6ff;
  }
}
</style>