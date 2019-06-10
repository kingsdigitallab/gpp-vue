<template>
	<div>
		<div v-show="loading" class="loader"></div>
		<article class="arch-single" v-show="!loading">
			<h1 class="page-title page-title--single">{{getArchive.title}}</h1>
			<time class="arch-single__date">{{getArchive.creation_dates}}</time>

			<section class="arch-single__img" v-if="image || transcript">
				<h1 class="arch-single__img-title">{{imgTitle}}</h1>
				<div class="arch-single__img-wrap">
					<div id="openseadragon1" v-if="image" class="arch-single__img-plugin">
						<span class="arch-single__zoom-in" id="zoom-in"><FontAwesomeIcon icon="plus-circle"/></span>
						<span class="arch-single__zoom-out" id="zoom-out"><FontAwesomeIcon icon="minus-circle"/></span>
						<span class="arch-single__expand" id="expand"><FontAwesomeIcon icon="expand"/></span>
						<span class="arch-single__previous" id="previous"><FontAwesomeIcon icon="arrow-circle-left"/></span>
						<span class="arch-single__next" id="next"><FontAwesomeIcon icon="arrow-circle-right"/></span>
						<span @click="pdfDoc.save()" class="arch-single__img-download" title="Download" download><FontAwesomeIcon icon="download"/></span>
						<span @click="printPreview()" class="arch-single__img-print" title="Print"><FontAwesomeIcon icon="print"/></span>
						<span class="arch-single__num">{{imgNum}}</span>
					</div>
					<section v-if="transcript" class="arch-single__img-text">
						<h2 class="arch-single__img-text-title">Transcription</h2>
						<div class="arch-single__img-text-content">
							<p class="arch-single__img-text-para">{{getArchive.administrative_history}}</p>
						</div>
					</section>
				</div>
			</section>

			<section class="arch-single__desc" v-if="getArchive.description">
				<h2 class="arch-single__desc-title">{{description}}</h2>
				<p class="arch-single__desc-text" v-html="getArchive.description"></p>
			</section>

			<section class="arch-single__meta">
				<h2 class="arch-single__meta-title">Metadata</h2>
				<ul class="arch-single__list">
					<li :key="index" v-for="(data, index) in getArchive.metadata" class="arch-single__item">
						<span v-bind:class="{'arch-single__item-name': true, 'before': data.hasClass}">{{data.name}}</span>
						<span v-if="!Array.isArray(data.content)" class="arch-single__item-content" v-html="data.content"></span>
						<span v-if="Array.isArray(data.content)" class="arch-single__item-content">
							<span :key="index" v-for="(data, index) in data.content">
								{{data}},
							</span>
						</span>
					</li>
				</ul>
			</section>
		</article>
	</div>
</template>

<script>
import OpenSeadragon from 'openseadragon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faPrint, faPlusCircle, faMinusCircle, faExpand, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
// import { faPrint } from '@fortawesome/free-solid-svg-icons';
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
// import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
// import { faExpand } from '@fortawesome/free-solid-svg-icons';
// import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
// import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import jsPDF from 'jspdf';
import { mapGetters, mapActions } from 'vuex';

library.add(faDownload, faPrint, faPlusCircle, faMinusCircle, faExpand, faArrowCircleLeft, faArrowCircleRight);
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

		let width = doc.internal.pageSize.getWidth();
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
	name: 'ArchiveSingle',
	components: {
		FontAwesomeIcon
	},
	computed: mapGetters(['getArchive']),
	data: function() {
		return {
				imgTitle: 'Image',
				description: 'Description',
				image: true,
				transcript: true,
				imgNum: '+8',
				loading: true,
		}
	},
	methods: {
		openSeaDragon,
		savePDF,
		printPreview,
		createPDFwithMoreImages,
		...mapActions(['fetchArchive'])
	},
	created() {
		this.loading = true;
	},
	async mounted() {
		await this.fetchArchive(this.$route.params.id);
		this.loading = false;
	},
	watch: {
		getArchive(newValue) {
			this.openSeaDragon(newValue.media);
			this.image = !(newValue.media.length == 0);
			this.transcript = !(newValue.administrative_history == null);
			this.pdfDoc = this.createPDFwithMoreImages(newValue.media);
		}
	}
}
</script>
