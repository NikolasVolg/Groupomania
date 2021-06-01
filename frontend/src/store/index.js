import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        isAdmin: 0,
        logged: false,
    },

    mutations: {

        setLogged(state, isLogged) {
            state.logged = isLogged;
        },

        setUser(state, user) {
            state.user = user;
        },

        setAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        }

    },

    actions: {

        login(context, user) {
            context.commit("setLogged", true);
            context.commit("setUser", user);
            context.commit("setAdmin", 1);
            sessionStorage.setItem("token", user.token);
        }

    },

    modules: {

    }

});