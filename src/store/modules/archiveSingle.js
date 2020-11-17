import Api from '../../services/Api';

const state = {
    archive: {},
    timelineGroup: {},
    hierarchy: {}
};

const getters = {
    getArchive: (state) => state.archive,
    getArchiveTimelineGroup: (state) => state.timelineGroup,
    getArchiveHierarchy: (state) => state.hierarchy,
};

const actions = {
    async fetchCollectionsSeries({ commit }, id) {
        /* 
            TODO: normalise the response
            data: {
                archive: {
                    id: 0,
                    title: “archive_title”,
                    repository: “archive_repository_title”,
                    description: “archive_description”,
                    ra_references: [
                        {
                            id: 0,
                            title: “DEBUDE”
                        }
                    ],
                    creation_dates: “archive_creation_dates”,
                    archival_level: “archive_archival_level”,
                    extent: “archive_extent”, 
                    languages: [“English”, “French”],
                    administrative_history: “”,
                    related: {
                        subjects: [“”, “”],
                        places_as_subjects: [“”, “”],
                        persons_as_subjects: [
                            {
                                id: 0,
                                name: “”
                            }
                        ],
                        organisations_as_subjects: [
                            {
                                id: 0,
                                name: “”
                            }
                        ],
                        related_materials: [
                            {
                                // id here refers to an RA reference
                                id: 0,
                                label: “”
                            }
                        ],
                        publications: “”,
                    },
                    provenance: "",
                    origin_location: [“”, “”],
                    arrangement: “archive_arrangement”,
                    notes: “archive_notes”,
                    rights_declaration: “archive_rights_declaration”
                },
                timelineGroup: ...,
                hierarchy: ...
            }
        */
        const response = await Api.getSingle('/archival/records/',id);
        const response_extra = {
            data: {
                timelineGroup: {
                    id: 1,
                    url: 'george-III-queen-charlotte-and-their-family',
                    name: 'George III, Queen Charlotte and their family'
                },
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
        let images = [];
        response.data['media'].forEach(element => {
            images.push({type:'image', url: element['resource'], buildPyramid: false});
        });
        response.data['media'] = images;
        commit('setArchive', response.data);
        commit('setTimelineGroup', response_extra.data.timelineGroup);
        commit('setHierarchy', response_extra.data.hierarchy);
    },
    async fetchFilesItems({ commit }, id) {
        
        const response = await Api.getSingle('/archival/records/',id);
        
        let images = [];
        response.data['media'].forEach(element => {
            images.push({type:'image', url: element['resource'], buildPyramid: false});
        });
        response.data['media'] = images;
        commit('setArchive', response.data);
    }
};

const mutations = {
    setArchive: (state, archive) => (state.archive = archive),
    setTimelineGroup: (state, timelineGroup) => (state.timelineGroup = timelineGroup),
    setHierarchy: (state, hierarchy) => (state.hierarchy = hierarchy),
};

export default {
    state,
    getters,
    actions,
    mutations
}
