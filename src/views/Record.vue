<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="loading" />
    <p v-else-if="!categories.length">
      Категорий пока нет.<router-link to="/categories"
        >Добавить категорию</router-link
      >
    </p>

    <form class="form" v-else @submit.prevent="onSubmit">
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

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model="amount" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="amount < 1"
          >Иинимальное значение 1</span
        >
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="description" />
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="description === ''"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
name: "record";
import { onMounted, ref, computed, defineComponent } from "vue";
import { useStore } from "vuex";
import loader from "../components/app/Loader.vue";

export default defineComponent({
  setup() {
    const store = useStore();

    const loading = ref(true);
    const categories = ref([]);
    const select = ref("");
    const current = ref("");
    const type = ref("outcome");
    const amount = ref(0);
    const description = ref("");
	
    onMounted(async () => {
      if (!categories.value.length) {
        console.log(categories.value.length);
        categories.value = await store.dispatch("fetchCategories");
        current.value = categories.value[0].id;
      }

      loading.value = false;
      setTimeout(() => {
        window.M.updateTextFields();
        select.value = window.M.FormSelect.init(select.value);
      }, 0);
    });

    const infoBill = computed(() => store.getters.info);

    const canCreateRecord = computed(() => {
      if (type.value === "income") {
        return true;
      }
      return infoBill.value.bill >= amount.value;
    });

    const onSubmit = async () => {
      if (amount.value > 1 && description != "") {
        if (canCreateRecord) {
          try {
            await store.dispatch("createRecord", {
              categoryId: current.value,
              amount: amount.value,
              description: description.value,
              type: type.value,
              date: new Date().toJSON(),
            });

            const bill: number =
              type.value === "income"
                ? infoBill.value.bill + amount.value
                : infoBill.value.bill - amount.value;

            await store.dispatch("updateInfo", bill);
          } catch (e) {}
        } else {
          console.log(`Недостаточно средств на счету(${amount.value - bill})`);
        }
      }
    };

    return {
      loading,
      categories,
      select,
      current,
      type,
      amount,
      description,
      onSubmit,
    };
  },
  components: { loader },
});
</script>

<style></style>
