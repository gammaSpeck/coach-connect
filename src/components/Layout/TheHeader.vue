<template>
  <header>
    <nav>
      <h1>Find a coach</h1>
      <ul>
        <li>
          <router-link to="/coaches">All Coaches</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>

        <li v-if="isLoggedIn">
          <base-button @click="logout"> Logout </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { authModule } from "@/store";
import { Options, Vue } from "vue-class-component";

@Options({ name: "TheHEader" })
export default class TheHEader extends Vue {
  get isLoggedIn() {
    return authModule.isAuthenticated;
  }

  logout() {
    authModule.logout();
    this.$router.replace("/coaches");
  }
}
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
  }

  nav {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

a {
  &:active,
  &:hover,
  &.router-link-active {
    border: 1px solid #f391e3;
  }
}

h1 {
  margin: 0;
  color: white;

  a {
    color: white;
    margin: 0;

    &:hover,
    &:active,
    &.router-link-active {
      border: 1px solid #f391e3;
    }
  }
}

li {
  margin: 0 0.5rem;
}
</style>
