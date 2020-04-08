<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <Menu />
    </v-navigation-drawer>
    <v-app-bar app clipped-left class="blue-grey lighten-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon class="ml-3" to="/home">
          <v-img src="@/assets/logo_topo.png" max-height="25" contain /> 
      </v-btn>
        <v-toolbar-title>
          Medclinic Vita
        </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid >
        <router-view />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
  import Menu from './components/Menu'
  import Footer from './components/Footer'
  export default {
    components: { Menu , Footer},
    data: () => ({
      drawer: null,
    })
  }
</script>
<style>
</style>