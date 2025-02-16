<template functional>
  <div :class="$style.loading">
    <span :class="$style.loading__text">
      <slot>Loading...</slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'LoadingState',
    functional: true,
  };
</script>

<style module lang="scss" scoped>
  @use './LoadingState.module.scss' as loading;
</style>
