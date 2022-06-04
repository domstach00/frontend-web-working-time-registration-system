<template>
  <div class="addNewProjectGroup">
    <h3>Add new project group</h3>
  </div>
  <br/>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Group name </label>
      <input type="text" placeholder="name">
    </div>
    <br/>
    <div>
      <label>Description </label>
      <input type="text" placeholder="desc">
    </div>
    <br/>
    <div class="c">
      <label>Project Manager </label>
      <select v-model="projectGroup.projectManager">
          <option v-for="option in managerOptions" :value="option.id" v-bind:key="option.id">
            {{option.group}}
          </option>
      </select>
    </div>
    <br/>
    <div class="d">
      <label>Select </label>
      <select v-model="projectGroup.projectWorkers">
          <option v-for="option in selectOptions" :value="option.id" v-bind:key="option.id">
            {{option.gr}}
          </option>
      </select>
    </div>
    <p v-if="error && submiting" class="error-message">
          Incorrect details
        </p>
        <p v-else>

        </p>
        <p v-if="success" class="success-message">
          Group added correctly
        </p>
        <button id="butt">Add group</button>
  </form>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { 
      submiting: false,
      error: false,
      success: false,
      projectGroup: {
        groupName: '',
        description: '',
        projectManager: 0,
        projectWorkers: 0
      },
      managerOptions: [
        {group: 'A', id: 1},
        {group: 'B', id: 2},
        {group: 'C', id: 3},
      ],
      selectOptions: [
        {gr: 'A', id: 1},
        {gr: 'B', id: 2},
        {gr: 'C', id: 3},
      ]
    }
  },
  methods: {
    handleSubmit()  {
      this.submiting = true
      this.clearStatus()
      if (this.invalidProjectManager || this.invalidProjectWorkers) {
        this.error = true
        return
      }
      this.error = false
      this.success = true
      this.submiting = false
    },
    clearStatus() {
      this.success = false
      this.error = false
    },
  },
  computed: {
    invalidProjectManager() {
      return this.projectGroup.projectManager === 0
    },
    invalidProjectWorkers() {
      return this.projectGroup.projectWorkers === 0
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
