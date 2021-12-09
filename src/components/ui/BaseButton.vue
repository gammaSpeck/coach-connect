<template>
  <button v-if="!link" :class="mode">
    <slot />
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({ name: "BaseButton" })
export default class BaseButton extends Vue {
  @Prop({ type: Boolean, default: false }) link!: boolean;
  @Prop({ type: String, default: "/" }) to!: string;
  /** This is just the class to add to the parent button or router-link tag */
  @Prop({ type: String, default: "" }) mode!: "flat" | "outline";
}
</script>

<style scoped lang="scss">
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;

  &:hover,
  &:active {
    background-color: #270041;
    border-color: #270041;
  }
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;

  &:hover,
  &:active {
    background-color: #edd2ff;
  }
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;

  &:hover,
  &:active {
    background-color: #edd2ff;
  }
}
</style>
