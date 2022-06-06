<template>
  <div class="addNewProjectGroup">
    <h3>Add new project group</h3>
  </div>
  <br/>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Project name </label>
      <input type="text" placeholder="name" v-model="projectGroup.groupName">
    </div>
    <br/>
    <p v-if="error && submiting" class="error-message">
          Incorrect details
        </p>
        <p v-else>

        </p>
        <p v-if="success" class="success-message">
          Group added correctly
        </p>
        <button id="butt">Create group</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  firstName: 'App',
  data() {
    return { 
      submiting: false,
      error: false,
      success: false,
      projectGroup: {
        groupName: '',
      },
    }
  },
  methods: {
    handleSubmit()  {
      this.submiting = true
      this.clearStatus()
      if (this.invalidProjectName) {
        this.error = true
        return
      }
      this.insertPG()
      if (this.success) {
        this.error = false
        this.submiting = false
      }
      else {
        this.error = false
        this.submiting = false
      }
    },
    clearStatus() {
      this.success = false
      this.error = false
    },
    insertPG(){
      axios({
        method: 'post',
        url: 'http://localhost:8090/api/v1/project-group',
        data: {
          projectName: this.projectGroup.groupName
        }
      }).then(() => {
        this.success = true
      }).catch(() => {
        this.success = false
      })
    }
  },
  computed: {
    invalidProjectName() {
      return this.projectGroup.groupName === ''
    }
  }
}
</script>

<style>
#addNewProjectGroup {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
  .addNewProjectGroup {
    font-weight: bold;
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
