import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    users: [],
    product: [],
    create_product: {},
    product_toggle_status: false,
    product_toggle_featured: false,
    product_details: {},
    edit_product: {},
    message: {},
    
    submit_loading: false
}

const getters = {}

const mutations = {
    GET_USER_LIST (state, items) {
        state.users = items
    },

    GET_STUDENT_PRODUCT (state, items) {
        state.product = items
    },

    CREATE_PRODUCT (state, items) {
        state.create_product = items
    },

    PRODUCT_STATUS_TOGGLE (state, items) {
        state.product_toggle_status = items
    },

    PRODUCT_FEATURED_TOGGLE (state, items) {
        state.product_toggle_featured = items
    },

    GET_PRODUCT_DETAILS(state,items){
        state.product_details = items
    },

    EDIT_PRODUCT (state, items) {  
        state.edit_product = items
    },
    
    DELETE_PRODUCT (state, items) {
        state.message = items
    },

    SUBMIT_LOADING (state, item) {
        state.submit_loading = item
    }
}

const actions = {
    async get_user_list ({ commit }) {
        let config= {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        
        let response = await axios.get(V1API.get_user_list, config).then(result => {
            let items = result.data.data
            commit('GET_USER_LIST', items)
            return result
        })
        return response
    },

    async get_students_product ({ commit }) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.get(V1API.get_students_product, config).then(result => {
            let items = result.data.data
            commit('GET_STUDENT_PRODUCT', items)
            return result
        })
        return response
    },

    async toggle_students_product_status ({ commit, dispatch }, payload) {
        let config=
        {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        let response = await axios.get(V1API.toggle_students_product_status + payload, config).then(result => {
            let items = result.data.data
            commit('PRODUCT_STATUS_TOGGLE', items)
            dispatch('get_students_product')
            return result.data
        })
        return response
    },

    async toggle_students_product_approval ({ commit, dispatch }, payload) {
        let config=
        {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        let response = await axios.get(V1API.toggle_students_product_approve + payload, config).then(result => {
            let items = result.data.data
            commit('PRODUCT_FEATURED_TOGGLE', items)
            dispatch('get_students_product')
            return result.data
        })
        return response
    },

    async get_product_details({ commit }, payload) {

        let response = await axios.get(V1API.get_product_details + payload).then(result => {
            let items = result.data.data
            commit('GET_PRODUCT_DETAILS', items)
            return result
        })
        return response
    },

    async edit_product ({ commit, dispatch }, payload) {
        commit ('SUBMIT_LOADING', true)
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.patch(V1API.edit_product + payload.pid, 
            {
                name: payload.name,
                status: payload.status,
                category: payload.category,
                featured: payload.featured,
                on_sale: payload.on_sale,
                hot_items: payload.hot_items,
                sell_price: payload.sell_price,
                offer_price: payload.offer_price,
                description: payload.description,
                tags: payload.tags,
                images: payload.images,
                unit: 1
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_PRODUCT', items)
            commit ('SUBMIT_LOADING', false)
            dispatch('get_students_product')
            return result
        })
        return response
    },

    async delete_student_product ({ commit, dispatch }, payload) { 
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(V1API.delete_students_product + payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('DELETE_PRODUCT', items)
            dispatch('get_students_product')
            return result
        })
        return response
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}