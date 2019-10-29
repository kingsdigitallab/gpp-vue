import Api from '../../services/Api';

const state = {
    accessibility: {},
};

const getters = {
    getAccessibilityPage: (state) => state.accessibility
};

const actions = {
    async fetchAccessibilityPage({ commit }) {
        const response = await Api.getSingle('/wagtail/pages/',5);

        commit('setPage', response.data);
    }
};

const mutations = {
    setPage: (state, accessibility) => (state.accessibility = accessibility)
};

export default {
    state,
    getters,
    actions,
    mutations
}
