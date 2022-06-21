<template>
  <div id="assign-users" class="div">
    <form @submit.prevent="handleSubmit">
      <h1>Assign users to project</h1>
      <label>Select project</label>
      <br/>
      <select v-model="projectId" class="inputSelect">
        <option v-for="project in projects" :value="project.idPG" v-bind:key="project.idPG">
          {{project.projectName}}
        </option>
      </select>
      <br/>
      <br/>
      <label>Select User</label>
      <br/>
      <select v-model="userId" class="inputSelect">
        <option v-for="user in users" :value="user.idU" v-bind:key="user.idU">
          {{user.firstName + " " + user.lastName}}
        </option>
      </select>
      <br/>
      <button id="butt" class="button">Assign user</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AssignUsers",
  data() {
    return {
      projectId: 0,
      userId: 0,
      projects: [],
      users: []
    }
  },
  methods: {
    handleSubmit(){
      axios({
        method: 'post',
        url: 'http://localhost:8090/api/v1/user-project',
        data: {
          idU: this.userId,
          idPG: this.projectId
        }
      })
    }
  },
  mounted() {
    axios.get('http://localhost:8090/api/v1/project-group/all').then(response => {
      this.projects = response.data
    })
    axios.get('http://localhost:8090/api/v1/user/all').then(response => {
      this.users = response.data
    })
  }
}
</script>

<style scoped>

#assign-users, h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#butt {
  font-size: 20px;
  margin-top: 30px;
}
form {
  margin-bottom: 2rem;
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