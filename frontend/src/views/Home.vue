<template>
  <div>

      <b-col  col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 publication mx-auto">
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
      </b-col>


  </div>
</template>

<script>
//import { mapState } from "vuex";

export default {
  name: 'Home',
  data () {
    return {
      firstName: "Bernard",
      lastName: "Minet",
      content: "Moitié homme, moitié robot Le plus valeureux des héros Bioman Bioman Défenseur de la Terre Comme un arc-en-ciel courageuxRouge, rose, vert, jaune et bleu Bioman Bioman Héros de l'Univers"
    }
  },

  // computed: mapState ({
  //   user: state => state.user
  // }) 
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

</style>