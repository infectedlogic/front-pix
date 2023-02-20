<template>
  <v-container>
    <v-app-bar  color="teal" app>
    <v-row align="center">
      
      <v-col cols="2"  class="ib ml-10 ml-sm-12 ml-md-10 ml-lg-5" >
        <v-img src="../assets/pix.png" width="40px" height="40px"></v-img>
        <router-link to="/" class="text-white text-decoration-none">
        <span class="ml-2 font-weight-bold">Pix</span>
      </router-link>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <p class="mr-5 font-weight-bold"> Balance :  {{ getBalance }}</p>
    <v-btn  class="mr-5" color="white" @click = " () => logOut()"><v-icon color="white" size="25">mdi-logout</v-icon>Logout</v-btn>
  </v-app-bar>
    
  </v-container>
</template>
<style>
.ib{
  display:flex;
  justify-content: center;
  align-items: center;
  font-family: 'MyFont';
}
@font-face {
  font-family: 'MyFont';
  src: url('../assets/myfont.otf');
  font-weight: normal;
  font-style: normal;
}

</style>
<script>

export default {
  name: 'HelloWorld',
  computed:{
    getBalance(){
     const balance = localStorage.getItem('balance');
     return balance ?  balance : 0;
    }
  },
 data(){
  return {
    loggedIn : null,
  }
 },
 methods :{
 logOut(){
  localStorage.clear();
  this.$router.push('/')
 }
}
}
</script>
