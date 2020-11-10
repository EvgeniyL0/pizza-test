<template>
  <table>
    <thead>
      <tr>
        <th>Сотрудник</th>
        <th>Должность</th>
        <th>Дата рождения</th>
        <th>Телефон</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" v-bind:key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.role }}</td>
        <td>{{ item.birthday }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.isArchive }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["list"]
}
</script>