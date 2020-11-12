<template>
  <div class="root">
    <results-filter
      v-on:change-sort="sortBy = $event"
      v-on:change-role="role = $event"
      v-on:change-status="isArchive = $event"
    />
    <results-table v-bind:list="employees" />
  </div>
</template>

<script>
import { getDateFromStr } from "../assets/utils.js";
import ResultsFilter from "../components/ResultsFilter";
import ResultsTable from "../components/ResultsTable";

export default {
  components: {
    ResultsFilter,
    ResultsTable,
  },
  data() {
    return {
      sortBy: "name",
      role: "all",
      isArchive: false,
    };
  },
  computed: {
    employees() {
      let results = [];

      if (this.role === "all") {
        results = this.$store.state.employees.filter((item) => {
          return item.isArchive === this.isArchive;
        });
      } else {
        results = this.$store.state.employees.filter((item) => {
          return item.role === this.role && item.isArchive === this.isArchive;
        });
      }

      if (this.sortBy === "name") {
        return results.sort((a, b) => {
          if (a[this.sortBy] < b[this.sortBy]) return -1;
          if (a[this.sortBy] > b[this.sortBy]) return 1;
        });
      } else {
        return results.sort((a, b) => {
          return (
            getDateFromStr(a[this.sortBy]) - getDateFromStr(b[this.sortBy])
          );
        });
      }
    },
  },
  created() {
    this.$store.dispatch("copyItemsToStore");
  },
};
</script>

<style>
.root {
  font-family: "Source Sans Pro", sans-serif;
}
</style>