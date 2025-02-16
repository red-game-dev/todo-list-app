<template>
  <div :class="$style.taskItem" ref="taskItemRef" :data-task-id="task.id">
    <div :class="$style.taskItem__content">
      <div :class="$style.taskItem__main">
        <span :class="$style.taskItem__title" :title="task.title">{{ task.title }}</span>
      </div>
      <div :class="$style.taskItem__info">
        <span :class="$style.taskItem__date" :title="formattedDateFull">
          {{ formattedDateTime }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Task } from '@/types';
  import { DateformattedDateFull, DateformattedDateTime, DateTimeAgo } from '@/utils/date';
  import Vue, { PropType } from 'vue';

  const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const DATE_FORMAT_OPTIONS_SHORT: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  interface TaskItemMethods {
    shouldComponentUpdate(nextProps: { task: Task }): boolean;
  }

  interface TaskItemComputed {
    dateObj: Date;
    formattedDateTime: string;
    formattedDateFull: string;
    timeAgo: string;
  }

  interface TaskItemProps {
    task: Task;
  }

  interface TaskItemData {
    taskId: string | null;
  }

  export default Vue.extend<TaskItemData, TaskItemMethods, TaskItemComputed, TaskItemProps>({
    name: 'TaskItem',

    props: {
      task: {
        type: Object as PropType<Task>,
        required: true,
        validator(value: Task): boolean {
          return ['id', 'title', 'createdAt'].every(prop => prop in value);
        },
      },
    },

    data(): TaskItemData {
      return {
        taskId: null,
      };
    },

    computed: {
      dateObj(): Date {
        return new Date(this.task.createdAt);
      },

      formattedDateTime(): string {
        return DateformattedDateTime(this.dateObj, DATE_FORMAT_OPTIONS_SHORT, TIME_FORMAT_OPTIONS);
      },

      formattedDateFull(): string {
        return DateformattedDateFull(this.dateObj, DATE_FORMAT_OPTIONS);
      },

      timeAgo(): string {
        return DateTimeAgo(this.dateObj, DATE_FORMAT_OPTIONS_SHORT, TIME_FORMAT_OPTIONS);
      },
    },

    created() {
      this.taskId = this.task.id;
    },

    methods: {
      shouldComponentUpdate(nextProps: { task: Task }): boolean {
        return (
          this.task.id !== nextProps.task.id ||
          this.task.title !== nextProps.task.title ||
          this.task.createdAt !== nextProps.task.createdAt
        );
      },
    },
  });
</script>

<style module lang="scss">
  @use './TaskItem.module.scss' as taskItem;
</style>
