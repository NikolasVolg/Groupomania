<template>
    <div>
  <b-navbar toggleable="lg" type="dark" class="colorBar">
    <b-navbar-brand to="/home">Groupomania</b-navbar-brand>

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

          <b-dropdown-item to="/profil">Profil<b-avatar class="avatarSm" text="GM" size="sm"></b-avatar>
            
          </b-dropdown-item>

          <b-dropdown-item href="#">Se déconnecter</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
</div>
</template>

<script>

export default {

    name: 'Navbar',

}

</script>

<style>

.searchBar {
  margin-right: 2rem;
}

.avatarSm {
  margin-left: 3rem;
}

.colorBar {
  background: #091f43;
}

</style>