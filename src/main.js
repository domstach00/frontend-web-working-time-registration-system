import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import Vuex from 'vuex'

new Vuex.Store({
    state: {
        user: {
            idU: 0,
            email: '',
            firstName: '',
            lastName: '',
            phoneNr: '',
            fk_role: 0
        },
        fkr: 0
    },
    getters: {
        getUser: state => state.user,
        getIdU: state => state.user.idU,
        getRoleId: state => state.fkr
    }
})

createApp(App).use(router).mount('#app')
