import * as types from '../mutation-types'
import { fetch, user as userUrls } from '../../api'

const state = {
    data: {},
}

const getters = {
    currentUser: state => state.data,
}

const mutations = {
    [types.SIGN_USER](state, { data }) {
        state.data = data
    },
}

const actions = {
    async getUser({ commit }) {
        let res = await fetch.get(userUrls.getUser)

        commit({
            type: types.SIGN_USER,
            data: res.data,
        })
    },
    async signin({ commit }, { user }) {
        let res = await fetch.post(userUrls.signin, user)

        commit({
            type: types.SIGN_USER,
            data: res.data,
        })
    },
    async signup({ commit }, { user }) {
        let res = await fetch.post(userUrls.signup, user)

        commit({
            type: types.SIGN_USER,
            data: res.data,
        })
    },
    async logout({ commit }) {
        let res = await fetch.get(userUrls.logout)

        commit({
            type: types.SIGN_USER,
            data: {},
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
