<template>
	<main class="records">
		<div class="container">
			<h1 class="page-title">{{getArchivalRecordsPageTitle}}</h1>
			<p>{{getArchivalRecordsPageDescription}}</p>
			<archive-list></archive-list>
		</div>
	</main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ArchiveList from '../components/archival-records-modules/ArchiveList.vue'

export default {
	name: 'ArchivalRecords',
	computed: mapGetters(['getArchivalRecordsPageTitle', 'getArchivalRecordsPageDescription']),
	components: {
		ArchiveList
	},
	methods: {
		...mapActions(['fetchArchivalRecordsPageDescription'])
	},
	async created() {
		await this.fetchArchivalRecordsPageDescription();
	}
}
</script>
