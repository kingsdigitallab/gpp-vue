<template>
<div class="entity-list">
  <div class="two-column-20-80">
    <div class="filters">
      <button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
      <div>
	<fieldset id="existence_year" class="range" v-if="getEntityFacets.existence_years && getEntityFacets.existence_years[0] > 0 && getEntityFacets.existence_years[1] > 0">
          <legend>Years of existence</legend>
          <div id="existence-year-slider" ref="existenceSlider"></div>
          <br>
          <input type="number" name="existence_start_year" aria-label="existence year start" class="range-year" :min="existenceSlider.min" :max="existenceSlider.max" v-model="minExistenceRange" v-on:change="updateExistenceSlider(minExistenceRange, maxExistenceRange)" />
          -
          <input type="number" name="existence_end_year" aria-label="existence year end" class="range-year" :min="existenceSlider.min" :max="existenceSlider.max" v-model="maxExistenceRange" v-on:change="updateExistenceSlider(minExistenceRange, maxExistenceRange)" />
          <input type="submit" class="button-outline" value="Filter" v-on:click="filterByYear('existence_years', minExistenceRange, maxExistenceRange)"/>
        </fieldset>
        <fieldset v-if="getEntityFacets.entity_type && getEntityFacets.entity_type.length > 0">
          <legend>Entity type</legend>
          <input type="checkbox" id="entity-type-toggle" class="toggle-checkbox" checked />
          <label for="entity-type-toggle" class="toggle-label"><span hidden>Expand/collapse entity type</span></label>
          <div class="toggle-section">
            <div class="facets">
              <label v-for="(entityType, i) in getEntityFacets.entity_type" v-bind:key="i" class="facet">
                <input type="checkbox" v-bind:name="entityType.key" v-bind:aria-label="entityType.label" :value="entityType" v-on:click="filter('entity_type', entityType.key, entityType.label)" :checked="checkedOption('entity_type', entityType.key)"/> {{entityType.label}} <span class="count">({{entityType.doc_count}})</span>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset v-if="getEntityFacets.genders && getEntityFacets.genders.length > 0">
          <legend>Gender</legend>
          <input type="checkbox" id="gender-toggle" class="toggle-checkbox" />
          <label for="gender-toggle" class="toggle-label"><span hidden>Expand/collapse gender</span></label>
          <div class="toggle-section">
            <input v-if="getEntityFacets.genders.length > 5" type="text" aria-label="Search gender" placeholder="Search gender" onfocus="this.placeholder=''" v-on:click="genderCheckbox = true" v-model="searchGenders" onblur="this.placeholder='Search gender'" name="gender_search"/>
            <div class="facets">
              <label v-for="(gender, index) in sortedData(getEntityFacets.genders, searchGenders, 'count')" v-bind:key="index" class="facet" v-show="index < 5 || genderCheckbox">
                <input type="checkbox" v-bind:name="gender.key" v-bind:aria-label="gender.label" :value="gender" v-on:click="filter('genders', gender.key, gender.label)" :checked="checkedOption('genders', gender.key)"/> {{gender.label}} <span class="count">({{gender.doc_count}})</span>
              </label>
            </div>
            <input type="checkbox" id="show-all-genders" class="show-checkbox" v-model="genderCheckbox">
            <label class="show-all dotted-underline" for="show-all-genders" v-if="getEntityFacets.genders.length > 5 && !searchGenders"> genders</label>
          </div>
        </fieldset>
        <fieldset v-if="getEntityFacets.languages && getEntityFacets.languages.length > 0">
          <legend>Languages used</legend>
          <input type="checkbox" id="language-toggle" class="toggle-checkbox" />
          <label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
          <div class="toggle-section">
            <input v-if="getEntityFacets.languages.length > 5" type="text" aria-label="Search language used" placeholder="Search language used" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language used '" name="languages_used_search"/>
            <div class="facets">
              <label v-for="(language, index) in sortedData(getEntityFacets.languages, searchLanguages, 'count', languagesCheckbox)" v-bind:key="index" class="facet" v-show="index < 5 || languagesCheckbox">
                <input type="checkbox" v-bind:name="language.key" :value="language" v-bind:aria-label="language.label" v-on:click="filter('languages', language.key, language.label)" :checked="checkedOption('languages', language.key)"/> {{language.label}} <span class="count">({{language.doc_count}})</span>
              </label>
            </div>
            <input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
            <label class="show-all dotted-underline" for="show-all-languages" v-if="getEntityFacets.languages.length > 5 && !searchLanguages"> languages used</label>
          </div>
        </fieldset>
        <fieldset v-if="getEntityFacets.related_entities && getEntityFacets.related_entities.length > 0">
          <!-- acquirers only -->
          <legend>Related people &amp; corporate bodies</legend>
          <input type="checkbox" id="related-entities-toggle" class="toggle-checkbox" />
          <label for="related-entities-toggle" class="toggle-label"><span hidden>Expand/collapse related people and corporate bodies</span></label>
          <div class="toggle-section">
            <input v-if="getEntityFacets.related_entities.length > 5" type="text" aria-label="Search person or corporate body" placeholder="Search person or corporate body" onfocus="this.placeholder=''" v-on:click="relatedEntitiesCheckbox = true" v-model="searchRelatedEntities" onblur="this.placeholder='Search person or corporate body'" name="related_entities_search"/>
            <div class="facets">
              <label v-for="(entity, index) in sortedData(getEntityFacets.related_entities, searchRelatedEntities, 'alphabetical', relatedEntitiesCheckbox)" v-bind:key="index" class="facet" v-show="index < 5 || relatedEntitiesCheckbox">
                <input type="checkbox" v-bind:name="entity.key" v-bind:aria-label="entity.label" :value="entity" v-on:click="filter('related_entities', entity.key, entity.label)" :checked="checkedOption('related_entities', entity.key)"/> {{entity.label}} <span class="count">({{entity.doc_count}})</span>
              </label>
            </div>
            <input type="checkbox" id="show-all-entity" class="show-checkbox" v-model="relatedEntitiesCheckbox">
            <label class="show-all dotted-underline" for="show-all-entity" v-if="getEntityFacets.related_entities.length > 5 && !searchRelatedEntities"> related people &amp; corporate bodies</label>
          </div>
        </fieldset>
        <fieldset v-if="getEntityFacets.related_places && getEntityFacets.related_places.length > 0">
          <legend>Related places</legend>
          <input type="checkbox" id="related-places-toggle" class="toggle-checkbox" />
          <label for="related-places-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
          <div class="toggle-section">
            <input v-if="getEntityFacets.related_places.length > 5" type="text" aria-label="Search place" placeholder="Search place" onfocus="this.placeholder=''" v-on:click="relatedPlacesCheckbox = true" v-model="searchRelatedPlaces" onblur="this.placeholder='Search place'" name="related_places_search"/>
            <div class="facets">
              <label v-for="(place, index) in sortedData(getEntityFacets.related_places, searchRelatedPlaces, 'alphabetical', relatedPlacesCheckbox)" v-bind:key="index" class="facet" v-show="index < 5 || relatedPlacesCheckbox">
                <input type="checkbox" v-bind:name="place.key" :value="place" v-bind:aria-label="place.key" v-on:click="filter('related_places', place.key, place.label)" :checked="checkedOption('related_places', place.key)"/> {{place.label}} <span class="count">({{place.doc_count}})</span>
              </label>
            </div>
            <input type="checkbox" id="show-all-places" class="show-checkbox" v-model="relatedPlacesCheckbox">
            <label class="show-all dotted-underline" for="show-all-places" v-if="getEntityFacets.related_places.length > 5 && !searchRelatedPlaces"> places</label>
          </div>
        </fieldset>
        <label v-if="getEntityFacets.has_royal_name && getEntityFacets.has_royal_name.length > 0">
          <input type="checkbox" name="has_royal_name" value="Show only people with royal names" aria-label="Show only people with royal names" v-on:click="filter('has_royal_name', 'true', 'true')" :checked="selectedFacets.filter(obj => obj.category==='has_royal_name').length > 0"/>With royal name <span class="count">({{getEntityFacets.has_royal_name[0].doc_count}})</span>
        </label>
        <label v-if="getEntityFacets.has_multiple_identities && getEntityFacets.has_multiple_identities.length > 0">
          <input type="checkbox" name="has_multiple_identities" value="Show only people with multiple identities" aria-label="People with multiple identities" v-on:click="filter('has_multiple_identities', 'true', 'true')" :checked="selectedFacets.filter(obj => obj.category==='has_multiple_identities').length > 0"/>With multiple identities <span class="count">({{getEntityFacets.has_multiple_identities[0].doc_count}})</span>
        </label>
      </div>
    </div>
    <div class="objects">
      <template v-if="!loadingRecords">
        <fieldset class="selected-facets" v-if="selectedFacets.length > 0 || existenceYears[0] != 0 &&  existenceYears[1] != 0">
          <legend hidden>Selected filters</legend>
          <template v-if="existenceYears[0] != 0 &&  existenceYears[1] != 0">
            <label class="facet">
              <input type="checkbox" name="existence_years" :value="existenceYears[0]+ '-' + existenceYears[1]" aria-label="existence years" v-on:click="filterByYear('existence_years', existenceYears[0], existenceYears[1])" checked/>
              Years of existence: {{existenceYears[0] + '-' + existenceYears[1]}}
            </label>
          </template>
          <template v-if="selectedFacets.length > 0">
            <label v-for="(selectedFacet, index) in selectedFacets" v-bind:key="index" class="facet">
              <template v-if="selectedFacet.category == 'has_royal_name'">
                <input type="checkbox" v-bind:name="selectedFacet.category" value="Show only people with royal names" aria-label="Show only people with royal names" v-on:click="filter(selectedFacet.category, 'true', 'true')" checked/> Show only people with royal names
              </template>
              <template v-else-if="selectedFacet.category == 'has_multiple_identities'">
                <input type="checkbox" v-bind:name="selectedFacet.category" value="Show only people with multiple identities" aria-label="Show only people with multiple identities" v-on:click="filter(selectedFacet.category, 'true', 'true')" checked/> Show only people with multiple identities
              </template>
              <template v-else>
                <input type="checkbox" v-bind:name="selectedFacet.category" :value="selectedFacet.key" v-bind:aria-label="selectedFacet.label" v-on:click="filter(selectedFacet.category, selectedFacet.key, selectedFacet.label)" checked/>
                {{ selectedFacet.label }}
              </template>
            </label>
          </template>
          <button class="clear-filters" v-on:click="clearFacets">Clear all filters</button>
        </fieldset>
        <div class="flex">
          <div class="letterIndex">
            <!-- TODO replace with a select dropdown in mobile version? -->
            <button v-bind:class="['button-link', {'active': activeLetter == ''}]" v-on:click="filterByLetter('')">All</button>
            <button v-for="(letter, i) in getEntityLetterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': activeLetter == letter.name}, {'disabled': letter.missing}]" :aria-hidden="letter.missing" :disabled="letter.missing" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
          </div>
          <button class="button-primary filter display-mobile" v-on:click="toggleFilters" aria-label="filter objects"><span hidden>Filter</span></button>
        </div>
        <div class="list grey-column">
          <div class="list-header">
            <h2 v-if="activeLetter == ''">All people &amp; corporate bodies ({{getTotalAuthorityEntities}})</h2>
            <h2 v-else>{{activeLetter}} ({{getTotalAuthorityEntities}})</h2>
            <span class="details">
              <span>Type</span>
              <span>Existence dates</span>
            </span>
          </div>
          <div v-if="getAuthorityEntities.length == 0" class="loader"></div>
          <div v-for="(entity, i) in getAuthorityEntities" v-bind:key="i" class="list-row">
            <span>
              <router-link :to="'/people-and-corporate-bodies/'+(entity.pk)" :aria-label="'entity type: '+(entity.entity_type)">{{entity.display_name}}</router-link>
            </span>
            <span class="details">
              <span>{{entity.entity_type}}</span>
              <!-- TODO change to entity.display_date_name_used -->
              <span v-if="entity.display_date">{{entity.display_date}}</span>
              <span v-else>---</span>
            </span>
          </div>
          <div v-if="loadingMoreRecords" class="loader"></div>
          <template v-else>
            <button type="button" v-if="getAuthorityEntities && getAuthorityEntities.length < getTotalAuthorityEntities" class="button-primary" v-on:click="moreRecords()">
              Show more people and corporate bodies
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
  name: 'EntityList',
  computed: mapGetters(['getAuthorityEntities', 'getTotalAuthorityEntities', 'getEntityFacets', 'getEntityLetterIndex']),
  data: function() {
    return {
      loadingRecords: true,
      loadingMoreRecords: false,
      
      // existence year range filter
      // dynamic values
      minExistenceRange: 0,
      maxExistenceRange: 0,
      // static values onInit
      existenceSlider: {
        startMin: 0,
        startMax: 0,
        min: 0,
        max: 0
      },
      
      // see all buttons
      relatedPlacesCheckbox: false,
      languagesCheckbox: false,
      genderCheckbox: false,
      relatedEntitiesCheckbox: false,
      
      // instant search
      searchRelatedPlaces: '',
      searchGenders: '',
      searchRelatedEntities: '',
      searchLanguages: '',
      
      // params
      pageNum: 1,
      selectedFacets: [],
      existenceYears: [0,2040],
      activeLetter: ''
    }
  },
  methods: {
    // year range filters
    initExistenceYearRange(min, max) {
      // init min and max year range dynamic toggles if they have not been updated based on the URL params
      if (this.minExistenceRange == 0) {
 this.minExistenceRange = min;
      }
      if (this.maxExistenceRange == 0){
        this.maxExistenceRange = max;
      }
      
      // init static values
      this.existenceSlider.startMin = this.minExistenceRange;
      this.existenceSlider.startMax = this.maxExistenceRange;
      this.existenceSlider.min = min;
      this.existenceSlider.max = max;
      
      // init slider with static values
      noUiSlider.create(this.$refs.existenceSlider, {
        start: [this.existenceSlider.startMin, this.existenceSlider.startMax],
        step: 1,
        range: {
          'min': this.existenceSlider.min,
          'max': this.existenceSlider.max
        }
      });
      
      this.$refs.existenceSlider.noUiSlider.on('update',(values, handle) => {
        this[handle ? 'maxExistenceRange' : 'minExistenceRange'] = parseInt(values[handle]);
      });
    },
    updateExistenceSlider(min, max) {
      this.$refs.existenceSlider.noUiSlider.set([min, max]);
    },
    
    // check options in the facets based on selected facets
    checkedOption(category, key) {
      return this.selectedFacets.filter(obj => obj.key.toLowerCase().replace(/[’’']/g, "")===key.toLowerCase().replace(/[’’']/g, "") && obj.category===category).length > 0;
    },
    
    async filterByYear(facet, min_year, max_year) {
      this.loadingRecords = true;
      
      const setQuery = this.$route.query;
      this.pageNum = 1;
      setQuery['page'] = this.pageNum;
      const yearString = min_year + '-' + max_year;
      
      if (setQuery[facet] && setQuery[facet] == yearString) {
        // change values to default
        this.existenceYears = [0,0];
        this.minExistenceRange = this.existenceSlider.min;
        this.maxExistenceRange = this.existenceSlider.max;
        this.updateExistenceSlider(this.existenceSlider.min, this.existenceSlider.max);
        delete setQuery[facet];
      } else {
        // set new values
        this.existenceYears[0] = min_year;
        this.existenceYears[1] = max_year;
        
        // set dynamic values on the frontend
        this.minExistenceRange = min_year;
        this.maxExistenceRange = max_year;
        setQuery[facet] = min_year + '-' + max_year;
      }
      
      this.$router.replace({ query: {} });
      this.$router.push({query: setQuery});
      await this.fetchAuthorityEntities({
        'pages': this.pageNum,
        'existence_years': JSON.parse(JSON.stringify(this.existenceYears)),
        'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
        'letter': this.activeLetter
      });
      this.loadingRecords = false;
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
      
      await this.fetchAuthorityEntities({
        'pages': this.pageNum,
        'existence_years': JSON.parse(JSON.stringify(this.existenceYears)),
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
      
      await this.fetchAuthorityEntities({
        'pages': this.pageNum,
        'existence_years': JSON.parse(JSON.stringify(this.existenceYears)),
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
      this.existenceYears = [0,0];
      
      // change dynamic toggles to static values and update year range sliders
      this.minExistenceRange = this.existenceSlider.min;
      this.maxExistenceRange = this.existenceSlider.max;
      this.updateExistenceSlider(this.existenceSlider.min, this.existenceSlider.max);
      
      this.$router.replace({ query: {} });
      await this.fetchAuthorityEntities({
        'pages': this.pageNum,
        'existence_years': JSON.parse(JSON.stringify(this.existenceYears)),
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
      
      await this.loadMoreAuthorityEntities();
      
      this.loadingMoreRecords = false;
    },
    toggleFilters() {
      const filters = document.querySelector('.filters');
      filters.classList.toggle('active');
    },
    ...mapActions(['fetchAuthorityEntities','loadMoreAuthorityEntities'])
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
      case 'existence_years':
        // init selected filters
        this.existenceYears[0] = Number(setQuery[key].split('-')[0]);
        this.existenceYears[1] = Number(setQuery[key].split('-')[1]);
        
        // init dynamic year range values
        this.minExistenceRange = Number(setQuery[key].split('-')[0]);
        this.maxExistenceRange = Number(setQuery[key].split('-')[1]);
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
    await this.fetchAuthorityEntities(
      {'pages': this.pageNum,
       'existence_years': JSON.parse(JSON.stringify(this.existenceYears)),
       'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)),
       'letter': this.activeLetter
      });

    // set up the year range filter if existence years is sent in response
    if (this.getEntityFacets.existence_years && this.getEntityFacets.existence_years[0] > 0 && this.getEntityFacets.existence_years[1] > 0) {
      this.initExistenceYearRange(this.getEntityFacets.existence_years[0], this.getEntityFacets.existence_years[1]);
    }

    this.loadingRecords = false;
  }
}
</script>
