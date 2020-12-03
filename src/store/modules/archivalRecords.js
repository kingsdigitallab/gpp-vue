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
        // TODO add description to Wagtail (very low priority)
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
            Please use the following structure of the response:
            data: {
                results: [
                    {
                        pk: 0,
                        title: “archival_record_title”,
                        archival_level: “archival_record_archival_level”,
                        creators: ["",""],
                        creation_dates: “archival_record_creation_dates”
                    }
                ],
                count: [see in the response_placeholder below],
                next: ...,
                previous: ...,
                letterIndex: ...,
                facets: ...
            }
        */
        const response = await Api.get('/archival/records');
        // TODO: add facets to the response or send another request for facets
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
                        missing: false
                    },
                    {
                        name: 'C',
                        missing: true
                    },
                    {
                        name: 'D',
                        missing: true
                    },
                    { 
                        name: 'E',
                        missing: true
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
                    creation_years: [1700, 2020],
                    archival_level: [
                        {key: "Collection", doc_count: 19},
                        {key: "Series", doc_count: 84},
                        {key: "File", doc_count: 349},
                        {key: "Item", doc_count: 452},
                    ],
                    record_types: [
                        {key: "Writings (documents)", doc_count: 5},
                        {key: "Correspondence", doc_count: 4},
                        {key: "Diaries", doc_count: 2},
                        {key: "Financial records", doc_count: 9},
                        {key: "Legal documents", doc_count: 2},
                        {key: "Registers (lists)", doc_count: 2},
                        {key: "Wills", doc_count: 5},
                        {key: "Commonplace books", doc_count: 1},
                    ],
                    creators: [
                        {key: "George III, 1738-1820, King of Great Britain and Ireland", doc_count: 541},
                        {key: "Grafton, 3rd Duke of", doc_count: 81},
                        {key: "North, Frederick, Lord", doc_count: 75},
                        {key: "William, Prince (1765-1837)", doc_count: 69},
                        {key: "Conway, Henry Seymour (1721-1795)", doc_count: 41},
                        {key: "Rockingham, 2nd Marquess of", doc_count: 38},
                        {key: "Charlotte, Queen Consort to George III", doc_count: 37},
                        {key: "Baillie, Matthew (1761-1823)", doc_count: 34},
                        {key: "Chatham, 1st Earl of", doc_count: 26},
                        {key: "Rochford, 4th Earl of", doc_count: 24},
                        {key: "Basnett, William", doc_count: 19},
                        {key: "Parker and Perry; Glass Manufacturers", doc_count: 18},
                    ],
                    persons_as_relations: [
                        {key: "George III, 1738-1820, King of Great Britain and Ireland", doc_count: 541},
                        {key: "Grafton, 3rd Duke of", doc_count: 81},
                        {key: "North, Frederick, Lord", doc_count: 75},
                        {key: "William, Prince (1765-1837)", doc_count: 69},
                        {key: "Conway, Henry Seymour (1721-1795)", doc_count: 41},
                        {key: "Rockingham, 2nd Marquess of", doc_count: 38},
                        {key: "Charlotte, Queen Consort to George III", doc_count: 37},
                        {key: "Baillie, Matthew (1761-1823)", doc_count: 34},
                        {key: "Chatham, 1st Earl of", doc_count: 26},
                        {key: "Rochford, 4th Earl of", doc_count: 24},
                        {key: "Basnett, William", doc_count: 19},
                        {key: "Parker and Perry; Glass Manufacturers", doc_count: 18}
                    ],
                    languages: [
                        {key: "English", doc_count: 2463},
                        {key: "French", doc_count: 124},
                        {key: "German", doc_count: 33},
                        {key: "Italian", doc_count: 8},
                        {key: "Latin", doc_count: 6}
                    ],
                    with_transcriptions: {key: 'Show only records with transcriptions',doc_count: 10},
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
