import axios from "axios";
export default {
  actions: {
    async fetchCurrency() {
      const response = await axios.get(
        `http://data.fixer.io/api/latest?access_key=acd16fbf1750055c15d3d2d7ebdb5de2&symbols=EUR,CZK,KZT`
      );
      console.log(response);

      return response;
    },
  },
};
