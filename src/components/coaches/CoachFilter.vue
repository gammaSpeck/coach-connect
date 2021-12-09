<template>
  <base-card>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Emit } from "vue-property-decorator";

@Options({ name: "CoachFilter" })
export default class CoachFilter extends Vue {
  filters = {
    frontend: true,
    backend: true,
    career: true
  };

  @Emit("change-filter")
  setFilter(event: Event) {
    const { id, checked } = event.target as HTMLInputElement;
    this.filters = { ...this.filters, [id]: checked };

    return this.filters;
  }
}
</script>

<style scoped lang="scss">
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;

  label,
  input {
    vertical-align: middle;
  }

  label {
    margin-left: 0.25rem;
  }

  &.active {
    label {
      font-weight: bold;
    }
  }
}
</style>
