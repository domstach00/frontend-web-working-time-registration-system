<template>
  <div id="users-in-project" class="div">
    <h1>Users in project</h1>
    <label>Select project</label>
    <br/>
    <select v-model="projectId" class="inputSelect">
      <option v-for="project in projects" :value="project.idPG" v-bind:key="project.idPG">
        {{project.projectName}}
      </option>
    </select>
    <br/>
    <br/>
    <label v-if="projectId !== 0" class="tableLabel">Users in this project</label>
    <table v-if="projectId !==0" id="users">
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
#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin-right: auto;
  margin-left: auto;
}

#users td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#users tr:nth-child(even){background-color: #f2f2f2;}

#users tr:hover {background-color: #ddd;}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04AA6D;
  color: white;
}

table, th, td {
  width: 150px;
}

.tableLabel {
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}

#users-in-project, h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#users-in-project {
  padding-bottom: 300px;
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


.div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>