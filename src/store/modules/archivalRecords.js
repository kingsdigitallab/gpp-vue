import Api from '../../services/Api';

const state = {
  description: '',
  archivalRecords: [],
  loadMoreUrl: '',
  facets: [],
  letterIndex: [],
  total: 0
};

const getters = {
  getArchivalRecordsPageDescription: (state) => state.description,
  getArchivalRecords: (state) => state.archivalRecords,
  getTotalArchives: (state) => state.total,
  getArchivalLetterIndex: (state) => state.letterIndex,
  getArchivalFacets: (state) => state.facets,
};

const actions = {
  async fetchArchivalRecordsPageDescription ({ commit }) {
    const response = await Api.getSingle('/wagtail/pages/', 15);
    if (response.data.introduction != '') {
      commit('setPageDescription', response.data.introduction);
    }
  },
  async fetchArchivalRecords({ commit }, params) {
    const response = await Api.get('/api/archival/records/', params);
    const response_placeholder = {
      data: {
        count: 2994,
        // previous and null are copied from ShaRC response
        next:"http://localhost:8000/api/documents/?format=json&page=2",
        previous:null,

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
          creation_years: [1700, 2020],
          archival_level: [
            {key: "Collection", doc_count: 19},
          ],
          record_types: [
            {key: "Writings (documents)", doc_count: 5},
          ],
          creators: [
            {key: "George III, 1738-1820, King of Great Britain and Ireland", doc_count: 541},
          ],
          persons_as_relations: [
            {key: "George III, 1738-1820, King of Great Britain and Ireland", doc_count: 541},
          ],
          languages: [
            {key: "English", doc_count: 2463},
          ],
          with_transcriptions: {key: 'Show only records with transcriptions',doc_count: 10},
        }
      }
    };

    commit('setLoadMoreUrl', response.data.next);
    commit('setArchivalRecords', response.data.results);
    commit('setTotal', response.data.count);
    commit('setFacets', response.data.facets);
    commit('setLetterIndex', response_placeholder.data.letterIndex);
  },
  async loadMoreArchivalRecords({ commit }) {
    const response = await Api.getUrl(state.loadMoreUrl);

    commit('setLoadMoreUrl', response.data.next);
    commit('setMoreArchivalRecords', response.data.results);
  }
};

const mutations = {
  setArchivalRecords: (state, archivalRecords) => (state.archivalRecords = archivalRecords),
  setPageDescription: (state, description) => (state.description = description),
  setLoadMoreUrl: (state, nextUrl) => (state.loadMoreUrl = nextUrl),
  setFacets: (state, facets) => (state.facets = facets),
  setTotal: (state, count) => (state.total = count),
  setLetterIndex: (state, letterIndex) => (state.letterIndex = letterIndex),
  setMoreArchivalRecords: (state, moreArchivalRecords) => moreArchivalRecords.forEach(element => state.archivalRecords.push(element))
};

export default {
  state,
  getters,
  actions,
  mutations
}
