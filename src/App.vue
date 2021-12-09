<template>
  <TheHeader />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"> </component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TheHeader from "./components/Layout/TheHeader.vue";
import { authModule } from "./store";

@Options({ name: "App", components: { TheHeader } })
export default class App extends Vue {
  created() {
    authModule.tryAutoLogin();
  }

  get didAutoLogout() {
    return authModule.didAutoLogout;
  }

  @Watch("didAutoLogout")
  didAutoLogoutChanged(currVal: boolean, oldVal: boolean) {
    if (!currVal || currVal === oldVal) return;
    this.$router.replace("/coaches");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
