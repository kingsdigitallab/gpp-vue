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
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      if (window.scrollY || window.pageYOffset || document.body.scrollTop) {
        document.querySelector('.header').classList.add('fixed');
      } else {
        document.querySelector('.header').classList.remove('fixed');
      }
    }
  }
}
</script>

<style lang="scss">
@import './scss/style.scss';
@import './scss/all.min.css';
</style>
