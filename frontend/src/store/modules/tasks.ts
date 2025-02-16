import { Module } from 'vuex';
import type { Task, TaskState } from '@/types';
import type { RootState } from '@/types/store';
import { API_URL } from '@/config/api';

const createCacheKey = (tasks: Task[]): string => {
  return tasks.map(t => `${t.id}-${t.createdAt}`).join('|');
};

const tasks: Module<TaskState, RootState> = {
  namespaced: true,

  state: {
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
    lastCacheKey: '',
    sortedTasksCache: [] as Task[],
  },

  getters: {
    sortedTasks: (state): Task[] => {
      const currentCacheKey = createCacheKey(state.tasks);

      if (currentCacheKey === state.lastCacheKey) {
        return state.sortedTasksCache;
      }

      const sorted = [...state.tasks].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      state.lastCacheKey = currentCacheKey;
      state.sortedTasksCache = sorted;

      return sorted;
    },
  },

  mutations: {
    SET_TASKS(state, tasks: Task[]) {
      state.tasks = tasks;
      state.lastCacheKey = '';
    },

    ADD_TASK(state, task: Task) {
      state.tasks.push(task);
      state.lastCacheKey = '';
    },

    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },

    SET_ERROR(state, error: string | null) {
      state.error = error;
    },

    CLEAR_CACHE(state) {
      state.lastCacheKey = '';
      state.sortedTasksCache = [];
    },
  },

  actions: {
    async fetchTasks({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');

        const tasks = await response.json();
        commit('SET_TASKS', tasks);
      } catch (error) {
        commit('SET_ERROR', error instanceof Error ? error.message : 'Failed to fetch tasks');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createTask({ commit }, title: string) {
      commit('SET_ERROR', null);

      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        if (!response.ok) throw new Error('Failed to create task');

        const task = await response.json();
        commit('ADD_TASK', task);
        return task;
      } catch (error) {
        commit('SET_ERROR', error instanceof Error ? error.message : 'Failed to create task');
        throw error;
      }
    },
  },
};

export default tasks;
