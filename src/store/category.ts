const firebase = require("../firebase.js");
export default {
  actions: {
    async createCategory({ commit, dispatch }, values) {
      try {
        const uid = await dispatch("getUid");
        console.log(values);
        const category = await firebase.database
          .ref(`/users/${uid}/categories`)
          .push({ ...values });
        return { ...values, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        console.log(title, limit, id);
        await firebase.database
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
        console.log("category update");
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const db = await firebase.database.ref(`/users/${uid}/categories`);
        console.log(db);
        const categories = (
          await firebase.database.ref(`/users/${uid}/categories`).once("value")
        ).val();
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");

        const category = (
          await firebase.database
            .ref(`/users/${uid}/categories`)
            .child(id)
            .once("value")
        ).val();
        return { ...category };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
