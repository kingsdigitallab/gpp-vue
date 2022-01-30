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
    const response_placeholder = {
      data: {
        letterIndex: [
          {
            name: 'A',
            missing: false
          },
          {
            name: 'B',
            missing: true
          },
          {
            name: '0-9',
            missing: false
          }
        ],
        facets: {
          existence_years: [1700, 2020],
          entityTypes: [
            {key: "Person", doc_count: 1543},
          ],
          genders: [
            {key: "Women", doc_count: 34},
          ],
          languages: [
            {key: "English", doc_count: 2463},
          ],
          related_entities: [
            {key: "George III, 1738-1820, King of Great Britain and Ireland", doc_count: 541},
          ],
          related_places: [
            {key: "George III, 1738-1820, King of Great Britain and Ireland", doc_count: 541},
          ],
          with_royal_names: {key: 'Show only people with royal names', doc_count: 10},
          with_multiple_identities: {key: 'Show only people with multiple identities', doc_count: 5}
        }
      }
    };

    commit('setAuthorityEntities', response.data.results);
    commit('setLoadMoreUrl', response.data.next);
    commit('setTotal', response.data.count);
    commit('setFacets', response.data.facets);
    commit('setLetterIndex', response_placeholder.data.letterIndex);
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
