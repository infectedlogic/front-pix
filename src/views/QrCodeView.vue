<template>
    <div class="dark-blue">
        <Navbar></Navbar>
        <div class="min-h-100 des-mid d-flex flex-column">
            <div v-if="getQR" class="d-flex justify-center items-center flex-column">
                <img :src = "getQR"/> 
                <v-btn color="blue darken-4 text-white" class="w-100 mt-3" @click="() => simulatePayment()"><v-icon>mdi-swap-vertical</v-icon> Simulate Payment</v-btn>
            </div>
            <div v-else class="rounded blue-lighten-br text-white">
                No QR Found !
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
export default 
{
computed:{
getQR(){
return this.$store.getters.getQR
}
},
data()
{
    return{
        oldBalance : 0,
        snackbarVisible : false,
    }
},
components:{
    Navbar,
  },
methods:{
    simulatePayment(){
let balance = this.$store.getters.getNewBalance;
  const obj ={
  id: "7f8cfa2b-eaf0-4328-998f-87d9d29805d2",
  value:  balance,
  paid_value: 1.1,
  paid_at: "2021-07-13T21:00:54.000Z",
  status: "PAID"
}
       fetch("https://angry-lime-fawn.cyclic.app:3003/webhook",{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:
                JSON.stringify(obj)
            
        }).then(async response => {
            if (response.status == 200)
            {
                const data = await response.json();
                if (data.status == "PAID")
                {   const newBalance = {
                    balance : balance  + this.oldBalance
                }
                    fetch("https://angry-lime-fawn.cyclic.app:3003/api/auth/me", {
                        method : 'PATCH',
                        headers : {
                            "x-access-token" : localStorage.getItem("JWT_TOKEN"),
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(newBalance)

                    }).then(
                        response =>{
                            if (response.status == 200)
                            {
                                this.$store.commit('setBalance',newBalance.balance);
                                this.$store.commit('setToast',true)
                                this.$router.push('/home');
                            }
                        }
                    )
                }
            }
        })
    },
    findBalance(){
        fetch("https://angry-lime-fawn.cyclic.app:3003/api/auth/me", {
                        method : 'GET',
                        headers : {
                            "x-access-token" : localStorage.getItem("JWT_TOKEN")
                        }
                    }).then(async response =>{
                        if (response.status == 200)
                        {
                            const data = await response.json();
                             this.oldBalance = data.balance;
                        }
                    })
    }
},
mounted(){
    this.findBalance();
}
}
</script>
<style scoped>
    .blue-lighten-br{
        border:1px solid rgb(106, 170, 219)
    }
</style>