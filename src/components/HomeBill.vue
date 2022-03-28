<template>
  <div>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line" v-for="cur in currencis" :key="cur.id">
            <span>{{ getCurrency(cur) }} {{ cur }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: ["rates"],
  inject: ["currencis"],
  setup(prop) {
    const store = useStore();
    const bills = computed(() => {
      return store.getters.info.bill;
    });
    const base = computed(() => {
      return bills.value / (prop.rates["KZT"] / prop.rates["EUR"]);
    });

    const getCurrency = (currency: number) => {
      return Math.floor(base.value * prop.rates[currency]);
    };

    return { getCurrency };
  },
});
</script>

<style></style>
