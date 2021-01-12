import Api from '../../services/Api';

const state = {
    archive: {},
    hierarchy: {},
    transcriptions: []
};

const getters = {
    getArchive: (state) => state.archive,
    getArchiveHierarchy: (state) => state.hierarchy,
    getTranscriptions: (state) => state.transcriptions
};

const actions = {
    async fetchCollectionsSeries({ commit }, id) {
        const response = await Api.getSingle('/archival/records',id);
        /* 
            TODO: Please use the structure of the response provided below (as much as possible, I can adjust the Vue templates to any changes needed)
            Please note that I need to update Vue template once the data response is updated.
            Currently, the Vue template follows the response I receive from /archival/records/:id, which is quite unnormalised
            const response = {
                data: {
                    pk: 0,
                    title: "archive_title",
                    repository: "archive_repository_title",
                    description: "archive_description",
                    ra_references: [
                        {
                            pk: 0,
                            title: "DEBUDE"
                        }
                    ],
                    creation_dates: "",
                    archival_level: "",
                    extent: "", 
                    languages: ["English", "French"],
                    administrative_history: "",
                    related: {
                        subjects: ["", ""],
                        places_as_subjects: ["", ""],
                        persons_as_subjects: [
                            {
                                pk: 0,
                                display_name: ""
                            }
                        ],
                        organisations_as_subjects: [
                            {
                                pk: 0,
                                display_name: ""
                            }
                        ],
                        related_materials: [
                            {// pk here refers to an RA reference
                                pk: 0,
                                label: ""
                            }
                        ],
                        publications: "",
                    },
                    provenance: "",
                    origin_location: ["", ""],
                    arrangement: "",
                    notes: "",
                    rights_declaration: ""
                    timelineGroup: (see below),
                    hierarchy: (see below)
                }
            };
        */
        const response_extra = {
            data: {
                timelineGroup: {
                    pk: 1,
                    url_slug: 'george-III-queen-charlotte-and-their-family',
                    title: 'George III, Queen Charlotte and their family'
                },
                hierarchy: {
                    pk: 1,
                    is_selected: false,
                    title: '<Collection: Papers of General Jacob de Budé.>', 
                    archival_level: 'Collection',
                    creation_dates: '',
                    is_ancestor: true, 
                    children_desc: '(7 series)', 
                    children: [
                        {
                            pk: 3,
                            is_selected: false, 
                            title: '<Series 3: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            creation_dates: '',
                            is_ancestor: false, 
                            children_desc: '(7 series)',
                            children: []
                        },
                        {
                            pk: 4,
                            is_selected: false, 
                            title: '<Series 4: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: false, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: []
                        },
                        {
                            pk: 2,
                            is_selected: false, 
                            title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: true, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: [
                                {
                                    pk: 2,
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
                            pk: 2,
                            is_selected: false, 
                            title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: false, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: [
                                {
                                    pk: 2,
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
                }
            }
        };
        commit('setArchive', response.data);
        commit('setHierarchy', response.data.hierarchy);
    },
    async fetchFilesItems({ commit }, id) {
        const response = await Api.getSingle('/archival/records',id);
        /*
            TODO: Please use the structure of the response provided below (as much as possible, I can adjust the Vue templates to any changes needed)
            Please note that I need to update Vue template once the data response is updated.
            Currently, the Vue template follows the response I receive from /archival/records/:id, which is quite unnormalised
            data: {
                    pk: 0,
                    title: "archive_title",
                    parentCollection: {
                        pk: 0,
                        title: "archive_collection_title"
                    },
                    repository: "archive_repository_title",
                    description: "archive_description",
                    physical_description: "archive_physical_description",
                    ra_references: [
                        {
                            pk: 0,
                            title: "DEBUDE"
                        }
                    ],
                    creation_dates: "archive_creation_dates",
                    archival_level: "archive_archival_level",
                    extent: "archive_extent", 
                    languages: ["English", "French"],
                    creators: [
                        {
                            pk: 0,
                            display_name: ""
                        }
                    ],
                    // currently persons_as_relations is sending dates for some reason
                    persons_as_relations: [
                        {
                            pk: 0,
                            display_name: ""
                        }
                    ],
                    creation_places: ["", ""],
                    places_as_relations: ["", ""],
                    related: {
                        subjects: ["", ""],
                        places_as_subjects: ["", ""],
                        persons_as_subjects: [
                            {
                                pk: 0,
                                display_name: ""
                            }
                        ],
                        organisations_as_subjects: [
                            {
                                pk: 0,
                                display_name: ""
                            }
                        ],
                        related_materials: [
                            {
                                // pk here refers to an RA reference
                                pk: 0,
                                label: ""
                            }
                        ],
                        publications: "",
                    },
                    provenance: "",
                    origin_location: ["", ""],
                    // make sure we are pulling the right URL - it should be related to https://gpp.rct.uk/ 
                    url:"",
                    withheld: "",
                    publication_permission: "",
                    copyright_status: "",
                    notes: "archive_notes",
                    rights_declaration: "archive_rights_declaration"
                    transcriptions: (see below),
                    media: (see below)
            }
        */
        const response_transcriptions = {
            data: {
                transcriptions: [
                    {
                        order: 0,
                        transcription: `<div class="tei-body"><span class="tei-pb" data-tei-n="1"/><p class="tei-p">1<br class="tei-lb"/></p>  <p class="tei-p">Edward VI.<br class="tei-lb"/></p>  <p class="tei-p"><del class="tei-del"> <span class="tei-unclear">[unclear]</span> </del> Henry VIII. had by his will taken great care of nonage <br class="tei-lb"/>of his Son, having appointed ye. ablest &amp; honestest <br class="tei-lb"/>men to be Counsellors.<br class="tei-lb"/></p>  <p class="tei-p">Soon after ye. Coronation ye. E. of Hertford was created <br class="tei-lb"/>D. of Somserset; &amp; nam'd Governor of ye. Young K. &amp; <br class="tei-lb"/>Protector of ye. K-m; this was an innovation of ye. K. <br class="tei-lb"/>Will where it was clearly declar'd yt. all ye. Council <br class="tei-lb"/>should have ^ <ins class="tei-add"> an </ins> equal degree of Power.<br class="tei-lb"/></p>  <p class="tei-p">Upon this a Parl. was Summon'd when ^ <ins class="tei-add"> <u class="tei-hi" data-tei-rend="underline"> Several Acts were made as follows </u> </ins> ye. Statute of ye. <br class="tei-lb"/>28th. H. VIII. yt. a K. at any time of life might by his <br class="tei-lb"/>letters Patent null any Acts made before he was 24 <br class="tei-lb"/>years old, was repeal'd; another yt. ye. Laity might <br class="tei-lb"/>take ye. Sacra. in both Kinds; Bishops only to be<br class="tei-lb"/>appointed by ye. K; A Subsidy on Tonnage &amp; Poundage, <br class="tei-lb"/>&amp; on Merchandise call'd Customs, granted for ye.<br class="tei-lb"/>K. life; All Chaunteries suppress'd &amp; their Revenues<br class="tei-lb"/>given to ye. K; All Acts extending treason beyond <br class="tei-lb"/>yt. of ye. 25th. Ed. III. were repeal'd; men loitering without <br class="tei-lb"/>offering to work 3. days were to be slaves for 2. years<br class="tei-lb"/>to those who would carry them before a Justice of ye.<br class="tei-lb"/>Peace, &amp; have ye. letter V. printed with a hot<br class="tei-lb"/>Iron on their breasts.<br class="tei-lb"/></p>  <p class="tei-p">ye. Parl. met again in 1548. at which time a form<br class="tei-lb"/>of Prayer Settl'd; Priests allow'd to Marry; &amp; an Act<br class="tei-lb"/>made for better Supporting ye. Parochial Clergy.<br class="tei-lb"/></p>  <p class="tei-p">Great Jealousies arose between ye. Protector<br class="tei-lb"/>&amp; his Bro. ye. High Admiral, which came to such a <br class="tei-lb"/>height yt. by ye. intregues of ye. former, ye. latter was <br class="tei-lb"/>attainted &amp; executed.<br class="tei-lb"/></p>  <p class="tei-p">A Subsidy was granted; &amp; a general Pardon; as also one<br class="tei-lb"/></p><br class="tei-lb"/></div>`
                    },
                    {
                        order: 1,
                        transcription: `transcription 2`
                    }
                ],
                // please check with Elliott on how to get IIIF images without CORS errors
                media: [
                    {
                         title:"Test image",iiif_url:"https://rct.resourcespace.com/iiif/732115a/manifest",thumbnail_url:"https://rct.resourcespace.com/iiif/image/34658/full/thm/0/default.jpg"
                     },
                     {
                         title:"Test image",iiif_url:"https://rct.resourcespace.com/iiif/732115a/",thumbnail_url:"https://rct.resourcespace.com/iiif/image/34658/full/thm/0/default.jpg"
                     },
                     {
                         title:"Test image",iiif_url:"https://rct.resourcespace.com/iiif/732115a/",thumbnail_url:"https://rct.resourcespace.com/iiif/image/34658/full/thm/0/default.jpg"
                     },
                ],
            }
        }

        commit('setArchive', response.data);
        commit('setTranscriptions', response_transcriptions.data);
    }
};

const mutations = {
    setArchive: (state, archive) => (state.archive = archive),
    setHierarchy: (state, hierarchy) => (state.hierarchy = hierarchy),
    setTranscriptions: (state, transcriptions) => (state.transcriptions = transcriptions)
};

export default {
    state,
    getters,
    actions,
    mutations
}
