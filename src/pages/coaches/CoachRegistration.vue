<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </base-card>
  </section>
</template>

<script lang="ts">
import { NewCoachFormData } from "@/interfaces";
import { coachesModule } from "@/store";
import { Options, Vue } from "vue-class-component";
import CoachForm from "./CoachForm.vue";

@Options({ name: "CoachRegistration", components: { CoachForm } })
export default class CoachRegistration extends Vue {
  saveData(formData: NewCoachFormData) {
    coachesModule.registerCoach(formData);
    this.$router.replace("/coaches");
  }
}
</script>

<style scoped lang="scss"></style>
