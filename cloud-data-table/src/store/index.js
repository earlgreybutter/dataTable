import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {  // data
    credentialForm: {
      
    },
  },
  getters: {
    getCredentialForm: function(state) {
      return state.credentialForm;
    }
  },
  mutations: {  // state 를 변화시킴
    setCredentialForm (state, payload) {
      state.credentialForm = payload;
      console.log(state.credentialForm);
    },
    addCredentialForm: (state, payload) => {  // insert & update
      state.credentialForm = payload;
      console.log(state.credentialForm);
    }
  },
  actions: {},
  modules: {},
});
