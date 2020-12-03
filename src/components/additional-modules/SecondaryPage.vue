
<template>
  <div class="secondary-page">
        <template v-if="!loading">
           <h1 class="page-title">{{getPage.title}}</h1>
            <p v-if="getPage.introduction" class="introduction" v-html="getPage.introduction"></p>
            <img v-if="getImageURL.resource && getImageURL.resource != ''" :src="getImageURL.resource" :alt="getImageURL.alt"/>
            <div class="description" v-html="getPage.body"></div>
        </template>
        <div v-else class="loader"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SecondaryPage',
  components: {},
  computed: mapGetters(['getPage', 'getImageURL']),
  data() {
    return {
        loading: true
    }
  },
  methods: {
        async updatePage() {
            this.loading = true;
            await this.fetchSecondaryPage(this.$route.name);
            this.loading = false;
        },
        ...mapActions(['fetchSecondaryPage'])
  },
  async created() {
      if (this.$route.name) {
        this.updatePage();
      }
  },
  watch: {
        $route(to, from) {
            if(to.name) {
                this.updatePage()
            }
        }
    }
}
</script>