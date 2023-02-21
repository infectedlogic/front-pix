<template>
<div class="dark-blue">
<Navbar :loading="loading"></Navbar>
<div class="min-h-100 des-mid">
<div class="bg-teal p-16">


<v-text-field v-model.number="balance" class="text-white" label="Balance" type="number"></v-text-field>

<v-btn color="blue-lighten-4" class="w-100" @click="() => addBalance()"><v-icon color="white" size="25">mdi-plus-circle</v-icon>&nbsp;&nbsp; Add Balance</v-btn>
<v-snackbar
      v-model="snackbarVisible"
      location = "top right"
      color="blue-lighten-4"
      :timeout="2000"
      
    >
      {{ snackbarText }}
      <v-btn color="teal" text @click="snackbarVisible = false">Close</v-btn>
</v-snackbar>
<v-snackbar 
      v-model="getToast"
      location = "top right"
      color="green lighten-1"
      :timeout="2000"
    >
    <v-icon>mdi-check-circle-outline</v-icon> Payment successful ! 
</v-snackbar>
</div>
<div>
</div>
</div>
</div>
</template>
<style>
.min-h-100{
    min-height: 100vh;
}
.des-mid{
display: flex;
justify-content: center;
align-items: center;
}
.p-16{
    padding:16px;
    border-radius:25px;
}
</style>
<script>
import Navbar from '@/components/Navbar.vue';
export default{
    name : 'PrivateView',
    
    data() {
    return {
      balance: 0,
      snackbarVisible : false,
      snackbarText : '',
      loading :false,
    }
  },
  computed:{
    getToast(){
      return this.$store.getters.getToast
    }
  },
  components:{
    Navbar,
  },
  methods:{
    addBalance(){
      this.snackbarText = 'Sending QR Code ...'
      this.snackbarVisible = true;
      const API_TOKEN = localStorage.getItem('API_TOKEN');
      const obj = {
        cpf : "80425836720",
        value : this.balance,
        token : API_TOKEN ,
      }
      fetch("https://angry-lime-fawn.cyclic.app/api/payment",{
        method : 'POST',
        body : JSON.stringify(obj),
        headers :{
          'Content-Type' : 'application/json',
        }
      }).then(async response => {
          if (response.status == 200 || response.status == 201)
          { 
            const data = await response.json();
            //var myWindow = window.open("", "myWindow", "width=" + 260 + ",height=" + 260);
            //myWindow.document.write("<html><head><title>Image Tab</title></head><body><img src='" + data.qr_code_image + "'/></body></html>");
            this.$store.commit('setQR',data.qr_code_image) ;
            this.$store.commit('setNewBalance',this.balance);
            this.$router.push('/qrcode');
          }
        })
    },
    findBalance(){
      this.loading = true;
        fetch("https://angry-lime-fawn.cyclic.app/api/auth/me", {
                        method : 'GET',
                        headers : {
                            "x-access-token" : localStorage.getItem("JWT_TOKEN")
                        }
                    }).then(async response =>{
                        if (response.status == 200)
                        { 
                          
                            const data = await response.json();
                            this.$store.commit('setBalance',data.balance);
                            this.loading = false;
                        }
                    })
    }
  },
  mounted(){
    this.findBalance();
    const toast = this.$store.getters.getToast
    if (toast == true)
    {
      setTimeout(() => {
      this.$store.commit('setToast',false);
    }, 2000);
    }
  }
}
</script>