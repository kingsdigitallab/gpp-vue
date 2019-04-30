<template>
	<main class="arch-records">
		<div class="container">
			<the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<h1 class="page-title">{{title}}</h1>
			<select class="archive__select" name="archive-select">
				<option value="newest">Newest</option>
				<option value="oldest">Oldest</option>
			</select>
			<archive-list />
		</div>
	</main>
</template>

<script>
import ArchiveList from '../components/archival-records-modules/ArchiveList.vue'
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'

export default {
	name: 'ArchivalRecords',
	components: {
		ArchiveList,
		TheBreadcrumbs
	},
	data: function() {
		return {
			title: 'Archival Records',
			breadcrumbs: [{ text: 'Home', url: '/' }]
		}
	}
}
</script>
