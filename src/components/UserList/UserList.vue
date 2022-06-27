<template>
  <v-section>
    <v-h>Список пользователей</v-h>

    <div class="user-list-wrapper">
      <div class="users-empty" v-if="!store.getters.getUsers.length">
        <span>Пользователей нет :c</span>
      </div>
      <ul class="users-list" v-else>
        <li
            class="users-item"
            v-for="user in store.getters.getUsersSortedByCompletedPosts"
            :key="user.id"
        >
          <user-card :user="user" />
        </li>
      </ul>
    </div>

    <v-button
        @click="loadUsers"
        :class="{loading: isLoading}"
    >
      {{ store.getters.getUsers.length ? 'Обновить' : 'Загрузить' }}
    </v-button>
  </v-section>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";

  const store = useStore();
  const isLoading = ref(false);

  const loadUsers = async () => {
    if(isLoading.value) return;

    isLoading.value = true;

    await store.dispatch('loadPosts');

    isLoading.value = false;
  }

</script>

<script>
  // Не люблю добавлять V перед компонентами, знаю так многие делают, но в данном случае это было использовано только для того,
  // чтобы отличать от нативных тегов <section>, <h>
  import VSection from "@/components/VSection";
  import VH from "@/components/VH";
  import VButton from "@/components/VButton";
  import UserCard from "@/components/UserList/UserCard";

  export default {
    components: {
      VSection,
      VH,
      VButton
    }
  }

</script>

<style scoped lang="scss">
  .user-list-wrapper {
    margin-bottom: 2rem;
  }

  .users-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: -3rem;
    margin-top: -3rem;
  }

  .users-item {
    margin-left: 3rem;
    margin-top: 3rem;
    flex-basis: calc(33.333% - 3rem);

    @include netbook {
      flex-basis: calc(50% - 3rem);
    }

    @include mobile {
      flex-basis: 100%;
    }
  }

  .users-empty {
    width: 100%;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    position: relative;

    &>span {
      color: $ghostContrastMainColor;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &::before {
      content: "";
      display: block;
      padding-top: 40%;
    }
  }
</style>