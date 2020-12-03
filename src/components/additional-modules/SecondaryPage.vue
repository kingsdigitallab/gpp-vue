
<template>
  <div class="secondary-page">
        <template v-if="!loading">
            <secondary-page-template v-bind:wagtailPage="getPage" v-bind:mainImage="getImageURL"/>
        </template>
        <div v-else class="loader"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SecondaryPageTemplate from '../templates/SecondaryPageTemplate.vue';

export default {
  name: 'SecondaryPage',
  components: {SecondaryPageTemplate},
  computed: mapGetters(['getPage', 'getImageURL']),
  data() {
    return {
        loading: true
    }
  },
  methods: {
    ...mapActions(['fetchSecondaryPage'])
  },
  async created() {
      if (this.$route.name) {
        await this.fetchSecondaryPage(this.$route.name);
        this.loading = false;
      }
      
  }
}
</script>