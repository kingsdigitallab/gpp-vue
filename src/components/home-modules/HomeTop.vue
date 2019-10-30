<template>
  <div class="home__top">
		<div class="container">
			<div class="home__stats">
				<div :key="index" v-for="(stat, index) in stats" class="home__stats-group">
						<span class="home__stats-num">{{stat.num}}</span>
						<span class="home__stats-text">{{stat.text}}</span>
						<span v-if="stat.year" class="home__stats-year">{{stat.year}}</span>
				</div>
			</div>
			<div class="home__updated">
				<span class="home__updated-text">{{updated}}</span>
			</div>
		</div>
		<div class="home__article">
			<!-- <h1 class="home__article-title">{{articleTitle}}</h1> -->
			<h1 class="home__article-title">About the Collaborative Workspace</h1>
			<div class="home__article-content">
				<div class="container">
					<!-- <p :key="index" v-for="(paragraph, index) in articleParagraphs" class="home__article-para">{{paragraph}}</p> -->
					<p class="home__article-para">
						The Collaborative Workspace is a digital platform, developed by <a href="https://www.kdl.kcl.ac.uk/">King’s Digital Lab</a>, that holds material digitised by the <a href="https://gpp.rct.uk/">Royal Archives</a> as part of the Georgian Papers Programme. It is the one platform on which all datastreams for the Georgian papers, images, metadata and completed transcriptions, are offered; and will allow scholarly users to edit and augment these according to their own knowledge and close reading of the material.
					</p>
					<p class="home__article-para">
						TThe Collaborative Workspace is built to solicited requirements from both academics and information professionals and brings the rigour required by archivists through the implementation of archival standards (<a href="https://www.loc.gov/ead/EAD3taglib/index.html">EAD3</a> and <a href="https://eac.staatsbibliothek-berlin.de/schema/taglibrary/cpfTagLibrary2019_EN.html">EAC-CPF</a>) while offering flexibility to scholars in allowing them to correct and augment almost all data surfaced in the Workspace. Editing is moderated to ensure fidelity.
					</p>
					<router-link to="/about" class="home__article-read">About the Georgian Papers Programme &gt;</router-link>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	name: 'HomeTop',
	data: function() {
		return {
			stats: [
				{
					num: 123,
					text: 'years',
					year: '1714-1837'
				},
				{
					num: '14,120',
					text: 'archival records'
				},
				{
					num: 151,
					text: 'people and corporate bodies'
				},
				{
					num: '125,558',
					text: 'images'
				}
			],
			updated: 'Last updated 30 Oct 2019',
			articleTitle: '',
			articleParagraphs: [
				'',
				''
			]
		}
	}
}
</script>
