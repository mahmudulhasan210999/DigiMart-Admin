import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import category from './modules/category'
import products from './modules/products'

export default createStore({
    modules: {
        login,
        dashboard,
        category,
        products
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})