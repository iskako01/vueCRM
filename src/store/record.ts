import { firebase, database } from "../firebase";
import Irecord from "../types/records/Irecord";

export default {
  actions: {
    async createRecord({ dispatch, commit }: any, record: Irecord) {
      try {
        const uid = await dispatch("getUid");

        return await database.ref(`/users/${uid}/records`).push(record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }: any) {
      try {
        console.log("sdsdsd");
        const uid = await dispatch("getUid");
        console.log(uid);
        const records =
          (await database.ref(`/users/${uid}/records`).once("value")).val() ||
          {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecordById({ dispatch, commit }: any, id: string) {
      try {
        const uid = await dispatch("getUid");

        const record = (
          await database.ref(`/users/${uid}/records`).child(id).once("value")
        ).val();
        return { ...record, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
