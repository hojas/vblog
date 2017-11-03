import * as types from '../mutation-types'
import { fetch, category as cateUrls } from '../../api'

const state = {
    data: {},
}

const getters = {
    cates: state => state.data,
}

const mutations = {
    [types.GET_CATES](statek, { data }) {
        state.data = data
    },
}

const actions = {
    async getCates({ commit }) {
        let res = await fetch.get(cateUrls.findAll)

        commit({
            type: types.GET_CATES,
            data: res.data,
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
