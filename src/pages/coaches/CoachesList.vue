<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"> Refresh </base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">
            Login to register as a coach
          </base-button>

          <base-button v-if="isLoggedIn && !isCoach && !loading" link to="/register">
            Register
          </base-button>
        </div>

        <div v-if="loading">
          <base-spinner />
        </div>

        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="c in filteredCoaches"
            :key="c.id"
            :areas="c.areas"
            :description="c.description"
            :firstName="c.firstName"
            :lastName="c.lastName"
            :id="c.id"
            :rate="c.hourlyRate"
          />
        </ul>

        <h3 v-else>No Coaches Found</h3>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";
import { authModule, coachesModule } from "@/store";
import { Options, Vue } from "vue-class-component";

@Options({ name: "CoachesList", components: { CoachItem, CoachFilter } })
export default class CoachesList extends Vue {
  loading = false;
  error: null | string = null;

  activeFilters: CoachFilter["filters"] = {
    frontend: true,
    backend: true,
    career: true
  };

  get filteredCoaches() {
    return coachesModule.coaches.filter((c) => {
      return (
        (this.activeFilters.frontend && c.areas.includes("frontend")) ||
        (this.activeFilters.backend && c.areas.includes("backend")) ||
        (this.activeFilters.career && c.areas.includes("career"))
      );
    });
  }

  get hasCoaches() {
    return coachesModule.hasCoaches && !this.loading;
  }

  get isLoggedIn() {
    return authModule.isAuthenticated;
  }

  get isCoach() {
    return coachesModule.isCoach;
  }

  created() {
    this.loadCoaches();
  }

  setFilters(updatedFilters: CoachFilter["filters"]) {
    this.activeFilters = updatedFilters;
  }

  async loadCoaches(forceRefresh = false) {
    this.loading = true;
    try {
      await coachesModule.loadCoaches(forceRefresh);
    } catch (e: any) {
      this.error = e.message ?? "Something went wrong";
    } finally {
      this.loading = false;
    }
  }

  handleError() {
    this.error = null;
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
