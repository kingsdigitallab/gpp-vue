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
        /*
            TODO: 
            /authority/entities/ is currently returning too much data that we don't actually need on the Archival records page
            Please use the following structure of the response:
            data: {
                results: [
                    {
                        pk: 0,
                        display_name: “”,
                        entity_type: “entity_type”,
                        display_date_name_used: “entity_display_date_name_used”
                    }
                ],
                count: [see in the response_placeholder below],
                next: ...,
                previous: ...,
                letterIndex: ...,
                facets: ...
            }
        */
        const response = await Api.get('/authority/entities');
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
                        missing: false
                    },
                    {
                        name: 'D',
                        missing: false
                    },
                    { 
                        name: 'E',
                        missing: true
                    }, 
                    {
                        name:'F',
                        missing: true
                    }, 
                    {
                        name: 'G',
                        missing: true
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
                    existence_years: [1700, 2020],
                    entityTypes: [
                        {key: "Person", doc_count: 1543},
                        {key: "Corporate body", doc_count: 31}
                    ],
                    genders: [
                        {key: "Women", doc_count: 34},
                        {key: "Men", doc_count: 45}
                    ],
                    languages: [
                        {key: "English", doc_count: 2463},
                        {key: "French", doc_count: 124},
                        {key: "German", doc_count: 33},
                        {key: "Italian", doc_count: 8},
                        {key: "Latin", doc_count: 6}
                    ],
                    related_entities: [
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
                    related_places: [
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
                    with_royal_names: {key: 'Show only people with royal names', doc_count: 10},
                    with_multiple_identities: {key: 'Show only people with multiple identities', doc_count: 5}
                }
            }
        };
        
        commit('setAuthorityEntities', response.data.results);
        commit('setLoadMoreUrl', response.data.next);
        commit('setTotal', response.data.count);
        commit('setFacets', response_placeholder.data.facets);
        commit('setLetterIndex', response_placeholder.data.letterIndex);
    },
    // I don't know what loadMoreAuthorityEntities does in the backend (same with loadMoreArchivalRecords), it might be worth replacing this function with fetchAuthorityEntities if it does not process filters
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