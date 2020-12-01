import Api from '../../services/Api';

const state = {
    authority: {}
};

const getters = {
    getFacets: (state) => state.facets,
    getSearchResults: (state) => state.results,
    getLetterIndex: (state) => state.letterIndex,
    getTotalSearchResults: (state) => state.total
};

const actions = {
    async fetchSearchResults({ commit }, params) {
        // filter is either:
        //  'all' (search all over the website without returning filters), 
        // 'entities' (search all over entities and return filters relevant to entities) 
        // and 'archival_records' (search all over archival records and return filters relevant to archival records) 
        const response = {
            data: {
                total: 0,
                results: [

                ],
                facets: [

                ],
                letterIndex: [

                ]
            }
        };

        commit('setSearchResults', response.data.results);
        commit('setFacets', response.data.facets);
        commit('setLetterIndex', response.data.letterIndex);
        commit('setTotalSearchResults', response.data.total);
    },
    async loadMoreSearchResults({ commit }) {
    }
};

const mutations = {
    setSearchResults: (state, results) => (state.results = results),
    setFacets: (state, facets) => (state.facets = facets),
    setLetterIndex: (state, letterIndex) => (state.letterIndex = letterIndex),
    setTotalSearchResults: (state, total) => (state.total = total),
};

export default {
    state,
    getters,
    actions,
    mutations
}
