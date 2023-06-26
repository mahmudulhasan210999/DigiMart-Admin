import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import category from './modules/category'
import products from './modules/products'
import orders from './modules/orders'
import students from './modules/students'

export default createStore({
    modules: {
        login,
        dashboard,
        category,
        products,
        orders,
        students
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})