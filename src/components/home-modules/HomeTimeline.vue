<template>
	<div class="home-timeline">
		<div class="container">
			<div v-for="(group, i) in timelineGroup" v-bind:key="i" class="timeline-group">
				<h2><router-link :to="{name:'timeline', params: {id: group.id}}">{{group.title}} <span class="arrow"></span></router-link></h2>
				<p>{{group.description}}</p>
				<div class="featured-collections-series">
					<router-link :to="{name: 'archival-record', params: {id: collection.id}}" class="link-button-default small" v-for="(collection, i) in group.collections" v-bind:key="i">{{collection.title}}</router-link>
				</div>
				<div class="featured-files-items" v-if="group.featuredRecords.length">
					<h3>Featured files and items</h3>
					<carousel-template v-bind:featuredRecords="group.featuredRecords"></carousel-template>
					<!-- <template v-if="group.featuredRecords.length > 1">
						<button class="slider-arrow prev" aria-label="previous slide" @click="showPrev">&#xf104;</button>
						<button class="slider-arrow next" aria-label="next slide" @click="showNext">&#xf105;</button>
					</template> -->
				</div>
				<div class="featured-people-corporate-bodies">
					<router-link :to="{name: 'person-and-corporate-body', params: {id: entity.id}}" class="link-button-grey small" v-for="(entity, i) in group.entities" v-bind:key="i"><span class="dotted-underline">{{entity.title}}</span></router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CarouselTemplate from '../templates/CarouselTemplate.vue';

export default {
	name: 'HomeTimeline',
	components: {CarouselTemplate},
	data: function() {
		return {
			timelineGroup: [
				{
					id: 1,
					title: 'Early Georgians',
					description: 'Collections related to George I, George II and their families',
					collections: [
						{id: 11, title: 'George II [collection]'},
						{id: 12, title: 'George II financial records'},
						{id: 13, title: 'Manuscript of “Memoirs of the Reign” of George II'},
						{id: 14, title: 'Papers of Caroline, Queen Consort to George II'},
						{id: 15, title: 'Additional papers concerning George I, George II, and others 2'},
					],
					featuredRecords: [],
					entities: [
						{id: 11, title: 'George I, King'},
						{id: 12, title: 'George II, King'},
						{id: 13, title: 'Caroline, Queen Consort to George II (1683-1737)'},
						{id: 14, title: 'Frederick, Prince of Wales'},
					],
				},
				{
					id: 2,
					title: 'George III, Queen Charlotte and their family',
					description: 'Introductions to published collections of George III, his Queen consort and their children',
					collections: [
						{id: 21, title: 'George III Essays'},
						{id: 22, title: 'Diaries, essays and notes of Queen Charlotte'},
						{id: 23, title: 'Papers of Charlotte, Queen Consort to George III'},
						{id: 24, title: 'Additional papers relating to George III and Queen Charlotte'},
						{id: 25, title: 'Letters from and concerning Princess Augusta Sophia'},
					],
					featuredRecords: [
						{
							id: 21, 
							src: require("@/assets/images/record-placeholder.png"), 
							date: '7 January 1766', 
							title: 'Letter from George III to Sir Joseph Yorke on the possibility of the Hereditary Prince of Brunswick [Charles William Ferdinand, Duke of Brunswick-Wolfenbüttel] being put into the service of the Prince of Orange [William V]', 
							collection: {id: 211, title: 'Collection'}
						},
						{
							id: 22, 
							src: require("@/assets/images/record-placeholder.png"), 
							date: '1746-1805', 
							title: 'Essay on government', 
							collection: {id: 212, title: 'George III Essays'}
						},
						{
							id: 22, 
							src: require("@/assets/images/record-placeholder.png"), 
							date: '1746-1805', 
							title: 'Essay on government', 
							collection: {id: 212, title: 'George III Essays'}
						},
					],
					entities: [
						{id: 21, title: 'George III, 1738-1820, King of Great Britain and Ireland'},
						{id: 22, title: 'Charlotte, Queen Consort of George III'},
						{id: 23, title: 'Mary, Princess (1776-1857)'}
					],
				},
				{
					id: 3,
					title: 'George III siblings',
					description: 'Papers of the brothers of George III',
					collections: [
					],
					featuredRecords: [
						{
							id: 31, 
							src: require("@/assets/images/record-placeholder.png"), 
							date: '18 February 1766', 
							title: 'Letter from the Duke of York to George III on the Duke of Bedford', 
							collection: {
								id: 311, 
								title: 'Collection'
							}
						},
					],
					entities: [
						{id: 31, title: 'William Henry, Prince (b. 1765)'},
						{id: 32, title: 'Edward, 1739-1767, Duke of York and Albany'}
					],
				},
				{
					id: 4,
					title: 'George IV and Princess Charlotte of Wales',
					description: 'Introductions to his papers and financial records as Prince, Regent and King, as well as those of his only daughter',
					collections: [
					],
					featuredRecords: [
					],
					entities: [
						{id: 41, title: 'George IV, King'},
						{id: 42, title: 'Princess Charlotte of Wales'}
					],
				},
				{
					id: 5,
					title: 'William IV',
					description: 'Correspondence of the seafaring Prince and King',
					collections: [
						{id: 51, title: 'Letters from and to William IV and Queen Adelaide and papers concerning them'},
						{id: 52, title: 'Private and official papers of William IV'},
						{id: 53, title: 'Financial papers of William IV'},
					],
					featuredRecords: [
						{
							id: 51, 
							src: require("@/assets/images/record-placeholder.png"), 
							date: '8 June 1832', 
							title: 'Appointment of the Duke of Gloucester as Trustee of British Museum, written at St James’s Palace', 
							collection: {id: 1, title: 'Collection'}
						},
					],
					entities: [
						{id: 51, title: 'William IV, King'},
					],
				},
			]
		}
	},
	methods: {
	}
}
</script>
