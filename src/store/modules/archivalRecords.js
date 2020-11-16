import Api from '../../services/Api';

const state = {
    title: '',
    description: '',
    archivalRecords: [],
    loadMoreUrl: '',
    facets: [],
    total: 0
};

const getters = {
    pageTitle: (state) => state.title,
    pageDescription: (state) => state.description,
    getArchivalRecords: (state) => state.archivalRecords,
    getTotalArchives: (state) => state.total,
    facets: (state) => state.facets
};

const actions = {
    async fetchArchivalRecordsPageDescription ({ commit }) {
        const response = {
            data: {
                pageTitle: 'Archival records',
                pageDescription: 'About archival records - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        };
        commit('setPageTitle', response.data.pageTitle);
        commit('setPageDescription', response.data.pageDescription);
    },
    async fetchArchivalRecords({ commit }, params) {
        const response = await Api.get('/archival/records');
        // TODO: add facets to the response or send another request for facets
        // TODO: if min and max years are not within selectedFacets, please set min = min_default and max = max_default
        const response_placeholder = {
            data: {
                count: 2994,
                facets: {
                    creation_years: {
                        min: 1720,
                        max: 2000,
                        min_default: 1700,
                        max_default: 2020
                    },
                    levels: [
                        {id: 0, display_name: "Collection", count: 19},
                        {id: 1, display_name: "Series", count: 84},
                        {id: 2, display_name: "File", count: 349},
                        {id: 3, display_name: "Item", count: 452},
                    ],
                    recordTypes: [
                        {id: 1, display_name: "Writings (documents)", count: 5},
                        {id: 2, display_name: "Correspondence", count: 4},
                        {id: 3, display_name: "Diaries", count: 2},
                        {id: 0, display_name: "Financial records", count: 9},
                        {id: 4, display_name: "Legal documents", count: 2},
                        {id: 5, display_name: "Registers (lists)", count: 2},
                        {id: 6, display_name: "Wills", count: 5},
                        {id: 7, display_name: "Commonplace books", count: 1},
                    ],
                    writers: [
                        {id: 0, display_name: "George III, 1738-1820, King of Great Britain and Ireland", count: 541},
                        {id: 1, display_name: "Grafton, 3rd Duke of", count: 81},
                        {id: 2, display_name: "North, Frederick, Lord", count: 75},
                        {id: 3, display_name: "William, Prince (1765-1837)", count: 69},
                        {id: 4, display_name: "Conway, Henry Seymour (1721-1795)", count: 41},
                        {id: 5, display_name: "Rockingham, 2nd Marquess of", count: 38},
                        {id: 6, display_name: "Charlotte, Queen Consort to George III", count: 37},
                        {id: 7, display_name: "Baillie, Matthew (1761-1823)", count: 34},
                        {id: 9, display_name: "Chatham, 1st Earl of", count: 26},
                        {id: 9, display_name: "Rochford, 4th Earl of", count: 24},
                        {id: 10, display_name: "Basnett, William", count: 19},
                        {id: 11, display_name: "Parker and Perry; Glass Manufacturers", count: 18},
                    ],
                    addressees: [
                        {id: 0, display_name: "George III, 1738-1820, King of Great Britain and Ireland", count: 541},
                        {id: 1, display_name: "Grafton, 3rd Duke of", count: 81},
                        {id: 2, display_name: "North, Frederick, Lord", count: 75},
                        {id: 3, display_name: "William, Prince (1765-1837)", count: 69},
                        {id: 4, display_name: "Conway, Henry Seymour (1721-1795)", count: 41},
                        {id: 5, display_name: "Rockingham, 2nd Marquess of", count: 38},
                        {id: 6, display_name: "Charlotte, Queen Consort to George III", count: 37},
                        {id: 7, display_name: "Baillie, Matthew (1761-1823)", count: 34},
                        {id: 9, display_name: "Chatham, 1st Earl of", count: 26},
                        {id: 9, display_name: "Rochford, 4th Earl of", count: 24},
                        {id: 10, display_name: "Basnett, William", count: 19},
                        {id: 11, display_name: "Parker and Perry; Glass Manufacturers", count: 18}
                    ],
                    languages: [
                        {id: 0, display_name: "English", count: 2463},
                        {id: 1, display_name: "French", count: 124},
                        {id: 2, display_name: "German", count: 33},
                        {id: 3, display_name: "Italian", count: 8},
                        {id: 4, display_name: "Latin", count: 6}
                    ],
                    with_transcriptions: true
                }
            }
        };

        commit('setLoadMoreUrl', response.data.next);
        commit('setArchivalRecords', response.data.results);
        commit('setTotal', response_placeholder.data.count);
        commit('setFacets', response_placeholder.data.facets);
    },
    async loadMoreArchivalRecords({ commit }) {
        const response = await Api.getUrl(state.loadMoreUrl);

        commit('setLoadMoreUrl', response.data.next);
        commit('setMoreArchivalRecords', response.data.results);
    }
};

const mutations = {
    setArchivalRecords: (state, archivalRecords) => (state.archivalRecords = archivalRecords),
    setPageTitle: (state, title) => (state.title = title),
    setPageDescription: (state, description) => (state.description = description),
    setLoadMoreUrl: (state, nextUrl) => (state.loadMoreUrl = nextUrl),
    setFacets: (state, facets) => (state.facets = facets),
    setTotal: (state, count) => (state.total = count),
    setMoreArchivalRecords: (state, moreArchivalRecords) => moreArchivalRecords.forEach(element => state.archivalRecords.push(element))
};

export default {
    state,
    getters,
    actions,
    mutations
}
