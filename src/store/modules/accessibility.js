import Api from '../../services/Api';

const state = {
    page: {},
};

const getters = {
    getAccessibilityPage: (state) => state.page
};

const actions = {
    async fetchPage({ commit }) {
        const response = await Api.getSingle('/wagtail/pages/',5);

        commit('setPage', response.data);
    }
};

const mutations = {
    setPage: (state, page) => (state.page = page)
};

export default {
    state,
    getters,
    actions,
    mutations
}
