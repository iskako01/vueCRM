<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading" />
    <div class="row" v-else>
      <home-bill :rates="currency.data.rates" />
      <home-currency :data="currency.data" />
    </div>
  </div>
</template>

<script lang="ts">
import Loader from "../components/app/Loader.vue";
import HomeBill from "../components/HomeBill.vue";
import HomeCurrency from "../components/HomeCurrency.vue";
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  provide() {
    return {
      currencis: this.currencis,
    };
  },
  components: { HomeBill, HomeCurrency, Loader },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const currency = ref();
    const currencis = ref(["KZT", "CZK", "EUR"]);

    onMounted(async () => {
      currency.value = await store.dispatch("fetchCurrency");
      loading.value = false;
    });
    const refresh = async () => {
      loading.value = true;
      currency.value = await store.dispatch("fetchCurrency");
      loading.value = false;
    };
    return { currencis, refresh, loading, currency };
  },
});
</script>
