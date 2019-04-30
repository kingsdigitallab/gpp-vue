<template>
	<main class="arch-records">
		<div class="container">
            <the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<authority-single />
		</div>
	</main>
</template>

<script>
import AuthoritySingle from '../components/people-corporate-modules/AuthoritySingle.vue'
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'

export default {
	name: 'PersonAndCorporateBody',
	components: {
        AuthoritySingle,
        TheBreadcrumbs
	},
	data: function() {
		return {
			breadcrumbs: [{ text: 'Home', url: '/' },{ text: 'People and Corporate Bodies', url: '/people-and-corporate-bodies' }]
		}
	}
}
</script>
