<template>
<div>
    <b-container v-if="!isLogged" class="container">
        <b-col lg="8" class="mx-auto">
            <b-card class="cardConnex" header-tag="nav" >

                <b-tabs v-model="tabIndex" card>

                    <!-- ONGLET CONNEXION -->
                    <b-tab title="Connexion" active :title-link-class="linkClass(0)">
                        <Login/>                        
                    </b-tab>
                    
                    <!-- ONGLET INSCRIPTION -->
                    <b-tab title="Créer un compte" :title-link-class="linkClass(1)">
                        <Signup/>                            
                    </b-tab>

                </b-tabs>

            </b-card>
        </b-col>
    </b-container>
</div>
</template>

<script>
import Login from "../components/Login"
import Signup from "../components/Signup"

import { mapState } from "vuex"

export default {
    name:'Connect',

    data() {
        return {
            tabIndex: 0
        }
    },

    methods: {
        linkClass(idx) {
            if (this.tabIndex === idx) {
                return ['bg-light', 'text-dark']
            } else {
                return ['bg-dark', 'text-light']
            }
        }
    },

    components: {
        Login,
        Signup
    },
    
    computed: mapState ({
            isLogged: state => state.isLogged
    }),

}
</script>

<style>
.cardConnex {
    margin-top: 2rem;
    background-image: linear-gradient(120deg, #091f43 30%, #d1505a 100%) !important;
}

label {
    color: #fff;
    font-size: 1.2rem;
}

.connexBtn {
    background: none;
    margin-top: 15px;
    border-radius: 5px;
    padding: 8px 10px 8px 10px;
    border: 1px solid #fff;
    color: #fff;
    transition: color 0.6s;
    transition: background-color 0.8s;
}

.connexBtn:hover {
    color: #d1505a;
    background-color: #fff;
}
</style>