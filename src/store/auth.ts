const firebase = require("../firebase.js");

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth.signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async signUp({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth.createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");

        await firebase.database
          .ref(`/users/${uid}/info`)
          .set({ bill: 10000, name });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async logout({ commit }) {
      await firebase.auth.signOut();
      commit("clearInfo");
    },
    getUid() {
      try {
        const user = firebase.auth.currentUser;
        console.log(user.uid);
        return user ? user.uid : null;
      } catch (e) {
        throw e;
      }
    },
  },
};
