<template>
  <main class="about-page container">
      <the-breadcrumbs :breadcrumbs="breadcrumbs"/>
      <h1 class="page-title">{{getPage.title}}</h1>
      <p class="introduction">{{getPage.introduction}}</p>
      <img v-if="getImageURL" :src="getImageURL.resource" :alt="getImageURL.alt">
      <p v-html="getPage.body"></p>
  </main>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'

export default {
  name: 'About',
  computed: {
    ...mapGetters(['getPage','getImageURL'])
  },
  components: {
    TheBreadcrumbs,
  },
  data: function() {
		return {
			breadcrumbs: []
		}
	},
  methods: {
		...mapActions(['fetchSecondaryPage'])
	},
	async created() {
		await this.fetchSecondaryPage('about');
	}
}
</script>
