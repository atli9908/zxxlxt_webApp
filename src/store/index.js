import vue from 'vue';
import Vuex from 'vuex';

vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isLoading:false  //loading
    },
    mutations:{
        SHOW_LOADING(state){
            state.isLoading = true;
        },
        HIDD_LOADING(state){
            state.isLoading = false;
        }
    },
    actions:{},
    getters:{}
})