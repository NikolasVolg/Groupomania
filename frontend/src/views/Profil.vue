<template>
    <div>
        <b-container
        class="justify-content-md-center mt-5 profil"
        style="max-width: 20rem;">

                <div class="avatar mx-auto">
                    <b-avatar text="GM" size="200px"></b-avatar>
                    
                </div>

                <div class="infoPerso  mx-auto">
                    <p><span>Prénom :</span> {{ user.firstName }}</p>
                    <p><span>Nom :</span> {{ user.lastName }}</p>

                    <p><span>Email :</span> {{ user.email }}</p>

                </div>

                <!-- <button to="/modifyProfil" class="modifier mx-auto">Modifier</button> -->
                <button class="delete mx-auto" @click="supprimer">Supprimer mon compte</button>
       
        </b-container>

    </div>
</template>

<script>

import { mapState } from "vuex"
import { fetchDeleteAccount } from '../api/user';

export default {
    name: 'Profil',

    computed: mapState ({
            user: state => state.user
    }),
    
    methods: {
        supprimer() {

            fetchDeleteAccount()
                .then(() => {
                    this.$router.push("connect")
                })
                .catch((e) => {
                    this.$router.push("/connect");
                    console.error(e);
                });
        }
    }    
};

</script>

<style>
span {
    font-weight: 700;
}
.avatar {
    margin-bottom: 20px;
}

.profil {
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;
    border: 1px solid black;
    border-radius: 10px;
    background-image: linear-gradient(120deg, #091f43 30%, #d1505a 100%) !important;
    color: #fff;
} 

.modifier {
    width: 200px;
    height: 40px;
    margin-top: 30px;
    border-radius: 30px;
    border: 0;
    background-color: #091f43;
    color: #fff;
    font-weight: bold;
}

.delete {
    width: 200px;
    height: 40px;
    margin-top: 30px;
    border-radius: 30px;
    border: 0;
    background-color: #d1515a;
    color: #fff;
    font-weight: bold;
}

.infoPerso {
    margin: 0 50px 0 50px;
    /*border: 1px solid black;
    border-radius: 15px;*/
    padding: 15px;
}

.infoPerso p {
    font-size: 1.2rem;
}
</style>