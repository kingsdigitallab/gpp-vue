<template>
	<main class="home">
		<home-top />
		<home-mid />
		<home-bottom />
	</main>
</template>

<script>
import HomeTop from '../components/home-modules/HomeTop.vue'
import HomeMid from '../components/home-modules/HomeMid.vue'
import HomeBottom from '../components/home-modules/HomeBottom.vue'

export default {
	name: 'Home',
	components: {
		HomeTop,
		HomeMid,
		HomeBottom
	}
}
</script>
