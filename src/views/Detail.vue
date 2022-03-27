<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb">
          {{ record.type === "income" ? "Доход" : "Расход" }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card red"
            :class="record.type === 'income' ? 'green' : 'red'"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма:{{ record.amount }}</p>
              <p>Категория:{{ category.title }}</p>

              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
name: "detail";
import loader from "../components/app/Loader.vue";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    const loading = ref(true);
    const category = ref([]);
    const record = ref([]);
    const id = props.id;

    onMounted(async () => {
      console.log("props", id);

      record.value = await store.dispatch("fetchRecordById", id);
      category.value = await store.dispatch(
        "fetchCategoryById",
        record.value.categoryId
      );
      loading.value = false;
    });

    return { loading, record, category };
  },
  components: { loader },
};
</script>