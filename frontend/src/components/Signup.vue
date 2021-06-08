<template>

    <form ref="form" @submit.stop.prevent="signUp">

        <b-form-group
            label="Nom"
            label-for="lastName"
            invalid-feedback="Name is required">

            <b-form-input
                id="lastName"
                placeholder="Entrez votre nom"
                v-model="lastName"
                required>
            </b-form-input>
        </b-form-group>

        <b-form-group
            label="Prénom"
            label-for="firstName"
            invalid-feedback="Prenom is required">

            <b-form-input
                id="firstName"
                placeholder="Entrez votre prénom"
                v-model="firstName"
                required>
            </b-form-input>
        </b-form-group>

        <b-form-group
            label="Email"
            label-for="email"
            invalid-feedback="Email is required">

            <b-form-input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                v-model="email"
                required>
            </b-form-input>
        </b-form-group>

        <b-form-group
            type="password"
            label="Mot de passe"
            label-for="password"
            invalid-feedback="Password is required">

            <b-form-input
                id="password"
                placeholder="Entrez votre mot de passe"
                v-model="password"
                required>
            </b-form-input>

            <span class="directiveMDP">Minimum 8 caractères, une majuscule, une minuscule et 1 chiffres. Symbole et espace interdit.</span>
        </b-form-group>

        <div class="d-flex justify-content-end align-self-center pl-1 pr-1">
            <button class="connexBtn" type="submit">S'inscrire</button>
        </div>

    </form>

</template>

<script>

export default {

    name: "Signup",

    data() {
        return {
            lastName: "",
            firstName: "",
            email: "",
            password: ""
        }
    },

    methods: {
        
        signUp() { 

            const contact = {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                password: this.password
            };

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
                };

                fetch("http://localhost:3000/api/auth/signup", requestOptions)

                    .then(response => { 
                        
                        if (response.ok) {
                            
                            return response.json();

                        } else {
                            Promise.reject(response.status);
                        }
                    })
                    .then(() => {
                        window.alert("vous êtes bien enregistré. Vous pouvez vous connecté.");
                        this.lastName = "";
                        this.firstName = "";
                        this.email = "";
                        this.password = "";
                    });
        }
    }
}

</script>

<style>
.directiveMDP {
    color: #fff;
}
</style>
