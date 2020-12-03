<template>
    <!-- used for bibligraphy, glossary, events and acknowledgements -->
    <div>
        <h1 class="page-title">{{wagtailPage.title}}</h1>
        <div v-if="wagtailPage.introduction" class="introduction" v-html="wagtailPage.introduction"></div>
        <img v-if="mainImage.resource && mainImage.resource != ''" :src="mainImage.resource" :alt="mainImage.alt"/>
        <div class="body" v-html="wagtailPage.body"></div>
    </div>
</template>

<script>

export default {
  name: 'SecondaryPageTemplate',
  props: ['wagtailPage', 'mainImage'],
  components: {}
}
</script>