<template>
	<div class="home__mid">
		<h2 class="home__mid-title">{{title}}</h2>
		<div class="home__mid-content">
			<div class="container-wide">
				<div class="home__featured">
					<span class="home__featured-title">{{featuredTitle}}</span>
					<a href="javascript:;" class="home__card home__card--black">
						<div class="home__card-img">
							<img src="../../assets/images/document.png" alt="document photo" class="home__card-photo">
							<span class="home__card-num">{{featuredCard.num}}</span>
						</div>
						<div class="home__card-details js-card-details">
							<p class="home__card-text">{{featuredCard.text}}</p>
							<div class="home__card-bottom">
								<span class="home__card-author">{{featuredCard.author}}</span>
								<span class="home__card-date">{{featuredCard.date}}</span>
							</div>
						</div>
					</a>
				</div>
				<div class="home__latest">
					<span class="home__latest-title">{{latestTitle}}<router-link to="/archival-records" class="home__more" aria-label="More about archival records">More &gt;</router-link></span>
					<div class="home__latest-cards">
						<router-link :to="'/archival-records/'+(index+1)" :aria-label="'Read more about'+(index)" :key="index" v-for="(card, index) in latestCards" class="home__card">
							<div class="home__card-img">
								<img src="../../assets/images/document.png" alt="document photo" class="home__card-photo">
								<span class="home__card-num">{{card.num}}</span>
							</div>
							<div class="home__card-details js-card-details">
								<p class="home__card-text">{{card.text}}</p>
								<div class="home__card-bottom">
									<span class="home__card-author">{{card.author}}</span>
									<span class="home__card-date">{{card.date}}</span>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeMid',
	data: function() {
		return {
			title: 'Archival records',
			featuredTitle: 'Featured',
			latestTitle: 'Latest',
			featuredCard: {
				img: '../../assets/images/document.png',
				num: '+2',
				text: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company had supplied for use at Brighton Pavilion.',
				author: 'Bancks, Christopher',
				date: '1 November 1817'
			},
			latestCards: [
				{
					img: '../../assets/images/document.png',
					num: '+2',
					text: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company had supplied for use at Brighton Pavilion.',
					author: 'Bancks, Christopher',
					date: '1 November 1817'
				},
				{
					img: '../../assets/images/document.png',
					num: '+14',
					text: 'Letter from J Pedder concerning gaslighting apparatus',
					author: 'Pedder, John; Secretary to the Gas Light and Coke Company',
					date: '6 October 1816'
				},
				{
					img: '../../assets/images/document.png',
					num: '+2',
					text: 'Letter from Christopher Bancks to Charles Bicknell concerning the gasometers his company had supplied for use at Brighton Pavilion.',
					author: 'Bancks, Christopher',
					date: '1 November 1817'
				},
				{
					img: '../../assets/images/document.png',
					num: '+14',
					text: 'Bill issued by Christopher Banks for the supply of gasometers at Brighton, with a note explaining that he has been asked by Charles Bicknell to send the bill to Sir Benjamin Bloomfield.',
					author: 'Bancks, Christopher',
					date: 'January 1806 - 23 September 1817'
				}
			]
		}
	}
}
</script>
