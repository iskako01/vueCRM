import axios from 'axios'
export default {

	actions: {
		async fetchCurrency() {
			const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_API_KEY_FIXER}&symbols=EUR,CZK,KZT`)
			return response
		}
	}
}