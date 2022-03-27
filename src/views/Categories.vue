<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div class="row" v-else>
        <category-create @created="addNewCategory" />
        <category-edit
          v-if="categories.length"
          :categories="categories"
          @updated="updatedCategory"
          :key="categories.length + updateCount"
        />
        <p v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate.vue";
import CategoryEdit from "../components/CategoryEdit.vue";
import loader from "../components/app/Loader.vue";
import { onMounted, ref, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();

    const categories = ref([]);
    const loading = ref(true);
    const updateCount = ref(0);

    onMounted(async () => {
      categories.value = await store.dispatch("fetchCategories");
      console.log(categories.value);
      loading.value = false;
    });

    const addNewCategory = (category) => {
      categories.value.push(category);
    };
    const updatedCategory = (category) => {
      const index = categories.value.findIndex((c) => c.id === category.id);
      console.log(categories.value[index].title);
      categories.value[index].title = category.title;
      categories.value[index].limit = category.limit;
      updateCount.value++;
    };

    return {
      addNewCategory,
      loading,
      categories,
      updatedCategory,
      updateCount,
    };
  },
  components: { CategoryCreate, CategoryEdit, loader },
});
</script>

<style></style>
