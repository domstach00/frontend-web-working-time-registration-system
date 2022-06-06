<template>
  <div id="task-list">
    <div class="item">
      <p>Assigments</p>
    </div>
<!--    <input type="text" placeholder="todo" v-model="newItem">-->
<!--    <input type="date" placeholder="startDate" v-model="startDate">-->
<!--    <input type="date" placeholder="endDate" v-model="endDate">-->
<!--    <button @click="addItem">Add</button>-->
    <div class="item" v-bind:class="{completed: item.completed}"
         v-for="item in items" v-bind:key="item.id">
      <h2>{{ item.description + " " + item.startDate + " - " + item.endDate + " " + item.idA }}</h2>
      <button v-if="(item.isComplete === 0)" @click="removeItem(item.idA)">Done</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  firstName: "Task-list",
  data() {
    return {
      newItem: '',
      startDate: '',
      endDate: '',
      projectGroupId: 1,
      items: []
    }
  },
  methods: {
    addItem() {
      axios({
        method: 'post',
        url: 'http://localhost:8090/api/v1/assigment',
        data: {
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          isComplete: 0,
          fk_projectGroup: 1
        }
      })
      this.items.push({ description: this.newItem, isComplete: false, id: Math.random()})
      this.newItem=''
    },
    removeItem(id) {
      const isDeleted = axios.post(`http://localhost:8090/api/v1/assigment/update-state?id=${id}`)
          .catch(error => console.log(error))
      const index = this.items.findIndex(el => el.idA === id)
      if (isDeleted)
        this.items[index].isComplete = true
    },
  },
  mounted() {
    axios.get('http://localhost:8090/api/v1/assigment/all').then(response => {
      this.items = response.data
      console.log(response.data)
    })
  }
}
</script>

<style scoped>
#task-list {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  border: 1px solid green;
  margin: 8px;
  padding: 10px;
}

input {
  margin: 10px;
}

.iscomplete {
  opacity: 0.5;
}

.completed h2 {
  text-decoration: line-through;
}
</style>