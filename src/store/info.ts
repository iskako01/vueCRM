const firebase = require('../firebase.js');
export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo(state, info) {
			state.info = info
		},
		clearInfo(state) {
			state.info = {}
		},
	},
	actions: {
		async fetchInfo({ commit, dispatch }) {
			try {
				const uid = await dispatch('getUid')
				const info = (await firebase.database.ref(`/users/${uid}/info`).once('value')).toJSON()

				commit('setInfo', info)
			} catch (e) { console.log(e) }
		},
		async updateInfo({ dispatch, commit, getters }, bill) {
			try {
				const uid = await dispatch('getUid')
				const updateData = { ...getters.info, ...bill }
				console.log('updateData', updateData);
				await firebase.database.ref(`/users/${uid}/info`).update(updateData)
				commit('setInfo', updateData)
			} catch (e) {
				commit('setError', e)
				throw e
			}
		}
	},
	getters: {
		info(state) {
			return state.info
		}
	}
}