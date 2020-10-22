<template>
  <div class="timeline-top">
		<div class="container timestamps">
			<div v-for="(group, i) in timelineGroup" v-bind:key="i" v-bind:class="[{active: $route.params.subpage == group.url}, 'timestamp']">
                <router-link :to="{name: 'timeline', params: {subpage: group.url}}">{{group.title}}</router-link>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	name: 'TimelineTop',
	data: function() {
		return {
			timelineGroup: [
                {
                    id: 1,
                    url: 'early-georgians',
                    title: 'Early Georgians'
                },
                {
                    id: 2,
                    url: 'george-III-queen-charlotte-and-their-family',
                    title: 'George III, Queen Charlotte and their family'
                },
                {
                    id: 3,
                    url: 'george-III-siblings',
                    title: 'George III siblings'
                },
                {
                    id: 4,
                    url: 'george-IV-and-princess-charlotte-of-wales',
                    title: 'George IV and Princess Charlotte of Wales'
                },
                {
                    id: 5,
                    url: 'william-iv',
                    title: 'William IV'
                }
            ]
		}
	},
	methods: {

    },
    computed: {
    }
}
</script>
