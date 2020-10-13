<template>
	<div class="home__bottom">
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
						The Collaborative Workspace is built to solicited requirements from both academics and information professionals and brings the rigour required by archivists through the implementation of archival standards (<a href="https://www.loc.gov/ead/EAD3taglib/index.html">EAD3</a> and <a href="https://eac.staatsbibliothek-berlin.de/schema/taglibrary/cpfTagLibrary2019_EN.html">EAC-CPF</a>) while offering flexibility to scholars in allowing them to correct and augment almost all data surfaced in the Workspace. Editing is moderated to ensure fidelity.
					</p>
					<router-link to="/about" class="home__article-read">About the Georgian Papers Programme &gt;</router-link>
				</div>
			</div>
		</div>
		<h2 class="home__bottom-title">{{title}}</h2>
		<div class="home__bottom-content">
			<div class="container-wide">
				<div class="home__featured">
					<span class="home__featured-title">{{featuredTitle}}</span>
					<a href="javascript:;" class="home__card home__card--black js-card">
						<div class="home__card-icon">
							<img src="../../assets/images/organisation-icon.png" alt="organisation icon" class="home__card-icon">
							<span class="home__card-category">{{featuredCard.category}}</span>
						</div>
						<span class="home__card-date">{{featuredCard.date}}</span>
						<p class="home__card-text">{{featuredCard.text}}</p>
						<span class="home__card-author">{{featuredCard.author}}</span>
					</a>
				</div>
				<div class="home__latest">
					<span class="home__latest-title">{{latestTitle}}<router-link to="/people-and-corporate-bodies" class="home__more" aria-label="More about people and corporate bodies">More &gt;</router-link></span>
					<div class="home__latest-cards">
						<router-link :to="'/people-and-corporate-bodies/'+(index+1)" :key="index" v-for="(card, index) in latestCards" class="home__card js-card">
							<div class="home__card-icon">
								<img src="../../assets/images/organisation-icon.png" alt="organisation icon" class="home__card-icon">
								<span class="home__card-category">{{card.category}}</span>
							</div>
							<span class="home__card-date">{{card.date}}</span>
							<p class="home__card-text">{{card.text}}</p>
							<span class="home__card-author">{{card.author}}</span>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeBottom',
	data: function() {
		return {
			title: 'People and corporate bodies',
			featuredTitle: 'Featured',
			latestTitle: 'Latest',
			featuredCard: {
				img: '../../assets/images/organisation-icon.png',
				category: 'Corporate Bodies',
				text: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company nad supplied for use at brighton Pavilion.',
				author: 'Bancks, Christopher',
				date: '1 November 1817'
			},
			latestCards: [
				{
					img: '../../assets/images/organisation-icon.png',
					category: 'Corporate Bodies',
					text: 'Letter from J Pedder concerning gaslighting apparatus.',
					author: 'Pedder, John; Secretary to the Gas Llight and Coke Company',
					date: '6 October 1816'
				},
				{
					img: '../../assets/images/people-icon.png',
					category: 'People',
					text: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company nad supplied for use at brighton Pavilion.',
					author: 'Bancks, Christopher',
					date: '1 November 1817'
				},
				{
					img: '../../assets/images/people-icon.png',
					category: 'People',
					text: 'Bill issued bu Christopher Bancks for the supply of gasometers at Brighton, with a note explaining that he has been asked by Charles Bicknell to send the bill to Sir Benjamin Bloomfield.',
					author: 'Bancks, Christopher',
					date: 'January 1806 - 23 September 1817'
				},
				{
					img: '../../assets/images/people-icon.png',
					category: 'People',
					text: 'Letter from J Pedder concerning gaslighting apparatus.',
					author: 'Pedder, John; Secretary to the Gas Llight and Coke Company',
					date: '6 October 1816'
				}
			]
		}
	}
}
</script>
