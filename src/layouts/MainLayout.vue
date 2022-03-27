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

<script>
import Navbar from "../components/app/Navbar.vue";
import Sidebar from "../components/app/Sidebar.vue";

export default {
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    } else console.log("mounted fetchInfo");
  },
  data() {
    return {
      isOpen: true,
    };
  },
  components: { Sidebar, Navbar },
};
</script>

<style>
</style>