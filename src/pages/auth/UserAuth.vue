<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog fixed :show="loading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" autocomplete="off" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!isFormValid">
          Please enter valid email & password. Must be at least 6 chars long
        </p>

        <base-button>{{ submitBtnCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeBtnCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import { authModule } from "@/store";
import { Options, Vue } from "vue-class-component";

type AuthMode = "login" | "signup";

@Options({ name: "UserAuth" })
export default class UserAuth extends Vue {
  loading = false;
  error = null;

  email = "";
  password = "";

  isFormValid = true;

  mode: AuthMode = "login";

  get submitBtnCaption() {
    return this.mode === "login" ? "Login" : "Signup";
  }
  get switchModeBtnCaption() {
    return this.mode === "signup" ? "Login instead" : "Signup instead";
  }

  validateForm() {
    this.isFormValid = true;
    if (!this.email || !this.email.includes("@") || this.password.length < 6) {
      this.isFormValid = false;
    }
  }

  async submitForm() {
    this.validateForm();
    if (!this.isFormValid) return;

    const params = { email: this.email, password: this.password };

    this.loading = true;

    try {
      this.mode === "login" ? await authModule.login(params) : await authModule.signup(params);

      const redirectURL = `/${this.$route.query.redirect || "coaches"}`;
      this.$router.replace(redirectURL);
    } catch (err: any) {
      this.error = err.message ?? "Failed to signup user";
    } finally {
      this.loading = false;
    }
  }

  switchAuthMode() {
    this.mode = this.mode === "login" ? "signup" : "login";
  }

  handleError() {
    this.error = null;
  }
}
</script>

<style scoped lang="scss">
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
