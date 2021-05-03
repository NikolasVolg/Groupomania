<template>
    <div>

        <b-jumbotron class="container-fluid" header="Profil">
            <div class="profil">

                <div class="avatar">
                    <form>
                        <div>
                            <label for="file">Sélectionnez votre fichier</label>
                            <input type="file" id="file" name="file" multiple>
                        </div>

                        <div>
                            <button>Ajouter</button>
                        </div>
                    </form>
                   <!-- input type file -->
                </div>

                <div class="infoPerso">
                    <!-- input nom prénom email mdp -->

                </div>

                <div>
                    <!-- bouton de sauvegarde -->
                </div>
    
            </div>
        </b-jumbotron>

    </div>
</template>

<script>
//import { mapState } from "vuex"

export default {

    name: 'ModifyProfil',

    data () {
        return {
 
        }
    },

    // computed: mapState ({
    //         user: state => state.user
    // })           
    
}

</script>

<style>

.profil {
    display: flex;
}

.avatar {
    display: flex;
    flex-direction: column;
}

.modifier {
    width: 200px;
    height: 40px;
    margin-top: 15px;
    border-radius: 30px;
    border: 0;
    background-color: #091f43;
    color: #fff;
    font-weight: bold;
}

.infoPerso {
    margin: 0 50px 0 50px;
    border: 1px solid #fff;
    border-radius: 15px;
    padding: 15px;
}

.infoPerso p {
    font-size: 1.2rem;
}

</style>