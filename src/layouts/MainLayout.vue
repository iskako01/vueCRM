<template>
  <div class="app-main-layout">
    <navbar @open="isOpen = !isOpen" />
    <sidebar :isOpen="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Navbar from "../components/app/Navbar.vue";
import Sidebar from "../components/app/Sidebar.vue";

export default defineComponent({
  components: { Sidebar, Navbar },
  setup() {
    const store = useStore();
    const isOpen = ref(true);

    onMounted(async () => {
      if (!Object.keys(store.getters.info).length) {
        await store.dispatch("fetchInfo");
      } else console.log("mounted fetchInfo");
    });
    return {};
  },
});
</script>

<style></style>
