<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: firstName.err }">
      <label for="firstName">First name</label>
      <input type="text" id="firstName" v-model.trim="firstName.val" />
      <p v-if="firstName.err">Invalid</p>
    </div>

    <div class="form-control" :class="{ invalid: lastName.err }">
      <label for="lastName">Last name</label>
      <input type="text" id="lastName" v-model.trim="lastName.val" />
      <p v-if="lastName.err">Invalid</p>
    </div>

    <div class="form-control" :class="{ invalid: description.err }">
      <label for="description">Description</label>
      <textarea id="description" v-model.trim="description.val" rows="5" />
      <p v-if="description.err">Invalid</p>
    </div>

    <div class="form-control" :class="{ invalid: rate.err }">
      <label for="rate">Hourly rate</label>
      <input type="number" id="rate" v-model.number="rate.val" />
      <p v-if="rate.err">Invalid</p>
    </div>

    <div class="form-control" :class="{ invalid: areas.err }">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" />
        <label for="frontend">Front end</label>
      </div>

      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" />
        <label for="backend">Back end</label>
      </div>

      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" />
        <label for="career">Career Advisory</label>
      </div>

      <p v-if="areas.err">At least one expertise must be selected</p>
    </div>

    <p v-if="!isFormValid">Please fix above Errors</p>
    <base-button>Register</base-button>
  </form>
</template>

<script lang="ts">
import { NewCoachFormData } from "@/interfaces";
import { Options, Vue } from "vue-class-component";
import { Emit, Watch } from "vue-property-decorator";

interface FormField<T> {
  val: T;
  err: boolean;
  validate(v: T): boolean;
}

type FieldNames = "firstName" | "lastName" | "description" | "rate" | "areas";

@Options({ name: "CoachForm" })
export default class CoachForm extends Vue {
  firstName: FormField<string> = { val: "", err: false, validate: (v) => !!v };
  lastName: FormField<string> = { val: "", err: false, validate: (v) => !!v };
  description: FormField<string> = { val: "", err: false, validate: (v) => !!v };
  rate: FormField<null | number> = {
    val: null,
    err: false,
    validate: (v) => {
      if (!v) return false;
      return v >= 0;
    }
  };
  areas: FormField<string[]> = { val: [], err: false, validate: (v) => !!v.length };

  isFormValid = true;

  @Watch("firstName.val")
  firstNameChanged(val: string) {
    this.firstName.err = !this.firstName.validate(val);
  }
  @Watch("lastName.val")
  lastNameChanged(val: string) {
    this.lastName.err = !this.lastName.validate(val);
  }
  @Watch("description.val")
  descChanged(val: string) {
    this.description.err = !this.description.validate(val);
  }
  @Watch("rate.val")
  rateChanged(val: number) {
    this.rate.err = !this.rate.validate(val);
  }
  @Watch("areas.val")
  areasChanged(val: string[]) {
    this.areas.err = !this.areas.validate(val);
  }

  validateField(key: FieldNames) {
    this[key].err = !(this[key] as FormField<any>).validate(this[key].val);
    if (this[key].err) this.isFormValid = false;
  }

  validateForm() {
    this.isFormValid = true;
    const fields: FieldNames[] = ["firstName", "lastName", "description", "rate", "areas"];
    fields.forEach((f) => this.validateField(f));
  }

  submitForm() {
    this.validateForm();
    if (!this.isFormValid) return;

    const data = {
      firstName: this.firstName.val,
      lastName: this.lastName.val,
      description: this.description.val,
      rate: this.rate.val as number,
      areas: this.areas.val
    };

    this.saveData(data);
  }

  @Emit("save-data")
  saveData(data: NewCoachFormData) {
    return data;
  }
}
</script>

<style scoped lang="scss">
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
