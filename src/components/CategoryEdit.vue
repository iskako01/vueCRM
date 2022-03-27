<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="categorie in categories"
              :key="categorie.id"
              :value="categorie.id"
            >
              {{ categorie.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" v-model="title" />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="!title"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model="limit" />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="limit < 100">Лимит 100</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["categories"],
  emits: ["updated"],
  setup(props, { emit }) {
    const store = useStore();

    const select = ref("");
    const title = ref("");
    const limit = ref(100);
    const current = ref("");
    const categories = props.categories;

    current.value = categories[0].id;
    title.value = categories[0].title;
    limit.value = categories[0].limit;

    onMounted(() => {
      M.updateTextFields();
      select.value = M.FormSelect.init(select.value);
    });

    watch(current, (categoryId) => {
      const thisCategory = categories.find((c) => c.id === categoryId);
      current.value = thisCategory.id;
      title.value = thisCategory.title;
      limit.value = thisCategory.limit;
    });

    const onSubmit = async () => {
      if (title.value != "" && limit.value > 100) {
        try {
          const categoryData = {
            id: current.value,
            title: title.value,
            limit: limit.value,
          };
          await store.dispatch("updateCategory", categoryData);
          emit("updated", categoryData);
        } catch (e) {}
      }
    };

    return { select, categories, title, limit, current, onSubmit };
  },
});
</script>

<style></style>
