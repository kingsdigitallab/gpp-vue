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
			<span class="home__article-title">{{articleTitle}}</span>
			<div class="home__article-content">
				<div class="container-wide">
					<p :key="index" v-for="(paragraph, index) in articleParagraphs" class="home__article-para">{{paragraph}}</p>
					<router-link to="/about" class="home__article-read">Read more &gt;</router-link>
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
					num: 54,
					text: 'years',
					year: '1817-1879'
				},
				{
					num: 1440,
					text: 'archival records'
				},
				{
					num: 13694,
					text: 'people and corporate bodies'
				},
				{
					num: 165454,
					text: 'images'
				}
			],
			updated: 'Last updated 5 Jan 2019',
			articleTitle: 'About georgian papers online',
			articleParagraphs: [
				'Georgian Papers Online is the catalogue of the Georgian Papers Programme, a five-year project to transform access to the extensive collection od Georgian papers held in the Royal Archives ans Royal Library at Windsor. The Georgian Papers Programme is a partnership between the Royal Archives and Royal Library with King\'s College London. The Omohundro Institute of Early American History and Culture and William & Mary share in this as primary partners for the USA.',
				'The Georgian Papers Programme will make avilable online the historic manuscripts, both official and private, relating to the Georgian monarchy held in the Royal Archives and Royal Library, in addition to relevant collections held by King\'s College LOndon, by the year 2021. Most of these papers relate to George III and to a lesser extent, George IV, althought papers from the reigns of George I, George II and William IV will also be included, as will those relating to other members of the Royal Family from the Georgian period.'
			]
		}
	}
}
</script>
