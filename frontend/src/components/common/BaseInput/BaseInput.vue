<template>
  <input
    :class="$style.input"
    :value="value"
    @input="handleInput"
    @keyup.enter="handleEnter"
    v-bind="$attrs"
    v-on="inputListeners"
  />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { debounce, type DebouncedFunction } from '@/utils/debounce';

  export default Vue.extend({
    name: 'BaseInput',

    inheritAttrs: false,

    props: {
      value: {
        type: String,
        default: '',
      },
      debounceTime: {
        type: Number,
        default: 300,
      },
    } as const,

    data() {
      return {
        debouncedInput: undefined as DebouncedFunction | undefined,
      };
    },

    computed: {
      inputListeners(): Record<string, any> {
        const { input, ...listeners } = this.$listeners;
        return listeners;
      },
    },

    created() {
      this.debouncedInput = debounce((value: string) => {
        this.$emit('input', value);
      }, this.debounceTime);
    },

    beforeDestroy() {
      this.debouncedInput?.cancel();
    },

    methods: {
      handleInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (this.debouncedInput) {
          this.debouncedInput(target?.value);
        }
      },

      handleEnter(event: KeyboardEvent): void {
        const target = event.target as HTMLInputElement;
        this.debouncedInput?.cancel();
        this.$emit('input', target.value);
        this.$emit('enter', target.value);
      },
    },
  });
</script>

<style module lang="scss" scoped>
  @use './BaseInput.module.scss' as error;
</style>
