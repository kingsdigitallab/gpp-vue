<template>
	<main class="timeline">
        <timeline-top />
        <timeline-description />
        <timeline-group />
	</main>
</template>

<script>
import TimelineTop from '../components/timeline-modules/TimelineTop.vue'
import TimelineDescription from '../components/timeline-modules/TimelineDescription.vue'
import TimelineGroup from '../components/timeline-modules/TimelineGroup.vue'

export default {
	name: 'Timeline',
	components: {
        TimelineTop,
        TimelineDescription,
		TimelineGroup
	}
}
</script>