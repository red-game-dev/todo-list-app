import { Module } from 'vuex';
import type { Task, TaskState, RootState } from '@/types';
import { API_URL } from '@/config/api';
import { handleApiError } from '@/utils/api';

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
    async fetchTasks({ commit, dispatch }) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      dispatch('errors/clearErrors', null, { root: true });

      try {
        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) {
          await handleApiError(response);
        }

        const tasks = await response.json();
        commit('SET_TASKS', tasks);
      } catch (error) {
        let errorMessage: string;
        let errorType: 'error' | 'warning';

        if (error instanceof Error) {
          const status = (error as any).status;
          errorType = status === 400 || status === 422 ? 'warning' : 'error';
          errorMessage = error.message;
        } else {
          errorType = 'error';
          errorMessage = 'Failed to fetch tasks';
        }

        commit('SET_ERROR', errorMessage);
        dispatch(
          'errors/addError',
          {
            message: errorMessage,
            type: errorType,
            context: 'fetch_tasks',
          },
          { root: true }
        );
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createTask({ commit, dispatch }, title: string) {
      commit('SET_ERROR', null);
      dispatch('errors/clearErrors', null, { root: true });

      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        if (!response.ok) {
          await handleApiError(response);
        }

        const task = await response.json();
        commit('ADD_TASK', task);
        return task;
      } catch (error) {
        let errorMessage: string;
        let errorType: 'error' | 'warning';

        if (error instanceof Error) {
          const status = (error as any).status;
          errorType = status === 400 || status === 422 ? 'warning' : 'error';
          errorMessage = error.message;
        } else {
          errorType = 'error';
          errorMessage = 'Failed to create task';
        }

        commit('SET_ERROR', errorMessage);
        dispatch(
          'errors/addError',
          {
            message: errorMessage,
            type: errorType,
            context: 'create_task',
          },
          { root: true }
        );
        throw error;
      }
    },
  },
};

export default tasks;
