import Api from '../../services/Api';

const state = {
  authorityEntities: [],
  description: '',
  loadMoreUrl: '',
  facets: [],
  letterIndex: [],
  total: 0,
};

const getters = {
  getAuthorityEntitiesPageDescription: (state) => state.description,
  getAuthorityEntities: (state) => state.authorityEntities,
  getTotalAuthorityEntities: (state) => state.total,
  getEntityLetterIndex: (state) => state.letterIndex,
  getEntityFacets: (state) => state.facets
};

const actions = {
  async fetchEntityPageDescription ({ commit }) {
    const response = await Api.getSingle('/wagtail/pages/',16);
    if (response.data.introduction != '') {
      commit('setPageDescription', response.data.introduction);
    }
  },
  async fetchAuthorityEntities({ commit }, params) {
    const response = await Api.get('/api/authority/entities', params);
    commit('setAuthorityEntities', response.data.results);
    commit('setLoadMoreUrl', response.data.next);
    commit('setTotal', response.data.count);
    commit('setFacets', response.data.facets);
    commit('setLetterIndex', response.data.letterIndex);
  },
  async loadMoreAuthorityEntities({ commit }) {
    const response = await Api.getUrl(state.loadMoreUrl);

    commit('setLoadMoreUrl', response.data.next);
    commit('setMoreAuthorityEntities', response.data.results);
  }
};

const mutations = {
  setPageDescription: (state, description) => (state.description = description),
  setAuthorityEntities: (state, authorityEntities) => (state.authorityEntities = authorityEntities),
  setLoadMoreUrl: (state, nextUrl) => (state.loadMoreUrl = nextUrl),
  setTotal: (state, count) => (state.total = count),
  setFacets: (state, facets) => (state.facets = facets),
  setLetterIndex: (state, letterIndex) => (state.letterIndex = letterIndex),
  setMoreAuthorityEntities: (state, moreAuthorityEntities) => moreAuthorityEntities.forEach(element => state.authorityEntities.push(element))
};

export default {
  state,
  getters,
  actions,
  mutations
}
