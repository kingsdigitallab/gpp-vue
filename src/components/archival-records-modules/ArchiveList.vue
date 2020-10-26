<template>
	<div class="archival-list">
		<div class="two-column-20-80">
			<div class="filters">
				<button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
				<fieldset class="range">
					<legend>Creation year</legend>
					<!-- change min and max to min and max creation years from the database [date of creation] -->
					<div id="creation-year-slider" ref="creationSlider"></div>
					<br>
					<input type="number" name="creation_start_year" aria-label="creation year start" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="minCreationRange" v-on:change="updateCreationSlider()" />
					-
					<input type="number" name="creation_end_year" aria-label="creation year end" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="maxCreationRange" v-on:change="updateCreationSlider()" />
					<button type="button" class="button-outline" v-on:click="filterByYear()">Filter</button>
				</fieldset>
				<fieldset>
					<legend>Document level</legend>
					<input type="checkbox" id="document-level-toggle" class="toggle-checkbox" checked />
					<label for="document-level-toggle" class="toggle-label"><span hidden>Expand/collapse document level</span></label>
					<div class="toggle-section">
						<div class="facets">
							<label v-for="(level, index) in facets.levels" v-bind:key="index" class="facet">
								<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
									<input type="checkbox" v-bind:name="level.display_name" v-bind:aria-label="level.display_name" :value="level" v-model="selectedFilters"/> {{level.display_name}} <span class="count">({{level.count}})</span>
								<!-- </router-link> -->
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset class="filter-collapse">
					<legend>Record type</legend>
					<input type="checkbox" id="record-type-toggle" class="toggle-checkbox" />
					<label for="record-type-toggle" class="toggle-label"><span hidden>Expand/collapse record type</span></label>
					<div class="toggle-section">
						<input v-if="facets.recordTypes.length > 5" type="text" aria-label="Search record type" placeholder="Search record type" onfocus="this.placeholder=''" v-on:click="recordTypeCheckbox = true" v-model="searchRecordTypes" onblur="this.placeholder='Search record type'" name=""/>
						<div class="facets" v-bind:class="{active: recordTypeCheckbox}">
							<label v-for="(type, index) in filteredData(facets.recordTypes, searchRecordTypes, 'count')" v-bind:key="index" class="facet">
								<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
								<input type="checkbox" v-bind:name="type.display_name" v-bind:aria-label="type.display_name" :value="type" v-model="selectedFilters"/> {{type.display_name}} <span class="count">({{type.count}})</span>
								<!-- </router-link> -->
							</label>
						</div>
						<input type="checkbox" id="show-all-record-types" class="show-checkbox" v-model="recordTypeCheckbox">
						<label class="show-all dotted-underline" for="show-all-record-types" v-if="facets.recordTypes.length > 5 && !searchRecordTypes"> record types</label>
					</div>
				</fieldset>
				<fieldset class="filter-collapse">
					<!-- acquirers only -->
					<legend>Writer</legend>
					<input type="checkbox" id="writer-toggle" class="toggle-checkbox" />
					<label for="writer-toggle" class="toggle-label"><span hidden>Expand/collapse writer</span></label>
					<div class="toggle-section">
						<input v-if="facets.writers.length > 5" type="text" aria-label="Search writer" placeholder="Search writer" onfocus="this.placeholder=''" v-on:click="writersCheckbox = true" v-model="searchWriters" onblur="this.placeholder='Search writer'" name=""/>
						<div class="facets" v-bind:class="{active: writersCheckbox}">
						<label v-for="(writer, index) in filteredData(facets.writers, searchWriters, 'alphabetical')" v-bind:key="index" class="facet">
							<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="writer.display_name" v-bind:aria-label="writer.display_name" :value="writer" v-model="selectedFilters"/> {{writer.display_name}} <span class="count">({{writer.count}})</span>
							<!-- </router-link> -->
						</label>
						</div>
						<input type="checkbox" id="show-all-writers" class="show-checkbox" v-model="writersCheckbox">
						<label class="show-all dotted-underline" for="show-all-writers" v-if="facets.writers.length > 10 && !searchWriters"> writers</label>
					</div>
				</fieldset>
				<fieldset>
					<legend>Addressee</legend>
					<input type="checkbox" id="addressee-toggle" class="toggle-checkbox" />
					<label for="addressee-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
					<div class="toggle-section">
						<input v-if="facets.addressees.length > 5" type="text" aria-label="Search addressee" placeholder="Search addressee" onfocus="this.placeholder=''" v-on:click="addresseesCheckbox = true" v-model="searchAddressees" onblur="this.placeholder='Search addressee'" name=""/>
						<div class="facets" v-bind:class="{active: addresseesCheckbox}">
						<label v-for="(addressee, index) in filteredData(facets.addressees, searchAddressees, 'alphabetical')" v-bind:key="index" class="facet">
							<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="addressee.display_name" :value="addressee" v-bind:aria-label="addressee.display_name" v-model="selectedFilters"/> {{addressee.display_name}} <span class="count">({{addressee.count}})</span>
							<!-- </router-link> -->
						</label>
						</div>
						<input type="checkbox" id="show-all-addressees" class="show-checkbox" v-model="addresseesCheckbox">
						<label class="show-all dotted-underline" for="show-all-addressees" v-if="facets.addressees.length > 10 && !searchAddressees"> addressees</label>
					</div>
				</fieldset>
				<fieldset>
					<legend>Language</legend>
					<input type="checkbox" id="language-toggle" class="toggle-checkbox" />
					<label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
					<div class="toggle-section">
						<input v-if="facets.languages.length > 5" type="text" aria-label="Search language" placeholder="Search language" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language'" name=""/>
						<div class="facets" v-bind:class="{active: languagesCheckbox}">
						<label v-for="(language, index) in filteredData(facets.languages, searchLanguages, 'count')" v-bind:key="index" class="facet">
							<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="language.display_name" :value="language" v-bind:aria-label="language.display_name" v-model="selectedFilters"/> {{language.display_name}} <span class="count">({{language.count}})</span>
							<!-- </router-link> -->
						</label>
						</div>
						<input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
						<label class="show-all dotted-underline" for="show-all-languages" v-if="facets.languages.length > 5 && !searchLanguages"> languages</label>
					</div>
				</fieldset>
				<label><input type="checkbox" name="Records with transcriptions" value="Records with transcriptions" aria-label="Records with transcriptions" v-model="selectedFilters"/>Show only records with transcriptions</label>
			</div>
			<div>
				<fieldset v-if="selectedFilters.length" class="selected-facets">
					<legend hidden>Selected filters</legend>
					<label v-for="(selectedFilter, i) in selectedFilters" v-bind:key="i" class="facet">
						<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
						<input type="checkbox" v-bind:name="selectedFilter.display_name" v-bind:aria-label="selectedFilter.display_name" v-on:click="removeFacet(i)" checked/> 
						<span v-if="selectedFilter.display_name">{{selectedFilter.display_name}} ({{selectedFilter.count}})</span>
						<span v-else>{{selectedFilter}}</span>
						<!-- </router-link> -->
					</label>
					<!-- check if filters are selected -->
						<!-- <router-link :to="{name: 'objects'}" class="clear"> -->
						<button class="button-link dotted-underline" v-on:click="selectedFilters = []">Clear all filters</button>
						<!-- </router-link> -->
					<!-- TODO: add date range -->
				</fieldset>
				<div class="index">
					<button v-for="(letter, i) in letterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': active == letter.name}, {'missing': letter.missing}]" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
				</div>
				<div class="list grey-column">
					<div class="list-header">
						<h2 v-if="active == this.letterIndex[0].name">All archival records ({{count}})</h2>
						<h2 v-else>{{active}}</h2>
						<span>Level</span>
						<span>Writer</span>
						<span>Creation dates</span>
					</div>
					<div v-if="getArchivalRecords.length == 0" class="loader"></div>
					<div v-for="(item, i) in getArchivalRecords" v-bind:key="i" class="list-row">
						<span>
							<router-link :to="item.metadata[1].content.toLowerCase() == 'collection' || item.metadata[1].content.toLowerCase() == 'series' ? '/archival-records/collections-series/'+(item.id) : '/archival-records/files-items/'+(item.id)" :aria-label="'document from '+(item.metadata[1].content)">{{item.title}}</router-link>
						</span>
						<!-- TODO: normalise metadata -> item.hierarchy_level -->
						<span>{{item.metadata[1].content}}</span>
						<span v-show="item.creators != null" v-bind:key="creator.id" v-for="creator in item.creators" class="list-data">
							{{creator.display_name}}
						</span>
						<span v-show="item.creators == null">--</span>
						<span v-show="item.creation_dates != null">{{item.creation_dates}}</span>
						<span v-show="item.creation_dates == null">--</span>
					</div>
					<button type="button" v-if="getArchivalRecords.length != 0" class="button-default large" v-on:click="loadMoreArchivalRecords">
						<!-- TODO while waiting for a response -->
						<span v-if="loading" class="loader"></span>
						<span v-else>Show more archival records</span>
					</button>
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
	name: 'ArchiveList',
	computed: mapGetters(['getArchivalRecords']),
	data: function() {
		return {
			count: '2,994',
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
				levels: [
					{id: 0, display_name: "Collection", count: 19},
					{id: 1, display_name: "Series", count: 84},
					{id: 2, display_name: "File", count: 349},
					{id: 3, display_name: "Item", count: 452},
				],
				recordTypes: [
					{id: 1, display_name: "Writings (documents)", count: 5},
					{id: 2, display_name: "Correspondence", count: 4},
					{id: 3, display_name: "Diaries", count: 2},
					{id: 0, display_name: "Financial records", count: 9},
					{id: 4, display_name: "Legal documents", count: 2},
					{id: 5, display_name: "Registers (lists)", count: 2},
					{id: 6, display_name: "Wills", count: 5},
					{id: 7, display_name: "Commonplace books", count: 1},
				],
				writers: [
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
					{id: 11, display_name: "Parker and Perry; Glass Manufacturers", count: 18},
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
				addressees: [
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
				languages: [
					{id: 0, display_name: "English", count: 2463},
					{id: 1, display_name: "French", count: 124},
					{id: 2, display_name: "German", count: 33},
					{id: 3, display_name: "Italian", count: 8},
					{id: 4, display_name: "Latin", count: 6}
				]
			},
			minCreationRange: null,
			maxCreationRange: null,
			creationSlider: {
				startMin: 1700,
				startMax: 1900,
				min: 1600,
				max: 2020,
				step: 1
			},
			addresseesCheckbox: false,
			languagesCheckbox: false,
			recordTypeCheckbox: false,
			writersCheckbox: false,
			selectedFilters: [],
			searchAddressees: '',
			searchRecordTypes: '',
			searchWriters: '',
			searchLanguages: '',
			loading: false,
			active: ''
		}
	},
	methods: {
		filteredData (list, query, sortingOrder) {
			query = query.toLowerCase();
			var filteredList = list.slice().filter(function (item) {
				var name = item.display_name.toLowerCase();
				return name.match(query);
			})
			if (sortingOrder == 'alphabetical')  {
				return filteredList.sort((a, b) => a.display_name.localeCompare(b.display_name));
			} else if (sortingOrder == 'count') {
				return filteredList.sort((a, b) => b.count - a.count);
			} else {
				return filteredList;
			}
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
            this.active = letter;
		},
		filterByYear(){
 			console.log(this.minExistenceRange, this.maxExistenceRange);
		},
		updateCreationSlider() {
			this.$refs.creationSlider.noUiSlider.set([this.minCreationRange, this.maxCreationRange]);
		},
		toggleFilters() {
			const filters = document.querySelector('.filters');
			filters.classList.toggle('active');
		},
		removeFacet(facetIndex) {
			this.selectedFilters.splice(facetIndex,1);
		},
		...mapActions(['fetchArchivalRecords','loadMoreArchivalRecords'])
	},
	created() {
		this.fetchArchivalRecords();
		this.active = this.letterIndex[0].name;
	},
	mounted() {
		noUiSlider.create(this.$refs.creationSlider, {
			start: [this.creationSlider.startMin, this.creationSlider.startMax],
			step: this.creationSlider.step,
			range: {
				'min': this.creationSlider.min,
				'max': this.creationSlider.max
			}
		}); 
				
		this.$refs.creationSlider.noUiSlider.on('update',(values, handle) => {
			this[handle ? 'maxCreationRange' : 'minCreationRange'] = parseInt(values[handle]);
		});
	}
}
</script>