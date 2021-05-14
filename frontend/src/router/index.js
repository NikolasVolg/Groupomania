import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Profil from '../views/Profil.vue';
import ModifyProfil from '../views/ModifyProfil.vue';
import Connect from '../views/Connect.vue';
import store from '../store/index';
//import { mapState } from "vuex";

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            required: true
        }
    },
    {
        path: '/profil',
        name: 'Profil',
        component: Profil,
        meta: {
            required: true
        }
    },
    {
        path: '/modifyProfil',
        name: 'ModifyProfil',
        component: ModifyProfil,
        meta: {
            required: true
        }
    },
    {
        path: '/connect',
        name: 'Connect',
        component: Connect
    }


];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {

    if (!to.meta.required) {
        next()
        return
    }
    if (store.state.user) {
        if (sessionStorage.getItem("token")) {
            //fetch()route userToken)
            next("/connect")
            return

        } else {
            next()
        }
    } else {
        next("/connect")
        return
    }
});

export default router;