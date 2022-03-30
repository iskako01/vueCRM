<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          @blur="validate('email')"
          @keypress="validate('email')"
          :class="errors.email ? 'invalid' : 'validate'"
          v-model="values.email"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="errors.email">{{
          errors.email
        }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          @blur="validate('password')"
          @keypress="validate('password')"
          :class="errors.password ? 'invalid' : 'validate'"
          v-model="values.password"
        />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">{{ errors.password }}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          @blur="validate('name')"
          @keypress="validate('name')"
          v-model="values.name"
          :class="errors.name ? 'invalid' : 'validate'"
        />
        <label for="name">Имя</label>
        <small class="helper-text invalid">{{ errors.name }}</small>
      </div>
      <p>
        <label>
          <input v-model="values.agree" type="checkbox" />
          <span
            @blur="validate('agree')"
            @keypress="validate('agree')"
            :class="
              !values.agree ? 'helper-text invalid' : 'helper-text validate'
            "
            >{{
              !values.agree ? "Согласитесь с правилами" : "С правилами согласен"
            }}</span
          >
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { object, string, boolean } from "yup";
import { defineComponent, ref } from "vue";
import IsignUp from "@/types/signUp/IsignUp";
import IsignUpErrors from "@/types/signUp/IsignUpErrors";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const loginFormSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(6),
  name: string().required(),
  agree: boolean().oneOf([true], "Message"),
});
export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const values = ref<IsignUp>({
      email: "",
      password: "",
      name: "",
      agree: false,
    });
    const errors = ref<IsignUpErrors>({
      email: "",
      password: "",
      name: "",
      agree: false,
    });

    const submitHandler = async () => {
      try {
        loginFormSchema
          .validate(values.value, { abortEarly: false })
          .then(() => {
            errors.value = {};
            store.dispatch("signUp", {
              email: values.value.email,
              password: values.value.password,
              name: values.value.name,
            });
            router.push("/login");
          })
          .catch((err) => {
            err.inner.forEach((error) => {
              errors.value[error.path] = error.message;
            });
          });
      } catch (e) {}
    };
    const validate = (field: string) => {
      loginFormSchema
        .validateAt(field, values.value)
        .then(() => {
          errors.value[field] = "";
        })
        .catch((err) => {
          errors.value[field] = err.message;
        });
    };

    return { submitHandler, validate, values, errors };
  },
});
</script>
