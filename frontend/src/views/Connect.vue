<template>
<div>
    <b-container v-if="!isLogged">

        <b-col lg="8" class="mx-auto">
            <b-card class="cardConnex" title="Informations de connexion" header-tag="nav">

                <b-tabs card>

                    <!-- ONGLET CONNEXION -->
                    <b-tab title="Se connecter" active>
                        <Login/>
                        
                    </b-tab>
                    
                    <!-- ONGLET INSCRIPTION -->
                    <b-tab title="S'inscrire">
                        <Signup/>
                            
                    </b-tab>

                </b-tabs>

            </b-card>
        </b-col>

    </b-container>

</div>

</template>

<script>

//import { mapState } from "../store/index"

import Login from "../components/Login"
import Signup from "../components/Signup"

import { mapState } from "vuex"

export default {

    name:'Connect',

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
    
}

</style>