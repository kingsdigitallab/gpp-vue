<template>
	<div>
        <div class="record" v-if="!loading">		
			<h1 class="page-title">{{getArchive.title}}</h1>
            <p class="related-to">in collection: <router-link :to="{name: 'collections-series', params: {id: collection.id}}">{{collection.name}}</router-link></p>
            <div class="two-column-70-30">
                <div>
                    <p>{{getArchive.description}}</p>
                    <p><span class="highlight">Physical description:</span> {{getArchive.physical_description}}</p>
                </div>
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
                            <ul v-for="(language, i) in getArchive.languages" v-bind:key="i">
                                <li>{{language}}<template v-if="i != getArchive.languages.length - 1">, </template></li>
                            </ul>
                        </template>
                        <span v-else>—</span>
                    </div>
                </div>
            </div>
            <div v-if="hasTranscription" class="transcriptions">
                <div class="two-column-50-50 main-pane">
                    <div class="image-section">
                        <div id="openseadragon" class="image"></div>
                    </div>
                    <div class="transcription-section">
                        <div v-for="(transcription, i) in transcriptions" v-bind:key="i" v-bind:id="'transcription-' + i" v-html="transcription.transcription" v-bind:class="['transcription', {'active':activeTranscription == i}]">
                            {{transcription.transcription}}
                        </div>
                    </div>
                </div>
                <div class="two-column-50-50 action-pane">
                    <div id="navigation-pane" class="image-control">
                        <div class="control">
                            <div>
                                <span class="nav-icon" id="zoom-in"></span>
                                <span class="nav-icon" id="zoom-out"></span>
                                <span class="nav-icon" id="rotate-left"></span>
                                <span class="nav-icon" id="rotate-right"></span>
                            </div>
                            <div>
                                <span class="nav-icon" id="default"></span>
                                <span class="nav-icon" id="full-mode"></span>
                            </div>
                        </div>
                    </div>
                    <div class="pagination-pane">
                        <paginate :page-count="transcriptions.length" :click-handler="page" :prev-text="'Prev'" :next-text="'Next'"></paginate>
                    </div>
                </div>
            </div>

            <div class="two-column-30-70">
                <div class="grey-column">
                    <!-- convert to a template with a for-loop? Can't be done with the current data in response -->
                    <div class="two-column-40-60">
                        <h4>Writer</h4>
                        <!-- TODO normalise data to get creator {name:'', id:''} -->
                        <ul v-if="getArchive.creators != null && getArchive.creators.length > 0">
                            <!-- TODO forward to the entity page -->
                            <li v-for="(writer, i) in getArchive.creators" v-bind:key="i">
                                <router-link :to="{name: 'entity', params: {id: writer.id}}">
                                    {{writer.display_name}} <span v-if="i != getArchive.creators.length - 1">, </span>
                                </router-link>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                    <div class="two-column-40-60">
                        <h4>Addressee</h4>
                        <!-- TODO normalise data ito get persons_as_relations {name:'', id:''} -->
                        <ul v-if="getArchive.persons_as_relations && getArchive.persons_as_relations.length > 0">
                            <!-- TODO forward to the entity page -->
                            <li v-for="(addressee, i) in getArchive.persons_as_relations" v-bind:key="i">
                                <router-link :to="{name: 'entity', params: {id: addressee.id}}">
                                    {{addressee.display_name}}</router-link><template v-if="i != getArchive.persons_as_relations.length - 1">, </template>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                    <div class="two-column-40-60">
                        <h4>Place of writing</h4>
                        <ul v-if="getArchive.creation_places && getArchive.creation_places.length > 0">
                            <li v-for="(place_of_writing, i) in getArchive.creation_places" v-bind:key="i">
                                {{place_of_writing}}<template v-if="i != getArchive.creation_places.length - 1">, </template>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                    <div class="two-column-40-60">
                        <h4>Receiving address</h4>
                        <!-- TODO normalise data in response {{getArchive.metadata[2].content}} to get persons_as_relations {name:'', id:''} -->
                        <ul v-if="getArchive.places_as_relations && getArchive.places_as_relations.length > 0">
                            <!-- TODO forward to the people and corporate bodies page with filtered data -->
                            <li v-for="(receiving_address, i) in getArchive.places_as_relations" v-bind:key="i">
                                {{receiving_address}}<template v-if="i != getArchive.places_as_relations.length - 1">, </template>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                </div>
                <div>
                    <div class="two-column-20-80">
                        <h4>Subjects</h4>
                        <ul v-if="getArchive.subjects.length > 0" class="flex">
                            <!-- TODO forward to the entity page -->
                            <li v-for="(subject, i) in getArchive.subjects" v-bind:key="i" class="mgn-right">
                                {{subject.title}}<template v-if="i != getArchive.subjects.length - 1">, </template>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                    <div class="two-column-20-80">
                        <h4>Places</h4>
                        <ul v-if="getArchive.places_as_subjects.length > 0" class="flex">
                             <li v-for="(place, i) in getArchive.places_as_subjects" v-bind:key="i" class="mgn-right">
                                {{place}}<template v-show="i != getArchive.places_as_subjects.length - 1">, </template>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                    <div class="two-column-20-80">
                        <h4>Persons</h4>
                        <ul v-if="getArchive.persons_as_subjects.length > 0" class="flex">
                            <li v-for="(person, i) in getArchive.persons_as_subjects" v-bind:key="i">
                                <!-- TODO forward to the entity page -->
                                <router-link :to="{}">{{person}}</router-link><template v-if="i != getArchive.persons_as_subjects.length - 1">, </template>
                            </li>
                        </ul>
                        <span v-else>—</span>
                    </div>
                    <div class="two-column-20-80">
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
            </div>

            <h4>Known previous publications</h4>
            <template v-if="getArchive.publications && getArchive.publications.length > 0">
                <ol>
                    <li v-for="(publication, i) in getArchive.publications" v-bind:key="i">
                    {{publication}}<span v-if="i != getArchive.publications.length - 1">, </span>
                    </li>
                </ol>
            </template>
            <p v-else>—<p>
            <br>
            <h4>Custodial history</h4>
            <p v-if="getArchive.provenance">
                {{getArchive.provenance}}
            </p>
            <p v-else>—</p>
            <div>
                <h2>Copyright &amp; access</h2>
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
                        <!-- TODO fix URL in the response - it is not related to https://gpp.rct.uk/ -->
                        <!-- <a v-if="getArchive.metadata[9].content" v-bind:href="getArchive.metadata[9].content" target="_blank">See record at the Georgian Papers online</a> -->
                    </div>
                    <div class="grey-column">
                        <h4>Withheld</h4>
                        <p v-if="getArchive.withheld">{{getArchive.withheld}}</p>
                        <p v-else>—</p>
                        <h4>Credit</h4>
                        <p v-if="getArchive.publication_permission">{{getArchive.publication_permission}}</p>
                        <p v-else>—</p>
                        <h4>Copyright</h4>
                        <p v-if="getArchive.copyright_status">{{getArchive.copyright_status}}</p>
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
import OpenSeadragon from 'openseadragon'
import Paginate from 'vuejs-paginate'
import { mapGetters, mapActions } from 'vuex'

