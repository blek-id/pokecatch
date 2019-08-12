import Vue from 'vue';
import Vuex from 'vuex';
import pokemon from './modules/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    IS_LOADING: (state => state.isLoading),
  },
  mutations: {
    SET_IS_LOADING: (state, payload) => {
      state.isLoading = payload;
    },
  },
  actions: {

  },
  modules: {
    pokemon,
  },
});
