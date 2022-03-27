import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import currency from './currency'
import category from './category'
import record from './record'
export default createStore({
	state: {
		error: null
	},
	mutations: {
		setError(state, error) {
			state.error = error
		},
		clearError(state) {
			state.error = null
		},
	},
	getters: {
		error: s => s.error
	},
	modules: {
		auth, info, currency, category, record
	}
})
