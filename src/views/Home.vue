<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading" />
    <!-- <div class="row" v-else>
      <home-bill :rates="currency.data.rates" />
      <home-currency :data="currency.data" />
    </div> -->
  </div>
</template>

<script lang="ts">
import Loader from "../components/app/Loader.vue";
import HomeBill from "../components/HomeBill.vue";
import HomeCurrency from "../components/HomeCurrency.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  provide() {
    return {
      currencis: this.currencis,
    };
  },
  data() {
    return {
      loading: true,
      currency: null,
      currencis: ["KZT", "CZK", "EUR"],
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
  components: { HomeBill, HomeCurrency, Loader },
});
</script>
