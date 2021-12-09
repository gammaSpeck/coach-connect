<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>

    <div class="areas">
      <base-badge v-for="a in areas" :key="a" :type="a" :title="a" />
    </div>

    <div class="actions">
      <base-button link mode="outline" :to="contactLink">Contact</base-button>
      <base-button link :to="detailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({ name: "CoachItem" })
export default class CoachItem extends Vue {
  @Prop({ required: true, type: String }) id!: string;
  @Prop({ required: true, type: String }) firstName!: string;
  @Prop({ required: true, type: String }) lastName!: string;
  @Prop({ required: true, type: String }) description!: string;
  @Prop({ required: true, type: Number }) rate!: number;
  @Prop({ required: true, type: Array }) areas!: string[];

  get fullName() {
    return this.firstName + " " + this.lastName;
  }

  get detailsLink() {
    return `${this.$route.path}/${this.id}`;
  }

  get contactLink() {
    return `${this.detailsLink}/contact`;
  }
}
</script>

<style scoped lang="scss">
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
