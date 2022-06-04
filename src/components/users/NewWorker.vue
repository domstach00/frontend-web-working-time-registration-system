<template>
  <div class="addNewWorker">
    <h5>Add new worker</h5>
  </div>
  <br/>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name </label>
      <input type="text" placeholder="name">
    </div>
    <br/>
    <div>
      <label>Surname </label>
      <input type="text" placeholder="surname">
    </div>
    <br/>
    <div class="c">
      <label>Position </label>
      <select v-model="worker.position">
          <option v-for="option in positionOptions" :value="option.id" v-bind:key="option.id">
            {{option.group}}
          </option>
      </select>
    </div>
    <br/>
    <div>
      <label>Salary </label>
      <input type="number" v-model.number.trim="worker.salary">
    </div>
    <p v-if="error && submiting" class="error-message">
          Incorrect details
        </p>
        <p v-else>

        </p>
        <p v-if="success" class="success-message">
          Worker added correctly
        </p>
        <button id="butt">Add worker</button>
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
      worker: {
        name: '',
        surname: '',
        position: 0,
        salary: 0
      },
      positionOptions: [
        {group: 'A', id: 1},
        {group: 'B', id: 2},
        {group: 'C', id: 3},
      ]
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
    invalidPosition() {
      return this.worker.position === 0
    },
    invalidSalary() {
      return this.worker.salary <= 0
    }
  }

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
  .addNewWorker {
    font-weight: bold;
    font-size: 20px
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
