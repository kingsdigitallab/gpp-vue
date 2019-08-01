<template>
  <div id="app">
    <TheHeader/>
    <router-view id="main-content"/>
		<TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'app',
  components: {
    TheHeader,
		TheFooter
  }
}
</script>

<style lang="scss">
@import './scss/style.scss';

</style>
