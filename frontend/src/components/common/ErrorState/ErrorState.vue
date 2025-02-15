<template>
  <div :class="$style.error">
    <slot>{{ message }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'ErrorState',

    props: {
      message: {
        type: String,
        default: 'An error occurred',
      },
    },
  };
</script>

<style module lang="scss">
  @use './ErrorState.module.scss' as error;
</style>
