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

<script>
import { object, string, boolean } from "yup";

const loginFormSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(6),
  name: string().required(),
  agree: boolean().oneOf([true], "Message"),
});
export default {
  name: "login",

  data() {
    return {
      values: {
        email: "",
        password: "",
        name: "",
        agree: false,
      },
      errors: {
        email: "",
        password: "",
        name: "",
        agree: false,
      },
    };
  },

  methods: {
    async submitHandler() {
      try {
        loginFormSchema
          .validate(this.values, { abortEarly: false })
          .then(() => {
            this.errors = {};
            this.$store.dispatch("signUp", {
              email: this.values.email,
              password: this.values.password,
              name: this.values.name,
            });
            this.$router.push("/login");
          })
          .catch((err) => {
            err.inner.forEach((error) => {
              this.errors[error.path] = error.message;
            });
          });
      } catch (e) {}
    },
    validate(field) {
      loginFormSchema
        .validateAt(field, this.values)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
  },
};
</script>