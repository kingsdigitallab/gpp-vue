<template>
  <div class="archival-list">
    <div class="two-column-20-80">
      <div class="filters">
        <button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
        <div>
          <fieldset id="creation_year" class="range" v-if="getArchivalFacets.creation_years && getArchivalFacets.creation_years[0] > 0 && getArchivalFacets.creation_years[1] > 0">
            <legend>Creation year</legend>
            <div id="creation-year-slider" ref="creationSlider"></div>
            <br>
            <input type="number" name="creation_start_year" aria-label="creation year start" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="minCreationRange" v-on:change="updateCreationSlider(minCreationRange, maxCreationRange)" />
            -
            <input type="number" name="creation_end_year" aria-label="creation year end" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="maxCreationRange" v-on:change="updateCreationSlider(minCreationRange, maxCreationRange)" />
            <input type="submit" class="button-outline" value="Filter" v-on:click="filterByYear('creation_years', minCreationRange, maxCreationRange)"/>
          </fieldset>
          <fieldset v-if="getArchivalFacets.archival_level && getArchivalFacets.archival_level.length > 0">
            <legend>Document level</legend>
            <input type="checkbox" id="document-level-toggle" class="toggle-checkbox" checked />
            <label for="document-level-toggle" class="toggle-label"><span hidden>Expand/collapse document level</span></label>
            <div class="toggle-section">
              <div class="facets">
                <label v-for="(level, index) in getArchivalFacets.archival_level" v-bind:key="index" class="facet">
                  <input type="checkbox" name="level" v-bind:aria-label="level.label" :value="level.key" v-on:click="filter('archival_level', level.key, level.label)" :checked="checkedOption('archival_level', level.key)"/> {{level.label}} <span class="count">({{level.doc_count}})</span>
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset v-if="getArchivalFacets.record_types && getArchivalFacets.record_types.length > 0">
            <legend>Record type</legend>
            <input type="checkbox" id="record-type-toggle" class="toggle-checkbox" />
            <label for="record-type-toggle" class="toggle-label"><span hidden>Expand/collapse record type</span></label>
            <div class="toggle-section">
              <input v-if="getArchivalFacets.record_types.length > 5" type="text" aria-label="Search record type" placeholder="Search record type" onfocus="this.placeholder=''" v-on:click="recordTypeCheckbox = true" v-model="searchRecordTypes" onblur="this.placeholder='Search record type'" name="record_type_search"/>
              <div class="facets">
                <label v-for="(type, index) in sortedData(getArchivalFacets.record_types, searchRecordTypes, 'count')" v-bind:key="index" class="facet" v-show="index < 5 || recordTypeCheckbox">
                  <input type="checkbox" name="type" v-bind:aria-label="type.label" :value="type.key" v-on:click="filter('record_types', type.key, type.label)" :checked="checkedOption('record_types', type.key)"/> {{type.label}} <span class="count">({{type.doc_count}})</span>
                </label>
              </div>
              <input type="checkbox" id="show-all-record-types" class="show-checkbox" v-model="recordTypeCheckbox">
              <label class="show-all dotted-underline" for="show-all-record-types" v-if="getArchivalFacets.record_types.length > 5 && !searchRecordTypes"> record types</label>
            </div>
          </fieldset>
          <fieldset v-if="getArchivalFacets.writers && getArchivalFacets.writers.length > 0">
            <legend>Writer</legend>
            <input type="checkbox" id="writer-toggle" class="toggle-checkbox" />
            <label for="writer-toggle" class="toggle-label"><span hidden>Expand/collapse writer</span></label>
            <div class="toggle-section">
              <input v-if="getArchivalFacets.writers.length > 5" type="text" aria-label="Search writer" placeholder="Search writer" onfocus="this.placeholder=''" v-on:click="writersCheckbox = true" v-model="searchWriters" onblur="this.placeholder='Search writer'" name="writer_search"/>
              <div class="facets">
                <label v-for="(writer, index) in sortedData(getArchivalFacets.writers, searchWriters, 'alphabetical')" v-bind:key="index" class="facet" v-show="index < 5 || writersCheckbox">
                  <input type="checkbox" name="writer" v-bind:aria-label="writer.key" :value="writer.key" v-on:click="filter('writers', writer.key, writer.label)" :checked="checkedOption('writers', writer.key)"/> {{writer.label}} <span class="count">({{writer.doc_count}})</span>
                </label>
              </div>
              <input type="checkbox" id="show-all-writers" class="show-checkbox" v-model="writersCheckbox">
              <label class="show-all dotted-underline" for="show-all-writers" v-if="getArchivalFacets.writers.length > 10 && !searchWriters"> writers</label>
            </div>
          </fieldset>
          <fieldset v-if="getArchivalFacets.persons_as_relations && getArchivalFacets.persons_as_relations.length > 0">
            <legend>Addressee</legend>
            <input type="checkbox" id="addressee-toggle" class="toggle-checkbox" />
            <label for="addressee-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
            <div class="toggle-section">
              <input v-if="getArchivalFacets.persons_as_relations.length > 5" type="text" aria-label="Search addressee" placeholder="Search addressee" onfocus="this.placeholder=''" v-on:click="addresseesCheckbox = true" v-model="searchAddressees" onblur="this.placeholder='Search addressee'" name="addressee_search"/>
              <div class="facets">
                <label v-for="(addressee, index) in sortedData(getArchivalFacets.persons_as_relations, searchAddressees, 'alphabetical')" v-bind:key="index" class="facet" v-show="index < 5 || addresseesCheckbox">
                  <input type="checkbox" name="addressee" :value="addressee.key" v-bind:aria-label="addressee.label" v-on:click="filter('person_as_relations', addressee.key, addressee.label)" :checked="checkedOption('person_as_relations', addressee.key)"/> {{addressee.label}} <span class="count">({{addressee.doc_count}})</span>
                </label>
              </div>
              <input type="checkbox" id="show-all-addressees" class="show-checkbox" v-model="addresseesCheckbox">
              <label class="show-all dotted-underline" for="show-all-addressees" v-if="getArchivalFacets.persons_as_relations.length > 10 && !searchAddressees"> addressees</label>
            </div>
          </fieldset>
          <fieldset v-if="getArchivalFacets.languages && getArchivalFacets.languages.length > 0">
            <legend>Language</legend>
            <input type="checkbox" id="language-toggle" class="toggle-checkbox" />
            <label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
            <div class="toggle-section">
              <input v-if="getArchivalFacets.languages.length > 5" type="text" aria-label="Search language" placeholder="Search language" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language'" name="language_search"/>
              <div class="facets">
                <label v-for="(language, index) in sortedData(getArchivalFacets.languages, searchLanguages, 'count')" v-bind:key="index" class="facet" v-show="index < 5 || languagesCheckbox">
                  <input type="checkbox" name="language" :value="language.key" v-bind:aria-label="language.label" v-on:click="filter('language', language.key, language.label)" :checked="checkedOption('language', language.key)"/> {{language.label}} <span class="count">({{language.doc_count}})</span>
                </label>
              </div>
              <input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
              <label class="show-all dotted-underline" for="show-all-languages" v-if="getArchivalFacets.languages.length > 5 && !searchLanguages"> languages</label>
            </div>
          </fieldset>
          <label v-if="getArchivalFacets.with_transcriptions">
            <input type="checkbox" name="facets.with_transcriptions" value="Show only records with transcriptions" aria-label="Show only records with transcriptions" v-on:click="filter('with_transcriptions', 'true', 'true')" :checked="selectedFacets.filter(obj => obj.category==='with_transcriptions').length > 0"/>{{getArchivalFacets.with_transcriptions.key}} <span class="count">({{getArchivalFacets.with_transcriptions.doc_count}})</span>
          </label>
        </div>
      </div>
      <div class="objects">
        <template v-if="!loadingRecords">
          <fieldset class="selected-facets" v-if="selectedFacets.length > 0 || creationYears[0] != 0 &&  creationYears[1] != 0">
            <legend hidden>Selected filters</legend>
            <template v-if="creationYears[0] != 0 &&  creationYears[1] != 0">
              <label class="facet">
                <input type="checkbox" name="creation_years" :value="creationYears[0]+ '-' + creationYears[1]" aria-label="creation years" v-on:click="filterByYear('creation_years', creationYears[0], creationYears[1])" checked/> 
                Creation years: {{creationYears[0] + '-' + creationYears[1]}}
              </label>
            </template>
            <template v-if="selectedFacets.length > 0">
              <label v-for="(selectedFacet, index) in selectedFacets" v-bind:key="index" class="facet">
                <template v-if="selectedFacet.category == 'with_transcriptions'">
                  <input type="checkbox" v-bind:name="selectedFacet.category" value="Show only records with transcriptions" aria-label="Show only records with transcriptions" v-on:click="filter(selectedFacet.category, 'true', 'true')" checked/> Show only records with transcriptions
                </template>
                <template v-else>
                  <input type="checkbox" v-bind:name="selectedFacet.category" :value="selectedFacet.key" v-bind:aria-label="selectedFacet.key" v-on:click="filter(selectedFacet.category, selectedFacet.key, selectedFacet.label)" checked/> 
                  {{ selectedFacet.label }}
                </template>
              </label>
            </template>
            <button class="clear-filters" v-on:click="clearFacets">Clear all filters</button>
          </fieldset>
          <div class="flex">
            <!-- TODO replace with a select dropdown in mobile version? -->
            <div class="letterIndex">
              <button v-bind:class="['button-link', {'active': activeLetter == ''}]" v-on:click="filterByLetter('')">All</button>
              <button v-for="(letter, i) in getArchivalLetterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': activeLetter == letter.name}, {'disabled': letter.missing}]" :aria-hidden="letter.missing" :disabled="letter.missing" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
            </div>
            <button class="button-primary filter display-mobile" v-on:click="toggleFilters" aria-label="filter objects"><span hidden>Filter</span></button>
          </div>
          <div class="list grey-column">
            <div class="list-header">
              <h2 v-if="activeLetter == ''">All archival records ({{getTotalArchives}})</h2>
              <h2 v-else>{{activeLetter}} ({{getTotalArchives}})</h2>
              <span class="details">
                <span>Level</span>
                <span>Writer</span>
                <span>Creation dates</span>
              </span>
            </div>
            <div v-if="getArchivalRecords.length == 0" class="loader"></div>
            <div v-for="(item, i) in getArchivalRecords" v-bind:key="i" class="list-row">
              <!-- TODO: update to archival_level -->
              <span>
                <router-link :to="item.archival_level == 'Collection' || item.archival_level == 'Series' ? '/archival-records/collections-series/'+(item.id) : '/archival-records/files-items/'+(item.id)" :aria-label="'document from '+(item.resourcetype)">{{item.title}}</router-link>
              </span>
              <span class="details">
                <span>{{item.archival_level}}</span>
                <template v-if="item.creators && item.creators.length > 0">
                  <span>{{item.creators}}</span>
                </template>
                <span v-else>---</span>
                <span v-if="item.creation_date">{{item.creation_date}}</span>
                <span v-else>---</span>
              </span>
            </div>
            <div v-if="loadingMoreRecords" class="loader"></div>
            <template v-else>
              <button type="button" v-if="getArchivalRecords && getArchivalRecords.length < getTotalArchives" class="button-primary" v-on:click="moreRecords()">
                Show more archival records
              </button>
            </template>
          </div>
        </template>
        <div v-else class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default {
  name: 'ArchiveList',
  computed: mapGetters([
    'getArchivalRecords', 'getTotalArchives', 'getArchivalFacets',
    'getArchivalLetterIndex'
  ]),
  data: function() {
    return {
      loadingRecords: true,
      loadingMoreRecords: false,

      // creation year range filter
      // dynamic values
      minCreationRange: 0,
      maxCreationRange: 0,
      // static values onInit
      creationSlider: {
        startMin: 0,
        startMax: 0,
        min: 0,
        max: 0
      },

      // see all buttons
      addresseesCheckbox: false,
      languagesCheckbox: false,
      recordTypeCheckbox: false,
      writersCheckbox: false,

      // instant search
      searchAddressees: '',
      searchRecordTypes: '',
      searchWriters: '',
      searchLanguages: '',

      // params
      pageNum: 1,
      selectedFacets: [],
      creationYears: [0,2100],
      activeLetter: ''
    }
  },
  methods: {
    // year range filters
    initCreationYearRange(min, max) {
      // init min and max year range dynamic toggles if they have not
      // been updated based on the URL params
      if (this.minCreationRange == 0) {
        this.minCreationRange = min;
      }
      if (this.maxCreationRange == 0){
        this.maxCreationRange = max;
      }

      // init static values
      this.creationSlider.startMin = this.minCreationRange;
      this.creationSlider.startMax = this.maxCreationRange;
      this.creationSlider.min = min;
      this.creationSlider.max = max;

      // init slider with static values
      noUiSlider.create(this.$refs.creationSlider, {
        start: [this.creationSlider.startMin, this.creationSlider.startMax],
        step: 1,
        range: {
          'min': this.creationSlider.min,
          'max': this.creationSlider.max
        }
      });

      this.$refs.creationSlider.noUiSlider.on('update',(values, handle) => {
        this[handle ? 'maxCreationRange' : 'minCreationRange'] = parseInt(values[handle]);
      });
    },
    updateCreationSlider(min, max) {
      this.$refs.creationSlider.noUiSlider.set([min, max]);
    },

    // check options in the facets based on selected facets
    checkedOption(category, key) {
      return this.selectedFacets.filter(obj => obj.key.toString().toLowerCase().replace(/[’’']/g, "")===key.toString().toLowerCase().replace(/[’’']/g, "") && obj.category===category).length > 0;
    },

    // sort the list of options displayed in filters
    sortedData (list, query, sortingOrder) {
      query = query.toLowerCase();
      var sortedList = list.slice().filter(function (item) {
        var name = item.label.toLowerCase();
        return name.match(query);
      })
      if (sortingOrder == 'alphabetical')  {
        sortedList.sort((a, b) => a.key.localeCompare(b.key));
      } else if (sortingOrder == 'count') {
        sortedList.sort((a, b) => b.doc_count - a.doc_count);
      }
      return sortedList;
    },

    async filterByYear(facet, min_year, max_year) {
      this.loadingRecords = true;

      const setQuery = this.$route.query;
      this.pageNum = 1;
      setQuery['page'] = this.pageNum;
      const yearString = min_year + '-' + max_year;

      if (setQuery[facet] && setQuery[facet] == yearString) {
        // change values to default
        this.creationYears = [0,0];
        this.minCreationRange = this.creationSlider.min;
        this.maxCreationRange = this.creationSlider.max;
        this.updateCreationSlider(this.creationSlider.min, this.creationSlider.max);
        delete setQuery[facet];
      } else {
        // set new values
        this.creationYears[0] = min_year;
        this.creationYears[1] = max_year;

        // set dynamic values on the frontend
        this.minCreationRange = min_year;
        this.maxCreationRange = max_year;
        setQuery[facet] = min_year + '-' + max_year;
      }

      this.$router.replace({ query: {} });
      this.$router.push({query: setQuery});
      await this.fetchArchivalRecords({
        'page': this.pageNum,
        'creation_years': JSON.parse(JSON.stringify(this.creationYears)),
        'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
        'letter': this.activeLetter
      });
      this.loadingRecords = false;
    },
    async filterByLetter(letter) {
      this.loadingRecords = true;

      this.activeLetter = letter;

      const setQuery = this.$route.query;
      this.pageNum = 1;
      setQuery['page'] = this.pageNum;

      if (letter != '') {
        setQuery['letter'] = letter;
      } else if (setQuery['letter']) {
        delete setQuery['letter'];
      }

      this.$router.replace({ query: {} });
      this.$router.push({query: setQuery});

      await this.fetchArchivalRecords({
        'page': this.pageNum,
        'creation_years': JSON.parse(JSON.stringify(this.creationYears)),
        'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
        'letter': this.activeLetter
      });
      this.loadingRecords = false;
    },
    async filter(facet, key, label) {
      this.loadingRecords = true;

      const setQuery = this.$route.query;
      this.pageNum = 1;
      setQuery['page'] = this.pageNum;
      if (this.selectedFacets.filter(obj => obj.key===key && obj.category===facet).length > 0) {
        this.selectedFacets = this.selectedFacets.filter(object => !(object.category === facet && object.key === key));
        if (!Array.isArray(setQuery[facet])) {
          delete setQuery[facet];
        }
        else {
          setQuery[facet].splice(setQuery[facet].indexOf(key),1);
        }
      } else {
        this.selectedFacets.push({'category': facet, 'key': key, 'label': label});
        if (setQuery[facet])  {
          if (!Array.isArray(setQuery[facet])) {
            setQuery[facet] = [setQuery[facet]];
          }
          setQuery[facet].push(key);
        }
        else {
          setQuery[facet] = [key];
        }
      }
      this.$router.replace({ query: {} });
      this.$router.push({query: setQuery});

      await this.fetchArchivalRecords({
        'page': this.pageNum,
        'creation_years': JSON.parse(JSON.stringify(this.creationYears)),
        'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
        'letter': this.activeLetter
      });
      this.loadingRecords = false;
    },
    async clearFacets() {
      this.loadingRecords = true;

      this.pageNum = 1;
      this.activeLetter = '';
      this.selectedFacets = [];
      this.creationYears = [0,0];

      // change dynamic toggles to static values and update year range sliders
      this.minCreationRange = this.creationSlider.min;
      this.maxCreationRange = this.creationSlider.max;
      this.updateCreationSlider(this.creationSlider.min, this.creationSlider.max);

      this.$router.replace({ query: {} });
      await this.fetchArchivalRecords({
        'page': this.pageNum,
        'creation_years': JSON.parse(JSON.stringify(this.creationYears)),
        'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
        'letter': this.activeLetter
      });
      this.loadingRecords = false;
    },

    async moreRecords() {
      this.loadingMoreRecords = true;

      this.pageNum = Number(this.pageNum) + 1;

      const setQuery = this.$route.query;
      setQuery['page'] = Number(this.pageNum);
      this.$router.replace({ query: {} });
      this.$router.push({query: setQuery});

      // ?: change to await this.fetchArchivalRecords({'page': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter});
      await this.loadMoreArchivalRecords();

      this.loadingMoreRecords = false;
    },
    toggleFilters() {
      const filters = document.querySelector('.filters');
      filters.classList.toggle('active');
    },
    ...mapActions(['fetchArchivalRecords','loadMoreArchivalRecords'])
  },
  filters: {
    capitalize: function (value) {
      if (!value) {
        return '';
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  async created() {
    // process query from URL and update selectedFacets and year range
    const setQuery = this.$route.query;
    for (var key in setQuery) {
      switch (key){
      case 'letter':
          this.activeLetter = setQuery[key];
        break;
      case 'page':
          this.pageNum = Number(setQuery[key]);
        break;
      case 'creation_years':
        // init selected filters
        this.creationYears[0] = Number(setQuery[key].split('-')[0]);
        this.creationYears[1] = Number(setQuery[key].split('-')[1]);

        // init dynamic year range values
        this.minCreationRange = Number(setQuery[key].split('-')[0]);
        this.maxCreationRange = Number(setQuery[key].split('-')[1]);
        break;
      default:
        if (Array.isArray(setQuery[key])) {
          for (var i in setQuery[key]) {
            this.selectedFacets.push({'category': key, 'key': setQuery[key][i]});
          }
        } else {
          this.selectedFacets.push({'category': key, 'key': setQuery[key]});
        }
      }
    }

    // get archival records
    await this.fetchArchivalRecords({
      'page': this.pageNum,
      'creation_years': JSON.parse(JSON.stringify(this.creationYears)),
      'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
      'letter': this.activeLetter
    });

    // set up the year range filter if creation years is sent in response
    if (this.getArchivalFacets.creation_years && this.getArchivalFacets.creation_years[0] > 0 && this.getArchivalFacets.creation_years[1] > 0) {
      this.initCreationYearRange(this.getArchivalFacets.creation_years[0], this.getArchivalFacets.creation_years[1]);
    }

    this.loadingRecords = false;
  }
}
</script>
