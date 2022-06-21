<template>
  <div id="projectPage">
    <NewProjectGroup id="idNewProjectGroup"/>
    <AssignUsers id="idAssignUser"/>
    <UsersInProject id="idUsersInProject"/>
  </div>
</template>

<script>
import NewProjectGroup from "@/components/projectGroups/NewProjectGroup";
import AssignUsers from "@/components/projectGroups/AssignUsers";
import UsersInProject from "@/components/projectGroups/UsersInProject";
export default {
  firstName: "NewProjectGroupView",
  components: {NewProjectGroup, AssignUsers, UsersInProject}
}
</script>

<style scoped>


#projectPage {
  text-align: center;
  display: inline;

}

#idNewProjectGroup {
}

#idAssignUser {
}

#idUsersInProject {

}
</style>