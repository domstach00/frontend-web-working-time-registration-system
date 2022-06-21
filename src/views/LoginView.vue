<template>

  <LoginForm loggedUser="loggedUser"/>
<!--  <button @click="cc">Klik</button>-->
</template>

<script>
import LoginForm from "@/components/login/LoginForm";
export default {
  components: {LoginForm},
  props: {
    loggedUser: Object
  },
  data() {
    return {
      user: Object
    }
  },
  methods: {
    getUser(user) {
      this.user = user
      // console.log(this.user())
    },
    cc() {
      console.log("WORK")
      console.log(this.user())
    }
  }
}

</script>

<style scoped>

</style>