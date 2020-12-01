<template>
  <div class="home-top">
		<div class="container">
			<h1>Explore the Georgian era, 1714-1837</h1>
			<div class="home-stats">
				<div class="home-stats-group">
					<p class="home-stats-num">123</p>
					<p>years of history</p>
				</div>
				<div v-bind:key="index" v-for="(stat, index) in getHomeStats" class="home-stats-group">
					<p class="home-stats-num">{{stat.num}}</p>
					<p>{{stat.text}}</p>
					<span v-if="stat.year" class="home__stats-year">{{stat.year}}</span>
				</div>
			</div>
			<div class="home-search">
				<form class="search-field">
					<input type="search" v-model="searchQuery" name="search" aria-label="Search" placeholder="e.g., menu book for George IV, identities of Maria van Antwerpen" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., menu book for George IV, identities of Maria van Antwerpen'"/>
					<input type="submit" class="search-button" @click.stop.prevent="submit()" aria-label="Search button" value=""/>
				</form>
			</div>
		</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'HomeTop',
	computed: mapGetters(['getHomeStats']),
	components: {},
	data: function() {
		return {
			searchQuery: '',
		}
	},
	methods: {
		submit(){
			this.$router.push("/search?q="+this.searchQuery);
		},
		...mapActions(['fetchHomeStats'])
	},
	async created() {
		await this.fetchHomeStats();
	}
}
</script>
