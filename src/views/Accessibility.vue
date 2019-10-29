<template>
  <section class="about" aria-label="about">
    <div class="container">
      <the-breadcrumbs :breadcrumbs="getBreadcrumbs" />
      <h1 class="page-title">{{getAccessibilityPage.title}}</h1>
      <section class="rte" v-html="getAccessibilityPage.body" aria-label="description"></section>
    </div>
  </section>

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
	created() {
		this.fetchAccessibilityPage();
	}
}
</script>

<style>

</style>
