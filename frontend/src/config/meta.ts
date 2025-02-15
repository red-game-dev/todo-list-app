export const metaInfo = (title: string) => ({
  title,
  titleTemplate: '%s | Task Management App',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'A simple and efficient todo list application to manage your daily tasks',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: 'todo list, task management, productivity, tasks, todo',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `${title} Task Management App`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'A simple and efficient todo list application to manage your daily tasks',
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website',
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: `${title} - Task Management App`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: 'A simple and efficient todo list application to manage your daily tasks',
    },
  ],
});
