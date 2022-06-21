<template>
  <div id="nav">
    <router-link to="/" class="navi-bar">Home</router-link>
    <router-link to="/login" class="navi-bar">Login</router-link>
    <router-link to="/calendar" class="navi-bar">Calendar</router-link>
    <router-link to="/new-assignment" class="navi-bar">Add assignment</router-link>
    <router-link to="/new-project-group" class="navi-bar">Add project group</router-link>
    <router-link to="/new-worker" class="navi-bar">Add worker</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  props: {
    loggedUser: Object
  },

}

</script>

<style>

button {
  background: #009435;
  border: 1px solid #009435;
}

.navi-bar {
  padding-right: 30px;
}

#nav {
  padding: 30px;
  margin: 10px;
  /*background-color: #969892;*/
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a {
  color: #42b983;
}

</style>
