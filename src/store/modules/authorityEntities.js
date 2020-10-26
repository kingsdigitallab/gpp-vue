import Api from '../../services/Api';

const state = {
    authorityEntities: [],
    people: [],
    corporate: [],
    loadMoreUrl: '',
    total: 0
}

const getters = {
    getAuthorityEntities: (state) => state.authorityEntities,
    getPeople: (state) => state.people,
    getCorporate: (state) => state.corporate,
    getTotal: (state) => state.total
};

const actions = {
    async fetchAuthorityEntities({ commit }) {
        const response = await Api.get('/authority/entities');

        commit('setAuthorityEntities', response.data.results);
        commit('setLoadMoreUrl', response.data.next);
        commit('setTotal', response.data.count);
    },
    async fetchCorporate({ commit }) {
        const response = await Api.getFilteredData('/authority/entities','entity_type__title=Corporation');

        commit('setCorporate', response.data.results);
        commit('setLoadMoreUrl', response.data.next);
        commit('setTotal', response.data.count);
    },
    async fetchPeople({ commit }) {
        const response = await Api.getFilteredData('/authority/entities','entity_type__title=Person');

        commit('setPeople', response.data.results);
        commit('setLoadMoreUrl', response.data.next);
        commit('setTotal', response.data.count);
    },
    async loadMorePeople({ commit }) {
        const response = await Api.getUrl(state.loadMoreUrl);

        commit('setLoadMoreUrl', response.data.next);
        commit('setMorePeople', response.data.results);
        commit('setTotal', response.data.count);
    },
    async loadMoreAuthorityEntities({ commit }) {
        const response = await Api.getUrl(state.loadMoreUrl);

        commit('setLoadMoreUrl', response.data.next);
        commit('setMoreAuthorityEntities', response.data.results);
    }
};

const mutations = {
    setAuthorityEntities: (state, authorityEntities) => (state.authorityEntities = authorityEntities),
    setPeople: (state, people) => (state.people = people),
    setCorporate: (state, corporate) => (state.corporate = corporate),
    setLoadMoreUrl: (state, nextUrl) => (state.loadMoreUrl = nextUrl),
    setTotal: (state, count) => (state.total = count),
    setMorePeople: (state, morePeople) => morePeople.forEach(element => state.people.push(element)),
    setMoreAuthorityEntities: (state, moreAuthorityEntities) => moreAuthorityEntities.forEach(element => state.authorityEntities.push(element))
};

export default {
    state,
    getters,
    actions,
    mutations
}
