<template>
	<div>
		<div class="record" v-if="!loading">
			<h1 class="page-title">{{getArchive.title}}</h1>
            <p v-if="getArchiveTimelineGroup && getArchiveTimelineGroup.name != ''" class="related-to">related to: <router-link :to="{name: 'timeline', params: {subpage: getArchiveTimelineGroup.url}}">{{getArchiveTimelineGroup.name}}</router-link></p>
            <div class="two-column-70-30">
                <p v-if="getArchive.description">{{getArchive.description}}</p>
                <div class="grey-column">
                    <!-- TODO: change to v-if="getArchive.ra_references && getArchive.ra_references.length > 0" -->
                    <div class="two-column-30-70" v-if="getArchive.references && getArchive.references.length > 0" >
                        <h4>RA {{ 'Reference' | pluralize(getArchive.references.length) }}</h4>
                        <span>
                            <!-- TODO: normalise the data response, change to getArchive.ra_references -->
                            {{getArchive.references[0].unitid}}
                            <!-- <span v-for="(reference, i) in getArchive.ra_references" v-bind:key="i">
                                {{reference.title}}<template v-if="i != getArchive.ra_references.length - 1">; </template>
                            </span> -->
                        </span>
                    </div>
                    <div class="two-column-30-70" v-if="getArchive.creation_dates && getArchive.creation_dates != ''">
                        <h4>Creation dates</h4>
                        <span>{{getArchive.creation_dates}}</span>
                    </div>
                    <!-- TODO: normalise the data response; change to v-if="getArchive.archival_level && getArchive.archival_level != ''" -->
                    <div class="two-column-30-70" v-if="getArchive.metadata[1].content">
                        <h4>Archival level</h4>
                        <span>{{getArchive.metadata[1].content}}</span>
                    </div>
                    <div class="two-column-30-70" v-if="getArchive.extent && getArchive.extent != ''">
                        <h4>Extent</h4>
                        <span>{{getArchive.extent}}</span>
                    </div>
                    <div class="two-column-30-70" v-if="getArchive.languages && getArchive.languages.length > 0">
                        <h4>{{ 'Language' | pluralize(getArchive.languages.length) }}</h4>
                        <span>
                            <span v-for="(language, i) in getArchive.languages" v-bind:key="i">
                                <!-- TODO change to {{ language }} -->
                                {{language.name_en}}<template v-if="i != getArchive.languages.length - 1">; </template>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- TODO: add v-if="getArchive.administrative_history || getArchiveHierarchy" --> 
            <div :class="{'two-column-30-70': administrativeHistory != ''}">
                <div class="grey-column" v-if="administrativeHistory != ''">
                    <h4>Administrative history</h4>
                    <p>
                        {{administrativeHistory}}
                        <!-- a bit clumsy solution, but other solutions will automatically scroll up and down to the Read more/less button and we need to prevent scroll -->
                        <template v-if="administrativeHistory.length <= 1000">
                            <button v-on:click="administrativeHistory = getArchive.administrative_history" class="button-link dotted-underline">Read more</button>
                        </template>
                        <template v-if="administrativeHistory.length > 1000">
                            <button v-on:click="administrativeHistory = getArchive.administrative_history.substring(0,1000)" class="button-link dotted-underline">Read less</button>
                        </template>
                    </p>
                </div>
                <!-- TODO: add hierarchy to the response --> 
                <!-- TODO: add v-if="getArchiveHierarchy" --> 
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
                        <!-- TODO: change to getArchiveHierarchy --> 
                        <hierarchy-template v-bind:current="getArchiveHierarchy"></hierarchy-template>
                    </div>
                </div>
            </div>
            <!-- TODO change to v-if getArchive.related -->
            <div v-if="getArchive.subjects && getArchive.subjects.length > 0 || 
                        getArchive.places_as_subjects && getArchive.places_as_subjects.length > 0 || 
                        getArchive.persons_as_subjects && getArchive.persons_as_subjects.length > 0 || 
                        getArchive.organisations_as_subjects && getArchive.organisations_as_subjects.length > 0 || 
                        getArchive.related_materials && getArchive.related_materials.length > 0 || 
                        getArchive.publications && getArchive.publications != ''
                        ">
                <h2>Related</h2>
                <div class="two-column-30-70">
                    <div>
                        <!-- TODO change to v-if getArchive.related.subjects.length > 0 -->
                        <div class="two-column-40-60" v-if="getArchive.subjects && getArchive.subjects.length > 0">
                            <h4>Subjects</h4>
                            <ul class="flex">
                                <li v-for="(subject, i) in getArchive.subjects" v-bind:key="i" class="mgn-right">
                                    <!-- TODO: add filtering by subjects on the Archival records page? -->
                                    <!-- <router-link :to="{}"> -->
                                        {{subject.title}}
                                    <!-- </router-link> -->
                                    <template v-if="i != getArchive.subjects.length - 1">; </template>
                                </li>
                            </ul>
                        </div>
                        <!-- TODO change to v-if getArchive.related.places_as_subjects.length > 0 -->
                        <div class="two-column-40-60" v-if="getArchive.places_as_subjects && getArchive.places_as_subjects.length > 0">
                            <h4>Places</h4>
                            <ul class="flex">
                                <li v-for="(place, i) in getArchive.places_as_subjects" v-bind:key="i" class="mgn-right">
                                    {{place}}
                                    <template v-show="i != getArchive.places_as_subjects.length - 1">; </template>
                                </li>
                            </ul>
                        </div>
                        <!-- TODO change to v-if getArchive.related.persons_as_subjects.length > 0 -->
                        <div class="two-column-40-60" v-if="getArchive.persons_as_subjects && getArchive.persons_as_subjects.length > 0">
                            <h4>People</h4>
                            <ul class="flex">
                                <li v-for="(person, i) in getArchive.persons_as_subjects" v-bind:key="i">
                                    <!-- TODO forward to the entity page -->
                                    <router-link :to="{}">
                                        <!-- TODO change to person.display_name -->
                                        {{person}}
                                    </router-link>
                                    <template v-if="i != getArchive.persons_as_subjects.length - 1">; </template>
                                </li>
                            </ul>
                        </div>
                        <!-- TODO change to v-if getArchive.related.organisations_as_subjects.length > 0 -->
                        <div class="two-column-40-60" v-if="getArchive.organisations_as_subjects && getArchive.organisations_as_subjects.length > 0">
                            <h4>Corporate bodies</h4>
                            <ul class="flex">
                                <li v-for="(organisation, i) in getArchive.organisations_as_subjects" v-bind:key="i">
                                    <!-- TODO forward to the entity page -->
                                    <router-link :to="{}">
                                        <!-- TODO change to organisation.display_name -->
                                        {{organisation}}
                                    </router-link>
                                    <template v-if="i != getArchive.organisations_as_subjects.length - 1">; </template>
                                </li>
                            </ul>
                        </div>
                        <br>
                        <!-- TODO review getArchive.related_materials once sent to confirm the format-->
                        <!-- TODO change to v-if getArchive.related.related_materials.length > 0 -->
                        <p v-if="getArchive.related_materials">
                            Other GPP Materials
                            <br>
                            <ol>
                                <li v-for="(related_material, i) in getArchive.related_materials" v-bind:key="i">
                                    <!-- TODO forward to the gpp website with the ra reference stored in related_material.id -->
                                    <a :href="{}">
                                        {{related_material.label}}
                                    </a>
                                </li>
                            </ol>
                        </p>
                    </div>
                    <!-- TODO change to v-if getArchive.related.publications -->
                    <div class="grey-column" v-if="getArchive.publications && getArchive.publications != ''">
                        <h4>Known previous publications</h4>
                        <p v-html="getArchive.publications"></p>
                    </div>
                </div>
            </div>
            <div v-if="getArchive.repository.title || getArchive.origin_location && getArchive.origin_location.length > 0 || getArchive.arrangement || getArchive.provenance">
                <h2>Arrangement &amp; custodial history</h2>
                <div class="two-column-30-70">
                    <div>
                        <!-- TODO change to getArchive.repository -->
                        <template v-if="getArchive.repository.title">
                            <span class="highlight">Repository:</span> {{getArchive.repository.title}}<br>
                        </template>
                        <template v-if="getArchive.origin_location && getArchive.origin_location.length > 0">
                            <span class="highlight">Location of originals:</span> 
                            <span v-for="(location, i) in getArchive.origin_location" v-bind:key="i">
                                {{location}}<template v-if="i != getArchive.origin_location.length - 1">; </template>
                            </span>
                        </template>
                    </div>
                    <div class="grey-column" v-if="getArchive.arrangement || getArchive.provenance">
                        <h4>Arrangement</h4>
                        <p>{{getArchive.arrangement}}</p>
                        <h4>Custodial history</h4>
                        <p>{{getArchive.provenance}}</p>
                    </div>
                </div>
            </div>
            <template v-if="getArchive.notes">
                <h2>Notes</h2>
                <p v-html="getArchive.notes"></p>
            </template>
            <div class="grey-column" v-if="getArchive.rights_declaration">
                <h2>Digital rights declaration</h2>
                <p v-html="getArchive.rights_declaration"></p>
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
	computed: mapGetters(['getArchive', 'getArchiveTimelineGroup', 'getArchiveHierarchy']),
	data: function() {
		return {
            loading: true,
            administrativeHistory: ''
		}
	},
	methods: {
		...mapActions(['fetchCollectionsSeries'])
	},
	async created(){
        await this.fetchCollectionsSeries(this.$route.params.id);
        if (this.getArchive.administrative_history) {
            this.administrativeHistory = this.getArchive.administrative_history.substring(0,1000);
        }
        this.loading = false;
    }
}
</script>
