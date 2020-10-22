<template>
	<div class="archival-list">
		<div class="two-column-20-80">
			<div class="filters">
				<button class="display-mobile filter-button" v-on:click="toggleFilters" aria-label="filter objects">Hide filters</button>
				<div>
				<form action=".">
					<fieldset class="range">
					<legend>Creation year</legend>
					<span hidden>Creation year range</span>
					<!-- change min and max to min and max creation years from the database [date of creation] -->
					<div id="creation-year-slider" ref="creationSlider"></div>
					<br>
					<input type="number" name="creation_start_year" aria-label="creation year start" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="minCreationRange" v-on:change="updateCreationSlider()" />
					-
					<input type="number" name="creation_end_year" aria-label="creation year end" class="range-year" :min="creationSlider.min" :max="creationSlider.max" v-model="maxCreationRange" v-on:change="updateCreationSlider()" />
					<input type="submit" class="default" value="Filter" disabled/>
					</fieldset>
				</form>
				<fieldset>
					<legend>Play <span class="count">({{facets.plays.length}})</span></legend>
					<input type="text" aria-label="Search plays" placeholder="Search plays" onfocus="this.placeholder=''" v-on:click="playsCheckbox = true" v-model="searchPlays" onblur="this.placeholder='Search plays'" name=""/>
					<div class="facets" v-bind:class="{active: playsCheckbox}">
					<label v-for="(play, index) in filteredData(facets.plays, searchPlays)" v-bind:key="index" class="facet">
						<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
							<input type="checkbox" v-bind:name="play.display_name" v-bind:aria-label="play.display_name" :value="play" v-model="selectedFilters"/> {{play.display_name | capitalize}} <span class="count">({{play.count}})</span>
						<!-- </router-link> -->
					</label>
					</div>
					<input type="checkbox" id="show-all-plays" class="show-checkbox" v-model="playsCheckbox">
					<label class="show-all" for="show-all-plays" v-if="facets.plays.length > 5 && !searchPlays"> plays</label>
				</fieldset>
				<!-- TODO: add Show more -->
				<fieldset>
					<legend>Shakespeare connection</legend>
					<div class="facets">
					<label v-for="(connection, index) in sortedData(facets.connection_a)" v-bind:key="index" class="facet">
						<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
						<input type="checkbox" v-bind:name="connection.display_name" v-bind:aria-label="connection.display_name" :value="connection" v-model="selectedFilters"/> {{connection.display_name | capitalize}} <span class="count">({{connection.count}})</span>
						<!-- </router-link> -->
					</label>
					</div>
				</fieldset>
				<fieldset class="filter-collapse">
					<legend>Relation to objects <span class="count">({{facets.connection_b.length}})</span></legend>
					<input v-if="facets.connection_b.length > 5" type="text" aria-label="Search relation" placeholder="Search relation" onfocus="this.placeholder=''" v-on:click="relationsCheckbox = true" v-model="searchRelations" onblur="this.placeholder='Search relation'" name=""/>
					<div class="facets" v-bind:class="{active: relationsCheckbox}">
					<label v-for="(relation, index) in filteredData(facets.connection_b, searchRelations)" v-bind:key="index" class="facet">
						<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
						<input type="checkbox" v-bind:name="relation.display_name" v-bind:aria-label="relation.display_name" :value="relation" v-model="selectedFilters"/> {{relation.display_name | capitalize}} <span class="count">({{relation.count}})</span>
						<!-- </router-link> -->
					</label>
					</div>
					<input type="checkbox" id="show-all-relations" class="show-checkbox" v-model="relationsCheckbox">
					<label class="show-all" for="show-all-relations" v-if="facets.connection_b.length > 5 && !searchRelations"> relations</label>
				</fieldset>
				<form action=".">
					<fieldset class="range">
					<legend>Acquisition year</legend>
					<span hidden>Acquisition year range</span>
					<!-- change min and max to min and max creation years from the database [date of creation] -->
					<div id="acquisition-year-slider" ref="acquisitionSlider"></div>
					<br>
					<input type="number" name="acquisition_start_year" aria-label="acquisition year start" class="range-year" :min="acquisitionSlider.min" :max="acquisitionSlider.max" v-model="minAcquisitionRange" v-on:change="updateAcquisitionSlider()" />
					-
					<input type="number" name="acquisition_end_year" aria-label="acquisition year end" class="range-year" :min="acquisitionSlider.min" :max="acquisitionSlider.max" v-model="maxAcquisitionRange" v-on:change="updateAcquisitionSlider()" />
					<input type="submit" class="default" value="Filter" disabled/>
					</fieldset>
				</form>
				<fieldset class="filter-collapse">
					<!-- acquirers only -->
					<legend>Acquirer <span class="count">({{facets.related_acquirers.length}})</span></legend>
					<input v-if="facets.related_acquirers.length > 5" type="text" aria-label="Search acquirers" placeholder="Search acquirers" onfocus="this.placeholder=''" v-on:click="relatedAcquirersCheckbox = true" v-model="searchRelatedAcquirers" onblur="this.placeholder='Search acquirers'" name=""/>
					<div class="facets" v-bind:class="{active: relatedAcquirersCheckbox}">
					<label v-for="(related_acquirer, index) in filteredData(facets.related_acquirers, searchRelatedAcquirers)" v-bind:key="index" class="facet">
						<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
						<input type="checkbox" v-bind:name="related_acquirer.display_name" v-bind:aria-label="related_acquirer.display_name" :value="related_acquirer" v-model="selectedFilters"/> {{related_acquirer.display_name | capitalize}} <span class="count">({{related_acquirer.count}})</span>
						<!-- </router-link> -->
					</label>
					</div>
					<input type="checkbox" id="show-all-related-acquirers" class="show-checkbox" v-model="relatedAcquirersCheckbox">
					<label class="show-all" for="show-all-related-acquirers" v-if="facets.related_acquirers.length > 5 && !searchRelatedAcquirers"> acquirers</label>
				</fieldset>
				<fieldset>
					<legend>Category <span class="count">({{facets.category.length}})</span></legend>
					<input v-if="facets.category.length > 5" type="text" aria-label="Search category" placeholder="Search category" onfocus="this.placeholder=''" v-on:click="categoriesCheckbox = true" v-model="searchCategories" onblur="this.placeholder='Search category'" name=""/>
					<div class="facets" v-bind:class="{active: categoriesCheckbox}">
					<label v-for="(category, index) in filteredData(facets.category, searchCategories)" v-bind:key="index" class="facet">
						<!-- <router-link :to="{name: 'objects'}" class="checkbox-anchor"> -->
						<input type="checkbox" v-bind:name="category.display_name" :value="category" v-bind:aria-label="category.display_name" v-model="selectedFilters"/> {{category.display_name | capitalize}} <span class="count">({{category.count}})</span>
						<!-- </router-link> -->
					</label>
					</div>
					<input type="checkbox" id="show-all-categories" class="show-checkbox" v-model="categoriesCheckbox">
					<label class="show-all" for="show-all-categories" v-if="facets.category.length > 5 && !searchCategories"> categories</label>
				</fieldset>
				</div>
			</div>
			<div>
				<!-- TODO: selected filters -->
				<div class="index">
					<button v-for="(letter, i) in letterIndex" v-bind:key="i" v-bind:class="['button-link', {'active': active == letter.name}, {'missing': letter.missing}]">{{letter.name}}</button>
				</div>
				<div class="list grey-column">
					<div class="list-header">
						<h2 v-if="active == this.letterIndex[0].name">All archival records ({{count}})</h2>
						<h2 v-else></h2>
						<span>Level</span>
						<span>Writer</span>
						<span>Creation dates</span>
					</div>
					<div v-if="getArchivalRecords.length == 0" class="loader"></div>
					<div v-for="(item, i) in getArchivalRecords" v-bind:key="i" class="list-row">
						<span>
							<router-link :to="'/archival-records/'+(item.id)" :aria-label="'document from '+(item.metadata[1].content)">{{item.title}}</router-link>
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
				plays: [
				{id: 0, display_name: "Hamlet", count: 239},
				{id: 1, display_name: "Macbeth", count: 173},
				{id: 2, display_name: "Henry VIII", count: 171},
				{id: 3, display_name: "Richard II", count: 78},
				{id: 4, display_name: "The Tempest", count: 43},
				{id: 5, display_name: "Romeo and Juliet", count: 30},
				{id: 6, display_name: "Henry V", count: 96},
				{id: 7, display_name: "The Winter's Tale", count: 73},
				{id: 8, display_name: "The Merry Wives of Windsor", count: 30},
				{id: 9, display_name: "Richard III", count: 150},
				],
				connection_a: [
				{id: 0, display_name: "Works", count: 143},
				{id: 1, display_name: "Individual", count: 78}
				],
				connection_b: [
				{id: 0, display_name: "Performance", count: 40},
				{id: 1, display_name: "Character", count: 21},
				{id: 2, display_name: "Portrait", count: 64},
				{id: 3, display_name: "Actor", count: 90},
				],
				related_acquirers: [
				{id: 0, display_name: "Queen Victoria (1819-1901), Queen of Great Britain and Ireland", count: 1},
				{id: 1, display_name: "Queen Victoria (1819-1901)", count: 8},
				{id: 2, display_name: "Prince Albert (1819-61)", count: 1},
				{id: 3, display_name: "Queen Mary (1867-1953)", count: 5},
				{id: 4, display_name: "Prince Edward, Prince of Wales (1841-1910)", count: 1},
				{id: 5, display_name: "Prince George, Prince of Wales (1762-1830)", count: 6},
				{id: 6, display_name: "George IV (1762-1830)", count: 4},
				{id: 6, display_name: "George III (1738-1820)", count: 6},
				{id: 7, display_name: "King Edward VII (1841-1910)", count: 1},
				{id: 8, display_name: "Elizabeth II (1926-)", count: 1},
				{id: 9, display_name: "Queen Charlotte (1744-1818)", count: 53},
				{id: 10, display_name: "George, Prince Regent (1762-1830)", count: 2},
				{id: 11, display_name: "George, Prince of Wales (1762-1830)", count: 3}
				],
				category: [
				{id: 0, display_name: "Accounts", count: 6},
				{id: 1, display_name: "Album", count: 4},
				{id: 2, display_name: "Banknote", count: 1},
				{id: 3, display_name: "Book", count: 416},
				{id: 4, display_name: "Book of prints", count: 3},
				{id: 5, display_name: "Box of books", count: 6},
				{id: 6, display_name: "CD", count: 1},
				{id: 7, display_name: "Coin", count: 4},
				{id: 8, display_name: "Decorative arts", count: 23},
				{id: 9, display_name: "Drawing", count: 44},
				{id: 10, display_name: "Letter", count: 40},
				{id: 11, display_name: "Medals", count: 4},
				{id: 12, display_name: "Miniature", count: 1},
				{id: 13, display_name: "Miniature book", count: 41},
				{id: 14, display_name: "Painting", count: 59},
				{id: 15, display_name: "Photo montage", count: 1},
				{id: 16, display_name: "Photograph", count: 119},
				{id: 17, display_name: "Photograph album", count: 1},
				{id: 18, display_name: "Photograph album (page)", count: 1},
				{id: 19, display_name: "Photographic negative", count: 13},
				{id: 20, display_name: "Postcard", count: 1},
				{id: 21, display_name: "Print", count: 596},
				{id: 22, display_name: "Print series", count: 1},
				{id: 23, display_name: "slides (photographs)", count: 1},
				{id: 24, display_name: "Tapestry", count: 1},
				{id: 25, display_name: "Works of art", count: 2},
				]
			},
			minCreationRange: null,
			maxCreationRange: null,
			creationSlider: {
				startMin: 1700,
				startMax: 1900,
				min: 1600,
				max: 2020,
				// start: 40,
				step: 1
			},
			minAcquisitionRange: null,
			maxAcquisitionRange: null,
			acquisitionSlider: {
				startMin: 1800,
				startMax: 2000,
				min: 1700,
				max: 2020,
				step: 1
			},
			playsCheckbox: false,
			categoriesCheckbox: false,
			relationsCheckbox: false,
			relatedAcquirersCheckbox: false,
			selectedFilters: [],
			searchPlays: '',
			searchCategories: '',
			searchRelations: '',
			searchRelatedAcquirers: '',
			loading: false,
			active: ''
		}
	},
	methods: {
		filteredData (list, query) {
			query = query.toLowerCase();
			var filteredList = list.slice().filter(function (item) {
				var name = item.display_name.toLowerCase();
				return name.match(query);
			})
			return filteredList.sort((a, b) => a.count < b.count);
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
			sortAscDesc(sortBy) {
			// true = A-Z/0-9, false = Z-A/9-0
			this.sortAscDescVal = !this.sortAscDescVal;
			// return list.slice().sort((a, b) => b.count < a.count);
			},
			updateCreationSlider() {
			this.$refs.creationSlider.noUiSlider.set([this.minCreationRange, this.maxCreationRange]);
			},
			updateAcquisitionSlider() {
			this.$refs.acquisitionSlider.noUiSlider.set([this.minAcquisitionRange, this.maxAcquisitionRange]);
			},
			toggleFilters() {
			const filters = document.querySelector('.filters');
			filters.classList.toggle('active');
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

		noUiSlider.create(this.$refs.acquisitionSlider, {
			start: [this.acquisitionSlider.startMin, this.acquisitionSlider.startMax],
			step: this.acquisitionSlider.step,
			range: {
				'min': this.acquisitionSlider.min,
				'max': this.acquisitionSlider.max
			}
		}); 
				
		this.$refs.acquisitionSlider.noUiSlider.on('update',(values, handle) => {
			this[handle ? 'maxAcquisitionRange' : 'minAcquisitionRange'] = parseInt(values[handle]);
		});
	}
}
</script>