<template>
  <button
      class="button"
      :class="{loading: props.loading}"
  >
    <slot></slot>
  </button>
</template>

<script setup>
  import {defineProps} from "vue";

  const props = defineProps(['loading']);


</script>

<style scoped lang="scss">

.button {
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  background: $themeColor;
  color: $contrastMainColor;
  padding: 1em 2em;
  border: 2px solid $themeColor;
  outline: none;
  cursor: pointer;
  transition: color .3s, background-color .3s;
  will-change: color, background-color;
  position: relative;

  &:hover {
    color: $themeColor;
    background-color: transparent;
  }

  &::before, &::after {
    content: "";
    display: none;
    position: absolute;
    z-index: 2;
  }

  &::before {
    left: -2px;
    top: -2px;
    right: -2px;
    bottom: -2px;
    background-color: $mainColor;
  }

  &::after {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: $themeColor;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: loading 2s infinite ease-out;
  }
}


// Не люблю большое дерево вложенности в SASS. Позволяю себе писать &.loading и тд в случаях когда мало кода.
// Иногда на старых проектах получалось так, что дерево вложенности слишком большое выходило из-за кучи модификаторов на элементах.

.button.loading {
  cursor: not-allowed;

  &::before, &::after {
    display: block;
  }
}

</style>

