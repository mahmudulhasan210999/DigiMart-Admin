import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    items: {}
}

const getters = {}

const mutations = {
    SET_ITEMS_COUNT (state, items) {
        state.items = items
    },
}
const actions = {
    get_items_count ({ commit }) {
        axios.get(V1API.get_items_count).then(result => {
            let items = result.data
            commit('SET_ITEMS_COUNT', items)
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}