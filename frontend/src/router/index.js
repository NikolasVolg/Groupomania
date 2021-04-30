import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Profil from '../views/Profil.vue';
import ModifyProfil from '../views/ModifyProfil.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/profil',
        name: 'Profil',
        component: Profil
    },
    {
        path: '/modifyProfil',
        name: 'ModifyProfil',
        component: ModifyProfil
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;