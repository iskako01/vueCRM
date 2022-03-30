<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('open')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFilter("datetime") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
interface IdateFilter {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  second: string;
}
export default defineComponent({
  setup() {
    const date = ref<string | Date>(new Date().toString());
    const interval = ref(100);
    const dropdown = ref();
    const store = useStore();
    const router = useRouter();

    const name = computed(() => {
      return store.getters.info.name;
    });

    onMounted(() => {
      (interval.value = setInterval(() => {
        date.value = new Date();
      }, 1000)),
        (dropdown.value = window.M.Dropdown.init(dropdown.value, {
          constrainWidth: true,
        }));
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
      if (dropdown.value && dropdown.value.destroy) {
        dropdown.value.destroy();
      }
    });

    const logout = () => {
      store.dispatch("logout");
      router.push("/login?message=logout");
    };

    const dateFilter = (value: any, format = "date") => {
      value = date.value;
      const options: any = {};

      if (format.includes("date")) {
        options.day = "2-digit";
        options.month = "long";
        options.year = "numeric";
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }

      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    };
    return { dateFilter, logout, name };
  },
});
</script>

<style></style>
