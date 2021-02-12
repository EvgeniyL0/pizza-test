<template>
  <div class="root">
    <p class="state state_loading" v-if="$fetchState.pending">Loading...</p>
    <p class="state state_error" v-else-if="$fetchState.error">An error occurred, reload page</p>
    <div class="results" v-else>
      <results-filter
        @change-sort="sortBy = $event"
        @change-role="role = $event"
        @change-status="isArchive = $event"
      />
      <results-table :list="employees" />
    </div>
  </div>
</template>

<script>
import { getDateFromStr } from "../assets/utils.js";
import ResultsFilter from "../components/ResultsFilter";
import ResultsTable from "../components/ResultsTable";

export default {
  components: {
    ResultsFilter,
    ResultsTable
  },
  data() {
    return {
      sortBy: "name",
      role: "all",
      isArchive: false
    };
  },
  computed: {
    employees() {
      let results = [];

      if (this.role === "all") {
        results = this.$store.state.employees.filter(item => {
          return item.isArchive === this.isArchive;
        });
      } else {
        results = this.$store.state.employees.filter(item => {
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
    }
  },
  async fetch() {
    await this.$store.dispatch("copyItemsToStore");
  }
};
</script>

<style lang="scss">
@import "assets/styles/variables";

.root {
  min-height: 100vh;
  font-family: $fonts;
}

.state {
  margin-top: 50px;
  text-align: center;
}
</style>