<template>
  <input
    :class="$style.input"
    :value="value"
    @input="$emit('input', $event.target.value)"
    v-bind="$attrs"
    v-on="inputListeners"
  />
</template>

<script>
  export default {
    name: 'BaseInput',

    inheritAttrs: false,

    props: {
      value: {
        type: String,
        default: '',
      },
    },

    computed: {
      inputListeners() {
        const { input, ...listeners } = this.$listeners;
        return listeners;
      },
    },
  };
</script>

<style module lang="scss">
  @use './BaseInput.module.scss' as error;
</style>
