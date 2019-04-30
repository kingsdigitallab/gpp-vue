<template>
	<main class="arch-records">
		<div class="container">
            <the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<archive-single />
		</div>
	</main>
</template>

<script>
import ArchiveSingle from '../components/archival-records-modules/ArchiveSingle.vue'
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'

export default {
	name: 'ArchiveRecord',
	components: {
        ArchiveSingle,
        TheBreadcrumbs
	},
	data: function() {
		return {
			breadcrumbs: [{ text: 'Home', url: '/' },{ text: 'Archival Records', url: '/archival-records' }]
		}
	}
}
</script>
