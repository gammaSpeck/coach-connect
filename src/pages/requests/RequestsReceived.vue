<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <base-card>
        <header>
          <h2>Requests received</h2>
        </header>

        <base-spinner v-if="loading"></base-spinner>

        <ul v-else-if="hasRequests">
          <RequestItem
            v-for="r in receivedRequests"
            :key="r.id"
            :email="r.userEmail"
            :message="r.message"
          />
        </ul>

        <h3 v-else>You haven't received any requests yet</h3>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
import RequestItem from "@/components/requests/RequestItem.vue";
import { requestsModule } from "@/store";
import { Options, Vue } from "vue-class-component";

@Options({ name: "RequestsReceived", components: { RequestItem } })
export default class RequestsReceived extends Vue {
  loading = false;
  error: null | string = null;

  get receivedRequests() {
    return requestsModule.userRequests;
  }

  get hasRequests() {
    return requestsModule.hasRequests;
  }

  created() {
    this.loadRequests();
  }

  async loadRequests() {
    this.loading = true;
    try {
      await requestsModule.loadRequests();
    } catch (e: any) {
      this.error = e.message ?? "Something went wrong";
    } finally {
      this.loading = false;
    }
  }

  handleError() {
    this.error = null;
  }
}
</script>

<style scoped lang="scss">
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
