<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }} KZT</h4>
    </div>
    <loader v-if="loading" />
    <p v-else-if="!categories.length">
      Категорий пока нет.<router-link to="/categories"
        >Добавить категорию</router-link
      >
    </p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend }} из {{ cat.limit }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
name: "planing";
import { onMounted, ref, computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Loader from "../components/app/Loader.vue";
import Icategory from "../types/categories/Icategory";
import Icategory from "../types/categories/Icategory";
export default defineComponent({
  setup() {
    const store = useStore();

    const loading = ref(true);
    const categories = ref<Icategory[]>([]);
    const fetchCategory = ref();

    onMounted(async () => {
      fetchCategory.value = await store.dispatch("fetchCategories");
      const records = await store.dispatch("fetchRecords");

      categories.value = fetchCategory.value.map((cat) => {
        const spend = records
          .filter((r) => r.categoryId === cat.id)
          .filter((r) => r.type === "outcome")
          .reduce((total, records) => {
            return (total += +records.amount);
          }, 0);

        const percent = 100 * (spend / cat.limit);
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
        const tooltipValue = cat.limit - spend;
        const tooltip = `${
          tooltipValue < 0 ? "Превышение на " : "Осталось "
        }${Math.abs(tooltipValue)}`;
        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip,
        };
      });

      loading.value = false;
    });
    const info = computed(() => store.getters.info);

    return {
      loading,
      info,
      categories,
    };
  },

  components: { Loader },
});
</script>

<style></style>
