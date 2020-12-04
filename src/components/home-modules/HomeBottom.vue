<template>
	<div class="home-bottom container">
		<div class="two-column-50-50">
			<div class="card">
				<div class="card-image">
					<img src="@/assets/images/archival-record-banner.png" alt="Banner for the DBrowse archival records section depicting an archival record"/>
				</div>
				<div class="card-description">
					<h2>Browse archival records</h2>
					<p>Hierarchically organised, our archival records include: diaries, writings, maps, correspondence, wills, commonplace books, financial records, and more!</p>
				</div>
				<div class="card-button">
					<router-link to="/archival-records" class="link-button-primary large">See all archival records <span class="arrow"></span></router-link>
				</div>
			</div>
			<div class="card">
				<div class="card-image">
					<img src="@/assets/images/Masked-Ball-Louis-XV-court.jpg" alt="Banner for the Discover people and corporate bodies section depicting Masked Ball Louis XV court"/>
				</div>
				<div class="card-description">
					<h2>Discover people &amp; corporate bodies</h2>
					<p>Our database contains information about over 1,500 people and corporate bodies from the Georgian era.</p>
				</div>
				<div class="card-button">
					<router-link to="/people-and-corporate-bodies" class="link-button-primary large">See all people &amp; corporate bodies <span class="arrow"></span></router-link>
				</div>
			</div>
		</div>
		<div class="two-column-50-50">
			<div class="about">
				<h2>About</h2>
				<p v-html="getAboutDescription.body"></p>
			</div>
			<div>
				<img v-bind:src="getAboutImageUrl.resource" v-bind:alt="getAboutImageUrl.alt" class="image-fill"/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'HomeBottom',
	computed: mapGetters(['getAboutImageUrl', 'getAboutDescription']),
	methods: {
		...mapActions(['fetchAboutDescription'])
	},
	async created() {
		await this.fetchAboutDescription();
	},
}
</script>
