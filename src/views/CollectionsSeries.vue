<template>
	<main class="single-record">
		<div class="container">
            <the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<collection-series-single/>
		</div>
	</main>
</template>

<script>
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'
import CollectionSeriesSingle from '../components/archival-records-modules/CollectionSeriesSingle.vue'

export default {
	name: 'CollectionsSeries',
	components: {
		TheBreadcrumbs,
		CollectionSeriesSingle
	},
	data: function() {
		return {
			// TODO: add params to URL?
			breadcrumbs: [{ text: 'Home', url: '/' },{ text: 'Archival records', url: '/archival-records' }]
		}
	}
}
</script>

