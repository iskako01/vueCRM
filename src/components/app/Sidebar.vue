<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <li>
        <a href="#" class="waves-effect waves-orange pointer">{{
          link.title
        }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Isidebar from "../../types/sidebar/Isidebar";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup() {
    const links = ref<Isidebar[]>([
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" },
    ]);
    return { links };
  },
});
</script>

<style></style>
