import { Module } from 'vuex';
import type { ErrorState, ErrorNotification, RootState } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const errors: Module<ErrorState, RootState> = {
  namespaced: true,

  state: {
    notifications: [],
  },

  getters: {
    activeErrors: state => {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      return state.notifications.filter(notification => notification.timestamp > fiveMinutesAgo);
    },

    latestError: state => {
      return state.notifications[state.notifications.length - 1];
    },

    hasActiveErrors: (_state, getters) => {
      return getters.activeErrors.length > 0;
    },
  },

  mutations: {
    ADD_ERROR(state, notification: ErrorNotification) {
      state.notifications.push(notification);
      if (state.notifications.length > 10) {
        state.notifications.shift();
      }
    },

    REMOVE_ERROR(state, id: string) {
      state.notifications = state.notifications.filter(notification => notification.id !== id);
    },

    CLEAR_ERRORS(state) {
      state.notifications = [];
    },
  },

  actions: {
    addError({ commit }, { message, type = 'error', context }: Partial<ErrorNotification>) {
      const notification: ErrorNotification = {
        id: uuidv4(),
        message: message || 'An error occurred',
        type,
        timestamp: Date.now(),
        context,
      };
      commit('ADD_ERROR', notification);
      return notification.id;
    },

    removeError({ commit }, id: string) {
      commit('REMOVE_ERROR', id);
    },

    clearErrors({ commit }) {
      commit('CLEAR_ERRORS');
    },
  },
};

export default errors;
