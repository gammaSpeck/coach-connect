<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }} </a>
    </div>

    <p>{{ message }}</p>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({ name: "RequestItem" })
export default class RequestItem extends Vue {
  @Prop({ required: true, type: String }) email!: string;
  @Prop({ required: true, type: String }) message!: string;

  get emailLink() {
    return `mailto:${this.email}`;
  }
}
</script>

<style scoped lang="scss">
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;

  &:hover,
  &:active {
    color: #8d007a;
  }
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
