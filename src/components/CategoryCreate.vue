<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input id="name" type="text" v-model="title" />
          <label for="name">Название</label>
          <span v-if="title === ''" class="helper-text invalid"
            >Введите название Категории</span
          >
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model="limit" />
          <label for="limit">Лимит</label>
          <span v-if="limit < 100" class="helper-text invalid"
            >Лимит должен быть больше 100</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useForm } from "vee-validate";
import { onMounted, ref, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  emits: ["created"],
  setup(_, { emit }) {
    onMounted(() => {
      M.updateTextFields();
    });
    const store = useStore();

    const title = ref("");
    const limit = ref (100);

    const createCategory = async () => {
      if (title.value != "" && limit.value > 100) {
        try {
          console.log(title.value);
          const category = await store.dispatch("createCategory", {
            title: title.value,
            limit: limit.value,
          });
          title.value = "";
          limit.value = 100;
          emit("created", category);
        } catch (e) {}
      }
    };
    return {
      createCategory,
      title,
      limit,
    };
  },
});
</script>

<style></style>
