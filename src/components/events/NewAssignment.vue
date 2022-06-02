<template>
  <div id="NewAssignment" class="small-container">
    <h5>Add new assignment</h5>
    <form @submit.prevent="handleSubmit">
      <label>Description </label>
      <input
        v-model="assignment.description"
        type="text"
      >
      <br/><br/>
      <label>Start date </label>
      <input
        v-model="assignment.startDate"
        type="date"
        :class="{ 'has-error': submiting && invalidDate }"
      >
      <br/><br/>
      <label>End date </label>
      <input
        v-model="assignment.endDate"
        type="date"
        :class="{ 'has-error': submiting && invalidDate }"
      >
      <br/><br/>

      <label>Project group </label>
      <select v-model="assignment.projectGroup">
        <option v-for="option in selectOptions" :value="option.id" v-bind:key="option.id">
          {{option.group}}
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
      <button>Add task</button>
    </form>
  </div>

</template>

<script>
export default {
  name: "NewAssignment",
  data() {
    return {
      submiting: false,
      error: false,
      success: false,
      assignment: {
        description: '',
        startDate: new Date().toISOString().slice(0,10),
        endDate: new Date().toISOString().slice(0,10),
        projectGroup: 0
      },
      selectOptions: [
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
      if (this.invalidDate || this.invalidProjectGroup) {
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
    invalidDate() {
      const firstDate = new Date(this.assignment.startDate)
      const sencondDate = new Date(this.assignment.endDate);
      return firstDate.getDate() >= sencondDate.getDate()
    },
    invalidProjectGroup() {
      return this.assignment.projectGroup === 0
    },
  },
}
</script>

<style scoped>
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
</style>
