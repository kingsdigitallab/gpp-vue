<template>
	<div class="home-timeline container">
		<div v-for="(group, i) in getTimelineGroups" v-bind:key="i" class="timeline-group">
			<h2>
				<router-link :to="{name:'timeline', params: {subpage: group.url_slug}}">{{group.title}} <span class="arrow"></span></router-link>
			</h2>
			<p>{{group.introduction}}</p>
			<div class="related-flex mobile-none">
				<router-link :to="{name: 'collections-series', params: {id: featured_parent_record.pk}}" class="link-button-primary small" v-for="(featured_parent_record, i) in group.featured_collections_series" v-bind:key="i">{{featured_parent_record.title}}</router-link>
			</div>
			<div class="related-records mobile-none" v-if="group.featured_files_items.length">
				<h3>Featured files and items</h3>
				<carousel-template v-bind:featuredRecords="group.featured_files_items"></carousel-template>
			</div>
			<div class="related-flex mobile-none">
				<router-link :to="{name: 'entity', params: {id: entity.pk}}" class="link-button-grey small" v-for="(entity, i) in group.featured_entities" v-bind:key="i"><span class="dotted-underline">{{entity.title}}</span></router-link>
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
