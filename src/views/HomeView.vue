<template>
  <div class="dark-blue">
  <FormComponent/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import FormComponent from '../components/FormComponent.vue';
export default defineComponent({
  name: 'HomeView',

  components: {
    FormComponent
  },
  mounted(){
    localStorage.clear();
    this.$store.commit('setToken',null);
  }
});
</script>
<style>
.dark-blue{
  background-color: rgb(7, 46, 66);
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: teal;
}
::-webkit-scrollbar-thumb {
  background: rgb(7, 46, 66);
}
</style>
