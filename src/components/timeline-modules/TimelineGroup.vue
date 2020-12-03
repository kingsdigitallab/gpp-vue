<template>
  <div class="timeline-group">
		<div class="container" v-if="!loadingTimelineGroup">
            <div class="related-flex" v-if="getTimelineGroup.related_entities">
                <h3>Related people &amp; corporate bodies</h3>
                <router-link v-for="(entity, i) in getTimelineGroup.related_entities" v-bind:key="i" :to="{name: 'entity', params: {id: entity.pk}}" class="link-button-grey small"><span class="dotted-underline">{{entity.title}}</span></router-link>
            </div>
            <div class="related-records" v-if="getTimelineGroup.related_collections">
                <h3>Related collections</h3>
                <div class="two-column-30-70">
                    <div class="grey-column">
                        <div v-if="!mobile" class="collections">
                            <button v-for="(collection, i) in getTimelineGroup.related_collections" v-bind:key="i" v-bind:class="[{active: collection.pk === activeCollection}, 'collection']" v-on:click="setHierarchy(collection.pk, collection.title)">
                                <span>{{collection.title}}</span> ({{collection.children_desc}})
                            </button>
                        </div>
                        <div v-if="mobile" class="collections">
                            <button v-for="(collection, i) in collectionSubset" v-bind:key="i" v-bind:class="[{active: collection.pk === activeCollection}, 'collection']" v-on:click="setHierarchy(collection.pk, collection.title)">
                                <span>{{collection.title}}</span> ({{collection.children_desc}})
                            </button>
                            <input type="checkbox" class="show-checkbox" id="show-all-collections" :checked="collectionSubset == getTimelineGroup.related_collections" v-on:click="collectionSubset == getTimelineGroup.related_collections ? collectionSubset =  getTimelineGroup.related_collections.slice().splice(0,3) : collectionSubset =  getTimelineGroup.related_collections"/>
                            <label for="show-all-collections" class="show-all dotted-underline">
                                collections
                            </label>
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
            <div class="related-flex" v-if="getTimelineGroup.featured_series">
                <h3>Featured series</h3>
                <router-link v-for="(series, i) in getTimelineGroup.featured_series" v-bind:key="i" :to="{name: 'collections-series', params: {id: series.pk}}" class="link-button-grey small"><span class="dotted-underline">{{series.title}}</span></router-link>
                <!-- TODO ADD SEE ALL IF MORE THAN 5 -->
            </div>
            <div class="related-records" v-if="getTimelineGroup.featured_files_items">
                 <h3>Featured files &amp; items</h3>
                 <carousel-template v-bind:featuredRecords="getTimelineGroup.featured_files_items"></carousel-template>
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
            loadingHierarchy: true,
            mobile: false,
            collectionSubset: []
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
            this.setHierarchy(this.getTimelineGroup.related_collections[0].pk, this.getTimelineGroup.related_collections[0].title);
        }
    },
    mounted() {
            if (window.innerWidth < 1150) {
                this.mobile = true;
                if (this.getTimelineGroup.collections.length > 3) {
                    this.collectionSubset = this.getTimelineGroup.related_collections.slice().splice(0,3);
                } else {
                    this.collectionSubset = this.getTimelineGroup.related_collections;
                }
            } else {
                this.mobile = false;
            }
    },
    watch: {
        $route(to, from) {
            this.fetchTimelineGroup(to.params.subpage);
        }
    }
}
</script>