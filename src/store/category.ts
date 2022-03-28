import { firebase, database } from "../firebase";
import IcreateCategory from "../types/categories/Icategories";
import IupdateCategory from "../types/categories/Icategories";

export default {
  actions: {
    async createCategory({ commit, dispatch }: any, values: IcreateCategory) {
      try {
        const uid = await dispatch("getUid");
        console.log(values);
        const category = await database
          .ref(`/users/${uid}/categories`)
          .push({ ...values });
        return { ...values, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory(
      { commit, dispatch }: any,
      { title, limit, id }: IupdateCategory
    ) {
      try {
        const uid: string = await dispatch("getUid");
        console.log(title, limit, id);
        await database
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
        console.log("category update");
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }: any) {
      try {
        const uid: string = await dispatch("getUid");
        const categories = (
          await database.ref(`/users/${uid}/categories`).once("value")
        ).val();
        console.log(categories);

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ dispatch, commit }: any, id: string) {
      try {
        const uid: string = await dispatch("getUid");

        const category = (
          await database.ref(`/users/${uid}/categories`).child(id).once("value")
        ).val();
        return { ...category };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
