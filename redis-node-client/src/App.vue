<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar
      app
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RENO</v-toolbar-title>
      <v-spacer></v-spacer>

      
    </v-app-bar>
    <v-navigation-drawer
      disable-resize-watcher
      v-model="drawer"
      absolute
      temporary>
      <v-list
        nav
        dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4">
            <!-- Home -->
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <!-- User -->
            <v-list-item to="/user">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User</v-list-item-title>
            </v-list-item>

            <!-- Book -->
            <v-list-item to="/book">
              <v-list-item-icon>
                <v-icon>mdi-book</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Book</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
