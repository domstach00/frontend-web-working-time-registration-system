<template>
  <div id="NewAssignment" class="small-container">
    <h1>Add new assignment</h1>
    <form @submit.prevent="handleSubmit">
      <label>Title </label>
      <br/>
      <input
        v-model="assignment.projectName"
        type="text"
      >
      <br/><br/>
      <label>Start date </label>
      <br/>
      <input
        v-model="assignment.startDate"
        type="date"
        :class="{ 'has-error': submiting && invalidDate }"
      >
      <br/><br/>
      <label>End date </label>
      <br/>
      <input
        v-model="assignment.endDate"
        type="date"
        :class="{ 'has-error': submiting && invalidDate }"
      >
      <br/><br/>

      <label>Project group </label>
      <br/>
      <select v-model="assignment.projectGroup">
        <option v-for="option in selectOptions" :value="option.idPG" v-bind:key="option.idPG">
          {{option.projectName}}
        </option>
      </select>
      <p v-if="error && submiting" class="error-message">
        Incorrect details
      </p>
      <p v-else>

      </p>
      <p v-if="success" class="success-message">
        Task added correctly
      </p>
      <button id="butt">Add task</button>
    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  firstName: "NewAssignment",
  data() {
    return {
      submiting: false,
      error: false,
      success: false,
      assignment: {
        projectName: '',
        startDate: new Date().toISOString().slice(0,10),
        endDate: new Date().toISOString().slice(0,10),
        idPG: 0
      },
      selectOptions: []
    }
  },
  methods: {
    handleSubmit()  {
      this.submiting = true
      this.clearStatus()
      if (this.invalidDate || this.invalidProjectGroup) {
        this.error = true
        return
      }
      this.error = false
      this.success = true
      this.submiting = false

      this.addAssigment()

      window.location.href = 'http://localhost:8080/calendar'

    },
    addAssigment() {
      axios({
        method: 'post',
        url: 'http://localhost:8090/api/v1/assigment',
        data: {
          description: this.assignment.projectName,
          startDate: this.assignment.startDate,
          endDate: this.assignment.endDate,
          isComplete: 0,
          fk_projectGroup: this.assignment.idPG
        }
      }).catch(() => {
        this.error = true
        console.log("Błędne dane")
      })
    },
    clearStatus() {
      this.success = false
      this.error = false
    },
  },
  computed: {
    invalidDate() {
      const firstDate = new Date(this.assignment.startDate)
      const sencondDate = new Date(this.assignment.endDate);
      return  firstDate.getDate() > sencondDate.getDate()
    },
    invalidProjectGroup() {
      return this.assignment.projectName === 0
    },
  },
  mounted() {
    axios.get('http://localhost:8090/api/v1/project-group/all').then(response => {
      this.selectOptions = response.data
    })
  }
}
</script>

<style scoped>
input, select {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 20%;
  background-color: #55c21e;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

#NewAssignment {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #26421b;
  margin-top: 60px;
}
form {
  margin-bottom: 2rem;
}
[class*='-message'] {
  font-weight: 500;
}
.error-message {
  color: #d33c40;
}
.success-message {
  color: #32a95d;
}
.small-container h5 {
  font-size: 20px;
}
#butt {
  font-size: 20px;
  margin-top: 15px;
  background-color: #3ba206;
}
</style>
