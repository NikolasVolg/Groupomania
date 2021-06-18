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
            label="Mot de passe"
            label-for="password"
            invalid-feedback="Password is required"
            class="input_container">

            <b-form-input
                type="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                v-model="password"
                autocomplete="off"
                @input="checkPassword"
                required>                
            </b-form-input>
  
		<ul>
			<li :class="{ is_valid: contains_eight_characters }">8 caractères</li>
			<li :class="{ is_valid: contains_number }">Un chiffre</li>
			<li :class="{ is_valid: contains_uppercase }">Une majuscule</li>
			<li :class="{ is_valid: contains_special_character }">Un caractère spécial</li>
		</ul>

		<div class="checkmark_container" :class="{ show_checkmark: valid_password }">		
			<svg width="50%" height="50%" viewBox="0 0 140 100">
				<path class="checkmark" :class="{ checked: valid_password }" d="M10,50 l25,40 l95,-70"/>
			</svg>
        </div>

        </b-form-group>

        <div class="d-flex justify-content-end align-self-center pl-1 pr-1">
            <button class="connexBtn" type="submit">S'inscrire</button>
        </div>

    </form>

</template>

<script>
import { fetchSignup } from '../api/user';

export default {

    name: "Signup",

    data() {
        return {
            lastName: "",
            firstName: "",
            email: "",
            password: null,
            password_length: 0,
            contains_eight_characters: false,
            contains_number: false,
            contains_uppercase: false,
            contains_special_character: false,
            valid_password: false
        }
    },

    methods: {

        checkPassword() {

            this.password_length = this.password.length;
            const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
                    
            if (this.password_length > 8) {
                this.contains_eight_characters = true;
            } else {
                this.contains_eight_characters = false;
            }
                    
            this.contains_number = /\d/.test(this.password);
            this.contains_uppercase = /[A-Z]/.test(this.password);
            this.contains_special_character = format.test(this.password);
            
            if (this.contains_eight_characters === true &&
                this.contains_special_character === true &&
                this.contains_uppercase === true &&
                this.contains_number === true) {
                    this.valid_password = true;
            } else {
                this.valid_password = false;
            }
        },
        
        signUp() {
            
            const contact = {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                password: this.password
            };
            
            if (this.valid_password) {
                fetchSignup(contact)
                    .then(() => {
                        this.lastName = "";
                        this.firstName = "";
                        this.email = "";
                        this.password = "";
                        window.alert("Vous êtes bien enregistré. Vous pouvez vous connecté.");
                    })
                    .catch((error) => {
                        alert(error.message)
                    });
            } else {
                window.alert("Format du mot de passe invalide");
            }
        }                
    }
}
</script>

<style>

.input_container label {
    color: #000;
}

ul {
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

li { 
	margin-bottom: 8px;
	color: #525f7f;
	position: relative;
}

li:before {
  content: "";
	width: 0%; height: 2px;
	background: #2ecc71;
	position: absolute;
	left: 0; top: 50%;
	display: block;
	transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


/* Password Input --------- */

.input_container {
	position: relative;
	padding: 20px;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	border-radius: 6px;
	background: #FFF;
}

input[type="password"] {
	line-height: 1.5;
	display: block;
	color: rgba(136, 152, 170, 1);
	font-weight: 300;
	width: 100%;
	height: calc(2.75rem + 2px);
	padding: .625rem .75rem;
	border-radius: .25rem;
	background-color: #fff;
	transition: border-color .4s ease;
	border: 1px solid #cad1d7;
	outline: 0;
}

input[type="password"]:focus {
	border-color: rgba(50, 151, 211, .45);
}

/* Checkmark & Strikethrough --------- */

.is_valid { color: rgba(136, 152, 170, 0.8); }
.is_valid:before { width: 100%; }

.checkmark_container {
	border-radius: 50%;
	position: absolute;
	top: -15px; right: -15px;
	background: #2ecc71;
	width: 50px; height: 50px;
	visibility: hidden;
	opacity: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: opacity .4s ease;
}

.show_checkmark {
  visibility: visible;
  opacity: 1;
}

.checkmark {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 15;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked { animation: draw 0.5s ease forwards; }

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
</style>
