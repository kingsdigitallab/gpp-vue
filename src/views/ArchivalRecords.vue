<template>
	<main class="archival-records">
		<div class="container">
			<h1 class="page-title">{{title}}</h1>
			<p>{{description}}</p>
			<archive-list></archive-list>
		</div>
	</main>
</template>

<script>
import ArchiveList from '../components/archival-records-modules/ArchiveList.vue'

export default {
	name: 'ArchivalRecords',
	components: {
		ArchiveList
	},
	data: function() {
		return {
            id: 1,
            title: 'Archival records',
            description: 'About archival records - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		}
	},
}
</script>
