<template>
  <div id="addNewProjectGroup" class="div">
    <h1>Add new project group</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Project name </label>
        <br/>
        <input type="text" placeholder="name" v-model="projectGroup.groupName" class="inputSelect">
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
      <button id="butt" class="button">Create group</button>
    </form>
  </div>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#butt {
  font-size: 15px;
}
form {
  /*margin-bottom: 2rem;*/
}
.error-message {
  color: #d33c40;
}
.success-message {
  color: #32a95d;
}

label {
  font-weight: bold;
  font-size: 20px;
}

.inputSelect {
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

</style>
