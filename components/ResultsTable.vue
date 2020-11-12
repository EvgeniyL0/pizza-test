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
      <tr class="results-table__row" v-for="item in list" v-bind:key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.role }}</td>
        <td>{{ item.birthday }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.isArchive }}</td>
        <td>
          <nuxt-link v-bind:to="`/employees/${item.id}`">
            <img src="../assets/images/edit.svg" alt="edit-icon" />
          </nuxt-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["list"],
};
</script>

<style>
.results-table {
  width: 80%;
  margin: auto;
  text-align: center;
  border-collapse: collapse;
}

.results-table thead th {
  border-bottom: 1px solid #ededed;
}

.results-table__row {
  height: 50px;
}

.results-table__row:nth-child(even) {
  background-color: #f8f9fa;
}
</style>