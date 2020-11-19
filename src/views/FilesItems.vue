<template>
	<main class="single-record">
		<div class="container">
            <the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<files-items-single />
		</div>
	</main>
</template>

<script>
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'
import FilesItemsSingle from '../components//archival-records-modules/FilesItemsSingle.vue'

export default {
	name: 'FilesItems',
	components: {
		TheBreadcrumbs,
		FilesItemsSingle
	},
	data: function() {
		return {
			// TODO: add params to URL?
			breadcrumbs: [{ text: 'Home', url: '/' },{ text: 'Archival records', url: '/archival-records' }]
		}
	}
}
</script>