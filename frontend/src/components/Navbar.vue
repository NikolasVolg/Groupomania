<template>
    <div>
  <b-navbar toggleable="lg" type="dark" class="colorBar">
    <b-navbar-brand to="/"><img src="../../../Groupomania-images/icon-left-font-monochrome-white.svg" class="logoNavbar" alt="logo groupomania"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          
          <template #button-content>
            <strong><em class="em">Utilisateur</em></strong> 
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
  /* background-color: #091f43; */
  background-image: linear-gradient(120deg, #091f43 50%, #d1505a 100%);
}

.em {
  color: #fff;
}
</style>