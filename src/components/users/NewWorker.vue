<template>
  <div id="add-new-worker" class="div">
    <h1>Add new worker</h1>

    <br/>
      <form @submit.prevent="handleSubmit">
      <div>
        <label>Name </label>
        <br/>
        <input type="text" placeholder="name" v-model="user.firstName">
      </div>
      <br/>
      <div>
        <label>Surname </label>
        <br/>
        <input type="text" placeholder="surname" v-model="user.lastName">
      </div>
     <br/>
      <div>
        <label>Email</label>
        <br/>
        <input type="email" placeholder="email" v-model="user.email">
      </div>
      <br/>
      <div class="c">
        <label>Position </label>
        <br/>
        <select v-model="user.fk_role">
          <option v-for="option in positionOptions" :value="option.idU" v-bind:key="option.idU">
           {{option.roleName}}
         </option>
       </select>
      </div>
      <br/>
     <div>
        <label>Tel </label>
       <br/>
       <input type="tel" v-model="user.phoneNr">
     </div>
      <p v-if="error && submiting" class="error-message">
       Incorrect details
      </p>
      <p v-else>

      </p>
      <p v-if="success" class="success-message">
        Worker added correctly
      </p>
      <button id="butt" class="button">Add user</button>
    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  firstName: 'add-new-worker',
  data() {
    return { 
      submiting: false,
      error: false,
      success: false,
      user: {
        idU: 0,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNr: '',
        fk_role: 0
      },
      positionOptions: []
    }
  },
  methods: {
    handleSubmit()  {
      this.submiting = true
      this.clearStatus()
      if (this.invalidPosition || this.invalidSalary) {
        this.error = true
        return
      }
      this.insertUser()
      if (this.success){
        this.error = false
        this.submiting = false
      } else {
        this.error = true
        return
      }
    },
    clearStatus() {
      this.success = false
      this.error = false
    },
    setRoles(data) {
      this.positionOptions = data
      console.log(data)
      console.log(this.positionOptions)
    },
    insertUser(){
      axios({
        method: 'post',
        url: 'http://localhost:8090/api/v1/user',
        data: {
          email: this.user.email,
          password: this.user.password,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phoneNr: this.user.phoneNr,
          fk_role: this.user.fk_role
        }
      }).then(() => {
        this.success = true
      }).catch(() => {
        this.success = false
      })
    }
  },
  computed: {
    invalidPosition() {
      return this.user.fk_role === 0
    },
    invalidSalary() {
      return this.user.phoneNr <= 0
    }
  },
  mounted(){
    axios.get('http://localhost:8090/api/v1/role/all').then(response => {
      // test = response.data
      this.setRoles(response.data)
    })
  }

}

</script>

<style>
input, select {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button {
  width: 20%;
  background-color: #55c21e;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

#add-new-worker {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

  #butt {
    font-size: 15px;
  }

  form {
    margin-bottom: 2rem;
  }

  .error-message {
    color: #d33c40;
  }
  .success-message {
    color: #32a95d;
  }

</style>
