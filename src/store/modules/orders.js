import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    orders: [],
    product_toggle_status: false,
    product_toggle_featured: false
}

const getters = {}

const mutations = {
    GET_ORDERS (state, items) {
        state.orders = items
    },

    PRODUCT_STATUS_TOGGLE (state, items) {
        state.product_toggle_status = items
    },

    PRODUCT_FEATURED_TOGGLE (state, items) {
        state.product_toggle_featured = items
    }
}

const actions = {
    async get_orders ({ commit }) {
        let config= {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        
        let response = await axios.get(V1API.get_orders, config).then(result => {
            let items = result.data.data
            commit('GET_ORDERS', items)
            return result
        })
        return response
    },

    async toggle_order_status ({ commit, dispatch }, payload) {
        let config= {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        let response = await axios.get(V1API.toggle_order_status + payload.id + '/' + payload.status, config).then(result => {
            let items = result.data.data
            console.log(items)
            commit('PRODUCT_STATUS_TOGGLE', items)
            dispatch('get_orders')
            return result
        })
        return response
    },

    async toggle_delivery_status ({ commit, dispatch }, payload) {
        let config=
        {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        let response = await axios.get(V1API.toggle_delivery_status + payload.id + '/' + payload.status, config).then(result => {
            let items = result.data.data
            console.log(items)
            commit('PRODUCT_FEATURED_TOGGLE', items)
            dispatch('get_orders')
            return result
        })
        return response
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}