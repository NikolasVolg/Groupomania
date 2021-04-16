<template>
    <div>

        <b-jumbotron class="container-fluid" header="Profil">
            <div class="profil">

                <div class="avatar">
                    <b-avatar src="https://placekitten.com/300/300" size="200px"></b-avatar>
                    <button class="modifier">Modifier</button>
                </div>

                <div class="infoPerso">
                    <p>Prénom : {{ firstName }}</p>
                    <p>Nom : {{ lastName }}</p>

                    <p>Email : {{ email }}</p>
                    <p>Mot de passe : {{ password }}</p>
                </div>

                <div>
                    <label for="story"></label>

                    <textarea id="story" name="story" cols="33">
                    It was a dark and stormy night...
                    </textarea>
                </div>
    
            </div>
        </b-jumbotron>

    </div>
</template>

<script>
export default {
    name: 'Profil',

    data () {
        return { 

        firstName: "Niko",
        lastName: "Volg",
        email: "moi@remoi.com",
        password:"********"

        }
    }
}

</script>

<style>

.profil{
    display: flex;
}

.avatar{
    display: flex;
    flex-direction: column;
}

.modifier{
    width: 200px;
    height: 40px;
    margin-top: 15px;
    border-radius: 30px;
    border: 0;
    background-color: #091f43;
    color: #fff;
    font-weight: bold;
}

.infoPerso{
    margin: 0 50px 0 50px;
    border: 1px solid #fff;
    border-radius: 15px;
    padding: 15px;
}

.infoPerso p{
    font-size: 1.2rem;
}

</style>