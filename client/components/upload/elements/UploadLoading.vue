<template>
  <div :class="$style.item">
    <AppLoading />
  </div>
</template>

<script>
import AppLoading from '~/components/elements/loading/AppLoading'

export default {
  components: {
    AppLoading
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.item {
  cursor: progress;
  border: 4px solid transparent;
  position: relative;
  background-color: rgba(0, 86, 132, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  /deep/ svg {
    height: 45px;
    width: 45px;
  }
}
</style>
