<template>
	<div>
		<div class="record" v-if="!loading">		
			<h1 class="page-title">{{getArchive.title}}</h1>
            <p class="related-to">related to: <router-link :to="{name: 'timeline', params: {subpage: timelineGroup.url}}">{{timelineGroup.name}}</router-link></p>
            <div class="two-column-70-30">
                <p>{{getArchive.description}}</p>
                <div class="grey-column">
                    <!-- TODO: normalise the data response -->
                    <div class="two-column-30-70">
                        <h4>RA References</h4>
                        <span>
                            {{getArchive.references[0].unitid}}
                            <!-- <span v-for="(reference, i) in getArchive.references[0]" v-bind:key="i">
                                {{reference.unitid}}<span v-if="i != getArchive.references.length - 1">, </span>
                            </span> -->
                        </span>
                    </div>
                    <div class="two-column-30-70">
                        <h4>Creation dates</h4>
                        <span>{{getArchive.creation_dates}}</span>
                    </div>
                    <!-- TODO: normalise the data response -->
                    <div class="two-column-30-70">
                        <h4>Archival level</h4>
                        <span>{{getArchive.metadata[1].content}}</span>
                    </div>
                    <div class="two-column-30-70">
                        <h4>Extent</h4>
                        <span>{{getArchive.extent}}</span>
                    </div>
                    <div class="two-column-30-70">
                        <h4>Languages</h4>
                        <template v-if="getArchive.persons_as_subjects.length > 0">
                            <span v-for="(language, i) in getArchive.languages" v-bind:key="i">
                                {{language}}<span v-if="i != getArchive.languages.length - 1">, </span>
                            </span>
                        </template>
                        <span v-else>—</span>
                    </div>
                </div>
            </div>
            <div class="two-column-30-70">
                <div class="grey-column">
                    <h4>Administrative history</h4>
                    <p v-if="getArchive.administrative_history" v-bind:administrativeHistory="showMoreAdministrativeHistory ? administrativeHistory = getArchive.administrative_history.substring(0, 1000) + '...' : administrativeHistory = getArchive.administrative_history">
                        {{administrativeHistory}}
                        <button v-on:click="showMoreAdministrativeHistory = !showMoreAdministrativeHistory" class="button-link dotted-underline">Read 
                            <template v-if="showMoreAdministrativeHistory">more</template>
                            <template v-else>less</template>
                        </button>
                    </p>
                    <p v-else>—</p>
                </div>
                <div class="hierarchy">
                    <h2>Collection</h2>
                    <div class="hierarchy-header">
                        <span></span>
                        <span>Title</span>
                        <span class="record-details">
                            <span>Level</span>
                            <span>Creation dates</span>
                        </span>
                    </div>
                    <div class="parent-level">
                        <hierarchy-template v-bind:current="this.hierarchy"></hierarchy-template>
                    </div>
                </div>
            </div>
            <div>
                <h2>Related</h2>
                <div class="two-column-30-70">
                    <div>
                        <div class="two-column-40-60">
                            <h4>Subjects</h4>
                            <ul v-if="getArchive.subjects.length > 0" class="flex">
                                <!-- TODO forward to the entity page -->
                                <li v-for="(subject, i) in getArchive.subjects" v-bind:key="i" class="mgn-right">
                                    <router-link :to="{}">{{subject.title}}</router-link><template v-if="i != getArchive.subjects.length - 1">, </template>
                                </li>
                            </ul>
                            <span v-else>—</span>
                        </div>
                        <div class="two-column-40-60">
                            <h4>Places</h4>
                            <ul v-if="getArchive.places_as_subjects.length > 0" class="flex">
                                <li v-for="(place, i) in getArchive.places_as_subjects" v-bind:key="i" class="mgn-right">
                                    {{place}}<template v-show="i != getArchive.places_as_subjects.length - 1">, </template>
                                </li>
                            </ul>
                            <span v-else>—</span>
                        </div>
                        <div class="two-column-40-60">
                            <h4>Persons</h4>
                            <ul v-if="getArchive.persons_as_subjects.length > 0" class="flex">
                                <li v-for="(person, i) in getArchive.persons_as_subjects" v-bind:key="i">
                                    <!-- TODO forward to the entity page -->
                                    <router-link :to="{}">{{person}}</router-link><template v-if="i != getArchive.persons_as_subjects.length - 1">, </template>
                                </li>
                            </ul>
                            <span v-else>—</span>
                        </div>
                        <div class="two-column-40-60">
                            <h4>Corporate bodies</h4>
                            <ul v-if="getArchive.organisations_as_subjects.length > 0" class="flex">
                                <li v-for="(organisation, i) in getArchive.organisations_as_subjects" v-bind:key="i">
                                    <router-link :to="{}">{{organisation}}</router-link><template v-if="i != getArchive.organisations_as_subjects.length - 1">, </template>
                                </li>
                            </ul>
                            <span v-else>—</span>
                        </div>
                        <!-- review getArchive.related_materials once sent to confirm the format-->
                        <br>
                        <p>
                            Other GPP Materials
                            <br>
                            <template v-if="getArchive.related_materials">{{getArchive.related_materials}}</template>
                            <template v-else>—</template>
                        </p>
                    </div>
                    <div class="grey-column">
                        <h4>Known previous publications</h4>
                        <template v-if="getArchive.publications && getArchive.publications.length > 0">
                            <ol>
                                <li v-for="(publication, i) in getArchive.publications" v-bind:key="i">
                                {{publication}}<span v-if="i != getArchive.publications.length - 1">, </span>
                                </li>
                            </ol>
                        </template>
                        <span v-else>—</span>
                    </div>
                </div>
            </div>
            <div>
                <h2>Arrangement &amp; custodial history</h2>
                <div class="two-column-30-70">
                    <div>
                        <div class="two-column-40-60">
                            <h4>Repository</h4>
                            <span>{{getArchive.repository.title}}</span>
                        </div>
                        <div class="two-column-40-60">
                            <h4>Location of originals</h4>
                            <template v-if="getArchive.origin_location && getArchive.origin_location.length > 0">
                                <span v-for="(location, i) in getArchive.origin_location" v-bind:key="i">
                                {{location}}<span v-if="i != getArchive.origin_location.length - 1">, </span>
                                </span>
                            </template>
                            <span v-else>—</span>
                        </div>
                    </div>
                    <div class="grey-column">
                        <h4>Arrangement</h4>
                        <p v-if="getArchive.arrangement">{{getArchive.arrangement}}</p>
                        <p v-else>—</p>
                    </div>
                </div>
            </div>
            <h2>Notes</h2>
            <p v-if="getArchive.notes">{{getArchive.notes}}</p>
            <p v-else>—</p>
            <div>
                <h2>Digital rights declaration</h2>
                <div class="grey-column">
                    <h4>Rights declaration</h4>
                    <p v-html="getArchive.rights_declaration"></p>
                </div>
            </div>
        </div>
        <div v-else class="loader"></div>
    </div>
</template>

<script>
import HierarchyTemplate from '../templates/HierarchyTemplate.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'CollectionSeriesSingle',
	components: {HierarchyTemplate},
	computed: mapGetters(['getArchive']),
	data: function() {
		return {
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
            loading: true,
            showMoreAdministrativeHistory: true,
            administrativeHistory: ''
		}
	},
	methods: {
		...mapActions(['fetchArchive'])
	},
	created(){
        this.loading = true;
    },
	mounted() {
		this.fetchArchive(this.$route.params.id);
        this.loading = false;
        this.showMoreAdministrativeHistory = this.getArchive.administrative_history.length > 200;
	},
	watch: {
	}
}
</script>
