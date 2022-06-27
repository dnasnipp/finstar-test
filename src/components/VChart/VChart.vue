<template>
  <div class="canvas-container" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
  <br>
  <br>
</template>


<script setup>
  import {useStore} from "vuex";
  import {onBeforeUnmount, onMounted, ref} from "vue";
  import {getAxisController, getStepsController} from "@/components/VChart/utils";

  const store = useStore();

  const container = ref(null);
  const canvas = ref(null);
  const gl = ref(null);

  const setSizes = () => {
    if(canvas.value === null || container.value === null) return;

    canvas.value.style.display = 'none';

    const width = container.value.clientWidth,
          height = container.value.clientHeight;

    canvas.value.width = width;
    canvas.value.height = height;

    gl.value.viewport(0,0,width,height);

    canvas.value.style.display = 'block';
  }

  onMounted(() => {
    if(canvas.value === null || container.value === null) return;

    gl.value = canvas.value.getContext('webgl', {
      premultipliedAlpha: false,
    });

    setSizes();
    window.addEventListener('resize', setSizes);

    const axisController = getAxisController(gl.value);
    const stepsController = getStepsController(gl.value);

    stepsController.setStepsCount(5);
    stepsController.draw();
    axisController.draw();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setSizes);
  });

</script>

<style scoped>
  .canvas-container {
    width: 100%;
    height: 400px;
  }
</style>