<template>
  <div id="LoginForm" class="small-container">
    <h1>Zaloguj</h1>
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
      <button @keypress="emitUser">Zaloguj</button>
      <br/>
    </form>

<!--    <button @click="emitUser">User</button>-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  firstName: "LoginForm",
  props: {
    loggedUser: Object
  },
  data() {
    return {
      submiting: false,
      error: false,
      success: false,
      userAccount: {
        login: '',
        password: '',
      },
      user: {
        idU: 1,
        email: 'mail@example.com',
        firstName: 'Dawid',
        lastName: 'Dawicki',
        phoneNr: '111222333',
        fk_role: 1
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.submiting = true
      this.clearStatus()
      if (this.invalidLogin || this.invalidPassword) {
        this.error = true
        return
      }
      try {
        const response = await fetch('http://localhost:8090/api/v1/user/login', {
          method: 'post',
          // headers: {'Content-Type': 'application/json'},
          body: {
            email: "admin@email.com",
            password: "Admin123"
          }
        })
        const data = await response.json()

        console.log(data)
      } catch (error) {
        console.log(error)
      }

    },
    clearStatus() {
      this.success = false
      this.error = false
    },
    async emitUser() {
      try {
        axios.get("http://localhost:8090/api/v1/user?id=1").then(response => {
          console.log(response)
        })

        this.$user = this.user
        // this.$emit('getUser', this.user)
        // console.log("emitUser")
        // console.log(this.user)
        console.log(this.$user)

      } catch (error) {
        console.log(error)
      }
      // window.location.href = 'http://localhost:8080/about'
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
#LoginForm {
  text-align: center;
}

#LoginForm h1 {
  font-size: 65px;
}

#LoginForm label {
  font-size: 40px;
}

input[type=text] {
  width: 65%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=password] {
  width: 65%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 20%;
  background-color: #55c21e;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

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
