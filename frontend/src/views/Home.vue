<template>
  <div>
    <b-col  col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 mx-auto publication">
        <form id="form" ref="form" @submit.stop.prevent="createPost">
          <label for="textarea-state"></label>
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

    <Post v-for="post in posts" :key="post.id" :post="post" @delete="deleteButton($event)"/>
    
      <!-- <div class="comment">
        <div class="autor"><b-avatar class="avatarSm" text="GM" size="sm"></b-avatar><h6>{{ firstName }} {{ lastName }}</h6></div>
        
        <p>{{ content }}</p>
      </div> -->

  </div>
</template>

<script>
import { fetchAllPost, fetchCreatePost, fetchDeletePost } from '../api/publication';
import Post from "../components/Post.vue";
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

  components: {
    Post
  },
  
  methods: {
    
    allPost() {
      fetchAllPost() 
        .then(publications => {
            this.posts = publications;
        })
        .catch((error) => {
            alert(error)
        });
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
      const contentMini = this.content;

      if (this.selectedFile !== null) {
        data.append('image', this.selectedFile);
        data.append('content', this.content);
      } else {
        data.append('content', this.content);
      }

      if (contentMini >= 5) {
        fetchCreatePost(data)
        .then(newPost => {
          console.log(newPost);
          this.posts.unshift(newPost);
          this.content = "";
          this.selectedFile = null;
          this.previewImage = null;
        })
        .catch((error) => {
          alert(error)
        });
      } else {
        alert("Votre publication doit contenir au moins 5 caractères !")
      }
      
      
    },

    deleteButton(id) {

      fetchDeletePost(id)
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
    this.allPost()    
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