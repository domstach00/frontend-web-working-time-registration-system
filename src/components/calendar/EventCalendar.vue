<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
          class='demo-app-calendar'
          :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from "axios";

export default {
  components: {
    FullCalendar
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        },
        initialView: 'dayGridMonth',
        initialEvents: [],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
      },
      currentEvents: []
    }
  },
  computed: {

  },
  methods: {
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a title for event')
      let calendarApi = selectInfo.view.calendar
      // let eventType = prompt("Type of event: A - assigment, O - Day off")
      calendarApi.unselect() // clear date selection
      // if (title && eventType.toUpperCase() === "A") {
      //   axios({
      //     method: 'post',
      //     url: 'http://localhost:8090/api/v1/event',
      //     data: {
      //       description: title,
      //       startDate: selectInfo.startStr,
      //       endDate: selectInfo.endStr
      //     }
      //   })
      // }
      // else if (title && eventType.toUpperCase() === "O") {
      //   eventType.toUpperCase()
      // }
      if (title) {
        axios({
          method: 'post',
          url: 'http://localhost:8090/api/v1/event',
          data: {
            description: title,
            startDate: selectInfo.startStr,
            endDate: selectInfo.endStr
          }
        })
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        })
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        const isDeleted = axios.delete(`http://localhost:8090/api/v1/event?id='${clickInfo.event.title}'`)
        if (isDeleted)
          clickInfo.event.remove()

      }
    },
    renameKey( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    },
    handleEvents(events) {
      this.currentEvents = events
    },
    getEventsFromAPI() {
      const resp = axios.get('http://localhost:8090/api/v1/event/all')
      resp.then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.renameKey(response.data[i], 'idE', 'id')
          this.renameKey(response.data[i], 'startDate', 'start')
          this.renameKey(response.data[i], 'endDate', 'end')
          this.renameKey(response.data[i], 'description', 'title')
        }
        const plainObject = {...response.data};
        this.calendarOptions.initialEvents = plainObject// response.data
        console.log("Plain")
        console.log(plainObject)
        return response
      }).catch(err => {
        console.log(err)
      })
      console.log("Calendar:")
      console.log(this.calendarOptions.initialEvents)
    },
    setInitial(events) {
      this.calendarOptions.initialEvents = {...events}
    }
  },
  mounted() {
    this.calendarOptions.initialEvents = {...this.calendarOptions.initialEvents}
    console.log("MOUNTED")
    console.log(this.calendarOptions.initialEvents)
  },
  created() {
    const resp = axios.get('http://localhost:8090/api/v1/event/all')
    resp.then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.renameKey(response.data[i], 'idE', 'id')
        this.renameKey(response.data[i], 'startDate', 'start')
        this.renameKey(response.data[i], 'endDate', 'end')
        this.renameKey(response.data[i], 'description', 'title')
      }
      const plainObject = {...response.data};
     this.calendarOptions.initialEvents = plainObject// response.data
      this.currentEvents = plainObject
      console.log("Plain")
      console.log(plainObject)
      console.log("Calendar:")
      console.log(this.calendarOptions.initialEvents)
    }).catch(err => {
      console.log(err)
    })
    // console.log("Calendar:")
    // console.log(this.calendarOptions.initialEvents)
  }
}
</script>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b { /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: block;
  min-height: 30%;
  max-height: 50%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

</style>
