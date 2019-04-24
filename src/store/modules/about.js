import Api from '../../services/Api';

const state = {
    page: {},
    imageUrl: ''
};

const getters = {
    getPage: (state) => state.page,
    getImageURL: (state) => state.imageUrl,
};

const actions = {
    async fetchPage({ commit }) {
        const response = await Api.getSingle('/wagtail/pages/',4);

        commit('setPage', response.data);
        commit('setImageURL', response.data.meta.parent.meta.html_url + response.data.image.meta.download_url);
    }
};

const mutations = {
    setPage: (state, page) => (state.page = page),
    setImageURL: (state, imageUrl) => (state.imageUrl = imageUrl),
};

export default {
    state,
    getters,
    actions,
    mutations
}
