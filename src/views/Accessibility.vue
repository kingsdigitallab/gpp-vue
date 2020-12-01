<template>
  <main class="secondary container">
      <h1 class="page-title">{{getAccessibilityPage.title}}</h1>
      <section v-html="getAccessibilityPage.body" aria-label="description"></section>
  </main>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue';

function getBreadcrumbs() {
  return [
    {
      text: "Home",
      url: '/'
    }
  ];
}

export default {
  name: 'Accessibility',
  components: {
    TheBreadcrumbs,
  },
  computed: {
    ...mapGetters(['getAccessibilityPage']),
    getBreadcrumbs,
  },
  methods: {
		...mapActions(['fetchAccessibilityPage'])
	},
	async created() {
		await this.fetchAccessibilityPage();
	}
}
</script>

<style>

</style>
