<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>
        This page could not be found - maybe check out all our
        <router-link to="/coaches">coaches</router-link>.
      </p>
    </base-card>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({ name: "NotFound" })
export default class NotFound extends Vue {}
</script>

<style scoped lang="scss"></style>
