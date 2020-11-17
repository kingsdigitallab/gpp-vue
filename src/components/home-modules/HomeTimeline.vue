<template>
	<div class="home-timeline container">
		<div v-for="(group, i) in getTimelineGroups" v-bind:key="i" class="timeline-group">
			<h2>
				<router-link :to="{name:'timeline', params: {subpage: group.url}}">{{group.title}} <span class="arrow"></span></router-link>
			</h2>
			<p>{{group.description}}</p>
			<div class="featured-collections-series">
				<router-link :to="{name: 'collections-series', params: {id: collection.id}}" class="link-button-default small" v-for="(collection, i) in group.collections" v-bind:key="i">{{collection.title}}</router-link>
			</div>
			<div class="featured-files-items" v-if="group.featuredRecords.length">
				<h3>Featured files and items</h3>
				<carousel-template v-bind:featuredRecords="group.featuredRecords"></carousel-template>
			</div>
			<div class="featured-people-corporate-bodies">
				<router-link :to="{name: 'entity', params: {id: entity.id}}" class="link-button-grey small" v-for="(entity, i) in group.entities" v-bind:key="i"><span class="dotted-underline">{{entity.title}}</span></router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CarouselTemplate from '../templates/CarouselTemplate.vue';

export default {
	name: 'HomeTimeline',
	computed: mapGetters(['getTimelineGroups']),
	components: {CarouselTemplate},
	methods: {
		...mapActions(['fetchTimelineGroups'])
	},
	async created() {
		await this.fetchTimelineGroups();
	},
}
</script>
