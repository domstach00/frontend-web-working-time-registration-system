<template>
  <div id="assign-users">
    <form @submit.prevent="handleSubmit">
      <h2>Assign users to project</h2>
      <label>Select project</label>
      <select v-model="projectId">
        <option v-for="project in projects" :value="project.idPG" v-bind:key="project.idPG">
          {{project.projectName}}
        </option>
      </select>
      <br/>
      <br/>
      <label>Select User</label>
      <select v-model="userId">
        <option v-for="user in users" :value="user.idU" v-bind:key="user.idU">
          {{user.firstName + " " + user.lastName}}
        </option>
      </select>
      <button id="butt">Assign user</button>
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
      // test = response.data
      this.projects = response.data
      console.log(this.projects)
    })
    axios.get('http://localhost:8090/api/v1/user/all').then(response => {
      // test = response.data
      this.users = response.data
      console.log(this.users)
    })
  }
}
</script>

<style scoped>


</style>