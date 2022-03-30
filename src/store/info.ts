import { firebase, database } from "../firebase";
import IstateIinfo from "../types/info/IstateInfo";
import Iinfo from "../types/info/Iinfo";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state: IstateIinfo, info: Iinfo) {
      state.info = info;
    },
    clearInfo(state: IstateIinfo) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ commit, dispatch }: any) {
      try {
        const uid = await dispatch("getUid");
        const info = (
          await database.ref(`/users/${uid}/info`).once("value")
        ).toJSON();

        commit("setInfo", info);
      } catch (e) {
        console.log(e);
      }
    },
    async updateInfo({ dispatch, commit, getters }: any, bill: number) {
      try {
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, bill };
        console.log("updateData", updateData);
        await database.ref(`/users/${uid}/info`).update(updateData);
        commit("setInfo", updateData);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {
    info(state: IstateIinfo) {
      return state.info;
    },
  },
};
