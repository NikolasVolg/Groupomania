import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        sessionStorage: "",
        isAdmin: false,
        logged: false,

    },

    mutations: {

        setLogged(state, isLogged) {
            state.logged = isLogged;
        },

        setUser(state, user) {
            state.user = user;
        }

    },

    actions: {
        login(context, user) {
            context.commit("setLogged", true);
            context.commit("setUser", user);
        }
    },

    modules: {

    }

});