import { Module } from 'vuex';
import { Task, TaskState } from '@/types';
import { API_URL } from '@/config/api';

const state: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasks: Module<TaskState, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_TASKS(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task: Task) {
      state.tasks.push(task);
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },
    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        commit('SET_TASKS', tasks);
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch tasks');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createTask({ commit }, title: string) {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
        const task = await response.json();
        commit('ADD_TASK', task);
      } catch (error) {
        commit('SET_ERROR', 'Failed to create task');
      }
    },
  },
};

export default tasks;
