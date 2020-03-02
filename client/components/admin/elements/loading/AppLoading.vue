<template>
  <svg
    viewBox="25 25 50 50"
    :class="['circular', $style.circular]"
  >
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      :class="['path', $style.circular__path]"
      :style="{ stroke: color }"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" module>
.circular {
  height: 28px;
  width: 28px;

  animation: loading-rotate 2s linear infinite;

  &__path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke-linecap: round;
  }
}

@keyframes loading-rotate {
  to {
    transform: rotate(1turn);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
