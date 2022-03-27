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

<script>
import { object, string } from "yup";
import messages from "../utils/messages";

const loginFormSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(4),
});

export default {
  name: "login",
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },

  data() {
    return {
      values: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async submitHandler() {
      try {
        await this.$store.dispatch("login", {
          email: this.values.email,
          password: this.values.password,
        });
        this.$router.push("/");
      } catch (e) {}
      loginFormSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          this.errors = {};
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
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

