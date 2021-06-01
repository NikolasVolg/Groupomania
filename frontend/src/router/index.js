import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Profil from '../views/Profil.vue';
//import ModifyProfil from '../views/ModifyProfil.vue';
import Connect from '../views/Connect.vue';
import store from '../store/index';


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
    // {
    //     path: '/modifyProfil',
    //     name: 'ModifyProfil',
    //     component: ModifyProfil,
    //     meta: {
    //         required: true
    //     }
    // },
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
    if (to.meta.required) {

        const token = sessionStorage.getItem("token");

        if (token) {

            const options = {
                method: 'GET',
                headers: { authorization: `Bearer ${token}` }
            };

            fetch("http://localhost:3000/api/auth/users/token", options)
                .then(response => {
                    if (response.ok) {

                        return response.json();

                    } else {
                        Promise.reject(response.status);
                    }
                })
                .then(user => {
                    store.dispatch("login", user);
                    next();
                })
                .catch((e) => {
                    next("/connect");
                    console.error(e);
                });

        } else {
            next("/connect")
            return
        }
    }
});

export default router;