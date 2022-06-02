<template>
  <div id="LoginForm" class="small-container">
    <h5>Zaloguj</h5>
    <form @submit.prevent="handleSubmit">
      <label>Login </label>
      <input
        v-model="userAccount.login"
        type="text"
        :class="{ 'has-error': submiting && invalidLogin }"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <br/><br/>
      <label>Hasło </label>
      <input
          v-model="userAccount.password"
          type="password"
          :class="{ 'has-error': submiting && invalidPassword }"
          @focus="clearStatus"
          @keypress="clearStatus"
      >
      <p v-if="error && submiting" class="error-message">
        Incorrect login details
      </p>
      <p v-else>

      </p>
      <p v-if="success" class="success-message">
        Successfully logged in
      </p>
      <button>Zaloguj</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      submiting: false,
      error: false,
      success: false,
      userAccount: {
        login: '',
        password: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.submiting = true
      this.clearStatus()
      if (this.invalidLogin || this.invalidPassword) {
        this.error = true
        return
      }
      // this.$emit()
      this.error = false
      this.success = true
      this.submiting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    }
  },
  computed: {
    invalidLogin() {
      return this.userAccount.login === ''
    },
    invalidPassword() {
      return this.userAccount.password === ''
    },
  },
}
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}
[class*='-message'] {
  font-weight: 500;
}
.error-message {
  color: #d33c40;
}
.success-message {
  color: #32a95d;
}
.small-container h5 {
  font-size: 20px
}
</style>
