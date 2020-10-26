<template>
	<main class="records">
		<div class="container">
			<h1 class="page-title">{{title}}</h1>
			<p>{{description}}</p>
			<entity-list></entity-list>
		</div>
	</main>
</template>

<script>
import EntityList from '../components/people-corporate-modules/EntityList.vue'
// import ThePeople from '../components/people-corporate-modules/ThePeople.vue'
// import TheCorporate from '../components/people-corporate-modules/TheCorporate.vue'

export default {
	name: 'Entities',
	components: {
		EntityList
	},
	data: function() {
		return {
			id: 2,
			title: 'People & corporate bodies',
            description: 'About people and corporate bodies - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		}
	}
}
</script>
