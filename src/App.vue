<template>
  <v-container>
    <user-list />
  </v-container>
</template>

<script>
  import VContainer from "./components/VContainer";
  import UserList from "./components/UserList/UserList";

  export default {
    components: {
      VContainer,
      UserList
    }
  }
</script>

<style lang="scss">
</style>
