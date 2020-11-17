<template>
  <div class="timeline-group">
		<div class="container" v-if="!loadingTimelineGroup">
            <div class="related-people-corporate-bodies" v-if="getTimelineGroup.entities">
                <h3>Related people &amp; corporate bodies</h3>
                <router-link v-for="(entity, i) in getTimelineGroup.entities" v-bind:key="i" :to="{name: 'entity', params: {id: entity.id}}" class="link-button-grey small"><span class="dotted-underline">{{entity.title}}</span></router-link>
            </div>
            <div class="related-collections" v-if="getTimelineGroup.collections">
                <h3>Related collections</h3>
                <div class="two-column-30-70">
                    <div class="grey-column">
                        <div class="collections">
                            <button v-for="(collection, i) in getTimelineGroup.collections" v-bind:key="i" v-bind:class="[{active: collection.id === activeCollection}, 'collection']" v-on:click="setHierarchy(collection.id, collection.title)">
                                <span class="red-highlight">{{collection.title}}</span> ({{collection.children_desc}})
                            </button>
                        </div>
                    </div>
                    <div class="hierarchy">
                        <h2>{{this.collectionTitle}}</h2>
                        <div class="hierarchy-header">
                            <span></span>
                            <span>Title</span>
                            <span class="record-details">
                                <span>Level</span>
                                <span>Creation dates</span>
                            </span>
                        </div>
                        <div class="parent-level">
                            <hierarchy-template v-bind:current="getHierarchy" v-if="!loadingHierarchy"></hierarchy-template>
                            <div v-else class="loader"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="related-files-items" v-if="getTimelineGroup.featuredRecords">
                 <h3>Featured files &amp; items</h3>
                 <carousel-template v-bind:featuredRecords="getTimelineGroup.featuredRecords"></carousel-template>
            </div>
		</div>
        <div v-else class="loader"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import HierarchyTemplate from '../templates/HierarchyTemplate.vue';
import CarouselTemplate from '../templates//CarouselTemplate.vue';

export default {
    name: 'TimelineGroup',
    computed: mapGetters(['getTimelineGroup', 'getHierarchy']),
    components: {HierarchyTemplate, CarouselTemplate},
	data: function() {
		return {
            activeCollection: 0,
            collectionTitle: '',
            loadingTimelineGroup: true,
            loadingHierarchy: true
		}
	},
	methods: {
        async setHierarchy(collection_id, collection_title) {
            this.collectionTitle = collection_title;
            this.activeCollection = collection_id;
            await this.fetchHierarchy(collection_id);
            this.loadingHierarchy = false;
        },
        ...mapActions(['fetchTimelineGroup', 'fetchHierarchy'])
    },
    async created(){
        const timelineGroup = this.$route.params.subpage;
        if (timelineGroup) {
            await this.fetchTimelineGroup(timelineGroup);
            this.loadingTimelineGroup = false;
            this.setHierarchy(this.getTimelineGroup.collections[0].id, this.getTimelineGroup.collections[0].title);
        }
    },
    watch: {
        $route() {
            this.fetchTimelineGroup(this.$route.params.subpage);
        }
    }
}
</script>