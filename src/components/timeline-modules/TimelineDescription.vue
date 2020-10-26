<template>
  <div class="timeline-description">
		<div class="container">
			<h1>{{title}}</h1>
            <p>{{description}}</p>
		</div>
  </div>
</template>

<script>

export default {
    name: 'TimelineDescription',
	data: function() {
		return {
            id: 1,
            title: 'Early Georgians',
            description: 'Early Georgians - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		}
    },
    methods: {
        updatePage(url) {
            console.log(url);
        }
    },
    watch: {
        $route() {
            this.updatePage(this.$route.params.subpage)
        }
    }
}
</script>