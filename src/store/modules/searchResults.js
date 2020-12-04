import Api from '../../services/Api';

const state = {
    results: [],
    resultsTotal: 0,
    loadMoreResultsUrl: ''
};

const getters = {
    getSearchResults: (state) => state.results,
    getSearchResultsTotal: (state) => state.resultsTotal
};

const actions = {
    async fetchSearchResults({ commit }, params) {
        // params:
        // {
        //     pages: 1,
        //     searchTerm: '',
        //     filter: ''
        // }
        // filter is either:
        //  'all' (search all over the website without returning filters), 
        // or 'entities' (search all entities) 
        // or 'archival_records' (search all archival records) 
        const response = {
            data: {
                total: 5,
                results: [
                    // pages from autharch
                    {
                        pk: 0,
                        page: 'people-and-corporate-bodies',
                        title: 'Object title',
                        // snippet should include where the keyword was found, e.g., category, creators, etc.
                        snippet: 'object snippet'
                    },
                    {
                        pk: 1,
                        page: 'collections-series',
                        title: 'Object title',
                        snippet: 'object snippet'
                    },
                    {
                        pk: 2,
                        page: 'files-items',
                        title: 'Object title',
                        snippet: 'object snippet'
                    }
                ]
            }
        };

        commit('setSearchResults', response.data.results);
        commit('setSearchResultsTotal', response.data.total);
    },
    // TODO add load more records
    async loadMoreSearchResults({commit}) {
        // await Api.getUrl(state.loadMoreResultsUrl)
        const response = {
            data: {
                next: '',
                results: [
                    {
                        pk: 0,
                        page: 'people-and-corporate-bodies',
                        title: 'Object title',
                        snippet: 'object snippet'
                    },
                    {
                        pk: 1,
                        page: 'collections-series',
                        title: 'Object title',
                        snippet: 'object snippet'
                    }
                ]

            }
        };

        commit('setloadMoreResultsUrl', response.data.next);
        commit('setMoreSearchResults', response.data.results);
    }
};

const mutations = {
    setSearchResults: (state, results) => (state.results = results),
    setSearchResultsTotal: (state, resultsTotal) => (state.resultsTotal = resultsTotal),
    setloadMoreResultsUrl: (state, nextUrl) => (state.loadMoreResultsUrl = nextUrl),
    setMoreSearchResults: (state, moreSearchResults) => moreSearchResults.forEach(element => state.results.push(element))
};

export default {
    state,
    getters,
    actions,
    mutations
}
