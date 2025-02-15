<template>
  <div :class="$style.loading">
    <span :class="$style.loading__text">
      <slot>Loading...</slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'LoadingState',
  };
</script>

<style module lang="scss">
  @use './LoadingState.module.scss' as loading;
</style>
