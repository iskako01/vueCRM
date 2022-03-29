<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="errors.email ? 'invalid' : 'validate'"
          name="email"
          v-model="values.email"
          @blur="validate('email')"
          @keypress="validate('email')"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid">{{ errors.email }}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="errors.password ? 'invalid' : 'validate'"
          name="password"
          v-model="values.password"
          @blur="validate('password')"
          @keypress="validate('password')"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">{{ errors.password }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { object, string } from "yup";
import messages from "../utils/messages";
import Ilogin from "../types/auth/Ilogin";
import IloginError from "../types/auth/IloginError";

const loginFormSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(4),
});

export default defineComponent({
  name: "login",
  setup() {
    const values = ref<Ilogin>({
      email: "",
      password: "",
    });
    const errors = ref<IloginError>({
      email: "",
      password: "",
    });
    const mes = ref(messages);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    onMounted(() => {
      const routeMes = route.query.message;
      console.log(routeMes);

    //   if (messages[routeMes]) {
    //     this.$message(messages[routeMes]);
    //   }
    });
    const submitHandler = async () => {
      try {
        await store.dispatch("login", values.value);
        router.push("/");
      } catch (e) {}
      loginFormSchema
        .validate(values.value, { abortEarly: false })
        .then(() => {
          errors.value = {};
        })
        .catch((err) => {
          err.inner.forEach(
            (error: { path: string | number; message: any }) => {
            //   errors.value[error.path] = error.message;
            }
          );
        });
    };
    const validate = (field: string) => {
      loginFormSchema
        .validateAt(field, values.value)
        .then(() => {
        //   errors.value[field] = "";
        })
        .catch((err) => {
        //   errors.value[field] = err.message;
        });
    };
    return { validate, submitHandler, values };
  },
});
</script>
