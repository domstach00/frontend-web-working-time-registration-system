<template>
  <div>
    <NewProjectGroup/>
    <AssignUsers/>
    <UsersInProject/>
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

</style>