<template>
  <div id="users-in-project">
    <h2>Users in project</h2>
    <label>Select project</label>
    <br/>
    <select v-model="projectId">
      <option v-for="project in projects" :value="project.idPG" v-bind:key="project.idPG">
        {{project.projectName}}
      </option>
    </select>
    <br/>
    <br/>
    <label v-if="projectId !== 0">Users in this project</label>
    <table v-if="projectId !==0">
      <tbody>
      <th>First name</th>
      <th>Last name</th>
      <th>Email</th>
      <th>Phone nr</th>
      <tr vi v-for="user in users" :key="user.idU">
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phoneNr }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersInProject",
  data() {
    return {
      projectId: 0,
      projects: [],
      users: []
    }
  },
  methods: {
    selectUsers(idPG) {
      axios.get(`http://localhost:8090/api/v1/user-project/users?id=${idPG}`)
          .then(response => {
            this.users = response.data
          })
          .catch(error => console.log(error))
    }
  },
  mounted() {
    axios.get('http://localhost:8090/api/v1/project-group/all').then(response => {
      // test = response.data
      this.projects = response.data
      console.log(this.projects)
    })
  },
  watch: {
    'projectId': function (value) {
      this.selectUsers(value)
    }
  }
}
</script>

<style scoped>

</style>