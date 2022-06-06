<template>
  <div id="calendar-view">
    <EventCalendar id="cal"/>
    <br/>
    <Tasks/>
  </div>
</template>

<script>
import EventCalendar from "@/components/calendar/EventCalendar";
import Tasks from "@/components/calendar/TasksComonent";
export default {
  firstName: "CalendarView",
  components: {EventCalendar, Tasks}
}
</script>

<style scoped>

#calendar-view {
  /*display: inline-flex;*/
}
#cal {
  padding-left: 50px;
  padding-right: 100px;
}
</style>