<template>
	<div class="entity-list">
		<div class="two-column-20-80">
			<div class="filters">
				<button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
                <fieldset class="range">
                    <legend>Years of existence</legend>
                    <!-- change min and max to min and max creation years from the database [date of existence] -->
                    <div id="existence-year-slider" ref="existenceSlider"></div>
                    <br>
                    <input type="number" name="existence_start_year" aria-label="existence year start" class="range-year" :min="existenceSlider.min" :max="existenceSlider.max" v-model="minExistenceRange" v-on:change="updateExistenceSlider()" />
                    -
                    <input type="number" name="existence_end_year" aria-label="existence year end" class="range-year" :min="existenceSlider.min" :max="existenceSlider.max" v-model="maxExistenceRange" v-on:change="updateExistenceSlider()" />
                    <button type="button" class="button-outline" v-on:click="filterByYear()">Filter</button>
                </fieldset>
				<fieldset>
					<legend>Entity type</legend>
					<input type="checkbox" id="entity-type-toggle" class="toggle-checkbox" checked />
					<label for="entity-type-toggle" class="toggle-label"><span hidden>Expand/collapse entity type</span></label>
					<div class="toggle-section">
						<div class="facets">
							<label v-for="(entityType, i) in facets.entityTypes" v-bind:key="i" class="facet">
								<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
									<input type="checkbox" v-bind:name="entityType.display_name" v-bind:aria-label="entityType.display_name" :value="entityType" v-model="selectedFilters" v-on:click="filter('entity_type', entityType.display_name)"/> {{entityType.display_name}} <span class="count">({{entityType.count}})</span>
								<!-- </router-link> -->
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset class="filter-collapse">
					<legend>Gender</legend>
					<input type="checkbox" id="gender-toggle" class="toggle-checkbox" />
					<label for="gender-toggle" class="toggle-label"><span hidden>Expand/collapse gender</span></label>
					<div class="toggle-section">
						<input v-if="facets.genders.length > 5" type="text" aria-label="Search gender" placeholder="Search gender" onfocus="this.placeholder=''" v-on:click="genderCheckbox = true" v-model="searchGenders" onblur="this.placeholder='Search gender'" name=""/>
						<div class="facets">
							<label v-for="(gender, index) in filteredData(facets.genders, searchGenders, 'count')" v-bind:key="index" class="facet">
								<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
								<input type="checkbox" v-bind:name="gender.display_name" v-bind:aria-label="gender.display_name" :value="gender" v-model="selectedFilters" v-on:click="filter('gender', gender.display_name)"/> {{gender.display_name}} <span class="count">({{gender.count}})</span>
								<!-- </router-link> -->
							</label>
						</div>
						<input type="checkbox" id="show-all-genders" class="show-checkbox" v-model="genderCheckbox">
						<label class="show-all dotted-underline" for="show-all-genders" v-if="facets.genders.length > 5 && !searchGenders"> genders</label>
					</div>
				</fieldset>
                <fieldset>
					<legend>Languages used</legend>
					<input type="checkbox" id="language-toggle" class="toggle-checkbox" />
					<label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
					<div class="toggle-section">
						<input v-if="facets.languages.length > 5" type="text" aria-label="Search language used" placeholder="Search language used" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language used '" name=""/>
						<div class="facets" v-bind:class="{active: languagesCheckbox}">
						<label v-for="(language, index) in filteredData(facets.languages, searchLanguages, 'count', languagesCheckbox)" v-bind:key="index" class="facet">
							<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="language.display_name" :value="language" v-bind:aria-label="language.display_name" v-model="selectedFilters" v-on:click="filter('language', language.display_name)"/> {{language.display_name}} <span class="count">({{language.count}})</span>
							<!-- </router-link> -->
						</label>
						</div>
						<input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
						<label class="show-all dotted-underline" for="show-all-languages" v-if="facets.languages.length > 5 && !searchLanguages"> languages used</label>
					</div>
				</fieldset>
				<fieldset class="filter-collapse">
					<!-- acquirers only -->
					<legend>Related people &amp; corporate bodies</legend>
					<input type="checkbox" id="related-entities-toggle" class="toggle-checkbox" />
					<label for="related-entities-toggle" class="toggle-label"><span hidden>Expand/collapse related people and corporate bodies</span></label>
					<div class="toggle-section">
						<input v-if="facets.relatedEntities.length > 5" type="text" aria-label="Search person or corporate body" placeholder="Search person or corporate body" onfocus="this.placeholder=''" v-on:click="relatedEntitiesCheckbox = true" v-model="searchRelatedEntities" onblur="this.placeholder='Search person or corporate body'" name=""/>
						<div class="facets" v-bind:class="{active: relatedEntitiesCheckbox}">
						<label v-for="(entity, index) in filteredData(facets.relatedEntities, searchRelatedEntities, 'alphabetical', relatedEntitiesCheckbox)" v-bind:key="index" class="facet">
							<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="entity.display_name" v-bind:aria-label="entity.display_name" :value="entity" v-model="selectedFilters" v-on:click="filter('related_entity', entity.display_name)"/> {{entity.display_name}} <span class="count">({{entity.count}})</span>
							<!-- </router-link> -->
						</label>
						</div>
						<input type="checkbox" id="show-all-entity" class="show-checkbox" v-model="relatedEntitiesCheckbox">
						<label class="show-all dotted-underline" for="show-all-entity" v-if="facets.relatedEntities.length > 5 && !searchRelatedEntities"> related people &amp; corporate bodies</label>
					</div>
				</fieldset>
				<fieldset>
					<legend>Related places</legend>
					<input type="checkbox" id="related-places-toggle" class="toggle-checkbox" />
					<label for="related-places-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
					<div class="toggle-section">
						<input v-if="facets.relatedPlaces.length > 5" type="text" aria-label="Search place" placeholder="Search place" onfocus="this.placeholder=''" v-on:click="relatedPlacesCheckbox = true" v-model="searchRelatedPlaces" onblur="this.placeholder='Search place'" name=""/>
						<div class="facets" v-bind:class="{active: relatedPlacesCheckbox}">
						<label v-for="(place, index) in filteredData(facets.relatedPlaces, searchRelatedPlaces, 'alphabetical', relatedPlacesCheckbox)" v-bind:key="index" class="facet">
							<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="place.display_name" :value="place" v-bind:aria-label="place.display_name" v-model="selectedFilters" v-on:click="filter('related_place', place.display_name)"/> {{place.display_name}} <span class="count">({{place.count}})</span>
							<!-- </router-link> -->
						</label>
						</div>
						<input type="checkbox" id="show-all-places" class="show-checkbox" v-model="relatedPlacesCheckbox">
						<label class="show-all dotted-underline" for="show-all-places" v-if="facets.relatedPlaces.length > 5 && !searchRelatedPlaces"> places</label>
					</div>
				</fieldset>
					<label><input type="checkbox" name="people-with-royal-names" value="People with royal names" aria-label="People with royal names" v-model="selectedFilters" v-on:click="filter('royal_names', 1)"/>Show only people with royal names</label>

					<label><input type="checkbox" name="people-with-multiple-identities" value="People with multiple identities" aria-label="People with multiple identities" v-model="selectedFilters" v-on:click="filter('multiple_identities', 1)"/>Show only people with multiple identities</label>
			
			</div>
			<div>
				<!-- <fieldset v-if="selectedFilters.length" class="selected-facets">
					<legend hidden>Selected filters</legend>
					<label v-for="(selectedFilter, i) in selectedFilters" v-bind:key="i" class="facet">
						<input type="checkbox" v-bind:name="selectedFilter.display_name" v-bind:aria-label="selectedFilter.display_name" v-on:click="removeFacet(i)" checked/> 
						<span v-if="selectedFilter.display_name">{{selectedFilter.display_name}} ({{selectedFilter.count}})</span>
						<span v-else>{{selectedFilter}}</span>
					</label>
					<button class="button-link dotted-underline" v-on:click="selectedFilters = []">Clear all filters</button>
				</fieldset> -->
				<div class="index">
					<button v-for="(letter, i) in letterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': active == letter.name}, {'missing': letter.missing}]" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
				</div>
				<div class="list grey-column">
					<div class="list-header">
						<h2 v-if="active == this.letterIndex[0].name">All people &amp; corporate bodies ({{getTotal}})</h2>
						<h2 v-else>{{active}}</h2>
						<span>Type</span>
						<span>Existence dates</span>
					</div>
					<div v-if="getAuthorityEntities.length == 0" class="loader"></div>
					<div v-for="(entity, i) in getAuthorityEntities" v-bind:key="i" class="list-row">
						<span>
							<router-link :to="'/people-and-corporate-bodies/'+(entity.id)" :aria-label="'entity type: '+(entity.entity_type.title)">{{entity.display_name}}</router-link>
						</span>
						<span>{{entity.entity_type.title}}</span>
                        <!-- TODO add display date name used -->
						<span>{{entity.display_date}}</span>
					</div>
					<div v-if="loading" class="loader"></div>
					<template v-else>
						<button type="button" v-if="getAuthorityEntities.length != 0 && getAuthorityEntities.length < count" class="button-default large" v-on:click="moreRecords(pageNum)">
							Show more entities
						</button>
					</template>
				</div>
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
	computed: mapGetters(['getAuthorityEntities', 'getTotal']),
	data: function() {
		return {
			count: 85,
			letterIndex: [
				{
					name: 'All',
					missing: false
				},
				{ 
					name: 'A',
					missing: false
				},
				{	
					name: 'B',
					missing: false
				},
				{
					name: 'C',
					missing: false
				},
				{
					name: 'D',
					missing: false
				},
				{ 
					name: 'E',
					missing: false
				}, 
				{
					name:'F',
					missing: false
				}, 
				{
					name: 'G',
					missing: false
				},
				{
					name: 'H',
					missing: false
				},
				{
					name: 'I',
					missing: false
				},
				{
					name: 'J',
					missing: false
				},
				{
					name: 'K',
					missing: false
				},
				{
					name: 'L',
					missing: false
				},
				{
					name: 'M',
					missing: false
				}, 
				{
					name: 'N',
					missing: false
				},
				{
					name: 'O',
					missing: false
				}, 
				{
					name: 'P',
					missing: false
				},
				{
					name: 'Q',
					missing: false
				},
				{
					name: 'R',
					missing: false
				},
				{
					name: 'S',
					missing: false
				},
				{
					name: 'T',
					missing: false
				},
				{
					name: 'U',
					missing: false
				}, 
				{
					name: 'V',
					missing: false
				},
				{
					name: 'W',
					missing: false
				},
				{
					name: 'X',
					missing: false
				},
				{ 
					name: 'Y',
					missing: false
				},
				{
					name: 'Z',
					missing: false
				},
				{
					name: '0-9',
					missing: false
				}
			],
			facets: {
				entityTypes: [
					{id: 0, display_name: "Person", count: 1543},
					{id: 1, display_name: "Corporate body", count: 31}
				],
				genders: [
					{id: 0, display_name: "Women", count: 34},
					{id: 1, display_name: "Men", count: 45}
				],
				languages: [
					{id: 0, display_name: "English", count: 2463},
					{id: 1, display_name: "French", count: 124},
					{id: 2, display_name: "German", count: 33},
					{id: 3, display_name: "Italian", count: 8},
					{id: 4, display_name: "Latin", count: 6}
				],
				relatedEntities: [
					{id: 0, display_name: "George III, 1738-1820, King of Great Britain and Ireland", count: 541},
					{id: 1, display_name: "Grafton, 3rd Duke of", count: 81},
					{id: 2, display_name: "North, Frederick, Lord", count: 75},
					{id: 3, display_name: "William, Prince (1765-1837)", count: 69},
					{id: 4, display_name: "Conway, Henry Seymour (1721-1795)", count: 41},
					{id: 5, display_name: "Rockingham, 2nd Marquess of", count: 38},
					{id: 6, display_name: "Charlotte, Queen Consort to George III", count: 37},
					{id: 7, display_name: "Baillie, Matthew (1761-1823)", count: 34},
					{id: 9, display_name: "Chatham, 1st Earl of", count: 26},
					{id: 9, display_name: "Rochford, 4th Earl of", count: 24},
					{id: 10, display_name: "Basnett, William", count: 19},
					{id: 11, display_name: "Parker and Perry; Glass Manufacturers", count: 18}
				],
				relatedPlaces: [
					{id: 0, display_name: "George III, 1738-1820, King of Great Britain and Ireland", count: 541},
					{id: 1, display_name: "Grafton, 3rd Duke of", count: 81},
					{id: 2, display_name: "North, Frederick, Lord", count: 75},
					{id: 3, display_name: "William, Prince (1765-1837)", count: 69},
					{id: 4, display_name: "Conway, Henry Seymour (1721-1795)", count: 41},
					{id: 5, display_name: "Rockingham, 2nd Marquess of", count: 38},
					{id: 6, display_name: "Charlotte, Queen Consort to George III", count: 37},
					{id: 7, display_name: "Baillie, Matthew (1761-1823)", count: 34},
					{id: 9, display_name: "Chatham, 1st Earl of", count: 26},
					{id: 9, display_name: "Rochford, 4th Earl of", count: 24},
					{id: 10, display_name: "Basnett, William", count: 19},
					{id: 11, display_name: "Parker and Perry; Glass Manufacturers", count: 18}
				]
			},
			minExistenceRange: null,
			maxExistenceRange: null,
			existenceSlider: {
				startMin: 1700,
				startMax: 1900,
				min: 1600,
				max: 2020,
				step: 1
			},
			relatedPlacesCheckbox: false,
			languagesCheckbox: false,
			genderCheckbox: false,
			relatedEntitiesCheckbox: false,
			selectedFilters: [],
			searchRelatedPlaces: '',
			searchGenders: '',
			searchRelatedEntities: '',
			searchLanguages: '',
			loading: false,
            active: '',
            pageNum: 1
		}
	},
	methods: {
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
		sortedData (list) {
			return list.slice().sort((a, b) => a.count < b.count);
		},
		sortedList (records, sortBy) {
			switch (sortBy) {
				case '--': 
				return records
				case 'title': 
				return records.slice().sort((a, b) => a.title.localeCompare(b.title));
				// case 'Creation year': 
				//   return records.slice().sort((a, b) => a.creation_dates.localeCompare(a.creation_dates));
			}
        },
        filterByLetter(letter) {
            // TODO - Filter list by letter
			// this.fetchArchivalRecords(letter)
            this.active = letter;
        },
        filterByYear() {
            this.selectedFilters.push(this.minCreationRange + ' - ' + this.maxCreationRange);
            // TODO - Filter list by year
			// this.fetchArchivalRecords(this.minCreationRange, this.maxCreationRange)
        },
		updateExistenceSlider() {
			this.$refs.existenceSlider.noUiSlider.set([this.minExistenceRange, this.maxExistenceRange]);
		},
		toggleFilters() {
			const filters = document.querySelector('.filters');
			filters.classList.toggle('active');
		},
		removeFacet(facetIndex) {
			this.selectedFilters.splice(facetIndex,1);
        },
        async filter(facet, option) {
			if (event.target.checked) {
				const setQuery = this.$route.query;
				setQuery.page = this.pageNum;
				if (setQuery[facet]) {
					setQuery[facet].push(option);
				} else {
					setQuery[facet] = [option];
				}
				this.$router.replace({ query: {} });
                this.$router.push({query: setQuery});
            }
            else {
				const setQuery = this.$route.query;
				setQuery.page = this.pageNum;
				setQuery[facet].splice(setQuery[facet].indexOf(option),1);
				this.$router.replace({ query: {} });
				this.$router.push({query: setQuery});
			}
		},
        async moreRecords(n) {
			this.loading = true;
			this.pageNum = n + 1;
			this.$router.push({query: {page: this.pageNum}});
			await this.loadMoreAuthorityEntities();
			this.loading = false;
		},
		...mapActions(['fetchAuthorityEntities','loadMoreAuthorityEntities'])
    },
	created() {
        // TODO add the number of records = 10 * pageNum
		this.fetchAuthorityEntities();
        this.active = this.letterIndex[0].name;
        this.$router.push({query: {page: this.pageNum} });
	},
	mounted() {
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
	}
}
</script>