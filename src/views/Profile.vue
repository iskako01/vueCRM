<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit="updateProfileName">
      <div class="input-field">
        <input id="description" type="text" v-model="inputName" />
        <label for="description">Имя</label>
        <span class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const inputName = ref("");

    const updateProfileName = () => {
      if (inputName.value != "") {
        store.dispatch("updateProfileName", inputName.value);
      }
    };
    return { inputName, updateProfileName };
  },
});
</script>
