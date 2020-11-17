<template>
  <div class="timeline-description">
		<div class="container">
			<h1>{{getTimelineGroupDescription.title}}</h1>
            <p>{{getTimelineGroupDescription.description}}</p>
		</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TimelineDescription',
    computed: mapGetters(['getTimelineGroupDescription']),
	methods: {
        ...mapActions(['fetchTimelineGroupDescription'])
    },
    async created() {
		await this.fetchTimelineGroupDescription();
	},
}
</script>