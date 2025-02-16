<template>
  <div :class="$style.taskItem" ref="taskItemRef">
    <div :class="$style.taskItem__content">
      <div :class="$style.taskItem__main">
        <span :class="$style.taskItem__title">{{ task.title }}</span>
      </div>
      <div :class="$style.taskItem__info">
        <span :class="$style.taskItem__date">
          {{ new Date(task.createdAt).toLocaleDateString() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskItem',

    props: {
      task: {
        type: Object,
        required: true,
        validator(value) {
          return ['id', 'title', 'createdAt'].every(prop => prop in value);
        },
      },
    },
  };
</script>

<style module lang="scss" scoped>
  @use './TaskItem.module.scss' as taskItem;
</style>
