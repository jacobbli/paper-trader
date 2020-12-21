<template>
  <a-form :model="login_form">
    <a-row>
      <a-form-item>
        <a-col :span="3">
          <label for="username" required>Username:</label>
        </a-col>
        <a-col :span="6">
          <a-input v-model="login_form.username" name="username" required/>
        </a-col>
      </a-form-item>
    </a-row>
    <a-row>
      <a-form-item>
        <a-col :span="3">
          <label for="password">Password:</label>
        </a-col>
        <a-col :span="6">
          <a-input v-model="login_form.password" name="password" type="password" required/>
        </a-col>
      </a-form-item>
    </a-row>
    <a-row>
      <a-form-item>
        <a-col>
          <a-button @click="onSubmit" type="primary">Login</a-button>
        </a-col>
      </a-form-item>
    </a-row>
  </a-form>
</template>

<script>
import {login} from '../../api/AuthenticationApi.js'

export default {
  name: 'Login',
  data() {
    return{
      login_form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var form = new FormData();
      form.append('username', this.login_form.username);
      form.append('password', this.login_form.password)
      login(form)
    }
  }
  // TODO: Add form validation
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
