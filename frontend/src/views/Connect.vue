<template>
<div>
    <b-container class="">
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
    </b-container>

</div>

</template>

<script>
import Login from "../components/Login"
import Signup from "../components/Signup"


export default {


    name:'Connect',

    components: {
        Login,
        Signup
    }
     
}

</script>

<style>

.cardConnex {
    margin-top: 2rem;
}

</style>