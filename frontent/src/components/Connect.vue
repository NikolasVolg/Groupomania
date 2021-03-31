<template>
<div>
    <b-container class="">
    <b-card v-if="!logged" class="cardConnex" title="Informations de connexion" header-tag="nav">

        <b-tabs card>
          <!-- ONGLET CONNEXION -->
            <b-tab title="Se connecter" active>

                <form ref="form" @submit.stop.prevent="handleSubmit">

                <b-form-group
                    id="input-group-1"
                    label="Email"
                    label-for="input-1"
                    invalid-feedback="Email is required">

                    <b-form-input
                        id="input-1"
                        type="email"
                        placeholder="Entrez votre email"
                        required>
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Mot de passe"
                    label-for="name-input"
                    invalid-feedback="Password is required">

                    <b-form-input
                        id="name-input"
                        placeholder="Entrez votre mot de passe"
                        required>
                    </b-form-input>
                </b-form-group>

                <div class="d-flex justify-content-end align-self-center pl-1 pr-1">
                    <b-button class="m-1" variant="success" type="submit">Se connecter</b-button>
                </div>

                </form>

            </b-tab>
            
            <!-- ONGLET INSCRIPTION -->
            <b-tab title="S'inscrire">

                <form ref="form" @submit.stop.prevent="handleSubmit">

                    <b-form-group
                        label="Nom"
                        label-for="name-input"
                        invalid-feedback="Name is required">

                        <b-form-input
                            id="name-input"
                            placeholder="Entrez votre nom"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Prénom"
                        label-for="prenom-input"
                        invalid-feedback="Prenom is required">

                        <b-form-input
                            id="prenom-input"
                            placeholder="Entrez votre nom"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="input-group-1"
                        label="Email"
                        label-for="input-1">

                        <b-form-input
                            id="input-1"
                            type="email"
                            placeholder="Entrez votre email"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Mot de passe"
                        label-for="name-input"
                        invalid-feedback="Password is required"
                        description="Minimum 8 caractères, une majuscule et 1 chiffres">

                        <b-form-input
                            id="name-input"
                            placeholder="Entrez votre mot de passe"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <div class="d-flex justify-content-end align-self-center pl-1 pr-1">
                        <b-button class="m-1" type="submit" variant="success">S'inscrire</b-button>
                    </div>

                </form>
                
            </b-tab>

        </b-tabs>

    </b-card>
    </b-container>

</div>

</template>

<script>

export default {

    name:'Connect',

    data () {
        return {
            logged: false
        }
    },

    methods: {
            handleSubmit() {
                this.logged = true
            } 
    }
}

</script>

<style>

.cardConnex {
    margin-top: 2rem;
}


</style>