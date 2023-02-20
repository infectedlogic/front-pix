<template>
 <div class="login-form-container">
    <v-form v-model="valid" class="login-form">
    <div class="image-container w-100 mb-15" >
    <v-img src="../assets/pix.png" max-height="40" max-width="40" class="image"></v-img>
    <div class="text-container">
      <h2 class="title text-white">Pix</h2>
    </div>
    </div>
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      class="text-white"
      outlined
      :rules="emailRules"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      class="text-white"
      outlined
      :rules="passwordRules"
    ></v-text-field>
    <v-btn color="blue lighten-4" class="w-100" :disabled="!valid" @click="() => login()">Login</v-btn>
    <v-alert v-if="auth == false" color="error" icon="$error" class="mt-5" text="Invalid username or passowrd"></v-alert>
  </v-form>
</div>
</template>
<script>
import store from '@/store';
export default{
    name:'FormComponent',
    data() {
    return {
      valid: false,
      auth : null,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 3) ,
      ],
    };
  },
  methods :{
     login(){
      const obj= {
        email : this.email,
        password : this.password,
      }
      fetch('https://angry-lime-fawn.cyclic.app/api/auth/login',{
        method :'POST',
        body : JSON.stringify(obj),
        headers:{
          'Content-Type' : 'application/json'
        }
      }).then(async response => {
        let status = response.status;
        
        if (status != 200)
        {
          this.auth = false;
        }
        else if (status == 200)
        { let data = await response.json();
          this.auth = true;
          localStorage.setItem('JWT_TOKEN',data.token);
          store.commit('setToken',data.token);
          this.$router.push('/home');
          fetch('https://angry-lime-fawn.cyclic.app/api/auth',
          {
            method :'GET'
          },
          ).then(
            async response => {
              let data = await response.json();
              localStorage.setItem('API_TOKEN',data.token);
            }
          )
        }
      })
      
    }
  }
}
</script>
<style>
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-form {
  width: 300px;
  border: 1px solid #0bad8d;
  padding: 36px;
  border-radius: 25px;
  background: teal;
}
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  margin-right: 16px;
}
</style>