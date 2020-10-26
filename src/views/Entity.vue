<template>
	<main class="arch-records">
		<div class="container">
            <the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<entity-single />
		</div>
	</main>
</template>

<script>
import EntitySingle from '../components/people-corporate-modules/EntitySingle.vue'
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'

export default {
	name: 'Entity',
	components: {
        EntitySingle,
        TheBreadcrumbs
	},
	data: function() {
		return {
			breadcrumbs: [{ text: 'Home', url: '/' },{ text: 'People and Corporate Bodies', url: '/people-and-corporate-bodies' }]
		}
	}
}
</script>
