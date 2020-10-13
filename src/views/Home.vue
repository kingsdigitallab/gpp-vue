<template>
	<main class="home">
		<home-top />
		<home-timeline />
		<home-bottom />
	</main>
</template>

<script>
import HomeTop from '../components/home-modules/HomeTop.vue'
import HomeTimeline from '../components/home-modules/HomeTimeline.vue'
import HomeBottom from '../components/home-modules/HomeBottom.vue'

export default {
	name: 'Home',
	components: {
		HomeTop,
		HomeTimeline,
		HomeBottom
	}
}
</script>
