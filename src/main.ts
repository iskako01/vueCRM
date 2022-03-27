import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
// import Paginate from 'vuejs-paginate'
import Pagination from 'v-pagination-3';
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'


const firebase = require('./firebase.js')

let app
firebase.auth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(router)
			.use(messagePlugin)
			.component('Pagination', Pagination)
			.mount('#app')
	}

})


