<template>
	<article class="arch-list">
		<ul class="list">
			<li class="list-item">
				<div class="list-row">
					<span class="list-head">{{hierarchy}}</span>
					<span class="list-head">{{title}}</span>
					<span class="list-head">{{date}}</span>
					<span class="list-head">{{writer}}</span>
				</div>
			</li>
			<li :key="index" v-for="(item, index) in getArchivalRecords" v-on:click="openDropdown" class="list-item">
				<div class="list-row">
					<span class="list-head list-head--hidden">{{hierarchy}}</span>
					<span
						v-bind:class="{'list-data--has-children' : hasChildren(item,'series_set'), 'list-data': true}" >{{item.title}}
					</span>
					<span class="list-head list-head--hidden">{{title}}</span>
					<span class="list-data">{{item.title}}</span>
					<span class="list-head list-head--hidden">{{date}}</span>
					<span class="list-data">{{item.creation_dates}}</span>
					<span class="list-head list-head--hidden">{{writer}}</span>
					<span
						:key="creator.id"
						v-for="creator in item.creators"
						class="list-data">{{creator.display_name}}</span>
					<span class="list-data" v-show="item.creators == null">--</span>
				</div>
				<ul v-if="item.series_set" class="list list--serie js-list-serie">
					<li :key="index" v-for="(serie, index) in item.series_set" v-on:click="openDropdown" class="list-item list-item--serie">
						<div class="list-row">
							<span class="list-head list-head--hidden">{{hierarchy}}</span>
							<span v-bind:class="{'list-data--has-children' : hasChildren(item,'subSeries'), 'list-data': true}">{{serie.title}}
								<span class="list-count">{{serie.count}}</span>
							</span>
							<span class="list-head list-head--hidden">{{title}}</span>
							<span class="list-data">{{serie.title}}</span>
							<span class="list-head list-head--hidden">{{date}}</span>
							<span class="list-data">{{serie.creation_dates}}</span>
							<span v-if="serie.writer" class="list-head list-head--hidden">{{writer}}</span>
							<span class="list-data">{{serie.writer}}</span>
						</div>
						<ul v-if="serie.subSeries" class="list list--serie js-list-serie">
							<li :key="index" v-for="(subSerie, index) in serie.subSeries" v-on:click="openDropdown" class="list-item list-item--serie">
								<div class="list-row">
									<span class="list-head list-head--hidden">{{hierarchy}}</span>
									<span class="list-data list-data--has-children">{{subSerie.hierarchy}}
										<span class="list-count">{{subSerie.count}}</span>
									</span>
									<span class="list-head list-head--hidden">{{title}}</span>
									<span class="list-data">{{subSerie.title}}</span>
									<span class="list-head list-head--hidden">{{date}}</span>
									<span class="list-data">{{subSerie.date}}</span>
									<span v-if="subSerie.writer" class="list-head list-head--hidden">{{writer}}</span>
									<span class="list-data">{{subSerie.writer}}</span>
								</div>
								<ul v-if="subSerie.items" class="list list--serie js-list-serie">
									<li :key="index" v-for="(item,index) in subSerie.items" v-on:click="openDropdown" class="list-item list-item--serie">
										<div class="list-row">
											<span class="list-head list-head--hidden">{{hierarchy}}</span>
											<span class="list-data list-data--has-children">{{item.hierarchy}}
												<span class="list-count">{{item.count}}</span>
											</span>
											<span class="list-head list-head--hidden">{{title}}</span>
											<span class="list-data">{{item.title}}</span>
											<span class="list-head list-head--hidden">{{date}}</span>
											<span class="list-data">{{item.date}}</span>
											<span v-if="item.writer" class="list-head list-head--hidden">{{writer}}</span>
											<span class="list-data">{{item.writer}}</span>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
		<div v-if="getArchivalRecords.length === 0" class="loader"></div>
		<button type="button" name="button" class="btn btn-load" @click="loadMoreArchivalRecords">Load more</button>
	</article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

function openDropdown(e) {
	if(e.target.classList.contains('list-data--has-children') && e.target.parentNode.nextSibling) {
		e.stopPropagation();
		e.target.classList.toggle('list-data--active');
		e.target.parentNode.nextSibling.classList.toggle('list--active');
	}
}

function hasChildren(item, childrenField) {
	if (item[childrenField]) {
		return item[childrenField].length > 0;
	}
	return false;
}

