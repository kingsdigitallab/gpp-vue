<template>
  <div class="timeline-top">
		<div class="container timestamps">
			<div v-for="(group, i) in getTimelineGroupTitles" v-bind:key="i" v-bind:class="[{active: $route.params.subpage == group.url_slug}, 'timestamp']">
          <router-link :to="{name: 'timeline', params: {subpage: group.url_slug}}">{{group.title}}</router-link>
			</div>
		</div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TimelineTop',
    computed: mapGetters(['getTimelineGroupTitles']),
    methods: {
        ...mapActions(['fetchTimelineGroupTitles'])
    },
    async created() {
      await this.fetchTimelineGroupTitles();
    }
}

</script>
