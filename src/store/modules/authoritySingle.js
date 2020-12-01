import Api from '../../services/Api';

const state = {
    authority: {}
};

const getters = {
    getAuthority: (state) => state.authority
};

const actions = {
    async fetchAuthority({ commit }, id) {
        const response = await Api.getSingle('/authority/entities/',id);
        /*
            TODO: Please use the following structure of the response
            NB: in the response_placeholder below, I have structured description as a single object as it should be, 
            because only one description is allowed; 
            if you test the response below, you will get an error, 
            because the Vue template is currently relying on a *list* of descriptions and not on a *single object*, 
            but I will update the Vue template, once the response from the django backend is updated to send a *single object*.
        */ 
        const response_placeholder = {
            data: {
                "identities": [
                    {
                        "display_date": "1983-03-03",
                        "authorised_display_name": "Authorised display name",
                        "name_entries": [
                            {
                                "display_name": "display_name1",
                                "display_date": "display_date1"
                            },
                            {
                                "display_name": "display_name2",
                                "display_date": "display_date2"
                            }
                        ],
                        "description": {
                            "biography_history": {
                                "abstract": "abstract1",
                                "biography": "biography1",
                                "sources": "sources1",
                                "copyright": "copyright1"
                            },
                            "genders": [
                                {
                                    "title": "gender11",
                                    "display_date":  "display_date11",
                                    "descriptive_notes": "descriptive_notes11",
                                    "citation": "citation11"
                                },
                                {
                                    "title": "gender12",
                                    "display_date":  "display_date12",
                                    "descriptive_notes": "descriptive_notes12",
                                    "citation": "citation12"
                                }
                            ],
                            "functions": [
                                {
                                    "title": "function11",
                                    "display_date": "display_date11"
                                },
                                {
                                    "title": "function12",
                                    "display_date": "display_date12"
                                }
                            ],
                            "language_scripts": ["language11", "language12"],
                            "places": [
                                {
                                    "title": "place11",
                                    "role": "role11",
                                    "address": "address11",
                                    "display_date": "display_date11"
                                },
                                {
                                    "title": "place12",
                                    "role": "role12",
                                    "address": "address12",
                                    "display_date": "display_date12"
                                }
                            ],
                            "events": [
                                {
                                    "title": "event11",
                                    "place": "place11",
                                    "display_date": "display_date11"
                                },
                                {
                                    "title": "event12",
                                    "place": "place12",
                                    "display_date": "display_date12"
                                },
                                {
                                    "display_name": "display_name13",
                                    "display_date": "display_date13"
                                },
                            ],
                            "mandates": [
                                {
                                    "display_name": "",
                                    "display_date": "",
                                    "notes": "",
                                    "citation": ""
                                }
                            ],
                            "legal_statuses": [
                                {
                                    "display_name": "",
                                    "display_date": "",
                                    "notes": "",
                                    "citation": ""
                                }
                            ]
                        },
                        "related_records": 
                        [
                            {
                                "id": 1,
                                "title": "record11",
                                "related_as": "related_as11"
                            },
                            {
                                "id": 2,
                                "title": "title12",
                                "related_as": "related_as12"
                            }	
                        ],
                        "related_entities": [
                            {
                                "id": 1,
                                "title": "title11",
                                "related_as": "related_as11"
                            },
                            {
                                "id": 2,
                                "title": "title12",
                                "related_as": "related_as12"
                            }	
                        ],
                        "resources": [
                            {
                                "citation": "resource11",
                                "url": "url11",
                                "related_as": "related_as11",
                                "notes": "note11"
                            },
                            {
                                "citation": "resource12",
                                "url": "url11",
                                "related_as": "related_as12",
                                "notes": "note11"
                            }
                        ]
                    },
                    {
                        "display_date": "date",
                        "authorised_display_name": "Authorised display name",
                        "name_entries": [
                            {
                                "display_name": "display_name21",
                                "display_date": "display_date21"
                            },
                        ],
                        "description": {
                            "biography_history": {
                                "abstract": "abstract2",
                                "biography": "biography2",
                                "sources": "sources2",
                                "copyright": "copyright2"
                            },
                            "genders": [
                                {
                                    "title": "gender21",
                                    "display_date":  "display_date21",
                                    "descriptive_notes": "descriptive_notes21",
                                    "citation": "citation21"
                                },
                            ],
                            "functions": [
                                {
                                    "title": "function21",
                                    "display_date": "display_date21"
                                },
                                {
                                    "title": "function22",
                                    "display_date": "display_date22"
                                }
                            ],
                            "language_scripts": [],
                            "places": [
                                {
                                    "title": "place21",
                                    "role": "role21",
                                    "address": "address21",
                                    "display_date": "display_date21"
                                },
                                {
                                    "title": "place22",
                                    "role": "role22",
                                    "address": "address22",
                                    "display_date": "display_date22"
                                }
                            ],
                            "events": [
                            ],
                            "mandates": [
                            ],
                            "legal_statuses": [
                            ]
                        },
                        "related_records": 
                        [
                            {
                                "id": 1,
                                "title": "record21",
                                "related_as": "related_as21"
                            },
                            {
                                "id": 2,
                                "title": "title22",
                                "related_as": "related_as22"
                            }	
                        ],
                        "related_entities": [
                        ],
                        "resources": [
                            {
                                "citation": "resource21",
                                "url": "url21",
                                "related_as": "related_as21",
                                "notes": "note21"
                            },
                            {
                                "citation": "resource21",
                                "url": "url21",
                                "related_as": "related_as21",
                                "notes": "note21"
                            }
                        ]
                    }
                ],
                "sources": [
                    {
                        "title": "source1",
                        "url": "url1",
                        "notes": "notes1"
                    },
                    {
                        "title": "source2",
                        "url": "url2",
                        "notes": "notes2"
                    }
                ],
                "rights_declaration": "rights_declaration"
            }
        };

        // ?: change to response.data.identities?; vue template is currently using getAuthority.identities, so this is not critical
        commit('setAuthority', response.data);
    }
};

const mutations = {
    setAuthority: (state, authority) => (state.authority = authority),
};

export default {
    state,
    getters,
    actions,
    mutations
}
