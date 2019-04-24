import Api from '../../services/Api';

const state = {
    archivalRecords: [],
    loadMoreUrl: ''
};

const getters = {
    getArchivalRecords: (state) => state.archivalRecords
};

const actions = {
    async fetchArchivalRecords({ commit }) {
        const response = await Api.get('/archival/records');

        commit('setLoadMoreUrl', response.data.next);
        commit('setArchivalRecords', response.data.results);
    },
    async loadMoreArchivalRecords({ commit }) {
        const response = await Api.getUrl(state.loadMoreUrl);

        commit('setLoadMoreUrl', response.data.next);
        commit('setMoreArchivalRecords', response.data.results);
    }
};

const mutations = {
    setArchivalRecords: (state, archivalRecords) => (state.archivalRecords = archivalRecords),
    setLoadMoreUrl: (state, nextUrl) => (state.loadMoreUrl = nextUrl),
    setMoreArchivalRecords: (state, moreArchivalRecords) => moreArchivalRecords.forEach(element => state.archivalRecords.push(element))
};

export default {
    state,
    getters,
    actions,
    mutations
}
