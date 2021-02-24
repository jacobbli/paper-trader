<template>
  <a-row type="flex" justify="center">
    <a-col class='login-card-column'>
      <a-card class='login-card' style="width: 450px">
        <login-form></login-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import LoginForm from '../components/forms/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
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
