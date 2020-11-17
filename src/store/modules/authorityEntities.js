import Api from '../../services/Api';

const state = {
    authorityEntities: [],
    title: '',
    description: '',
    loadMoreUrl: '',
    facets: [],
    letterIndex: [],
    total: 0,
    // people: [],
    // corporate: [],
}

const getters = {
    getAuthorityEntitiesPageTitle: (state) => state.title,
    getAuthorityEntitiesPageDescription: (state) => state.description,
    getAuthorityEntities: (state) => state.authorityEntities,
    getTotalAuthorityEntities: (state) => state.total,
    getEntityLetterIndex: (state) => state.letterIndex,
    getEntityFacets: (state) => state.facets,
    // getPeople: (state) => state.people,
    // getCorporate: (state) => state.corporate
};

const actions = {
    async fetchEntityPageDescription ({ commit }) {
        const response = {
            data: {
                pageTitle: 'People & corporate bodies',
                pageDescription: '',
            }
        };
        commit('setPageTitle', response.data.pageTitle);
        commit('setPageDescription', response.data.pageDescription);
    },
    async fetchAuthorityEntities({ commit }, params) {
        /*
            TODO: 
            /authority/entities/ is currently returning too much data that we don't actually need on the Archival records page
            Please have the following structure of the response:
            data: {
                count: [total number of records that can be returned with the specified params, e.g., 87],
                results: [
                    {
                        id: 0,
                        display_name: “entity_display_name”,
                        entity_type: “entity_type”,
                        display_date_name_used: “entity_display_date_name_used”
                    }
                ],
                letterIndex: ...,
                facets: ...
            }
        */
        const response = await Api.get('/authority/entities');
        const response_placeholder = {
            data: {
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
                    existence_years: {
                        min_default: 1700,
                        max_default: 2020
                    },
                    entityTypes: [
                        {display_name: "Person", count: 1543},
                        {display_name: "Corporate body", count: 31}
                    ],
                    genders: [
                        {display_name: "Women", count: 34},
                        {display_name: "Men", count: 45}
                    ],
                    languages: [
                        {display_name: "English", count: 2463},
                        {display_name: "French", count: 124},
                        {display_name: "German", count: 33},
                        {display_name: "Italian", count: 8},
                        {display_name: "Latin", count: 6}
                    ],
                    relatedEntities: [
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
                    relatedPlaces: [
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
                    with_royal_names: {display_name: 'Show only people with royal names', count: 10},
                    with_multiple_identities: {display_name: 'Show only people with multiple identities', count: 5}
                }
            }
        };

        commit('setAuthorityEntities', response.data.results);
        commit('setLoadMoreUrl', response.data.next);
        commit('setTotal', response.data.count);
        commit('setFacets', response_placeholder.data.facets);
        commit('setLetterIndex', response_placeholder.data.letterIndex);
    },
    async loadMoreAuthorityEntities({ commit }) {
        const response = await Api.getUrl(state.loadMoreUrl);

        commit('setLoadMoreUrl', response.data.next);
        commit('setMoreAuthorityEntities', response.data.results);
    },
    // async fetchCorporate({ commit }) {
    //     const response = await Api.getFilteredData('/authority/entities','entity_type__title=Corporation');

    //     commit('setCorporate', response.data.results);
    //     commit('setLoadMoreUrl', response.data.next);
    //     commit('setTotal', response.data.count);
    // },
    // async fetchPeople({ commit }) {
    //     const response = await Api.getFilteredData('/authority/entities','entity_type__title=Person');

    //     commit('setPeople', response.data.results);
    //     commit('setLoadMoreUrl', response.data.next);
    //     commit('setTotal', response.data.count);
    // }
};

const mutations = {
    setPageTitle: (state, title) => (state.title = title),
    setPageDescription: (state, description) => (state.description = description),
    setAuthorityEntities: (state, authorityEntities) => (state.authorityEntities = authorityEntities),
    setLoadMoreUrl: (state, nextUrl) => (state.loadMoreUrl = nextUrl),
    setTotal: (state, count) => (state.total = count),
    setFacets: (state, facets) => (state.facets = facets),
    setLetterIndex: (state, letterIndex) => (state.letterIndex = letterIndex),
    setMoreAuthorityEntities: (state, moreAuthorityEntities) => moreAuthorityEntities.forEach(element => state.authorityEntities.push(element)),
    // setPeople: (state, people) => (state.people = people),
    // setCorporate: (state, corporate) => (state.corporate = corporate),
    // setMorePeople: (state, morePeople) => morePeople.forEach(element => state.people.push(element)),
};

export default {
    state,
    getters,
    actions,
    mutations
}
