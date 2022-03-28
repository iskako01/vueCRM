import { auth, database } from "../firebase";
import Ilogin from "../types/auth/Ilogin";
import IsignUp from "../types/auth/IsignUp";

export default {
  actions: {
    async login({ commit }: any, values: Ilogin) {
      try {
        console.log(values);

        await auth.signInWithEmailAndPassword(values.email, values.password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async signUp(
      { commit, dispatch }: any,
      { email, password, name }: IsignUp
    ) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");

        await database.ref(`/users/${uid}/info`).set({ bill: 10000, name });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async logout({ commit }: any) {
      await auth.signOut();
      commit("clearInfo");
    },
    getUid() {
      try {
        const user = auth.currentUser;
        return user ? user.uid : null;
      } catch (e) {
        throw e;
      }
    },
  },
};
