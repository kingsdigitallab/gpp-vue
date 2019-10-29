<template>
  <section class="about" aria-label="about">
    <div class="container">
      <the-breadcrumbs :breadcrumbs="getBreadcrumbs" />
      <h1 class="page-title">{{getPage.title}}</h1>
      <section class="rte" v-html="getPage.body" aria-label="description"></section>
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
    ...mapGetters(['getPage']),
    getBreadcrumbs,
  },
  methods: {
		...mapActions(['fetchPage'])
	},
	created() {
		this.fetchPage();
	}
}
</script>

<style>

</style>
