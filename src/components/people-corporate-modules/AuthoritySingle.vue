<template>
	<div>
		<div v-show="loading" class="loader"></div>
		<article class="arch-single" v-show="!loading">
			<h1 class="page-title page-title--single">{{getAuthority.display_name}}</h1>

			<section v-if="Array.isArray(getAuthority.descriptions)" class="arch-single__desc">
				<h2 class="arch-single__desc-title">{{description}}</h2>
				<p class="arch-single__desc-text" :key="index" v-for="(data, index) in getAuthority.descriptions">
					<section class="rte" v-html="data.biography_history.abstract"></section>
				</p>
			</section>

			<section class="arch-single__meta">
				<h2 class="arch-single__meta-title">About</h2>
				<ul v-if="Array.isArray(getAuthority.identities)" class="arch-single__list">
					<li class="arch-single__item">
						<span class="arch-single__item-name">Born</span>
						<span class="arch-single__item-content">{{getAuthority.identities[0].date_from || null}}</span>
					</li>
					<li class="arch-single__item">
						<span class="arch-single__item-name">Died</span>
						<span class="arch-single__item-content">{{getAuthority.identities[0].date_to || null}}</span>
					</li>
					<li class="arch-single__item">
						<span class="arch-single__item-name"> Titles </span>
						<p class="arch-single__item-content">
							<span :key="index" v-for="(data, index) in getAuthority.identities[0].name_entries"> {{data.display_name}} <br/> </span>
						</p>
					</li>
				</ul>
			</section>
		</article>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
	name: 'AuthoritySingle',
	components: {
	},
	computed: mapGetters(['getAuthority']),
	data: function() {
		return {
				description: 'Description',
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
		...mapActions(['fetchAuthority'])
	},
	created() {
		this.loading = true;
	},
	async mounted() {
		await this.fetchAuthority(this.$route.params.id);
		this.loading = false;
	}
}
</script>
