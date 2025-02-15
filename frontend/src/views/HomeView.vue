<template>
  <div class="home">
    <h1 class="title">My Todo List</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TaskList from '@/components/TaskList/TaskList.vue';

  @Component({
    components: {
      TaskList,
    },
  })
  export default class HomeView extends Vue {}
</script>
