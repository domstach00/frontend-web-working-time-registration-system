<template>
  <div id="about">
    <a href="http://localhost:8080/calendar" class="kafelek">
      <img src="../../public/calendarImg.png" alt="Calendar" id="idCal" class="kafelek"/>
    </a>
    <a href="http://localhost:8080/new-worker" class="kafelek">
      <img src="../../public/workerImg.jpg" alt="Worker" id="idWorker" class="kafelek"/>
    </a>
    <a href="http://localhost:8080/new-project-group" class="kafelek">
      <img src="../../public/projectGroupImg.png" alt="Project Group" id="idProjectGroup" class="kafelek">
    </a>
    <a href="http://localhost:8080/new-assignment" class="kafelek">
      <img src="../../public/assigmentImg.png" alt="Assigment" id="idAssigment" class="kafelek"/>
    </a>
  </div>
</template>

<script>

</script>

<style>

#about {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.kafelek {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  display: inline-block;
  padding: 30px;
  float: left;
  transition: transform .2s;
  height: 400px;
  width: 500px;
}

.kafelek:first-of-type {
  padding-left: 15%;
}

.kafelek:nth-of-type(3) {
  clear: left;
  padding-left: 15%;
}

.kafelek:hover {
  transform: scale(1.1);
  -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
  filter: grayscale(0%);
}

</style>
