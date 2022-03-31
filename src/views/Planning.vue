<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }} KZT</h4>
    </div>
    <loader v-if="loading" />
    <p v-else-if="!fetchCategory.length">
      Категорий пока нет.<router-link to="/categories"
        >Добавить категорию</router-link
      >
    </p>
    <section v-else>
      <div v-for="cat in fetchCategory" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend }} из {{ cat.limit }}
        </p>
        <div class="progress">
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
import IcategoryPlan from "../types/categories/IcategoryPlan";
import Icategory from "../types/categories/Icategory";
import Irecord from "../types/records/Irecord";

export default defineComponent({
  components: { Loader },
  setup() {
    const store = useStore();

    const loading = ref(true);
    const fetchCategory = ref<IcategoryPlan[]>([]);

    const info = computed(() => store.getters.info);

    onMounted(async () => {
      fetchCategory.value = await store.dispatch("fetchCategories");
      const records: Irecord[] = await store.dispatch("fetchRecords");
      console.log(records);

      fetchCategory.value = fetchCategory.value.map((cat: Icategory) => {
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
      console.log(fetchCategory.value);
    });
    console.log(fetchCategory.value);

    return {
      loading,
      info,
      fetchCategory,
    };
  },
});
</script>

<style></style>
