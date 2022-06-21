<template>
  <div id="task-list">
    <div class="item">
      <h2 id="AssigmentsId">Assigments</h2>
    </div>
    <div class="item" v-bind:class="{completed: item.isComplete}"
         v-for="item in items" v-bind:key="item.id">
      <h2>{{ item.description}}</h2>
      <p id="assigmentDate">{{item.startDate + " - " + item.endDate}}</p>
      <button v-if="(item.isComplete === 0)" @click="removeItem(item.idA)" class="button">Done</button>
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

#AssigmentsId {
  text-align: center;
  font-family: Avenir, sans-serif;
}

#assigmentDate {
  text-align: center;
}

.item {
  border: 1px solid green;
  margin: 8px;
  padding: 10px;
}

input {
  margin: 10px;
}

.completed {
  opacity: 0.5;
}

.completed h2 {
  text-decoration: line-through;
}

.button {
  width: 20%;
  height: 5%;
  background-color: #55c21e;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>