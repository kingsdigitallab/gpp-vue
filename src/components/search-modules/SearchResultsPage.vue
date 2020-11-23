<template>
    <div class="container">
        <div v-show="!loadingResults">
            <div v-if="getTotalSearchResults == 0">
                <h1>No matches found</h1>
                <p>We couldn't find a match for "<strong>{{searchQuery}}</strong>". Please try another search.</p>
            </div>
            <div v-else>
                <h1>Search results</h1>
                <p>{{getTotalSearchResults}} {{'result' || pluralize(getTotalSearchResults)}} found for: "<strong>{{searchQuery}}</strong>"</p>
                <div class="inline-list">
                    <strong>Results:</strong>
                    <ul class="inline-tabs">
                        <li role="button" v-on:click="getResults('all')" v-bind:class="['inline-tab', {'active': activeSearchTab == 'all'}]">All results</li>
                        <li role="button" v-on:click="getResults('archival_records')" v-bind:class="['inline-tab', {'active': activeSearchTab == 'archival_records'}]">Archival records</li>
                        <li role="button" v-on:click="getResults('entities')" v-bind:class="['inline-tab', {'active': activeSearchTab == 'entities'}]">People and corporate bodies</li>
                    </ul>
                </div>
                <div :class="{'two-column-20-80': getFacets && getFacets.length > 0}">
                    <div class="filters" v-if="getFacets && getFacets.length > 0">
                        <button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
                        <div>
                            <fieldset class="range" v-if="getFacets.existence_years && getFacets.existence_years.min_default > 0 && getFacets.existence_years.max_default > 0">
                                <legend>Years of existence</legend>
                                <div id="existence-year-slider" ref="existenceSlider"></div>
                                <br>
                                <input type="number" name="existence_start_year" aria-label="existence year start" class="range-year" :min="existenceSlider.min" :max="existenceSlider.max" v-model="minExistenceRange" v-on:change="updateExistenceSlider(minExistenceRange, maxExistenceRange)" />
                                -
                                <input type="number" name="existence_end_year" aria-label="existence year end" class="range-year" :min="existenceSlider.min" :max="existenceSlider.max" v-model="maxExistenceRange" v-on:change="updateExistenceSlider(minExistenceRange, maxExistenceRange)" />
                                <button type="button" class="button-outline" v-on:click="filter('existence_years', minExistenceRange + '-' + maxExistenceRange)">Filter</button>
                            </fieldset>
                            <fieldset v-if="getFacets.entityTypes && getFacets.entityTypes.length > 0">
                                <legend>Entity type</legend>
                                <input type="checkbox" id="entity-type-toggle" class="toggle-checkbox" checked />
                                <label for="entity-type-toggle" class="toggle-label"><span hidden>Expand/collapse entity type</span></label>
                                <div class="toggle-section">
                                    <div class="facets">
                                        <label v-for="(entityType, i) in getFacets.entityTypes" v-bind:key="i" class="facet">
                                            <input type="checkbox" v-bind:name="entityType.display_name" v-bind:aria-label="entityType.display_name" :value="entityType" v-on:click="filter('entity_type', entityType.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===entityType.display_name && obj.category==='entity_type').length > 0"/> {{entityType.display_name}} <span class="count">({{entityType.count}})</span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset v-if="getFacets.genders && getFacets.genders.length > 0">
                                <legend>Gender</legend>
                                <input type="checkbox" id="gender-toggle" class="toggle-checkbox" />
                                <label for="gender-toggle" class="toggle-label"><span hidden>Expand/collapse gender</span></label>
                                <div class="toggle-section">
                                    <input v-if="getFacets.genders.length > 5" type="text" aria-label="Search gender" placeholder="Search gender" onfocus="this.placeholder=''" v-on:click="genderCheckbox = true" v-model="searchGenders" onblur="this.placeholder='Search gender'" name=""/>
                                    <div class="facets">
                                        <label v-for="(gender, index) in filteredData(getFacets.genders, searchGenders, 'count')" v-bind:key="index" class="facet">
                                            <input type="checkbox" v-bind:name="gender.display_name" v-bind:aria-label="gender.display_name" :value="gender" v-on:click="filter('gender', gender.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===gender.display_name && obj.category==='gender').length > 0"/> {{gender.display_name}} <span class="count">({{gender.count}})</span>
                                        </label>
                                    </div>
                                    <input type="checkbox" id="show-all-genders" class="show-checkbox" v-model="genderCheckbox">
                                    <label class="show-all dotted-underline" for="show-all-genders" v-if="getFacets.genders.length > 5 && !searchGenders"> genders</label>
                                </div>
                            </fieldset>
                            <fieldset v-if="getFacets.languages && getFacets.languages.length > 0">
                                <legend>Languages used</legend>
                                <input type="checkbox" id="language-toggle" class="toggle-checkbox" />
                                <label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
                                <div class="toggle-section">
                                    <input v-if="getFacets.languages.length > 5" type="text" aria-label="Search language used" placeholder="Search language used" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language used '" name=""/>
                                    <div class="facets">
                                    <label v-for="(language, index) in filteredData(getFacets.languages, searchLanguages, 'count', languagesCheckbox)" v-bind:key="index" class="facet">
                                        <input type="checkbox" v-bind:name="language.display_name" :value="language" v-bind:aria-label="language.display_name" v-on:click="filter('language', language.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===language.display_name && obj.category==='language').length > 0"/> {{language.display_name}} <span class="count">({{language.count}})</span>
                                    </label>
                                    </div>
                                    <input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
                                    <label class="show-all dotted-underline" for="show-all-languages" v-if="getFacets.languages.length > 5 && !searchLanguages"> languages used</label>
                                </div>
                            </fieldset>
                            <fieldset v-if="getFacets.related_entities && getFacets.related_entities.length > 0">
                                <!-- acquirers only -->
                                <legend>Related people &amp; corporate bodies</legend>
                                <input type="checkbox" id="related-entities-toggle" class="toggle-checkbox" />
                                <label for="related-entities-toggle" class="toggle-label"><span hidden>Expand/collapse related people and corporate bodies</span></label>
                                <div class="toggle-section">
                                    <input v-if="getFacets.related_entities.length > 5" type="text" aria-label="Search person or corporate body" placeholder="Search person or corporate body" onfocus="this.placeholder=''" v-on:click="relatedEntitiesCheckbox = true" v-model="searchRelatedEntities" onblur="this.placeholder='Search person or corporate body'" name=""/>
                                    <div class="facets">
                                    <label v-for="(entity, index) in filteredData(getFacets.related_entities, searchRelatedEntities, 'alphabetical', relatedEntitiesCheckbox)" v-bind:key="index" class="facet">
                                        <input type="checkbox" v-bind:name="entity.display_name" v-bind:aria-label="entity.display_name" :value="entity" v-on:click="filter('related_entities', entity.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===entity.display_name && obj.category==='related_entities').length > 0"/> {{entity.display_name}} <span class="count">({{entity.count}})</span>
                                    </label>
                                    </div>
                                    <input type="checkbox" id="show-all-entity" class="show-checkbox" v-model="relatedEntitiesCheckbox">
                                    <label class="show-all dotted-underline" for="show-all-entity" v-if="getFacets.related_entities.length > 5 && !searchRelatedEntities"> related people &amp; corporate bodies</label>
                                </div>
                            </fieldset>
                            <fieldset v-if="getFacets.related_places && getFacets.related_places.length > 0">
                                <legend>Related places</legend>
                                <input type="checkbox" id="related-places-toggle" class="toggle-checkbox" />
                                <label for="related-places-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
                                <div class="toggle-section">
                                    <input v-if="getFacets.related_places.length > 5" type="text" aria-label="Search place" placeholder="Search place" onfocus="this.placeholder=''" v-on:click="relatedPlacesCheckbox = true" v-model="searchRelatedPlaces" onblur="this.placeholder='Search place'" name=""/>
                                    <div class="facets">
                                    <label v-for="(place, index) in filteredData(getFacets.related_places, searchRelatedPlaces, 'alphabetical', relatedPlacesCheckbox)" v-bind:key="index" class="facet">
                                        <input type="checkbox" v-bind:name="place.display_name" :value="place" v-bind:aria-label="place.display_name" v-on:click="filter('related_places', place.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===place.display_name && obj.category==='related_places').length > 0"/> {{place.display_name}} <span class="count">({{place.count}})</span>
                                    </label>
                                    </div>
                                    <input type="checkbox" id="show-all-places" class="show-checkbox" v-model="relatedPlacesCheckbox">
                                    <label class="show-all dotted-underline" for="show-all-places" v-if="getFacets.related_places.length > 5 && !searchRelatedPlaces"> places</label>
                                </div>
                            </fieldset>
                            <label v-if="getFacets.with_royal_names">
                                <input type="checkbox" name="with_royal_names" value="Show only people with royal names" aria-label="Show only people with royal names" v-on:click="filter('with_royal_names', 1)" :checked="selectedFacets.filter(obj => obj.category==='with_royal_names').length > 0"/>{{getSearchResults.with_royal_names.display_name}} <span class="count">({{getSearchResults.with_royal_names.count}})</span>
                            </label>
                            <label v-if="getFacets.with_multiple_identities">
                                <input type="checkbox" name="with_multiple_identities" value="Show only people with multiple identities" aria-label="People with multiple identities" v-on:click="filter('with_multiple_identities', 1)" :checked="selectedFacets.filter(obj => obj.category==='with_multiple_identities').length > 0"/>{{getSearchResults.with_multiple_identities.display_name}} <span class="count">({{getSearchResults.with_multiple_identities.count}})</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <fieldset v-if="selectedFacets.length > 0" class="selected-facets">
                            <legend hidden>Selected filters</legend>
                            <label v-for="(selectedFacet, index) in selectedFacets" v-bind:key="index" class="facet">
                                <template v-if="selectedFacet.category == 'with_royal_names'">
                                    <input type="checkbox" v-bind:name="selectedFacet.category" value="Show only people with royal names" aria-label="Show only people with royal names" v-on:click="filter(selectedFacet.category, selectedFacet.display_name)" checked/> Show only people with royal names
                                </template>
                                <template v-else-if="selectedFacet.category == 'with_multiple_identities'">
                                    <input type="checkbox" v-bind:name="selectedFacet.category" value="Show only people with multiple identities" aria-label="Show only people with multiple identities" v-on:click="filter(selectedFacet.category, selectedFacet.display_name)" checked/> Show only people with multiple identities
                                </template>
                                <template v-else>
                                    <input type="checkbox" v-bind:name="selectedFacet.category" :value="selectedFacet.display_name" v-bind:aria-label="selectedFacet.display_name" v-on:click="filter(selectedFacet.category, selectedFacet.display_name)" checked/>
                                    <template v-if="selectedFacet.category == 'existence_years'">Date of existence: </template>
                                    {{selectedFacet.display_name}}
                                </template>
                            </label>
                            <button class="button-link clear dotted-underline"  v-on:click="clearFacets">Clear all filters</button>
                        </fieldset>
                        <div class="flex">
                            <div class="letterIndex">
                                <!-- TODO replace with a select dropdown in mobile version? -->
                                <button v-bind:class="['button-link', {'active': activeLetter == ''}]" v-on:click="filterByLetter('')">All</button>
                                <button v-for="(letter, i) in getLetterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': activeLetter == letter.name}, {'disabled': letter.missing}]" :aria-hidden="letter.missing" :disabled="letter.missing" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
                            </div>
                            <button class="button-default filter display-mobile" v-on:click="toggleFilters" aria-label="filter objects"><span hidden>Filter</span></button>
                        </div>
                        <div class="list grey-column">
                            <div class="list-header">
                                <h2 v-if="activeLetter == ''">All people &amp; corporate bodies ({{getTotalSearchResults}})</h2>
                                <h2 v-else>{{activeLetter}} ({{getTotalSearchResults}})</h2>
                                <span class="details">
                                    <span>Type</span>
                                    <span>Existence dates</span>
                                </span>
                            </div>
                            <div v-if="getSearchResults.length == 0" class="loader"></div>
                            <div v-for="(result, i) in getTotalSearchResults" v-bind:key="i" class="list-row">
                                <span>
                                    <router-link :to="'/people-and-corporate-bodies/'+(result.id)" :aria-label="'entity type: '+(result.entity_type.title)">{{result.display_name}}</router-link>
                                </span>
                                <span class="details">
                                    <span>{{entity.entity_type.title}}</span>
                                    <!-- TODO change to entity.display_date_name_used -->
                                    <span v-if="entity.display_date">{{entity.display_date}}</span>
                                    <span v-else>---</span>
                                </span>
                            </div>
                            <div v-if="loadingMoreRecords" class="loader"></div>
                            <template v-else>
                                <button type="button" v-if="getSearchResults.length != 0 && getSearchResults.length < getTotalSearchResults" class="button-default large" v-on:click="moreRecords()">
                                    Show more results
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="loadingResults" class="loader"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default {
	name: 'SearchResultsPage',
	computed: mapGetters(['getFacets', 'getLetterIndex', 'getTotalSearchResults', 'getSearchResults']),
	data: function() {
		return {
            searchQuery: '',
            activeSearchTab: 'all',
            loadingResults: true,
			loadingMoreResults: false,
			minExistenceRange: 0,
			maxExistenceRange: 0,
			existenceSlider: {
				startMin: 0,
				startMax: 0,
				min: 0,
				max: 0,
				step: 1
			},
			relatedPlacesCheckbox: false,
			languagesCheckbox: false,
			genderCheckbox: false,
			relatedEntitiesCheckbox: false,
			selectedFacets: [],
			searchRelatedPlaces: '',
			searchGenders: '',
			searchRelatedEntities: '',
			searchLanguages: '',
            activeLetter: '',
            pageNum: 1
		}
	},
	methods: {
        async getResults(filter) {
            this.loadingResults = true;
            this.activeSearchTab = filter;
            this.pageNum = 1;
			await this.fetchSearchResults({'activeSearchTab': this.activeSearchTab, 'searchTerm': this.searchQuery, 'pages': this.pageNum, 'selectedFacets': [], 'letter': ''}); 
             this.loadingResults = false;
        },
		initYearRange(min, max) {
            if (this.minExistenceRange == 0) {
				this.minExistenceRange = min;
			} 
			if (this.maxExistenceRange == 0){
				this.maxExistenceRange = max;
			}

			this.existenceSlider.startMin = this.minExistenceRange;
			this.existenceSlider.startMax = this.maxExistenceRange;
			this.existenceSlider.min = min;
            this.existenceSlider.max = max;
            
			noUiSlider.create(this.$refs.existenceSlider, {
			start: [this.existenceSlider.startMin, this.existenceSlider.startMax],
				step: this.existenceSlider.step,
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
		filteredData (list, query, sortingOrder, checkbox) {
			query = query.toLowerCase();
			var filteredList = list.slice().filter(function (item) {
				var name = item.display_name.toLowerCase();
				return name.match(query);
			})
			if (sortingOrder == 'alphabetical')  {
				filteredList.sort((a, b) => a.display_name.localeCompare(b.display_name));
			} else if (sortingOrder == 'count') {
				filteredList.sort((a, b) => b.count - a.count);
			} 
			if (!checkbox) {
				return filteredList.slice(0,5);
			}
			return filteredList;
		},
		async filterByLetter(letter) {
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
			
			await this.fetchSearchResults({'searchTerm': this.searchQuery, 'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter}); 
		},
		async clearFacets() {
            this.selectedFacets = [];
            this.updateExistenceSlider(this.existenceSlider.min, this.existenceSlider.max);
            this.pageNum = 1;
			this.$router.replace({ query: {} });
			this.activeLetter = '';

			await this.fetchAuthorityEntities({'searchTerm': this.searchQuery, 'pages': this.pageNum, 'selectedFacets': [], 'letter': this.activeLetter});
		},
		async filter(facet, option) {
            const setQuery = this.$route.query;
            this.pageNum = 1;
            setQuery['page'] = this.pageNum;

			if (this.selectedFacets.filter(obj => obj.display_name===option && obj.category===facet).length > 0) {
                if (facet == 'existence_years') {
                    this.updateExistenceSlider(this.existenceSlider.min, this.existenceSlider.max);
                }
				this.selectedFacets = this.selectedFacets.filter(object => !(object.category === facet && object.display_name === option));
				if (!Array.isArray(setQuery[facet])) {
					delete setQuery[facet];
				}
				else {
					setQuery[facet].splice(setQuery[facet].indexOf(option),1);
				}
			} else {
                if (facet == 'existence_years') {
                    this.selectedFacets = this.selectedFacets.filter(object => !(object.category === facet));
                    delete setQuery[facet];
                }
				this.selectedFacets.push({'category': facet, 'display_name': option});
				if (setQuery[facet])  {
					if (!Array.isArray(setQuery[facet])) {
						setQuery[facet] = [setQuery[facet]];
					}
					setQuery[facet].push(option);
				} 
				else {
					setQuery[facet] = [option];
				}
			}
			this.$router.replace({ query: {} });
			this.$router.push({query: setQuery});

			await this.fetchSearchResults({'searchTerm': this.searchQuery, 'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter}); 
		},
		toggleFilters() {
			const filters = document.querySelector('.filters');
			filters.classList.toggle('active');
		},
		async moreRecords() {
			this.loadingMoreRecords = true;

			this.pageNum = this.pageNum + 1;

			const setQuery = this.$route.query;
			setQuery['page'] = this.pageNum;
			this.$router.replace({ query: {} });
			this.$router.push({query: setQuery});

            await this.loadMoreSearchResults();

			this.loadingMoreRecords = false;
		},
		...mapActions(['fetchSearchResults','loadMoreSearchResults'])
    },
	async created() {
        // process query from URL and update selectedFacets and year range
		const setQuery = this.$route.query;
		for (var key in setQuery) {
			switch (key){
                case 'q':
                    this.searchQuery = setQuery[key];
				case 'letter':
					this.activeLetter = setQuery[key];
					break;
				case 'page':
					this.pageNum = Number(setQuery[key]);
					break;
				default:
                    if (key == 'existence_years') {
                        this.minExistenceRange = setQuery[key].split('-')[0];
                        this.maxExistenceRange = setQuery[key].split('-')[1];
                    }
					if (Array.isArray(setQuery[key])) {
						for (var i in setQuery[key]) {
						this.selectedFacets.push({'category': key, 'display_name': setQuery[key][i]});
						}
					} else {
						this.selectedFacets.push({'category': key, 'display_name': setQuery[key]});
					}
			}
		}

		await this.fetchSearchResults({'activeSearchTab': this.activeSearchTab, 'searchTerm': this.searchQuery, 'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter});

		// set up the year range filter if existence years is sent in response
		if (this.getSearchResults.existence_years && this.getSearchResults.existence_years.min_default > 0 && this.getSearchResults.existence_years.max_default > 0) {
			this.initYearRange(this.getSearchResults.existence_years.min_default, this.getSearchResults.existence_years.max_default);
		}

		this.loadingResults = false;
	}
}
</script>