<template>
    <a-form
    class='login-form'
    :model="loginForm"
    label-align="left"
    :label-col="{span:5}"
    :wrapper-col="{span: 15, offset: 1}">
    <a-form-item label="Username"  class="login-form-row" required has-feedback>
    <a-input v-model="loginForm.username" name="username"/>
    </a-form-item>
    <a-form-item label="Password" class="login-form-row" required has-feedback>
    <a-input v-model="loginForm.password" name="password" type="password"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
    <a-button @click="onSubmit" type="primary" htmlType="submit" :disabled='isDisabled'>Login</a-button>
    </a-form-item>
</a-form>
</template>

<script>
import {login} from '../../api/AuthenticationApi.js'

export default {
  name: 'LoginForm',
  data() {
    return{
      loginForm: {
        username: '',
        password: ''
      },
      disableSubmit: false,
    }
  },
  methods: {
    onSubmit() {
        var form = new FormData();
        form.append('username', this.loginForm.username);
        form.append('password', this.loginForm.password)
        login(form)
    },
  },
  computed: {
    isDisabled() {
      if (this.loginForm.username.length == 0 || this.loginForm.password.length == 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.login-card {
  margin-top: 50%;
  border-radius: 25px;
  border-style: outset;
}
</style>