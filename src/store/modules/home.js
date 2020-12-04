import Api from '../../services/Api';

const state = {
    stats: [],
    timelineGroups: [],
    description: '',
    aboutImage: {}
};

const getters = {
    getHomeStats: (state) => state.stats,
    getTimelineGroups: (state) => state.timelineGroups,
    getAboutDescription: (state) => state.description,
    getAboutImageUrl: (state) => state.aboutImage
};

const actions = {
    async fetchHomeStats({ commit }) {
        // medium priority TODO: get stats from the backend
        const response = {
            data: {
                stats: [
                    {
                        name: 'totalArchives',
                        num: '2,994',
                        text: 'archival records'
                    },
                    {
                        name: 'totalEntities',
                        num: '1,743',
                        text: 'people & corporate bodies'
                    },
                    {
                        title: 'totalManuscripts',
                        num: '125,558',
                        text: 'images of manuscripts'
                    }
                ],
            }
        };
        commit('setHomeStats', response.data.stats);
    },
    async fetchTimelineGroups({ commit }) {
        // high priority TODO: get the timeline groups from the backend
        const response = {
            data: {
                timelineGroups: [
                    {
                        pk: 1,
                        title: 'Early Georgians',
                        url_slug: 'early-georgians',
                        introduction: 'Collections related to George I, George II and their families',
                        featured_collections_series: [
                            {pk: 11, title: 'George II [collection]'},
                            {pk: 12, title: 'George II financial records'},
                            {pk: 13, title: 'Manuscript of “Memoirs of the Reign” of George II'},
                            {pk: 14, title: 'Papers of Caroline, Queen Consort to George II'},
                            {pk: 15, title: 'Additional papers concerning George I, George II, and others 2'},
                        ],
                        featured_files_items: [],
                        featured_entities: [
                            {pk: 11, title: 'George I, King'},
                            {pk: 12, title: 'George II, King'},
                            {pk: 13, title: 'Caroline, Queen Consort to George II (1683-1737)'},
                            {pk: 14, title: 'Frederick, Prince of Wales'},
                        ],
                    },
                    {
                        pk: 2,
                        url_slug: 'george-III-queen-charlotte-and-their-family',
                        title: 'George III, Queen Charlotte and their family',
                        introduction: 'Introductions to published collections of George III, his Queen consort and their children',
                        featured_collections_series: [
                            {pk: 21, title: 'George III Essays'},
                            {pk: 22, title: 'Diaries, essays and notes of Queen Charlotte'},
                            {pk: 23, title: 'Papers of Charlotte, Queen Consort to George III'},
                            {pk: 24, title: 'Additional papers relating to George III and Queen Charlotte'},
                            {pk: 25, title: 'Letters from and concerning Princess Augusta Sophia'},
                        ],
                        featured_files_items: [
                            {
                                pk: 21, 
                                src: require("@/assets/images/record-placeholder.png"), 
                                date: '7 January 1766', 
                                title: 'Letter from George III to Sir Joseph Yorke on the possibility of the Hereditary Prince of Brunswick [Charles William Ferdinand, Duke of Brunswick-Wolfenbüttel] being put into the service of the Prince of Orange [William V]', 
                                collection: {pk: 211, title: 'Collection'}
                            },
                            {
                                pk: 22, 
                                src: require("@/assets/images/record-placeholder.png"), 
                                date: '1746-1805', 
                                title: 'Essay on government', 
                                collection: {pk: 212, title: 'George III Essays'}
                            },
                            {
                                pk: 22, 
                                src: require("@/assets/images/record-placeholder.png"), 
                                date: '1746-1805', 
                                title: 'Essay on government', 
                                collection: {pk: 212, title: 'George III Essays'}
                            },
                        ],
                        featured_entities: [
                            {pk: 21, title: 'George III, 1738-1820, King of Great Britain and Ireland'},
                            {pk: 22, title: 'Charlotte, Queen Consort of George III'},
                            {pk: 23, title: 'Mary, Princess (1776-1857)'}
                        ],
                    },
                    {
                        pk: 3,
                        title: 'George III siblings',
                        url_slug: 'george-III-siblings',
                        introduction: 'Papers of the brothers of George III',
                        featured_collections_series: [],
                        featured_files_items: [
                            {
                                pk: 31, 
                                src: require("@/assets/images/record-placeholder.png"), 
                                date: '18 February 1766', 
                                title: 'Letter from the Duke of York to George III on the Duke of Bedford', 
                                collection: {
                                    pk: 311, 
                                    title: 'Collection'
                                }
                            },
                        ],
                        featured_entities: [
                            {pk: 31, title: 'William Henry, Prince (b. 1765)'},
                            {pk: 32, title: 'Edward, 1739-1767, Duke of York and Albany'}
                        ],
                    },
                    {
                        pk: 4,
                        title: 'George IV and Princess Charlotte of Wales',
                        url_slug: 'george-IV-and-princess-charlotte-of-wales',
                        introduction: 'Introductions to his papers and financial records as Prince, Regent and King, as well as those of his only daughter',
                        featured_collections_series: [
                        ],
                        featured_files_items: [
                        ],
                        featured_entities: [
                            {pk: 41, title: 'George IV, King'},
                            {pk: 42, title: 'Princess Charlotte of Wales'}
                        ],
                    },
                    {
                        pk: 5,
                        title: 'William IV',
                        url_slug: 'william-iv',
                        introduction: 'Correspondence of the seafaring Prince and King',
                        featured_collections_series: [
                            {pk: 51, title: 'Letters from and to William IV and Queen Adelaide and papers concerning them'},
                            {pk: 52, title: 'Private and official papers of William IV'},
                            {pk: 53, title: 'Financial papers of William IV'},
                        ],
                        featured_files_items: [
                            {
                                pk: 51, 
                                src: require("@/assets/images/record-placeholder.png"), 
                                date: '8 June 1832', 
                                title: 'Appointment of the Duke of Gloucester as Trustee of British Museum, written at St James’s Palace', 
                                collection: {pk: 1, title: 'Collection'}
                            },
                        ],
                        featured_entities: [
                            {pk: 51, title: 'William IV, King'},
                        ],
                    },
                ]
            }
        };

        commit('setTimelineGroups', response.data.timelineGroups);
    },
    async fetchAboutDescription({ commit }) {
        const response = await Api.getSingle('/wagtail/pages/',17);
        let image = {};
        if (response.data.image) {
            image = {
                resource: response.data.meta.parent.meta.html_url + response.data.image.meta.download_url,
                alt: response.data.image.title
            }
        } else {
            image = {
                resource: require('@/assets/images/Charlotte_children_brothers.jpg'),
                alt: 'Queen Charlotte with her Children and Brothers'
            }
        }
        commit('setAboutImageURL', image);
        commit('setAboutDescription', response.data);
    }
};

const mutations = {
    setHomeStats: (state, stats) => (state.stats = stats),
    setTimelineGroups: (state, timelineGroups) => (state.timelineGroups = timelineGroups),
    setAboutDescription: (state, description) => (state.description = description),
    setAboutImageURL: (state, aboutImage) => (state.aboutImage = aboutImage),
};

export default {
    state,
    getters,
    actions,
    mutations
}
