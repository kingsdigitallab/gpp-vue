import Api from '../../services/Api';

const state = {
    timelineGroupTitles: [],
    timelineGroup: {},
    timelineGroupDescription: {},
    hierarchy: {}
};

const getters = {
    getTimelineGroupTitles: (state) => state.timelineGroupTitles,
    getTimelineGroupDescription: (state) => state.timelineGroupDescription,
    getTimelineGroup: (state) => state.timelineGroup,
    getHierarchy: (state) => state.hierarchy
};

const actions = {
    async fetchTimelineGroupTitles({ commit }) {
        // TODO fetch timelineGroup titles
        const response = {
            data: {
                timelineGroupTitles: [
                    {
                        id: 1,
                        url_slug: 'early-georgians',
                        title: 'Early Georgians'
                    },
                    {
                        id: 2,
                        url_slug: 'george-III-queen-charlotte-and-their-family',
                        title: 'George III, Queen Charlotte and their family'
                    },
                    {
                        id: 3,
                        url_slug: 'george-III-siblings',
                        title: 'George III siblings'
                    },
                    {
                        id: 4,
                        url_slug: 'george-IV-and-princess-charlotte-of-wales',
                        title: 'George IV and Princess Charlotte of Wales'
                    },
                    {
                        id: 5,
                        url_slug: 'william-iv',
                        title: 'William IV'
                    }
                ]
            }
        };
        commit('setTimelineGroupTitles', response.data.timelineGroupTitles);
    },
    async fetchTimelineGroupDescription({ commit }, timelineGroup_path) {
        // low priority - TODO fetch timelineGroup by path (see all paths on line 21)
        const response = {
            data: {
                timelineGroupDescription: {
                    id: 1,
                    title: 'Early Georgians',
                    description: 'Early Georgians - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                }
            }
        };

        commit('setTimelineGroupDescription', response.data.timelineGroupDescription);
    },  
    async fetchTimelineGroup({ commit }, timelineGroup_path) {
        // high priority - TODO fetch timelineGroup by path (see all paths on line 21)
        const response = {
            data: {
                timelineGroup: {
                    id: 1,
                    entities: [
                        {id: 11, title: 'George I, King'},
                        {id: 12, title: 'George II, King'},
                        {id: 13, title: 'Caroline, Queen Consort to George II (1683-1737)'},
                        {id: 14, title: 'Frederick, Prince of Wales'},
                    ],
                    collections: [
                        {
                            id: 21, 
                            title: 'Additional papers relating to George III and Queen Charlotte',
                            children_desc: '12 series'
                        },
                        {   
                            id: 22, 
                            title: 'George III Calendar',
                            children_desc: '12 series'
                        },
                        {
                            id: 23, 
                            title: 'George III Essays',
                            children_desc: '12 series'
                        },
                        {
                            id: 24, 
                            title: 'Diaries, essays and notes of Queen Charlotte',
                            children_desc: '12 series'
                        },
                        {
                            id: 25, 
                            title: 'Papers of Charlotte, Queen Consort to George III',
                            children_desc: '12 series'
                        },
                        {
                            id: 26, 
                            title: 'Letters from and concerning Princess Augusta Sophia',
                            children_desc: '12 series'
                        },
                        {
                            id: 27, 
                            title: 'Papers of Charlotte, Queen Consort to George III',
                            children_desc: '12 series'
                        },
                        {
                            id: 28, 
                            title: 'Papers relating to Lady Charlotte Finch',
                            children_desc: '12 series'
                        },
                    ],
                    featuredRecords: [
                        {
                            id: 21, 
                            src: require("@/assets/images/record-placeholder.png"), 
                            date: '7 January 1766', 
                            title: 'Letter from George III to Sir Joseph Yorke on the possibility of the Hereditary Prince of Brunswick [Charles William Ferdinand, Duke of Brunswick-Wolfenbüttel] being put into the service of the Prince of Orange [William V]', 
                            collection: {id: 211, title: 'Collection'}
                        },
                        {
                            id: 22, 
                            src: require("@/assets/images/record-placeholder.png"), 
                            date: '1746-1805', 
                            title: 'Essay on government', 
                            collection: {id: 212, title: 'George III Essays'}
                        },
                        {
                            id: 22, 
                            src: require("@/assets/images/record-placeholder.png"), 
                            date: '1746-1805', 
                            title: 'Essay on government', 
                            collection: {id: 212, title: 'George III Essays'}
                        },
                    ],
                }
            }
        };

        commit('setTimelineGroup', response.data.timelineGroup);
    },
    async fetchHierarchy({ commit }, collection_id) {
        // high priority TODO fetch the timeline hierarchy by the collection id
        // OL: I don't know how current collections are stored and if there is such a thing as a collection_id,
        // if not, please let me know how the response is structured so that I could update Vue templates.
        const response = {
            data: {
                hierarchy: {
                    id: 1,
                    is_selected: false,
                    title: '<Collection: Papers of General Jacob de Budé.>', 
                    archival_level: 'Collection',
                    creation_dates: '',
                    is_ancestor: true, 
                    children_desc: '(7 series)', 
                    children: [
                        {
                            id: 3,
                            is_selected: false, 
                            title: '<Series 3: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            creation_dates: '',
                            is_ancestor: false, 
                            children_desc: '(7 series)',
                            children: []
                        },
                        {
                            id: 4,
                            is_selected: false, 
                            title: '<Series 4: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: false, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: []
                        },
                        {
                            id: 2,
                            is_selected: false, 
                            title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: true, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: [
                                {
                                    id: 2,
                                    is_selected: true, 
                                    title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                                    archival_level: 'Series',
                                    is_ancestor: false, 
                                    creation_dates: '',
                                    children_desc: '(7 series)',
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 2,
                            is_selected: false, 
                            title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: false, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: [
                                {
                                    id: 2,
                                    is_selected: false, 
                                    title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                                    archival_level: 'Series',
                                    is_ancestor: false, 
                                    creation_dates: '',
                                    children_desc: '(7 series)',
                                    children: []
                                }
                            ]
                        }
                    ]
                },
            }
        };

        commit('setHierarchy', response.data.hierarchy);
    }
}

const mutations = {
    setTimelineGroupTitles: (state, timelineGroupTitles) => (state.timelineGroupTitles = timelineGroupTitles),
    setTimelineGroup: (state, timelineGroup) => (state.timelineGroup = timelineGroup),
    setTimelineGroupDescription: (state, timelineGroupDescription) => (state.timelineGroupDescription = timelineGroupDescription),
    setHierarchy: (state, hierarchy) => (state.hierarchy = hierarchy),
};

export default {
    state,
    getters,
    actions,
    mutations
}