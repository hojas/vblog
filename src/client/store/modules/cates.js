import axios from 'axios'

const state = {
    list: [],
}

const getters = {}

const mutations = {
    getCates({ commit }, { cates }) {
        state.list = cates
    },
}

const actions = {
    async getCates({ commit }) {
        let res = await axios.get('/api/cates')

        if (res.data.ok) {
            commit({
                type: 'getCates',
                cates: res.data.cates,
            })
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
