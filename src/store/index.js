import { createStore } from 'vuex'

export default createStore({
  state: {
    token : null,
    qrCodeImg  : '',
    balance : 0,
    newBalance : 0,
    showToast : false,
  },
  getters: {
    getToken(state)
    {
      return state.token 
    },
    getQR(state){
      return state.qrCodeImg
    },
    getBalance(state){
      return state.balance
    },
    getNewBalance(state){
      return state.newBalance
    },
    getToast(state){
      return state.showToast 
    }
  },
  mutations: {
    setToken(state,payload)
    {
      state.token = payload;
    },
    setQR(state,payload)
    {
      state.qrCodeImg = payload;
    },
    setBalance(state,payload){
      state.balance = payload;
    },
    setNewBalance(state,payload){
      state.newBalance = payload;
    },
    setToast(state,payload){
      state.showToast = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
