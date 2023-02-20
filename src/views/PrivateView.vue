<template>
<div class="dark-blue">
<Navbar></Navbar>
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
            var myWindow = window.open("", "myWindow", "width=" + 260 + ",height=" + 260);
myWindow.document.write("<html><head><title>Image Tab</title></head><body><img src='" + data.qr_code_image + "'/></body></html>");
          }
        })
    }
  }
}
</script>