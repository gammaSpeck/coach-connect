<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>

        <!-- For child routes to be rendered -->
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge v-for="a in areas" :key="a" :type="a" :title="a" />
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import { coachesModule } from "@/store";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({ name: "CoachDetails" })
export default class CoachDetails extends Vue {
  @Prop({ required: true, type: String }) id!: string;

  get selectedCoach() {
    return coachesModule.coaches.find((c) => c.id === this.id) ?? null;
  }

  get fullName() {
    return this.selectedCoach?.firstName + " " + this.selectedCoach?.lastName;
  }

  get contactLink() {
    return `${this.$route.path}/contact`;
  }

  get areas() {
    return this.selectedCoach?.areas ?? [];
  }

  get rate() {
    return this.selectedCoach?.hourlyRate;
  }

  get description() {
    return this.selectedCoach?.description;
  }
}
</script>

<style scoped></style>
