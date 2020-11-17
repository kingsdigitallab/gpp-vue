<template>
	<main class="records">
		<div class="container">
			<h1 class="page-title">{{getAuthorityEntitiesPageTitle}}</h1>
			<p>{{getAuthorityEntitiesPageDescription}}</p>
			<entity-list></entity-list>
		</div>
	</main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EntityList from '../components/people-corporate-modules/EntityList.vue'

export default {
	name: 'Entities',
	computed: mapGetters(['getAuthorityEntitiesPageTitle', 'getAuthorityEntitiesPageDescription']),
	components: {
		EntityList
	},
	methods: {
		...mapActions(['fetchEntityPageDescription'])
	},
	async created() {
		await this.fetchEntityPageDescription();
	}
}
</script>
