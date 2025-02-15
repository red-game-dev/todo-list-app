<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { metaInfo } from '@/config/meta';

  @Component({
    metaInfo: metaInfo('My Todo List'),
  })
  export default class App extends Vue {}
</script>
