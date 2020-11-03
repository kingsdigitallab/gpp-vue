<template>
  <div class="home-top">
		<div class="container">
			<h1>Explore the Georgian era, 1714-1837</h1>
			<div class="home-stats">
				<div :key="index" v-for="(stat, index) in stats" class="home-stats-group">
					<p class="home-stats-num">{{stat.num}}</p>
					<p>{{stat.text}}</p>
					<span v-if="stat.year" class="home__stats-year">{{stat.year}}</span>
				</div>
			</div>
			<div class="home-search">
				<form class="search-field">
					<input type="search" v-model="searchQuery" name="search" aria-label="Search" placeholder="e.g., menu book for George IV, identities of Maria van Antwerpen" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., menu book for George IV, identities of Maria van Antwerpen'"/>
					<input type="submit" class="search-button" @click.stop.prevent="submit()" aria-label="Search button" value=""/>
				</form>
				<button v-on:click="showModal" class="button-link dotted-underline">Advanced search</button>
			</div>
		</div>
		<advancedSearchModal v-show="advancedSearchShow" @close="closeModal"/>
  </div>
</template>

<script>

import AdvancedSearchModal from '../AdvancedSearchModal.vue';

export default {
	name: 'HomeTop',
	components: {AdvancedSearchModal},
	data: function() {
		return {

			stats: [
				{
					num: 123,
					text: 'years of history'
				},
				{
					num: '2,994',
					text: 'archival records'
				},
				{
					num: '1,743',
					text: 'people & corporate bodies'
				},
				{
					num: '125,558',
					text: 'images of manuscripts'
				}
			],
			updated: 'Last updated 30 Oct 2019',
			articleTitle: '',
			articleParagraphs: [
				'',
				''
			],
			searchQuery: null,
			advancedSearchShow: false,
		}
	},
	methods: {
		showModal() {
			this.advancedSearchShow = true;
		},
		closeModal() {
			this.advancedSearchShow = false;
		},
		submit(){
			this.$router.push("/search?q="+this.searchQuery);
		}
	},
	mounted() {
	}
}
</script>
