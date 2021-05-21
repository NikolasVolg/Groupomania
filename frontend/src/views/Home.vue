<template>
  <div>
      <b-col  col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 publication mx-auto">
       
          <form ref="form" @submit.stop.prevent="createPost">
            <b-form-textarea
              id="textarea-state"
              v-model="content"
              :state="content.length >= 5"
              placeholder="Entrer minimum 5 caractères"
              rows="3">
            </b-form-textarea>

  
            <div class="d-flex justify-content-end">
              <label for="file" class="label-file">Choisir une image</label>
              <input id="file" type="file" class="input-file" accept="image/png, image/jpeg">
              <button class="submit" type="submit">Publier</button>
            </div>

        </form>
       
      </b-col>

      <!-- <b-col  col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 publication mx-auto">
        <div>
          <div class="autor">
            <b-avatar class="avatarSm" text="GM" size="md"></b-avatar><h4>{{ firstName }} {{ lastName }}</h4>
          </div>
          

          <p>{{ content }}</p>

          <b-img src="https://picsum.photos/300/300/?image=41" fluid-grow alt=""></b-img>

        </div>

        <div class="comment">
          <div class="autor"><b-avatar class="avatarSm" text="GM" size="sm"></b-avatar><h6>{{ firstName }} {{ lastName }}</h6></div>
          
          <p>{{ content }}</p>
        </div>
      </b-col> -->


  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Home',

  data() {
      return {
        content: ''
      }
    },

  computed: mapState ({
            user: state => state.user
    }),

  methods: {
    createPost() {

      const data = {
        content: this.content
      };


      const token = sessionStorage.getItem("token");

      const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
                    body: JSON.stringify(data)
                };

      fetch("http://localhost:3000/api/publi/publiCreate", requestOptions)
      .then(response => { 
        if (response.ok) {
    
            return response.json()
                
        } else {
            Promise.reject(response.status);
        }
      })
      .catch((error) => {

        alert(error)

      });

    }
  }

}
</script>

<style>
.publication {

background-color: rgba(9, 31, 67, 0.1);
padding: 5px;

}

.autor {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

h4, h6 {
  margin: 0 !important;
}

.avatarSm
{
  margin-right: 5px;
}

.comment {
  margin-left: 10px;
}

p {
  margin-left: 10px;
}
/* BOUTON */
.submit {
    width: 100px;
    height: 40px;
    margin: 10px 0 10px 15px;
    border-radius: 10px;
    border: 0;
    background-color: #091f43;
    color: #fff;
    font-weight: bold;
}
/* Input file */
.label-file {
    border: 1px solid #091f43;
    border-radius: 10px;
    margin: 10px 0 10px 15px;
    padding: 6px;
    cursor: pointer;
    color: #091f43;
    font-weight: bold;
}
.label-file:hover {
    color: #fff;
    background: #091f43;
}

.input-file {
    display: none;
}

</style>