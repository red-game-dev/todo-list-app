import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks';
import errors from './modules/errors';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    errors,
    tasks,
  },
});
