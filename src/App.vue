<template>
  <v-container>
    <user-list />
    <v-chart
        :values="store.getters.getUsersPostsValues"
        :labels="store.getters.getUsersLabels"
    />
  </v-container>
</template>

<script setup>
  import {useStore} from "vuex";

  const store = useStore();
</script>

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
