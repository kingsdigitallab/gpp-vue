<template>
	<main class="timeline">
        <timeline-top />
        <timeline-group />
	</main>
</template>

<script>
import TimelineTop from '../components/timeline-modules/TimelineTop.vue'
import TimelineGroup from '../components/timeline-modules/TimelineGroup.vue'

export default {
	name: 'Timeline',
	components: {
        TimelineTop,
		TimelineGroup
	}
}
</script>