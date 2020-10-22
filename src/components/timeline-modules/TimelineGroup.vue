<template>
  <div class="timeline-group">
		<div class="container">
            <div class="related-people-corporate-bodies">
                <h3>Related people &amp; corporate bodies</h3>
                <router-link :to="{name: 'person-and-corporate-body', params: {id: entity.id}}" class="link-button-grey small" v-for="(entity, i) in entities" v-bind:key="i"><span class="dotted-underline">{{entity.title}}</span></router-link>
            </div>
            <div class="related-collections">
                <h3>Related collections</h3>
                <div class="two-column-30-70">
                    <div class="grey-column">
                        <div class="collections">
                            <button v-for="(collection, i) in collections" v-bind:key="i" v-bind:class="[{active: collection.id === activeCollection}, 'collection']" v-on:click="setHierarchy(collections[i].id, collections[i].title)">
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
                            <hierarchy-template v-bind:current="this.hierarchy[0]"></hierarchy-template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="related-files-items">
                 <h3>Featured files &amp; items</h3>
                 <carousel-template v-bind:featuredRecords="featuredRecords"></carousel-template>
            </div>
		</div>
  </div>
</template>

<script>
import HierarchyTemplate from '../templates/HierarchyTemplate.vue';
import CarouselTemplate from '../templates//CarouselTemplate.vue';

export default {
    name: 'TimelineGroup',
    components: {HierarchyTemplate, CarouselTemplate},
	data: function() {
		return {
            id: 1,
            title: 'Early Georgians',
            description: 'Early Georgians - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            entities: [
                {id: 11, title: 'George I, King'},
                {id: 12, title: 'George II, King'},
                {id: 13, title: 'Caroline, Queen Consort to George II (1683-1737)'},
                {id: 14, title: 'Frederick, Prince of Wales'},
            ],
            collections: [
                {
                    id: 21, 
                    title: 'Additional papers relating to George III and Queen Charlotte',
                    children_desc: '12 series'
                },
                {   
                    id: 22, 
                    title: 'George III Calendar',
                    children_desc: '12 series'
                },
                {
                    id: 23, 
                    title: 'George III Essays',
                    children_desc: '12 series'
                },
                {
                    id: 24, 
                    title: 'Diaries, essays and notes of Queen Charlotte',
                    children_desc: '12 series'
                },
                {
                    id: 25, 
                    title: 'Papers of Charlotte, Queen Consort to George III',
                    children_desc: '12 series'
                },
                {
                    id: 26, 
                    title: 'Letters from and concerning Princess Augusta Sophia',
                    children_desc: '12 series'
                },
                {
                    id: 27, 
                    title: 'Papers of Charlotte, Queen Consort to George III',
                    children_desc: '12 series'
                },
                {
                    id: 28, 
                    title: 'Papers relating to Lady Charlotte Finch',
                    children_desc: '12 series'
                },
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
            activeCollection: 0,
            collectionTitle: '',
            current: '',
            hierarchy: '',
            hierarchy_PLACEHOLDER: [
                {
                    id: 1,
                    is_selected: false,
                    title: '<Collection: Papers of General Jacob de Budé.>', 
                    archival_level: 'Collection',
                    creation_dates: '',
                    is_ancestor: true, 
                    children_desc: '(7 series)', 
                    children: [
                        {
                            id: 3,
                            is_selected: false, 
                            title: '<Series 3: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            creation_dates: '',
                            is_ancestor: false, 
                            children_desc: '(7 series)',
                            children: []
                        },
                        {
                            id: 4,
                            is_selected: false, 
                            title: '<Series 4: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: false, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: []
                        },
                        {
                            id: 2,
                            is_selected: false, 
                            title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: true, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: [
                                {
                                    id: 2,
                                    is_selected: true, 
                                    title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                                    archival_level: 'Series',
                                    is_ancestor: false, 
                                    creation_dates: '',
                                    children_desc: '(7 series)',
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 2,
                            is_selected: false, 
                            title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                            archival_level: 'Series',
                            is_ancestor: false, 
                            creation_dates: '',
                            children_desc: '(7 series)',
                            children: [
                                {
                                    id: 2,
                                    is_selected: false, 
                                    title: '<Series: Correspondence principally between General Jacob de Budé and King George III and Queen Charlotte.>', 
                                    archival_level: 'Series',
                                    is_ancestor: false, 
                                    creation_dates: '',
                                    children_desc: '(7 series)',
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ]
		}
	},
	methods: {
        setHierarchy(id, title) {
            this.collectionTitle = title;
            this.activeCollection = id;
            // this.fetchHierarchy(id);
            this.hierarchy = this.hierarchy_PLACEHOLDER;
        }
    },
    created: function(){
        // this.fetchHierarchy(this.collections[0].id)
        this.setHierarchy(this.collections[0].id, this.collections[0].title);
    },
    mounted: function() {
        this.current = this.hierarchy[0];
    },
}
</script>