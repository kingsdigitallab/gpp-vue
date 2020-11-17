<template>
	<div class="archival-list">
		<div class="two-column-20-80" v-show="!loadingRecords">
			<div class="filters">
				<button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
				<fieldset class="range" v-if="getArchivalFacets.creation_years && getArchivalFacets.creation_years.min_default > 0 && getArchivalFacets.creation_years.max_default > 0">
					<legend>Creation year</legend>
					<div id="creation-year-slider" ref="creationSlider"></div>
					<br>
					<input type="number" name="creation_start_year" aria-label="creation year start" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="minCreationRange" v-on:change="updateCreationSlider(minCreationRange, maxCreationRange)" />
					-
					<input type="number" name="creation_end_year" aria-label="creation year end" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="maxCreationRange" v-on:change="updateCreationSlider(minCreationRange, maxCreationRange)" />
					<button type="button" class="button-outline" v-on:click="filter('creation_years', minCreationRange + '-' + maxCreationRange)">Filter</button>
				</fieldset>
				<fieldset v-if="getArchivalFacets.levels && getArchivalFacets.levels.length > 0">
					<legend>Document level</legend>
					<input type="checkbox" id="document-level-toggle" class="toggle-checkbox" checked />
					<label for="document-level-toggle" class="toggle-label"><span hidden>Expand/collapse document level</span></label>
					<div class="toggle-section">
						<div class="facets">
							<label v-for="(level, index) in getArchivalFacets.levels" v-bind:key="index" class="facet">
								<input type="checkbox" name="level" v-bind:aria-label="level.display_name" :value="level.display_name" v-on:click="filter('level', level.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===level.display_name && obj.category==='level').length > 0"/> {{level.display_name}} <span class="count">({{level.count}})</span>
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset v-if="getArchivalFacets.recordTypes && getArchivalFacets.recordTypes.length > 0">
					<legend>Record type</legend>
					<input type="checkbox" id="record-type-toggle" class="toggle-checkbox" />
					<label for="record-type-toggle" class="toggle-label"><span hidden>Expand/collapse record type</span></label>
					<div class="toggle-section">
						<input v-if="getArchivalFacets.recordTypes.length > 5" type="text" aria-label="Search record type" placeholder="Search record type" onfocus="this.placeholder=''" v-on:click="recordTypeCheckbox = true" v-model="searchRecordTypes" onblur="this.placeholder='Search record type'" name=""/>
						<div class="facets">
							<label v-for="(type, index) in filteredData(getArchivalFacets.recordTypes, searchRecordTypes, 'count', recordTypeCheckbox)" v-bind:key="index" class="facet">
								<input type="checkbox" name="type" v-bind:aria-label="type.display_name" :value="type.display_name" v-on:click="filter('record_type', type.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===type.display_name && obj.category==='record_type').length > 0"/> {{type.display_name}} <span class="count">({{type.count}})</span>
							</label>
						</div>
						<input type="checkbox" id="show-all-record-types" class="show-checkbox" v-model="recordTypeCheckbox">
						<label class="show-all dotted-underline" for="show-all-record-types" v-if="getArchivalFacets.recordTypes.length > 5 && !searchRecordTypes"> record types</label>
					</div>
				</fieldset>
				<fieldset v-if="getArchivalFacets.writers && getArchivalFacets.writers.length > 0">
					<legend>Writer</legend>
					<input type="checkbox" id="writer-toggle" class="toggle-checkbox" />
					<label for="writer-toggle" class="toggle-label"><span hidden>Expand/collapse writer</span></label>
					<div class="toggle-section">
						<input v-if="getArchivalFacets.writers.length > 5" type="text" aria-label="Search writer" placeholder="Search writer" onfocus="this.placeholder=''" v-on:click="writersCheckbox = true" v-model="searchWriters" onblur="this.placeholder='Search writer'" name=""/>
						<div class="facets">
						<label v-for="(writer, index) in filteredData(getArchivalFacets.writers, searchWriters, 'alphabetical', writersCheckbox)" v-bind:key="index" class="facet">
							<input type="checkbox" name="writer" v-bind:aria-label="writer.display_name" :value="writer.display_name" v-on:click="filter('writer', writer.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===writer.display_name && obj.category==='writer').length > 0"/> {{writer.display_name}} <span class="count">({{writer.count}})</span>
						</label>
						</div>
						<input type="checkbox" id="show-all-writers" class="show-checkbox" v-model="writersCheckbox">
						<label class="show-all dotted-underline" for="show-all-writers" v-if="getArchivalFacets.writers.length > 10 && !searchWriters"> writers</label>
					</div>
				</fieldset>
				<fieldset v-if="getArchivalFacets.addressees && getArchivalFacets.addressees.length > 0">
					<legend>Addressee</legend>
					<input type="checkbox" id="addressee-toggle" class="toggle-checkbox" />
					<label for="addressee-toggle" class="toggle-label"><span hidden>Expand/collapse addressee</span></label>
					<div class="toggle-section">
						<input v-if="getArchivalFacets.addressees.length > 5" type="text" aria-label="Search addressee" placeholder="Search addressee" onfocus="this.placeholder=''" v-on:click="addresseesCheckbox = true" v-model="searchAddressees" onblur="this.placeholder='Search addressee'" name=""/>
						<div class="facets">
						<label v-for="(addressee, index) in filteredData(getArchivalFacets.addressees, searchAddressees, 'alphabetical', addresseesCheckbox)" v-bind:key="index" class="facet">
							<input type="checkbox" name="addressee" :value="addressee.display_name" v-bind:aria-label="addressee.display_name" v-on:click="filter('addressee', addressee.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===addressee.display_name && obj.category==='addressee').length > 0"/> {{addressee.display_name}} <span class="count">({{addressee.count}})</span>
						</label>
						</div>
						<input type="checkbox" id="show-all-addressees" class="show-checkbox" v-model="addresseesCheckbox">
						<label class="show-all dotted-underline" for="show-all-addressees" v-if="getArchivalFacets.addressees.length > 10 && !searchAddressees"> addressees</label>
					</div>
				</fieldset>
				<fieldset v-if="getArchivalFacets.languages && getArchivalFacets.languages.length > 0">
					<legend>Language</legend>
					<input type="checkbox" id="language-toggle" class="toggle-checkbox" />
					<label for="language-toggle" class="toggle-label"><span hidden>Expand/collapse language</span></label>
					<div class="toggle-section">
						<input v-if="getArchivalFacets.languages.length > 5" type="text" aria-label="Search language" placeholder="Search language" onfocus="this.placeholder=''" v-on:click="languagesCheckbox = true" v-model="searchLanguages" onblur="this.placeholder='Search language'" name=""/>
						<div class="facets">
						<label v-for="(language, index) in filteredData(getArchivalFacets.languages, searchLanguages, 'count', languagesCheckbox)" v-bind:key="index" class="facet">
							<input type="checkbox" name="language" :value="language.display_name" v-bind:aria-label="language.display_name" v-on:click="filter('language', language.display_name)" :checked="selectedFacets.filter(obj => obj.display_name===language.display_name && obj.category==='language').length > 0"/> {{language.display_name}} <span class="count">({{language.count}})</span>
						</label>
						</div>
						<input type="checkbox" id="show-all-languages" class="show-checkbox" v-model="languagesCheckbox">
						<label class="show-all dotted-underline" for="show-all-languages" v-if="getArchivalFacets.languages.length > 5 && !searchLanguages"> languages</label>
					</div>
				</fieldset>
				<label v-if="getArchivalFacets.with_transcriptions">
                    <input type="checkbox" name="facets.with_transcriptions" value="Show only records with transcriptions" aria-label="Show only records with transcriptions" v-on:click="filter('with_transcriptions', 1)" :checked="selectedFacets.filter(obj => obj.category==='with_transcriptions').length > 0"/>{{getArchivalFacets.with_transcriptions.display_name}} <span class="count">({{getArchivalFacets.with_transcriptions.count}})</span>
                </label>
			</div>
			<div>
				<fieldset v-if="selectedFacets.length > 0" class="selected-facets">
					<legend hidden>Selected filters</legend>
					<label v-for="(selectedFacet, index) in selectedFacets" v-bind:key="index" class="facet">
                        <template v-if="selectedFacet.category == 'with_transcriptions'">
                            <input type="checkbox" v-bind:name="selectedFacet.category" value="Show only records with transcriptions" aria-label="Show only records with transcriptions" v-on:click="filter(selectedFacet.category, selectedFacet.display_name)" checked/> Show only records with transcriptions
                        </template>
						<template v-else>
							<input type="checkbox" v-bind:name="selectedFacet.category" :value="selectedFacet.display_name" v-bind:aria-label="selectedFacet.display_name" v-on:click="filter(selectedFacet.category, selectedFacet.display_name)" checked/>
							<template v-if="selectedFacet.category == 'creation_years'">Creation year: </template>
							{{selectedFacet.display_name}}
						</template>
					</label>
					<button class="button-link clear dotted-underline"  v-on:click="clearFacets">Clear all filters</button>
				</fieldset>
				<div class="index">
					<button v-bind:class="['button-link', {'active': activeLetter == ''}]" v-on:click="filterByLetter('')">All</button>
					<button v-for="(letter, i) in getArchivalLetterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': activeLetter == letter.name}, {'missing': letter.missing}]" v-on:click="filterByLetter(letter.name)">{{letter.name}}</button>
				</div>
				<div class="list grey-column">
					<div class="list-header">
						<h2 v-if="activeLetter == ''">All archival records ({{getTotalArchives}})</h2>
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
						<!-- TODO: normalise metadata -> item.archival_level -->
						<span>{{item.metadata[1].content}}</span>
						<!-- TODO: change creators to writers -->
						<!-- TODO: change item.writers.length > 0 -->
						<span v-show="item.creators != null" v-for="(creator, i) in item.creators" v-bind:key="i" class="list-data">
							{{creator.display_name}}
						</span>
						<span v-show="item.creators == null">--</span>
						<!-- TODO: change from == null to != '' -->
						<span v-show="item.creation_dates != null">{{item.creation_dates}}</span>
						<span v-show="item.creation_dates == null">--</span>
					</div>
					<div v-if="loadingMoreRecords" class="loader"></div>
					<template v-else>
						<button type="button" v-if="getArchivalRecords.length != 0 && getArchivalRecords.length < getTotalArchives" class="button-default large" v-on:click="moreRecords()">
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
	computed: mapGetters(['getArchivalRecords', 'getArchivalFacets', 'getTotalArchives', 'getArchivalLetterIndex']),
	data: function() {
		return {
			loadingRecords: true,
			loadingMoreRecords: false,
			minCreationRange: 0,
			maxCreationRange: 0,
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
			activeLetter: '',
			pageNum: 1
		}
	},
	methods: {
		initYearRange(min, max) {
			// init min and max year range toggles if they have not been updated based on the URL params
			if (this.minCreationRange == 0) {
				this.minCreationRange = min;
			} 
			if (this.maxCreationRange == 0){
				this.maxCreationRange = max;
			}

			this.creationSlider.startMin = this.minCreationRange;
			this.creationSlider.startMax = this.maxCreationRange;
			this.creationSlider.min = min;
			this.creationSlider.max = max;

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
			
			await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter});
		},
		async clearFacets() {
			this.selectedFacets = [];
            this.updateCreationSlider(this.creationSlider.min, this.creationSlider.max);
            this.pageNum = 1;
			this.$router.replace({ query: {} });
			this.activeLetter = '';

			await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': [], 'letter': this.activeLetter});
		},
		async filter(facet, option) {
			const setQuery = this.$route.query;
            this.pageNum = 1;
			setQuery['page'] = this.pageNum;
			
			if (this.selectedFacets.filter(obj => obj.display_name===option && obj.category===facet).length > 0) {
				if (facet == 'creation_years') {
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
				if (facet == 'creation_years') {
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

			await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter}); 
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

			await this.loadMoreArchivalRecords();

			this.loadingMoreRecords = false;
		},
		...mapActions(['fetchArchivalRecords','loadMoreArchivalRecords'])
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
					this.pageNum = setQuery[key];
					break;
				default:
					if (setQuery[key] == 'creation_years') {
						this.minCreationRange = setQuery[key].split('-')[0];
						this.maxCreationRange = setQuery[key].split('-')[1];
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

		// get archival records
		await this.fetchArchivalRecords({'pages': this.pageNum, 'selectedFacets': JSON.parse(JSON.stringify(this.selectedFacets)), 'letter': this.activeLetter});


		// set up the year range filter if creation years is sent in response
		if (this.getArchivalFacets.creation_years && this.getArchivalFacets.creation_years.min_default > 0 && this.getArchivalFacets.creation_years.max_default > 0) {
			this.initYearRange(this.getArchivalFacets.creation_years.min_default, this.getArchivalFacets.creation_years.max_default);
		}

		this.loadingRecords = false;
	}
}
</script>