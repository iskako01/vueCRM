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

<script>
export default {
  props: ["rates"],
  inject: ["currencis"],

  computed: {
	  bills(){
		  return this.$store.getters.info.bill
	  },
    base() {
      return this.bills / (this.rates["KZT"] / this.rates["EUR"]);
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>

<style>
</style>