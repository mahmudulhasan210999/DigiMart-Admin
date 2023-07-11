import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    access_token: null,
    refresh_token: null,
    isLoggedIn: false,
    admins: []
}

const getters = {}

const mutations = {
    SET_ACCESS_TOKEN (state, token) {
        localStorage.setItem('access_token', token)
        state.access_token = token
    },

    SET_REFRESH_TOKEN (state, token) {
        localStorage.setItem('refresh_token', token)
        state.refresh_token = token
    },

    SET_LOGIN_STATUS(state, status) {
        state.isLoggedIn = status;
    },

    GET_ADMIN_LIST(state, items) {
        state.admins = items;
    }
}

const actions = {
    getLoginStatus({commit}) {
        let loginStatus = localStorage.getItem('access_token') == undefined? false : true;
        localStorage.setItem('loggedIn', loginStatus)
        commit('SET_LOGIN_STATUS', loginStatus)
    },

    get_Login({ commit, dispatch }, payload) {
        console.log('store payload -->', payload)
        let response = axios.post(V1API.get_login, payload).then(result => {
            console.log(result)
            let access_token = result.data.access_token
            let refresh_token = result.data.refresh_token
            commit('SET_ACCESS_TOKEN', access_token)
            commit('SET_REFRESH_TOKEN', refresh_token)
            dispatch('getLoginStatus')
            return result
        })
        .catch(error => {
            console.log(error)
        }) 
        return response      
    },

    async getRegister({ commit, dispatch }, payload) {
        let response = await axios.post(V1API.register_admin, {
            first_name: payload.fname,
            last_name: payload.lname,
            username: payload.username,
            gender: payload.gender,
            email: payload.email,
            address: payload.address,
            city: payload.city,
            phone_no: payload.phone,
            password: payload.password,
            password2: payload.confirm_password
           
        }).then(result => {
            return result
        })
        return response
    },

    async getAdminList ({ commit }) {
        let config= {
            headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
        }
        
        let response = await axios.get(V1API.get_admin_list, config).then(result => {
            let items = result.data.data
            commit('GET_ADMIN_LIST', items)
            return result
        })
        return response
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}