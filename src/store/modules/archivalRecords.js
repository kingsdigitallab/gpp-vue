import Api from '../../services/Api';

const state = {
    title: '',
    description: '',
    archivalRecords: [],
    loadMoreUrl: '',
    facets: [],
    letterIndex: [],
    total: 0
};

const getters = {
    getArchivalRecordsPageTitle: (state) => state.title,
    getArchivalRecordsPageDescription: (state) => state.description,
    getArchivalRecords: (state) => state.archivalRecords,
    getTotalArchives: (state) => state.total,
    getArchivalLetterIndex: (state) => state.letterIndex,
    getArchivalFacets: (state) => state.facets,
};

const actions = {
    async fetchArchivalRecordsPageDescription ({ commit }) {
        const response = {
            data: {
                pageTitle: 'Archival records',
                pageDescription: '',
            }
        };
        commit('setPageTitle', response.data.pageTitle);
        commit('setPageDescription', response.data.pageDescription);
    },
    async fetchArchivalRecords({ commit }, params) {
        /*
            TODO: 
            /archival/records is currently returning too much data that we don't actually need on the Archival records page
            Please have the following structure of the response:
            data: {
                count: [total number of records that can be returned with the specified params, e.g., 87],
                results: [
                    {
                        id: 0,
                        title: “archival_record_title”,
                        archival_level: “archival_record_archival_level”,
                        writers: [
                            {
                                id: 0,
                                display_name: “writer_display_name”
                            }
                        ],
                        creation_dates: “archival_record_creation_dates”
                    }
                ],
                letterIndex: ...,
                facets: ...
            }
        */
        const response = await Api.get('/archival/records');
        // TODO: add facets to the response or send another request for facets
        const response_placeholder = {
            data: {
                count: 2994,
                letterIndex: [
                    { 
                        name: 'A',
                        missing: false
                    },
                    {	
                        name: 'B',
                        missing: false
                    },
                    {
                        name: 'C',
                        missing: false
                    },
                    {
                        name: 'D',
                        missing: false
                    },
                    { 
                        name: 'E',
                        missing: false
                    }, 
                    {
                        name:'F',
                        missing: false
                    }, 
                    {
                        name: 'G',
                        missing: false
                    },
                    {
                        name: 'H',
                        missing: false
                    },
                    {
                        name: 'I',
                        missing: false
                    },
                    {
                        name: 'J',
                        missing: false
                    },
                    {
                        name: 'K',
                        missing: false
                    },
                    {
                        name: 'L',
                        missing: false
                    },
                    {
                        name: 'M',
                        missing: false
                    }, 
                    {
                        name: 'N',
                        missing: false
                    },
                    {
                        name: 'O',
                        missing: false
                    }, 
                    {
                        name: 'P',
                        missing: false
                    },
                    {
                        name: 'Q',
                        missing: false
                    },
                    {
                        name: 'R',
                        missing: false
                    },
                    {
                        name: 'S',
                        missing: false
                    },
                    {
                        name: 'T',
                        missing: false
                    },
                    {
                        name: 'U',
                        missing: false
                    }, 
                    {
                        name: 'V',
                        missing: false
                    },
                    {
                        name: 'W',
                        missing: false
                    },
                    {
                        name: 'X',
                        missing: false
                    },
                    { 
                        name: 'Y',
                        missing: false
                    },
                    {
                        name: 'Z',
                        missing: false
                    },
                    {
                        name: '0-9',
                        missing: false
                    }
                ],
                facets: {
                    creation_years: {
                        min_default: 1700,
                        max_default: 2020
                    },
                    levels: [
                        {display_name: "Collection", count: 19},
                        {display_name: "Series", count: 84},
                        {display_name: "File", count: 349},
                        {display_name: "Item", count: 452},
                    ],
                    recordTypes: [
                        {display_name: "Writings (documents)", count: 5},
                        {display_name: "Correspondence", count: 4},
                        {display_name: "Diaries", count: 2},
                        {display_name: "Financial records", count: 9},
                        {display_name: "Legal documents", count: 2},
                        {display_name: "Registers (lists)", count: 2},
                        {display_name: "Wills", count: 5},
                        {display_name: "Commonplace books", count: 1},
                    ],
                    writers: [
                        {display_name: "George III, 1738-1820, King of Great Britain and Ireland", count: 541},
                        {display_name: "Grafton, 3rd Duke of", count: 81},
                        {display_name: "North, Frederick, Lord", count: 75},
                        {display_name: "William, Prince (1765-1837)", count: 69},
                        {display_name: "Conway, Henry Seymour (1721-1795)", count: 41},
                        {display_name: "Rockingham, 2nd Marquess of", count: 38},
                        {display_name: "Charlotte, Queen Consort to George III", count: 37},
                        {display_name: "Baillie, Matthew (1761-1823)", count: 34},
                        {display_name: "Chatham, 1st Earl of", count: 26},
                        {display_name: "Rochford, 4th Earl of", count: 24},
                        {display_name: "Basnett, William", count: 19},
                        {display_name: "Parker and Perry; Glass Manufacturers", count: 18},
                    ],
                    addressees: [
                        {display_name: "George III, 1738-1820, King of Great Britain and Ireland", count: 541},
                        {display_name: "Grafton, 3rd Duke of", count: 81},
                        {display_name: "North, Frederick, Lord", count: 75},
                        {display_name: "William, Prince (1765-1837)", count: 69},
                        {display_name: "Conway, Henry Seymour (1721-1795)", count: 41},
                        {display_name: "Rockingham, 2nd Marquess of", count: 38},
                        {display_name: "Charlotte, Queen Consort to George III", count: 37},
                        {display_name: "Baillie, Matthew (1761-1823)", count: 34},
                        {display_name: "Chatham, 1st Earl of", count: 26},
                        {display_name: "Rochford, 4th Earl of", count: 24},
                        {display_name: "Basnett, William", count: 19},
                        {display_name: "Parker and Perry; Glass Manufacturers", count: 18}
                    ],
                    languages: [
                        {display_name: "English", count: 2463},
                        {display_name: "French", count: 124},
                        {display_name: "German", count: 33},
                        {display_name: "Italian", count: 8},
                        {display_name: "Latin", count: 6}
                    ],
                    with_transcriptions: {display_name: 'Show only records with transcriptions',count: 10},
                }
            }
        };

        commit('setLoadMoreUrl', response.data.next);
        commit('setArchivalRecords', response.data.results);
        commit('setTotal', response_placeholder.data.count);
        commit('setFacets', response_placeholder.data.facets);
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
    setPageTitle: (state, title) => (state.title = title),
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
