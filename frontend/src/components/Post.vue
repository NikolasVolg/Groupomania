<template>
    <b-col col md="8" lg="6" xl="4" fluid="md" class="justify-content-md-center mt-3 publication mx-auto">
        <div class="d-flex justify-content-end" @click="deletePost()" v-if="user.userId == post.Users_idUsers || user.isAdmin">
          <button  class="trash_button" type="reset">
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
    </b-col>
</template>

<script>
import { mapState } from "vuex";

export default {
    
    name: "Post",

    props: {
        post: {
            type: Object,
            required: true
        }
    },

    computed: mapState ({
            user: state => state.user
    }),

    methods: {
        deletePost() {
            this.$emit('delete', this.post.idPublication)
        }
    }
}
</script>