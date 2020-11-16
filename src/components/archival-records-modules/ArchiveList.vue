<template>
	<div class="archival-list">
		<div class="two-column-20-80" v-show="!loadingRecords">
			<div class="filters">
				<button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
				<fieldset id="creation_year" class="range" v-if="facets.creation_years && facets.creation_years.min > 0 && facets.creation_years.max > 0">
					<legend>Creation year</legend>
					<div id="creation-year-slider" ref="creationSlider"></div>
					<br>
					<input type="number" name="creation_start_year" aria-label="creation year start" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="minCreationRange" v-on:change="updateCreationSlider(minCreationRange, maxCreationRange)" />
					-
					<input type="number" name="creation_end_year" aria-label="creation year end" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="maxCreationRange" v-on:change="updateCreationSlider(minCreationRange, maxCreationRange)" />
					<button type="button" class="button-outline" v-on:click="filter('creation_year', minCreationRange + '-' + maxCreationRange)">Filter</button>
				</fieldset>
				<fieldset v-if="facets.levels && facets.levels.length > 0">
					<legend>Document level</legend>
					<input type="checkbox" id="document-level-toggle" class="toggle-checkbox" checked />
					<label for="document-level-toggle" class="toggle-label"><span hidden>Expand/collapse document level</span></label>
					<div class="toggle-section">
						<div class="facets">
							<label v-for="(level, index) in facets.levels" v-bind:key="index" class="facet">
								<input type="checkbox" name="level" v-bind:aria-label="level.display_name" :value="level.display_name" v-on:click="filter('level', level.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===level.display_name && obj.category==='level').length > 0"/> {{level.display_name}} <span class="count">({{level.count}})</span>
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset v-if="facets.recordTypes && facets.recordTypes.length > 0">
					<legend>Record type</legend>
					<input type="checkbox" id="record-type-toggle" class="toggle-checkbox" />
					<label for="record-type-toggle" class="toggle-label"><span hidden>Expand/collapse record type</span></label>
					<div class="toggle-section">
						<input v-if="facets.recordTypes.length > 5" type="text" aria-label="Search record type" placeholder="Search record type" onfocus="this.placeholder=''" v-on:click="recordTypeCheckbox = true" v-model="searchRecordTypes" onblur="this.placeholder='Search record type'" name=""/>
						<div class="facets">
							<label v-for="(type, index) in filteredData(facets.recordTypes, searchRecordTypes, 'count', recordTypeCheckbox)" v-bind:key="index" class="facet">
								<input type="checkbox" name="type" v-bind:aria-label="type.display_name" :value="type.display_name" v-on:click="filter('record_type', type.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===type.display_name && obj.category==='record_type').length > 0"/> {{type.display_name}} <span class="count">({{type.count}})</span>
							</label>
						</div>
						<input type="checkbox" id="show-all-record-types" class="show-checkbox" v-model="recordTypeCheckbox">
						<label class="show-all dotted-underline" for="show-all-record-types" v-if="facets.recordTypes.length > 5 && !searchRecordTypes"> record types</label>
					</div>
				</fieldset>
				<fieldset v-if="facets.writers && facets.writers.length > 0">
					<legend>Writer</legend>
					<input type="checkbox" id="writer-toggle" class="toggle-checkbox" />
					<label for="writer-toggle" class="toggle-label"><span hidden>Expand/collapse writer</span></label>
					<div class="toggle-section">
						<input v-if="facets.writers.length > 5" type="text" aria-label="Search writer" placeholder="Search writer" onfocus="this.placeholder=''" v-on:click="writersCheckbox = true" v-model="searchWriters" onblur="this.placeholder='Search writer'" name=""/>
						<div class="facets">
						<label v-for="(writer, index) in filteredData(facets.writers, searchWriters, 'alphabetical', writersCheckbox)" v-bind:key="index" class="facet">
							<input type="checkbox" name="writer" v-bind:aria-label="writer.display_name" :value="writer.display_name" v-on:click="filter('writer', writer.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===writer.display_name && obj.category==='writer').length > 0"/> {{writer.display_name}} <span class="count">({{writer.count}})</span>
						</label>
						</div>
						<input type="checkbox" id="show-all-writers" class="show-checkbox" v-model="writersCheckbox">
						<label class="show-all dotted-underline" for="show-all-writers" v-if="facets.writers.length > 10 && !searchWriters"> writers</label>
					</div>
				</fieldset>
				<fieldset v-if="facets.addressees && facets.addressees.length > 0">
					<legend>Addressee</legend>
					<input type="checkbox" id="addressee-toggle" class="toggle-checkbox" />
					<label for="addressee-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
					<div class="toggle-section">
						<input v-if="facets.addressees.length > 5" type="text" aria-label="Search addressee" placeholder="Search addressee" onfocus="this.placeholder=''" v-on:click="addresseesCheckbox = true" v-model="searchAddressees" onblur="this.placeholder='Search addressee'" name=""/>
						<div class="facets">
						<label v-for="(addressee, index) in filteredData(facets.addressees, searchAddressees, 'alphabetical', addresseesCheckbox)" v-bind:key="index" class="facet">
							<input type="checkbox" name="addressee" :value="addressee.display_name" v-bind:aria-label="addressee.display_name" v-on:click="filter('addressee', addressee.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===addressee.display_name && obj.category==='addressee').length > 0"/> {{addressee.display_name}} <span class="count">({{addressee.count}})</span>
						</label>
						</div>
						<input type="checkbox" id="show-all-addressees" class="show-checkbox" v-model="addresseesCheckbox">
						<label class="show-all dotted-underline" for="show-all-addressees" v-if="facets.addressees.length > 10 && !searchAddressees"> addressees</label>
					</div>
				</fieldset>
				<fieldset v-if="facets.languages && facets.languages.length > 0">
					<legend>Language</legend>
					<input type="checkbox" id="language-toggle" class="toggle-checkbox" />
					<label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
					<div class="toggle-section">
						<input v-if="facets.languages.length > 5" type="text" aria-label="Search language" placeholder="Search language" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language'" name=""/>
						<div class="facets">
						<label v-for="(language, index) in filteredData(facets.languages, searchLanguages, 'count', languagesCheckbox)" v-bind:key="index" class="facet">
							<input type="checkbox" name="language" :value="language.display_name" v-bind:aria-label="language.display_name" v-on:click="filter('language', language.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===language.display_name && obj.category==='language').length > 0"/> {{language.display_name}} <span class="count">({{language.count}})</span>
						</label>
						</div>
						<input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
						<label class="show-all dotted-underline" for="show-all-languages" v-if="facets.languages.length > 5 && !searchLanguages"> languages</label>
					</div>
				</fieldset>
				<label v-if="facets.with_transcriptions">
					<input type="checkbox" name="with_transcriptions" value="Records with transcriptions" aria-label="Records with transcriptions" v-on:click="filter('with_transcriptions', 'Records with transcriptions')" :checked="selectedFacets.filter(obj => obj.display_name==='Records with transcriptions' && obj.category==='with_transcriptions').length > 0"/>Show only records with transcriptions
				</label>
			</div>
			<div>
				<fieldset v-if="selectedFacets.length > 0" class="selected-facets">
					<legend hidden>Selected filters</legend>
					<label v-for="(selectedFacet, index) in selectedFacets" v-bind:key="index" class="facet">
						<input type="checkbox" v-bind:name="selectedFacet.category" :value="selectedFacet.display_name" v-bind:aria-label="selectedFacet.display_name" v-on:click="filter(selectedFacet.category, selectedFacet.display_name)" checked/> 
						<template v-if="selectedFacet.category == 'creation_year'">Creation year: </template>
						{{selectedFacet.display_name}}
					</label>
					<button class="button-link clear dotted-underline"  v-on:click="clearFacets">Clear all filters</button>
				</fieldset>
				<div class="index">
					<button v-for="(letter, i) in letterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': activeLetter == letter.name}, {'missing': letter.missing}]" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
				</div>
				<div class="list grey-column">
					<div class="list-header">
						<h2 v-if="activeLetter == 'All'">All archival records ({{getTotalArchives}})</h2>
						<h2 v-else>{{activeLetter}} ({{getTotalArchives}})</h2>
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
					<!-- TODO change to loading more records -->
					<div v-if="loadingMoreRecords" class="loader"></div>
					<template v-else>
						<button type="button" v-if="getArchivalRecords.length != 0 && getArchivalRecords.length < getTotalArchives" class="button-default large" v-on:click="moreRecords(pageNum)">
							Show more archival records
						</button>
					</template>
				</div>
			</div>
		</div>
		<div v-show="loadingRecords" class="loader"></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default {
	name: 'ArchiveList',
	computed: mapGetters(['getArchivalRecords', 'facets', 'getTotalArchives']),
	data: function() {
		return {
			loadingRecords: true,
      		loadingMoreRecords: false,
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
			minCreationRange: null,
			maxCreationRange: null,
			creationSlider: {
				startMin: 0,
				startMax: 0,
				min: 0,
				max: 0,
				step: 1
			},
			addresseesCheckbox: false,
			languagesCheckbox: false,
			recordTypeCheckbox: false,
			writersCheckbox: false,
			selectedFacets: [],
			searchAddressees: '',
			searchRecordTypes: '',
			searchWriters: '',
			searchLanguages: '',
			activeLetter: 'All',
			pageNum: 1
		}
	},
	methods: {
		initYearRange() {
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
		},
		updateCreationSlider(min, max) {
			this.$refs.creationSlider.noUiSlider.set([min, max]);
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
			const setQuery = this.$route.query;
			setQuery['letter'] = letter;
			this.activeLetter = letter;

			this.$router.replace({ query: {} });
			this.$router.push({query: setQuery});
			
			await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter});
		},
		async clearFacets() {
			this.selectedFacets = [];
			this.updateCreationSlider(this.creationSlider.min, this.creationSlider.max);
			this.$router.replace({ query: {} });
			this.$router.push({query: {page: this.pageNum}});
			this.activeLetter = 'All'

			await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': [], 'letter': this.activeLetter});
		},
		async filter(facet, option) {
			const setQuery = this.$route.query;
			if (this.selectedFacets.filter(obj => obj.display_name===option && obj.category===facet).length > 0) {
				if (facet == 'creation_year') {
					this.updateCreationSlider(this.creationSlider.min, this.creationSlider.max);
				}
				this.selectedFacets = this.selectedFacets.filter(object => !(object.category === facet && object.display_name === option));
				if (!Array.isArray(setQuery[facet])) {
					delete setQuery[facet];
				}
				else {
					setQuery[facet].splice(setQuery[facet].indexOf(option),1);
				}
			} else {
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

			await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter}); 
		},
		updateCreationSlider(min, max) {
			this.$refs.creationSlider.noUiSlider.set([min, max]);
		},
		toggleFilters() {
			const filters = document.querySelector('.filters');
			filters.classList.toggle('active');
		},
		removeFacet(facetIndex) {
			this.selectedFacets.splice(facetIndex,1);
		},
		async moreRecords(n) {
			this.loadingMoreRecords = true;

			this.pageNum = n + 1;
			this.$router.push({query: {page: this.pageNum}});
			await this.loadMoreArchivalRecords();

			this.loadingMoreRecords = false;
		},
		...mapActions(['fetchArchivalRecords','loadMoreArchivalRecords'])
	},
	async created() {
		const setQuery = this.$route.query;
		for (var key in setQuery) {
			switch (key){
				case 'letter':
					this.activeLetter = setQuery[key];
					break;
				case 'page':
					break;
				default:
					if (Array.isArray(setQuery[key])) {
						for (var i in setQuery[key]) {
						this.selectedFacets.push({'category': key, 'display_name': setQuery[key][i]});
						}
					} else {
						this.selectedFacets.push({'category': key, 'display_name': setQuery[key]});
					}
			}
		}

		setQuery['page'] = this.pageNum;
		this.$router.replace({ query: {} });
		this.$router.push({query: setQuery});

		await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter});

		this.creationSlider.startMin = this.facets.creation_years.min;
		this.creationSlider.startMax = this.facets.creation_years.max;
		this.creationSlider.min = this.facets.creation_years.min_default;
		this.creationSlider.max = this.facets.creation_years.max_default;

		this.initYearRange();

		this.loadingRecords = false;
	},
	mounted() {
		
	}
}
</script>