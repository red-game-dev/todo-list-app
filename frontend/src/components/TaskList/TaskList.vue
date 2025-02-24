<template>
  <div :class="$style.taskList">
    <BaseInput
      v-model="newTask"
      :debounceTime="300"
      animated
      @enter="handleCreateTask"
      placeholder="Add a new task..."
      :class="$style.taskList__input"
    />

    <div v-if="hasErrors" :class="$style.taskList__error">
      <ErrorState :message="latestError.message" />
    </div>

    <LoadingState v-if="loading" />

    <div :class="$style.taskList__container">
      <div :class="$style.taskList__items">
        <TaskItem v-for="task in sortedTasks" :key="task.id" :task="task" ref="taskItems" />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState, mapGetters, mapActions } from 'vuex';
  import TaskItem from '../TaskItem/TaskItem.vue';
  import BaseInput from '../common/BaseInput/BaseInput.vue';
  import LoadingState from '../common/LoadingState/LoadingState.vue';
  import ErrorState from '../common/ErrorState/ErrorState.vue';
  import { fadeInTask } from '@/utils/animations';

  export default Vue.extend({
    name: 'TaskList',

    components: {
      TaskItem,
      BaseInput,
      LoadingState,
      ErrorState,
    },

    data() {
      return {
        newTask: '',
      };
    },

    computed: {
      ...mapState('tasks', ['loading']),
      ...mapGetters('tasks', ['sortedTasks']),
      ...mapGetters('errors', ['activeErrors', 'latestError']),

      hasErrors() {
        return this.activeErrors.length > 0;
      },
    },

    methods: {
      ...mapActions('tasks', {
        fetchTasks: 'fetchTasks',
        createTask: 'createTask',
      }),

      async handleCreateTask() {
        if (!this.newTask.trim()) return;

        try {
          await this.createTask(this.newTask);
          this.newTask = '';
          this.$nextTick(() => {
            const items = this.$refs.taskItems;
            if (items?.length > 0) {
              fadeInTask(items[0].$el);
            }
          });
        } catch (error) {
          console.error('Failed to create task:', error);
        }
      },
    },

    created() {
      this.fetchTasks();
    },
  });
</script>

<style module lang="scss" scoped>
  @use './TaskList.module.scss' as taskList;
</style>
