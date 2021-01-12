<template>
  <div>
    <div class="record" v-if="!loading">
      <h1 class="page-title">{{getArchive.title}}</h1>
      <p class="related-to" v-if="getArchive.parent_collection">in collection: <router-link :to="{name: 'collections-series', params: {id: getArchive.parent_collection.pk}}">{{getArchive.parent_collection.title}}</router-link></p>
      <div class="two-column-70-30">
        <div>
          <p v-html="getArchive.description"></p>
          <p><span class="highlight">Physical description:</span> {{getArchive.physical_description}}</p>
        </div>
        <div class="grey-column">
          <div class="two-column-30-70" v-if="getArchive.references && getArchive.references.length > 0" >
            <h4>RA References</h4>
            <span v-for="(reference, i) in getArchive.references" v-bind:key="i">{{reference.unitid}}<span v-if="i != getArchive.references.length - 1">; </span></span>
          </div>
          <div class="two-column-30-70" v-if="getArchive.creation_dates && getArchive.creation_dates != ''">
            <h4>Creation dates</h4>
            <span>{{getArchive.creation_dates}}</span>
          </div>
          <div class="two-column-30-70" v-if="getArchive.resourcetype">
            <h4>Archival level</h4>
            <span>{{getArchive.resourcetype}}</span>
          </div>
          <div class="two-column-30-70" v-if="getArchive.extent && getArchive.extent != ''">
            <h4>Extent</h4>
            <span>{{getArchive.extent}}</span>
          </div>
          <div class="two-column-30-70" v-if="getArchive.languages && getArchive.languages.length > 0">
            <h4>Languages</h4>
            <span>
              <span v-for="(language, i) in getArchive.languages" v-bind:key="i">
                {{language}}<span v-if="i != getArchive.languages.length - 1">; </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <input type="checkbox" id="show-transcriptions" />
      <label for="show-transcriptions" class="show-button">Show/Hide transcriptions</label>
      <div v-if="hasMedia" class="transcriptions">
        <div class="image">
          <div class="image-section">
            <div id="openseadragon" ref="openSeaDragon" class="image"></div>
          </div>
          <div id="navigation-pane" class="image-control">
            <!-- TODO add v-if="this.getArchive.media.length > 0"-->
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
        </div>
        <div class="transcription">
          <div class="transcription-section">
            <div v-for="(transcription, i) in getTranscriptions.transcriptions" v-bind:key="i" v-bind:id="'transcription-' + i" v-html="transcription.transcription" v-bind:class="['transcription', {'active':activeTranscription == i}]">
              {{transcription.transcription}}
            </div>
          </div>
          <div class="pagination-pane">
            <paginate :page-count="getTranscriptions.media.length" :click-handler="page" :prev-text="'Prev'" :next-text="'Next'"></paginate>
          </div>
        </div>
      </div>

      <div class="two-column-30-70">
        <div class="grey-column" v-if="getArchive.creators && getArchive.creators.length > 0 || getArchive.persons_as_relations && getArchive.persons_as_relations.length > 0 || getArchive.creation_places && getArchive.creation_places.length > 0 || getArchive.places_as_relations && getArchive.places_as_relations.length > 0">
          <div class="two-column-40-60" v-if="getArchive.creators && getArchive.creators.length > 0">
            <h4>{{ 'Writer' | pluralize(getArchive.creators.length) }}</h4>
            <ul class="flex">
              <li v-for="(writer, i) in getArchive.creators" v-bind:key="i">
                <router-link :to="{name: 'entity', params: {id: writer.id}}">{{writer.name}}</router-link><template v-if="i != getArchive.creators.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div class="two-column-40-60" v-if="getArchive.persons_as_relations && getArchive.persons_as_relations.length > 0">
            <h4>{{ 'Addressee' | pluralize(getArchive.persons_as_relations.length) }}</h4>
            <ul class="flex">
              <li v-for="(addressee, i) in getArchive.persons_as_relations" v-bind:key="i">
                <router-link :to="{name: 'entity', params: {id: addressee.id}}">{{addressee.name}}</router-link><template v-if="i != getArchive.persons_as_relations.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div class="two-column-40-60" v-if="getArchive.creation_places && getArchive.creation_places.length > 0">
            <h4>{{ 'Place' | pluralize(getArchive.creation_places.length) }} of writing</h4>
            <ul class="flex">
              <li v-for="(place_of_writing, i) in getArchive.creation_places" v-bind:key="i">
                {{place_of_writing.address}}<template v-if="i != getArchive.creation_places.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div class="two-column-40-60" v-if="getArchive.places_as_relations && getArchive.places_as_relations.length > 0">
            <h4>Receiving {{ 'address' | pluralize(getArchive.places_as_relations.length) }}</h4>
            <ul class="flex">
              <li v-for="(receiving_address, i) in getArchive.places_as_relations" v-bind:key="i">
                {{receiving_address.address}}<template v-if="i != getArchive.places_as_relations.length - 1">; </template>
              </li>
            </ul>
          </div>
        </div>
        <!-- TODO change to v-if getArchive.related -->
        <div v-if="getArchive.related">
          <h2>Related</h2>
          <div class="two-column-20-80" v-if="getArchive.related.subjects">
            <h4>Subjects</h4>
            <ul class="flex">
              <li v-for="(subject, i) in getArchive.related.subjects" v-bind:key="i" class="mgn-right">
                <!-- TODO: add filtering by subjects on the Archival records page? -->
                <!-- <router-link :to="{}"> -->
                  {{subject.title}}
                  <!-- </router-link> -->
                <template v-if="i != getArchive.related.subjects.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div class="two-column-20-80" v-if="getArchive.related.places_as_subjects">
            <h4>Places</h4>
            <ul class="flex">
              <li v-for="(place, i) in getArchive.related.places_as_subjects" v-bind:key="i" class="mgn-right">
                {{place.address}}
                <template v-if="i != getArchive.related.places_as_subjects.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div class="two-column-20-80" v-if="getArchive.related.persons_as_subjects">
            <h4>People</h4>
            <ul class="flex">
              <li v-for="(person, i) in getArchive.related.persons_as_subjects" v-bind:key="i">
                <router-link :to="{name: 'entity', params: {id: person.id}}">
                  {{person.name}}
                </router-link>
                <template v-if="i != getArchive.related.persons_as_subjects.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div class="two-column-20-80" v-if="getArchive.related.organisations_as_subjects">
            <h4>Corporate bodies</h4>
            <ul class="flex">
              <li v-for="(organisation, i) in getArchive.related.organisations_as_subjects" v-bind:key="i">
                <router-link :to="{name: 'entity', params: {id: organisation.id}}">
                  {{organisation.name}}
                </router-link>
                <template v-if="i != getArchive.related.organisations_as_subjects.length - 1">; </template>
              </li>
            </ul>
          </div>
          <p v-if="getArchive.related.related_materials">
            Other GPP Materials
            <br>
            <ol>
              <li v-for="(related_material, i) in getArchive.related.related_materials" v-bind:key="i">
                <router-link :to="related_material.resourcetype == 'Collection' || related_material.resourcetype == 'Series' ? {name: 'collections-series', params: {id: related_material.related_record}} : {name: 'files-items', params: {id: related_material.related_record}}">{{related_material.context}}</router-link>                            </li>
            </ol>
          </p>
        </div>
      </div>
      <div class="grey-column" v-if="getArchive.related.publications && getArchive.related.publications != ''">
        <h4>Known previous publications</h4>
        <p v-html="getArchive.related.publications"></p>
      </div>
      <template v-if="getArchive.provenance">
        <h4>Custodial history</h4>
        <p>{{getArchive.provenance}}</p>
      </template>
      <div v-if="getArchive.repository.title || getArchive.origin_locations && getArchive.origin_locations.length > 0 || getArchive.withheld || getArchive.publication_permission || getArchive.copyright_status">
        <h2>Copyright &amp; access</h2>
        <div class="two-column-30-70">
          <div v-if="getArchive.repository.title">
            <template v-if="getArchive.repository.title || getArchive.origin_locations && getArchive.origin_locations.length > 0">
              <span class="highlight">Repository:</span> {{getArchive.repository.title}}<br>
            </template>
            <template v-if="getArchive.origin_locations && getArchive.origin_locations.length > 0">
              <span class="highlight">Location of originals:</span>
              <span v-for="(location, i) in getArchive.origin_locations" v-bind:key="i">
                {{location}}<template v-if="i != getArchive.origin_locations.length - 1">; </template>
              </span>
            </template>
            <a v-if="getArchive.url" v-bind:href="getArchive.url" target="_blank">See record at the Georgian Papers online</a>
          </div>
          <div class="grey-column" v-if="getArchive.withheld || getArchive.publication_permission || getArchive.copyright_status">
            <template v-if="getArchive.withheld">
              <h4>Withheld</h4>
              <p>{{getArchive.withheld}}</p>
            </template>
            <template v-if="getArchive.publication_permission">
              <h4>Credit</h4>
              <p>{{getArchive.publication_permission}}</p>
            </template>
            <template v-if="getArchive.copyright_status">
              <h4>Copyright</h4>
              <p>{{getArchive.copyright_status}}</p>
            </template>
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
    computed: mapGetters(['getArchive', 'getTranscriptions']),
    data: function() {
      return {
        loading: true,
        activeTranscription: 0,
        viewer: '',
        hasMedia: true
      }
    },
    methods: {
      async updatePage() {
        await this.fetchFilesItems(this.$route.params.id);
        this.hasMedia = this.getTranscriptions.media.length > 0;

        // TODO  - order returned transcriptions?

        this.loading = false;
      },
      initOpenSeaDragon() {
        // TODO make sure that transcription images follow the order of transcriptions
        if (this.getTranscriptions.media.length > 0) {
          for (let index in this.getTranscriptions.media) {
            tileSources.push({
              type: 'image',
              "@context": "http://iiif.io/api/image/2/context.json",
              "@id": this.getTranscriptions.media[index].iiif_url,
              "profile": "http://iiif.io/api/image/2/level1.json",
              "height": 7200,
              "width": 5233,
              "protocol": "http://iiif.io/api/image",
              "tiles": [{
                "scaleFactors": [ 1, 2, 4, 8, 16, 32 ],
                "width": 1024
              }],
            })
          }
        }
        // TO TEST OPENSEADRAGON
        // tileSources.push({
        //     type: 'image',
        //     url: require('@/assets/images/Masked-Ball-Louis-XV-court.jpg')
        // });
        startOpenSeaDragon(0);
      },
      page(pageNum) {
        this.activeTranscription = pageNum-1;
        startOpenSeaDragon(pageNum-1);
      },
      ...mapActions(['fetchFilesItems'])
    },
    mounted() {
      setTimeout(() => {
        if (this.$refs.openSeaDragon && !this.loading) {
          this.initOpenSeaDragon();
        }
      }, 1000);
    },
    created() {
      this.updatePage();
    },
    watch: {
      $route(to, from) {
        this.updatePage();
      }
    }
  }
</script>
