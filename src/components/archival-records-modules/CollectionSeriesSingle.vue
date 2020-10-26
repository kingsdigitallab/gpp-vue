<template>
	<div>
		<div v-show="loading" class="loader"></div>
		<div class="record" v-show="!loading">		
			<h1 class="page-title">{{getArchive.title}}</h1>
            <p class="related-to">related to: <router-link :to="{name: 'timeline', params: {subpage: timelineGroup.url}}">{{timelineGroup.name}}</router-link></p>
            <div class="two-column-70-30">
                <p>{{getArchive.description}}</p>
                <!-- {{getArchive}} -->
                <div class="grey-column two-column-30-70">
                        <span class="highlight">RA References</span>
                        <span>
                            {{getArchive.references[0].unitid}}
                            <!-- <span v-for="(reference, i) in getArchive.references[0]" v-bind:key="i">
                                {{reference.unitid}}<span v-if="i != getArchive.references.length - 1">, </span>
                            </span> -->
                        </span>
                        <span class="highlight">Creation dates</span>
                        <!-- TODO: normalise the data response -->
                        <!-- {{getArchive.creation_dates}} -->
                        <span>{{getArchive.creation_dates}}</span>
                        <span class="highlight">Archival level</span>
                        <span>{{getArchive.metadata[1].content}}</span>
                        <span class="highlight">Extent</span>
                        <span>{{getArchive.extent}}</span>
                        <span class="highlight">Languages</span>
                        <span>{{getArchive.languages}}</span>
                    </div>
                </div>
            </div>
            <div class="two-column-70-30">
                <div class="hierarchy">
                    <h2>Collection</h2>
                    <div class="hierarchy-header">
                        <span></span>
                        <span>Title</span>
                        <span class="record-details">
                            <span>Level</span>
                            <span>Creation dates</span>
                        </span>
                    </div>
                    <div class="parent-level">
                        <hierarchy-template v-bind:current="this.hierarchy"></hierarchy-template>
                    </div>
                </div>
                <div class="grey-column">
                    <h4>Administrative history</h4>
                    <p>{{getArchive.administrative_history}}</p>
                </div>
            </div>
            <div>
                <h2>Related</h2>
                <div class="two-column-70-30">
                    <div></div>
                    <div class="grey-column"></div>
                </div>
            </div>
            <div>
                <h2>Arrangement &amp; custodial history</h2>
                <div class="two-column-70-30">
                    <div></div>
                    <div class="grey-column"></div>
                </div>
            </div>
            <div>
                <h2>Notes</h2>
                <p>{{getArchive.notes}}</p>
            </div>
            <div>
                <h2>Digital rights declaration</h2>
                <div class="grey-column">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HierarchyTemplate from '../templates/HierarchyTemplate.vue';

import OpenSeadragon from 'openseadragon';

import jsPDF from 'jspdf';
import { mapGetters, mapActions } from 'vuex';

let IMG_SRC = '';

function openSeaDragon(images) {
	let viewer = OpenSeadragon({
		id: "openseadragon1",
		prefixUrl: "//openseadragon.github.io/openseadragon/images/",
		tileSources: images,
		autoHideControls: false,
		sequenceMode: true,
		showReferenceStrip: true,
		zoomInButton: "zoom-in",
		zoomOutButton: "zoom-out",
		fullPageButton: "expand",
		previousButton: "previous",
		nextButton: "next"
	});
	this.imgNum = viewer.tileSources.length;

	viewer.addHandler('open', function() {
		IMG_SRC = viewer.source.url;
	});
}

function createPDF() {
	let doc = new jsPDF();
	let imgNew = new Image();

	imgNew.src = IMG_SRC;

	let width = doc.internal.pageSize.getWidth();
	let height = doc.internal.pageSize.getHeight();
	doc.addImage(imgNew,"JPEG",0,0,width,height);
	return doc;
}

function createPDFwithMoreImages(images) {
	let doc = new jsPDF();
	images.forEach(image => {
		let imgNew = new Image();

		imgNew.src = image.url;
		// imgNew.crossOrigin = "Anonymous";

		let width = doc.internal.pageSize.getWidth();
		// let height = doc.internal.pageSize.getHeight();
		doc.addImage(imgNew,"JPEG",0,0,width,imgNew.height);
		if(images[images.length-1]!==image){
			doc.addPage();
		}
		
	});
	return doc;
}

function savePDF() {
	createPDF().save('image.pdf');
}

function printPreview() {
	window.open(this.pdfDoc.output('bloburl'), '_blank');
}

export default {
	name: 'CollectionSeriesSingle',
	components: {HierarchyTemplate},
	computed: mapGetters(['getArchive']),
	data: function() {
		return {
                timelineGroup: {
                    id: 1,
                    url: 'early-georgians',
                    name: 'George III, Queen Charlotte and their family'
                },
                hierarchy: {
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
                },
				date: '1 November 1817',
				imgTitle: 'Image',
				description: 'Description',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				image: true,
				transcript: true,
				imgNum: '+8',
				loading: true,
				metadata: [
					{
						name: 'Title',
						content: 'Letter from William Cole to Charles Bicknell concerning the outstanding payment owed to Jonathan Taylor.'
					},
					{
						name: 'Calm id',
						content: 'R136855543f6d19-7028-4cd5-8466-3efc3cf5f66'
					},
					{
						name: 'Repository',
						content: 'd'
					},
					{
						name: 'Level',
						content: 'Royal Archives'
					},
					{
						name: 'Fonds',
						content: 'Item',
						hasClass: true
					},
					{
						name: 'Reference',
						content: 'George IV\'s Bills PRIV'
					},
					{
						name: 'Security code',
						content: 'GEO/MAIN/25493-25494 GIVBILLS/207/33'
					}
				]
		}
	},
	methods: {
		openSeaDragon,
		savePDF,
		printPreview,
        createPDFwithMoreImages,
		...mapActions(['fetchArchive'])
	},
	created: function(){
        this.loading = true;
    },
	mounted() {
		this.fetchArchive(this.$route.params.id);
		this.loading = false;
	},
	watch: {
		getArchive(newValue) {
			this.openSeaDragon(newValue.media);
			this.pdfDoc = this.createPDFwithMoreImages(newValue.media);
			this.image = !(newValue.media.length == 0);
			this.transcript = !(newValue.administrative_history == null);
		}
	}
}
</script>
