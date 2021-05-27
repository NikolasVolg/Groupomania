<template>
  
        <form ref="form" @submit.stop.prevent="logIn">

                <b-form-group           
                    label="Email"
                    label-for="emailInput"
                    invalid-feedback="Email is required">

                    <b-form-input
                        id="emailInput"
                        type="email"
                        placeholder="Entrez votre email"
                        v-model="email"
                        required>
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Mot de passe"
                    label-for="passwordInput"
                    invalid-feedback="Password is required">

                    <b-form-input
                        type="password"
                        id="passwordInput"
                        placeholder="Entrez votre mot de passe"
                        v-model="password"
                        required>
                    </b-form-input>
                </b-form-group>

                <div class="d-flex justify-content-end align-self-center pl-1 pr-1">
                    <b-button class="m-1" variant="success" type="submit">Se connecter</b-button>
                </div>

        </form>

</template>

<script>

export default {
    name: "Login",

    data() {

        return {
            email: "",
            password: ""
        }
    },

    methods: {
        logIn() {
        
            const contact = {
                email: this.email,
                password: this.password
            };


            const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
            };

            fetch("http://localhost:3000/api/auth/login", requestOptions)
                .then(response => { 
                    if (response.ok) {
                
                        return response.json()
                            
                    } else {
                        Promise.reject(response.status);
                    }
                })
                .then((user) => {
                        
                    this.$store.dispatch("login", user);
                    this.$router.push("/");
                        
                })
                    
                .catch((error) => {

                    alert(error)

                });
        }
    },
}
</script>