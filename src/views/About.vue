<template>
  <main class="about-page container">
      <h1 class="page-title">{{getPage.title}}</h1>
      <p class="introduction">{{getPage.introduction}}</p>
      <img :src="getImageURL" alt="">
      <p v-html="getPage.body"></p>
  </main>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'About',
  components: {
  },
  computed: {
    ...mapGetters(['getPage','getImageURL'])
  },
  methods: {
		...mapActions(['fetchPage'])
	},
	async created() {
		await this.fetchPage();
	}
}
</script>

<style>

</style>
