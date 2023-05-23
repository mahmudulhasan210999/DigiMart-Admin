import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    category: [],
    create_category:{},
    edit_category: {},
    message: {},
    category_toggle_status: false
}

const getters = {}

const mutations = {
    GET_CATEGORY (state, items) {
        state.category = items
    },

    CREATE_CATEGORY (state, items) {
        state.create_category = items
    },

    CATEGORY_STATUS_TOGGLE (state, items) {
        state.category_toggle_status = items
    },

    EDIT_CATEGORY (state, items) {  
        state.edit_category = items
    },
    
    DELETE_CATEGORY (state, items) {
        state.message = items
    }
}

const actions = {
    get_category ({ commit }) {
        axios.get(V1API.get_category).then(result => {
            let items = result.data.data
            commit('GET_CATEGORY', items)
        })
    },

    async create_category ({ commit, dispatch }, payload) {
        commit ('SUBMIT_LOADING', true)
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_category, payload, config).then(result => {
            let items = result.data.data
            commit('CREATE_CATEGORY', items)
            commit ('SUBMIT_LOADING', false)
            dispatch('get_category')
            return result
        })
        return response
    },

    async toggle_category_status ({ commit, dispatch }, payload) {
        let config=
        {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        let response = await axios.get(V1API.toggle_category_status + payload, config).then(result => {
            let items = result.data.data
            console.log(items)
            commit('CATEGORY_STATUS_TOGGLE', items)
            dispatch('get_category')
            return result.data
        })
        return response
    },

    async edit_category ({ commit, dispatch }, payload) {
        commit ('SUBMIT_LOADING', true)
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.patch(V1API.edit_category + payload.id, 
            {
                name: payload.category.name,
                status: payload.category.status,
                parent: payload.category.parent
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_CATEGORY', items)
            commit ('SUBMIT_LOADING', false)
            dispatch('get_category')
            return result
        })
        return response
    },

    async delete_category ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }

        let response = await axios.delete(V1API.delete_category + payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('DELETE_CATEGORY', items)
            dispatch('get_category')
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