export default {
	name: 'ArchiveList',
	computed: mapGetters(['getArchivalRecords']),
	data: function() {
		return {
			hierarchy: 'Hierarchy',
			title: 'Title',
			date: 'Date',
			writer: 'Writer',
			listItems: [
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '12 Series',
					title: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company had supplied for use at Brighton Pavilion.',
					date: '1 November 1812',
					writer: 'Bancks, Christopher'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '4 Series',
					title: 'Payment contract between [Jonathan Taylor and George Pulford] and Benjamin Bloomfield, with an addedndum concerning the ongoing issue between Messrs William and Charles Bancks and Mr Taylor over gas apparatus.',
					date: '23 December 1817',
					writer: '',
					series: [
						{
							hierarchy: 'Series',
							count: '2 Sub-series',
							title: '1 - Bill issued by William Napier for the supply of sheet music, violin strings and copies of compositions by Hayden and Bach etc. and receipt.',
							date: '30 November 1784 - 15 April 1788',
							writer: 'Napier, William',
							subSeries: [
								{
									hierarchy: 'Sub-series',
									count: '1 Sub-sub-series',
									title: '2 - Bill issued by James Fraser for the binding of volumes of overtures etc.',
									date: '30 November 1787 - 16 April 1788',
									writer: 'Fraser, James'
								},
								{
									hierarchy: 'Sub-series',
									count: '2 Sub-sub-series',
									title: '3 - Bill issued by Robert Stodart for supplying a grand piano inlayed with feathers (presumably those of the Prince of Wales)',
									date: '16 January 1786',
									writer: 'Stodart, Robert; Piano maker',
									items: [
										{
											hierarchy: 'Item',
											count: '4 images',
											title: '2 - Bill issued by James Fraser for the binding of volumes of overtures etc.',
											date: '30 November 1787 - 16 April 1788',
											writer: 'Fraser, James'
										},
										{
											hierarchy: 'Item',
											count: '21 Images',
											title: '3 - Bill issued by Robert Stodart for supplying a grand piano inlayed with feathers (presumably those of the Prince of Wales)',
											date: '16 January 1786',
											writer: 'Stodart, Robert; Piano maker'
										}
									]
								}
							]
						},
						{
							hierarchy: 'Series',
							count: '6 Sub-series',
							title: '2 - Bill issued by James Fraser for the binding of volumes of overtures etc.',
							date: '30 November 1787 - 16 April 1788',
							writer: 'Fraser, James'
						},
						{
							hierarchy: 'Series',
							count: '6 Sub-series',
							title: '3 - Bill issued by Robert Stodart for supplying a grand piano inlayed with feathers (presumably those of the Prince of Wales)',
							date: '16 January 1786',
							writer: 'Stodart, Robert; Piano maker'
						},
						{
							hierarchy: 'Series',
							count: '2 Sub-series',
							title: '4 - Bill issued by Robert Horne for supplying a alrge bass drum painted with the badge of the 10tth Regiment of the Light Dragoons.',
							date: '18 July 1791 - 9 February 1793',
							writer: 'Horner, Robert; Drum maker'
						}
					]
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '17 Series',
					title: 'Letter from William Cole to Charles Bicknell explaining that Mr Carty and Mr McIntosh are chasing their payment for the procurement of gas apparatus for',
					date: '18 December 1817',
					writer: 'Cole, William; Solicitor'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '6 Series',
					title: 'Letter Sir Benjamin Bloomfield to Charles Bicknell explaining that great care should be taken of Mr Taylor who is possibly in slight financial difficulty.',
					date: '7 December 1817',
					writer: 'Bloomfield, Benjamin, Sir; Private Secretary to the Prince Regent'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '8 Series',
					title: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company had supplied for use at Brighton Pavoilion.',
					date: '1 November 1812',
					writer: 'Bancks, Christopher'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '3 Series',
					title: 'Payment contract between [Jonathan Taylor and George Pulford] and Benjamin Bloomfield, with an addedndum concerning the ongoing issue between Messrs William and Charles Bancks and Mr Taylor over gas apparatus.',
					date: '23 December 1817',
					writer: ''
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '17 Series',
					title: 'Letter from William Cole to Charles Bicknell explaining that Mr Carty and Mr McIntosh are chasing their payment for the procurement of gas apparatus for',
					date: '18 December 1817',
					writer: 'Cole, William; Solicitor'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '6 Series',
					title: 'Letter Sir Benjamin Bloomfield to Charles Bicknell explaining that great care should be taken of Mr Taylor who is possibly in slight financial difficulty.',
					date: '7 December 1817',
					writer: 'Bloomfield, Benjamin, Sir; Private Secretary to the Prince Regent'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '8 Series',
					title: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company had supplied for use at Brighton Pavoilion.',
					date: '1 November 1812',
					writer: 'Bancks, Christopher'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '17 Series',
					title: 'Letter from William Cole to Charles Bicknell explaining that Mr Carty and Mr McIntosh are chasing their payment for the procurement of gas apparatus for',
					date: '18 December 1817',
					writer: 'Cole, William; Solicitor'
				},
				{
					hierarchy: 'Royal Archives Curated Collections',
					count: '6 Series',
					title: 'Letter Sir Benjamin Bloomfield to Charles Bicknell explaining that great care should be taken of Mr Taylor who is possibly in slight financial difficulty.',
					date: '7 December 1817',
					writer: 'Bloomfield, Benjamin, Sir; Private Secretary to the Prince Regent'
				}
			]
		}
	},
	methods: {
		openDropdown,
		hasChildren,
		...mapActions(['fetchArchivalRecords','loadMoreArchivalRecords'])
	},
	created() {
		this.fetchArchivalRecords();
	}
}
</script>
