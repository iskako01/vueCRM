<template>
  <div class="grey darken-1 empty-layout"><router-view></router-view></div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import messages from "../utils/messages";

export default defineComponent({
  setup() {
    const store = useStore();
    const error = computed(() => {
      return store.getters.error;
    });

    return { error };
  },
  //   watch: {
  //     error(fbError) {
  //       this.$error(messages[fbError.code] || "Что-то пошло не так");
  //     },
  //   },
});
</script>

<style></style>
