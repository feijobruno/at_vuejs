<template>
     <v-list dense>
        <v-list-group v-for="menu in menus" :key="menu.title" :prepend-icon="menu.icon" no-action>
          <template v-slot:activator>   
            <v-list-item-content>
              <v-list-item-title v-text="menu.title"></v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item v-for="subMenu in menu.menus" :key="subMenu.title" link>  
             <router-link :to="subMenu.link">
                <v-list-item-content>
                    <v-list-item-title v-text="subMenu.title"></v-list-item-title>     
                </v-list-item-content>
              </router-link>    
        </v-list-item>
        </v-list-group>
      </v-list>
</template>

<script>
export default {
 data () {
    return {
      menus: [
        {
          icon: 'mdi-account',
          title: 'Pacientes',
          menus: [
            { title: 'Cadastrar', link:'/addPatient' },
            { title: 'Editar' , link:'/editPatient' },
          ],
        },         
       
      ],
    }
  },
}
</script>

<style>
a:link, a:visited {
	text-decoration: none
	}
a:active {
	text-decoration: none;
	}
</style>