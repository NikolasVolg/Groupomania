<template>
  <div>
      <b-col  col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 mx-auto publication">
       
          <form ref="form" @submit.stop.prevent="createPost">
            <b-form-textarea
              id="textarea-state"
              v-model="content"
              :state="content.length >= 5"
              placeholder="Ecrivez quelque chose. Minimum 5 caractères"
              rows="3">
            </b-form-textarea>

            <div class="d-flex justify-content-end">
              <div
              v-if="previewImage"
              class="imagePreviewWrapper"
              :style="{ 'background-image': `url(${previewImage})` }"></div>

              <label for="file" class="label-file">Image/GIF</label>
              <input @change="onFileSelected" id="file" type="file" class="input-file" accept="image/png, image/jpeg, image/bmp, image/gif" ref="file">
              <button class="submit" type="submit">Publier</button>
            </div>

          </form>
       
      </b-col>

      <b-col v-for="post in posts" :key="post.id"  col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 publication mx-auto">

        <div class="d-flex justify-content-end" @click="deleteButton(post.idPublication)" v-if="user.userId == post.Users_idUsers || user.isAdmin">
          <button  class="trash_button">
            <b-icon class="trash_icon" icon="trash-fill" aria-hidden="true"></b-icon>
          </button>
        </div>
        
        <div>
          <div class="autor">
            <b-avatar variant="info" class="avatarSm" text="GM" size="md"></b-avatar><h4>{{ post.users.firstName }} {{ post.users.lastName }}</h4>
          </div>

          <p>{{ post.content }}</p>

          <b-img :src="post.image" fluid-grow alt="" class="imagePost"></b-img>
        </div>

        <!-- <div class="comment">
          <div class="autor"><b-avatar class="avatarSm" text="GM" size="sm"></b-avatar><h6>{{ firstName }} {{ lastName }}</h6></div>
          
          <p>{{ content }}</p>
        </div> -->
      </b-col>

  </div>
</template>

<script>
import { mapState } from "vuex";
 
export default {
  name: 'Home',

  data() {
      return {
        content: '',
        posts: [],
        file: '',
        selectedFile: null,
        previewImage: null
      }
    },

  computed: mapState ({
            user: state => state.user
    }),
  

  methods: {

    fetchAllPost() {
      const token = sessionStorage.getItem("token");

      if (token) {

        const options = {
            headers: { authorization: `Bearer ${token}` }
        };

        fetch("http://localhost:3000/api/publi/", options)
          .then(response => { 
            if (response.ok) {

              return response.json();

            } else {
                Promise.reject(response.status);
            }
          })
          .then(publications => {            

            this.posts = publications;
            
          })
          .catch((error) => {
            alert(error)
          });
      }  
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      console.log(this.selectedFile);
    },

    createPost() {

      const data = new FormData();

      if (this.selectedFile !== null) {
        data.append('image', this.selectedFile);
        data.append('content', this.content);
      } else {
        data.append('content', this.content);
      }

      const token = sessionStorage.getItem("token");

      const requestOptions = {
                    method: "POST",
                    headers: { authorization: `Bearer ${token}` },
                    body: data
      };

      fetch("http://localhost:3000/api/publi/publiCreate", requestOptions)
        .then(response => { 
          if (response.ok) {
              return response.json()         
          } else {
              Promise.reject(response.status);
          }        
        })
        .then(newPost => {
          this.posts.unshift(newPost)
        })
        .catch((error) => {

          alert(error)

        });
    },

    deleteButton(id) {

      const token = sessionStorage.getItem("token");

      const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
                };

      fetch("http://localhost:3000/api/publi/" + id, requestOptions)
        .then(response => { 
            if (response.ok) {
              return response.json();
            } else {
                Promise.reject(response.status);
            }            
        })
        .then(() => {
          const index = this.posts.findIndex((element) => element.idPublication === id);

          this.posts.splice(index, 1);
        })
        .catch((error) => {
          alert(error)
        });
    }
  },

  mounted() {
    this.fetchAllPost()    
  }
}
</script>

<style>

.publication {
  background-color: #fff;
  padding: 15px 5px 5px 5px;
  border-radius: 10px;
  box-shadow: -1px 3px 4px 0px rgba(0,0,0,0.75);
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

/* .imagePost {

} */

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
    height: 40px;
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

.imagePreviewWrapper {
        width: 70px;
        height: 70px;
        display: block;
        cursor: pointer;
        margin: 1em auto;
        background-size: cover;
        background-position: center center;
        position: relative;
}

/* Trash */

.trash_button {
  border: none;
  background: none;
}

.trash_icon {
  color: #dc3545;
}

</style>