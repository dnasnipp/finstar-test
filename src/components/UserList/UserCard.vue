<template>
  <article class="user-card">
    <div class="user-card__top">
      <h6 class="user-card__name">
        Пользователь: {{user.id}}
      </h6>
      <div class="user-card__count">
        <span class="user-card__count-success">
          {{getCompletedPosts.length}}
        </span>
        |
        <span class="user-card__count-error">
          {{getIncompletedPosts.length}}
        </span>
      </div>
    </div>
    <ul class="user-card__posts">
      <li
          class="user-card__post"
          v-for="post in user.posts"
          :key="post.id"
      >
        {{ post.title }}
      </li>
    </ul>
  </article>
</template>

<script setup>
  import {computed, defineProps} from "vue";
  import {calculateCompletedPosts, calculateIncompletedPosts} from "../../store/users";

  const props = defineProps(['user']);

  const getCompletedPosts = computed(() => {
    return calculateCompletedPosts(props.user);
  });

  const getIncompletedPosts = computed(() => {
    return calculateIncompletedPosts(props.user);
  });

</script>

<style scoped lang="scss">

  .user-card {
    height: 100%;
    padding: 3rem 5%;
    box-shadow: 0 0 1rem 0 rgba(0,0,0,.5);
  }

  .user-card__top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.3rem;
    border-bottom: 1px solid $ghostContrastMainColor;
  }

  .user-card__name {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .user-card__count {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .user-card__count-success {
    margin-right: 1rem;
    color: $successColor;
  }

  .user-card__count-error {
    margin-left: 1rem;
    color: $errorColor;
  }

  .user-card__posts {}

  .user-card__post {
    font-size: 1.2rem;
    padding: 1rem;
    border-bottom: 1px solid $ghostContrastMainColor;
    transition: background-color .3s;

    &:hover {
      background-color: $ghostContrastMainColor;
    }
  }

</style>