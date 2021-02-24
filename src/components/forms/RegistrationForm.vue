<template>
    <a-form
    :form='registrationForm'
    @submit='onSubmit'
    label-align="left"
    :label-col="{span:5}"
    :wrapper-col="{span: 15, offset: 1}">
        <a-form-item label="First name"  class="reg-form-row" required has-feedback>
            <a-input 
                v-decorator="[
                    'first-name', 
                    {
                        rules: [
                            {
                                type: 'string',
                                message: 'Please enter a valid name!'
                            },
                            {
                                required: true,
                                message: 'Please enter your first name!'
                            }
                        ]
                    }
                ]"
            v-model="registrationForm.firstName" name="first-name"/>
        </a-form-item>
        <a-form-item label="Last name"  class="reg-form-row" required has-feedback>
            <a-input v-model="registrationForm.lastName" name="last-name"/>
        </a-form-item>
        <a-form-item label="Email"  class="reg-form-row" required has-feedback>
            <a-input v-model="registrationForm.email" name="email"/>
        </a-form-item>
        <a-form-item label="Username"  class="reg-form-row" required has-feedback>
            <a-input v-model="registrationForm.username" name="username"/>
        </a-form-item>
        <a-form-item label="Password" class="reg-form-row" required has-feedback>
            <a-input v-model="registrationForm.password" name="password" type="password"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button type="primary" html-type="submit">Create Account</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import {login} from '../../api/UsersApi.js'

export default {
  name: 'RegistrationForm',
  data() {
    return{
      registrationForm: this.$form.createForm(this, { name: 'registration_form' }),
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
</style>