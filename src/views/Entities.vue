<template>
	<main class="records container">
		<h1 class="page-title">People and corporate bodies</h1>
		<p>{{getAuthorityEntitiesPageDescription}}</p>
		<entity-list></entity-list>
	</main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EntityList from '../components/people-corporate-modules/EntityList.vue'

export default {
	name: 'Entities',
	computed: mapGetters(['getAuthorityEntitiesPageDescription']),
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
