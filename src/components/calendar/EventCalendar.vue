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
// import { , createEventId } from './event-utils'

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
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: []
    }
  },
  computed: {

  },
  methods: {
    // handleWeekendsToggle() {
    //   this.calendarOptions.weekends = !this.calendarOptions.weekends
    // },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a title for event')
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
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
          id: 6,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          // allDay: selectInfo.allDay
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
        for (let i =0; i < response.data.length; i++) {
          this.renameKey(response.data[i], 'idE', 'id')
          this.renameKey(response.data[i], 'startDate', 'start')
          this.renameKey(response.data[i], 'endDate', 'end')
          this.renameKey(response.data[i], 'description', 'title')
        }
        console.log(response.data)
        this.calendarOptions.initialEvents = response.data
      }).catch(err => {
        console.log(err)
      })
        // var x = [{
        //   id: 1,
        //   start: '2022-06-06',
        //   end: '2022-06-06',
        //   title: 'dsaedadsa'
        // }]

      // console.log(model_event)
      // this.calendarOptions.initialEvents = model_event
      console.log(this.calendarOptions.initialEvents)
    }
  },
  mounted() {
    this.getEventsFromAPI()
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