let tileSources = []
let viewer = {}
function startOpenSeaDragon(index) {
    if (document.getElementsByClassName("openseadragon-container").length == 0) {
      viewer = OpenSeadragon({
        id: 'openseadragon', 
        prefixUrl: '/assets/images/',
        tileSources: tileSources,
        zoomInButton: "zoom-in",
        zoomOutButton: "zoom-out",
        homeButton: "default",
        fullPageButton: "full-mode",
        rotateLeftButton: "rotate-left",
        rotateRightButton: "rotate-right",
        degrees: 0,
        showRotationControl: true,
        gestureSettingsTouch: {
            pinchRotate: true
        }
      })
    }
    viewer.goToPage(index);
}

export default {
	name: 'FilesItemsSingle',
	components: {Paginate, OpenSeadragon},
	computed: mapGetters(['getArchive']),
	data: function() {
		return {
            loading: true,
            collection: {
                id: 1,
                name: 'George III essays'
            },
            activeTranscription: 0,
            transcriptions: [],
            transcriptions_PLACEHOLDER: [
                {
                    order: 1,
                    transcription: `<div class="tei-body"><span class="tei-pb" data-tei-n="1"/><p class="tei-p">1<br class="tei-lb"/></p>  <p class="tei-p">Edward VI.<br class="tei-lb"/></p>  <p class="tei-p"><del class="tei-del"> <span class="tei-unclear">[unclear]</span> </del> Henry VIII. had by his will taken great care of nonage <br class="tei-lb"/>of his Son, having appointed ye. ablest &amp; honestest <br class="tei-lb"/>men to be Counsellors.<br class="tei-lb"/></p>  <p class="tei-p">Soon after ye. Coronation ye. E. of Hertford was created <br class="tei-lb"/>D. of Somserset; &amp; nam'd Governor of ye. Young K. &amp; <br class="tei-lb"/>Protector of ye. K-m; this was an innovation of ye. K. <br class="tei-lb"/>Will where it was clearly declar'd yt. all ye. Council <br class="tei-lb"/>should have ^ <ins class="tei-add"> an </ins> equal degree of Power.<br class="tei-lb"/></p>  <p class="tei-p">Upon this a Parl. was Summon'd when ^ <ins class="tei-add"> <u class="tei-hi" data-tei-rend="underline"> Several Acts were made as follows </u> </ins> ye. Statute of ye. <br class="tei-lb"/>28th. H. VIII. yt. a K. at any time of life might by his <br class="tei-lb"/>letters Patent null any Acts made before he was 24 <br class="tei-lb"/>years old, was repeal'd; another yt. ye. Laity might <br class="tei-lb"/>take ye. Sacra. in both Kinds; Bishops only to be<br class="tei-lb"/>appointed by ye. K; A Subsidy on Tonnage &amp; Poundage, <br class="tei-lb"/>&amp; on Merchandise call'd Customs, granted for ye.<br class="tei-lb"/>K. life; All Chaunteries suppress'd &amp; their Revenues<br class="tei-lb"/>given to ye. K; All Acts extending treason beyond <br class="tei-lb"/>yt. of ye. 25th. Ed. III. were repeal'd; men loitering without <br class="tei-lb"/>offering to work 3. days were to be slaves for 2. years<br class="tei-lb"/>to those who would carry them before a Justice of ye.<br class="tei-lb"/>Peace, &amp; have ye. letter V. printed with a hot<br class="tei-lb"/>Iron on their breasts.<br class="tei-lb"/></p>  <p class="tei-p">ye. Parl. met again in 1548. at which time a form<br class="tei-lb"/>of Prayer Settl'd; Priests allow'd to Marry; &amp; an Act<br class="tei-lb"/>made for better Supporting ye. Parochial Clergy.<br class="tei-lb"/></p>  <p class="tei-p">Great Jealousies arose between ye. Protector<br class="tei-lb"/>&amp; his Bro. ye. High Admiral, which came to such a <br class="tei-lb"/>height yt. by ye. intregues of ye. former, ye. latter was <br class="tei-lb"/>attainted &amp; executed.<br class="tei-lb"/></p>  <p class="tei-p">A Subsidy was granted; &amp; a general Pardon; as also one<br class="tei-lb"/></p><br class="tei-lb"/></div>`,
                    model: "archival.archivalrecordtranscription",
                    pk: 41
                },
                {
                    order: 2,
                    transcription: `transcription`,
                    model: "archival.archivalrecordtranscription",
                    pk: 41
                }
            ],
            viewer: '',
            hasTranscription: true
		}
	},
	methods: {
        page(pageNum) {
          this.activeTranscription = pageNum-1;  
          startOpenSeaDragon(pageNum-1);
        },
		...mapActions(['fetchArchive'])
	},
	created() {
        this.loading = true;
	},
	async mounted() {
        await this.fetchArchive(this.$route.params.id);
        // await this.fetchTranscriptions(this.$route.params.id);
        // TODO  - order returned data?
        this.transcriptions = this.transcriptions_PLACEHOLDER;
        this.loading = false;
        this.hasTranscription = this.getArchive.media.length > 0;
        for (let index in this.getArchive.media) {
            tileSources.push({
                type: 'image',
                url: this.getArchive.media[index].url
            })
        }
        startOpenSeaDragon(0);
	},
	watch: {
		// getArchive(newValue) {
		// 	this.openSeaDragon(newValue.media);
		// 	this.image = !(newValue.media.length == 0);
		// 	this.transcript = !(newValue.administrative_history == null);
		// }
	}
}
</script>
