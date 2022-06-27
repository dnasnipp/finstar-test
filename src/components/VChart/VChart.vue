<template>
  <div class="canvas-container" ref="container">
    <canvas ref="canvas"></canvas>
    <div class="canvas-labels">
      <span
          v-for="label in props.labels"
          :key="label"
      >
        {{label}}
      </span>
    </div>
  </div>
  <br>
  <br>
</template>


<script setup>
  import {onBeforeUnmount, onMounted, ref, defineProps, onUpdated} from "vue";
  import {useStore} from "vuex";
  import {getAxisController, getStepsController, getValueController} from "@/components/VChart/utils";

  const store = useStore();

  const container = ref(null);
  const canvas = ref(null);
  const gl = ref(null);

  const stepsControllerRef = ref(null);
  const axisControllerRef = ref(null);
  const valueControllerRef = ref(null);

  const props = defineProps(['values', 'labels']);

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


  const draw = () => {
    gl.value.clear(gl.value.COLOR_BUFFER_BIT);

    stepsControllerRef.value.draw();
    valueControllerRef.value.draw();
    axisControllerRef.value.draw();
  }

  onMounted(() => {
    if(canvas.value === null || container.value === null) return;

    gl.value = canvas.value.getContext('webgl', {
      premultipliedAlpha: false,
      alpha: true
    });

    gl.value.enable(gl.value.BLEND);
    gl.value.blendFunc(gl.value.SRC_ALPHA, gl.value.ONE_MINUS_SRC_ALPHA);

    setSizes();
    window.addEventListener('resize', setSizes);

    const axisController = getAxisController(gl.value);
    const stepsController = getStepsController(gl.value);
    const valueController = getValueController(gl.value);

    stepsControllerRef.value = stepsController;
    valueControllerRef.value = valueController;
    axisControllerRef.value = axisController;

    valueController.setData(props.values, 25);
    stepsController.setStepsCount(15);

    draw();
  });

  onUpdated(() => {
    valueControllerRef.value.setData(props.values, 25);
    draw();
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setSizes);
  });

</script>

<style scoped lang="scss">
  .canvas-container {
    width: 100%;
    height: 400px;
    overflow: visible;
    position: relative;
  }

  .canvas-labels {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translateY(200%);
    font-weight: bold;
    font-size: 1.2rem;

    & span {
      flex-basis: 100%;
      display: block;
      text-align: center;
    }
  }
</style>