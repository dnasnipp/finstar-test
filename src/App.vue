<template>
  <v-container>
    <user-list />
    <v-chart/>
  </v-container>
</template>

<script>
  import VContainer from "@/components/VContainer";
  import UserList from "@/components/UserList/UserList";
  import VChart from "@/components/VChart/VChart";

  export default {
    components: {
      VContainer,
      UserList,
      VChart
    }
  }
</script>

<style lang="scss">
</style>
