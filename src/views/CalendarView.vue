<template>
  <div id="calendar-view">
    <EventCalendar id="calId"/>
    <br/>
    <Tasks id="tasksId"/>
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

#calId {
  padding: 50px;
  width: 60%;
  float: left;
}

#tasksId {
  float: left;
  width: 30%;
}
</style>