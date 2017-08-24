import axios from 'axios'

const state = {
    data: null,
}

const getters = {}

const mutations = {
    newPost(state, { post }) {
        state.data = post
    },
}

const actions = {
    async newPost({ commit }, { post }) {
        let res = await axios.post('/api/new', { ...post })

        if (res.data.ok) {
            commit({
                type: 'newPost',
                post: res.data.post,
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
