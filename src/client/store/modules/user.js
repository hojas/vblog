import axios from 'axios'

const state = {
    username: '',
    email: '',
}

const getters = {}

const mutations = {
    getUser(state, { user }) {
        state.username = user.username
        state.email = user.email
    },
    logout(state) {
        state.username = ''
        state.email = ''
    },
}

const actions = {
    async getUser({ commit }) {
        let res = await axios.get('/api/user')

        if (res.data.ok) {
            commit({
                type: 'getUser',
                user: res.data.user,
            })
        }
    },
    async logout({ commit }) {
        commit({
            type: 'logout',
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
