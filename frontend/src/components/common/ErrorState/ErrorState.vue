<template functional>
  <div :class="$style.error">
    <slot>{{ props.message }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'ErrorState',
    functional: true,

    props: {
      message: {
        type: String,
        default: 'An error occurred',
      },
    },
  };
</script>

<style module lang="scss" scoped>
  @use './ErrorState.module.scss' as error;
</style>
