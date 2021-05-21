<template>
    <div>
  <b-navbar toggleable="lg" type="dark" class="colorBar">
    <b-navbar-brand to="/"><img src="../../../Groupomania-images/icon-left-font-monochrome-white.svg" class="logoNavbar" alt="logo groupomania"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form class="searchBar">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->


        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          
          <template #button-content>
            <em>Utilisateur</em>
          </template>

          <b-dropdown-item to="/profil">Profil<b-avatar class="avatarNavbar" text="GM" size="sm"></b-avatar>
            
          </b-dropdown-item>

          <b-dropdown-item @click="deconnect">Se déconnecter</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
</div>
</template>

<script>

export default {

  name: 'Navbar',

  methods: {
    deconnect() {
      sessionStorage.removeItem("token");
      this.$router.push("/connect");
    }
  }

}

</script>

<style>

.logoNavbar {
  max-width: 50%;
}

.searchBar {
  margin-right: 2rem;
}

.avatarNavbar {
  margin-left: 3rem;
}

.colorBar {
  background: #091f43;
}

</style>