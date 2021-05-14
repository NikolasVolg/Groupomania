<template>
    <div>

        <b-container
        class="justify-content-md-center mt-5 profil"
        style="max-width: 20rem;">


                <div class="avatar mx-auto">
                    <b-avatar text="GM" size="200px"></b-avatar>
                    
                </div>

                <div class="infoPerso  mx-auto">
                    <p>Prénom : {{ user.firstName }}</p>
                    <p>Nom : {{ user.lastName }}</p>

                    <p>Email : {{ user.email }}</p>

                </div>

                <button to="/modifyProfil" class="modifier mx-auto">Modifier</button>
                <button class="delete mx-auto">Supprimer mon compte</button>
    
    
        </b-container>

    </div>
</template>

<script>

import { mapState } from "vuex"

export default {

    name: 'Profil',

    computed: mapState ({
            user: state => state.user
    })           
};

</script>

<style>

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
    border: 1px solid black;
    border-radius: 15px;
    padding: 15px;
}

.infoPerso p {
    font-size: 1.2rem;
}

    



</style>