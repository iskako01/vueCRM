<template >
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <!-- <Chart class="history-chart" /> -->

    <loader v-if="loading" />
    <p v-else-if="!records.length">
      Записей пока нет.<router-link to="/record">Cоздать запись</router-link>
    </p>

    <section v-else>
      <history-table :records="items" />
      <div>
        <ul class="pagination">
          <li>
            <button @click="prevPage" :disabled="page === 1" class="active">
              <i class="material-icons">chevron_left</i>
            </button>
          </li>

          <li class="waves-effect" v-for="(p, index) in allItems" :key="index">
            <a
              href="#!"
              :class="{
                activePage: page === index + 1,
              }"
              @click="paginationNumber(index + 1)"
              >{{ index + 1 }}</a
            >
          </li>
          <li>
            <button @click="nextPage" :disabled="page === allItems.length">
              <i class="material-icons">chevron_right</i>
            </button>
          </li>
        </ul>
        {{ items.length }}
      </div>
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable.vue";
import loader from "../components/app/Loader.vue";
// import Chart from "../components/app/Chart.vue";
import _ from "lodash";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";

export default {
  name: "history",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // const pieChart = Pie;

    const loading = ref(true);
    const categories = ref([]);
    const records = ref([]);

    const items = ref([]);
    const allItems = ref([]);
    const pageSize = ref(2);
    const page = ref(+route.query.page);
    const pageCount = ref(0);

    const setupPagination = (allitems) => {
      allItems.value = _.chunk(allitems, pageSize.value);
      pageCount.value = _.size(allItems.value);
      items.value = allItems.value[page.value - 1] || allItems.value[0];
    };

    const pageChangeHandler = (page) => {
      router.push(`${route.path}?page=${page}`);
      items.value = allItems.value[page - 1] || allItems.value[0];
    };

    onMounted(async () => {
      categories.value = await store.dispatch("fetchCategories");

      const recordsMap = await store.dispatch("fetchRecords");

      records.value = recordsMap.map((record) => {
        return {
          ...record,
          categoryName: categories.value.find(
            (c) => c.id === record.categoryId
          ),
          typeText: record.type === "income" ? "Доход" : "Расход",
          typeClass: record.type === "income" ? "green" : "red",
        };
      });

      setupPagination(records.value);

      loading.value = false;
    });

    const paginationNumber = (index) => {
      page.value = index;
      pageChangeHandler(index);
    };

    const nextPage = () => {
      page.value++;
      pageChangeHandler(page.value);
    };

    const prevPage = () => {
      page.value--;
      pageChangeHandler(page.value);
    };

    return {
      loading,
      records,
      categories,
      items,
      pageCount,
      page,
      nextPage,
      prevPage,
      allItems,
      paginationNumber,
    };
  },
  components: { HistoryTable, loader },
};
</script>

<style scoped>
button {
  border: none;
  background: transparent;
}
.activePage {
  background-color: #ff8080;
}
</style>

