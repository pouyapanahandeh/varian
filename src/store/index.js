import Vue from 'vue'
import Vuex from 'vuex'
import JSONLevels from '@/assets/levels.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    levels: [],
    playerLevel: 1,
    playerScore: 1,
    playerName: ""
  },
  mutations: {
    SET_LEVELS: function (state, levels) {

      state.levels = levels;
    },
    SET_PLAYER_SCORE: function(state, score) {
      state.playerScore = score;
    },
    INC_LEVEL: function (state) {
      state.playerLevel++;
    }
  },
  actions: {
    addPlayerScore: function ({state , commit}, scoreAmount) {
      commit('SET_PLAYER_SCORE', state.playerScore + scoreAmount);
    },
    increasePlayerLevel: function ({commit}) {
      commit('INC_LEVEL');
    },
    parseLevels: async function({commit}) {
      commit('SET_LEVELS', JSONLevels);
    }
  }
})
