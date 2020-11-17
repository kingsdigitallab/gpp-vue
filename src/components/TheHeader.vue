<template>
	<header class="header">
		<div class="container">
			<!-- <a href="#main-content" class="skip-link">Skip to main content</a> -->
			<router-link to="/" class="header__logo"><img src="@/assets/images/site-logo.png" alt="Georgian Papers Programme logo"></router-link>
			<nav class="header__nav">
				<ul class="header__nav-list">
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/" class="header__link js-home" exact>Home</router-link>
					</li>
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/timeline" class="header__link js-timeline">Timeline</router-link>
					</li>
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/archival-records" class="header__link js-archive-link">Archival records</router-link>
					</li>
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/people-and-corporate-bodies" class="header__link js-people-link">People and corporate bodies</router-link>
					</li>
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/about" class="header__link js-about">About</router-link>
					</li>
				</ul>
			</nav>
			<div class="header__search">
				<input type="checkbox" aria-label="Search button" id="search-icon"/>
				<label class="search-label" for="search-icon"><span hidden>Expand search bar</span></label>
				<form @submit.prevent="submit" class="search-field">
					<!-- name, date, category, creator -->
					<input type="search" v-model="searchQuery" name="search" aria-label="Search" placeholder="e.g., Chevalier d’Eon" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., Chevalier d’Eon'"/>
					<input type="submit" class="search-button" aria-label="Search button" value=""/>
				</form>
				<button v-on:click="showModal" class="button-link dotted-underline">Advanced search</button>
			</div>
			<div class="mobile__nav" role="button" v-on:click="toggleMenu">
				<div class="line1"></div>
				<div class="line2"></div>
				<div class="line3"></div>
			</div>
		</div>
		<!-- <advancedSearchModal v-show="advancedSearchShow" @close="closeModal"/> -->
	</header>
</template>

<script>
import { setTimeout } from 'timers';
import AdvancedSearchModal from './AdvancedSearchModal.vue';

export default {
	name: 'TheHeader',
	components: {AdvancedSearchModal},
	data: function() {
		return {
			advancedSearchShow: false,
			searchQuery: null
		}
	},
	watch: {
		$route(to, from) {
			switch(to.name) {
				case 'search-results':
					setTimeout(function() {
						document.querySelector('.js-home').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'timeline':
					setTimeout(function() {
						document.querySelector('.js-timeline').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'archival-records':
					setTimeout(function() {
						document.querySelector('.js-archive-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				// case 'archival-record':
				// 	setTimeout(function() {
				// 		document.querySelector('.js-archive-link').classList.add('router-link-exact-active');
				// 	}, 100);
				// 	break;
				case 'collections-series':
					setTimeout(function() {
						document.querySelector('.js-archive-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'files-items':
					setTimeout(function() {
						document.querySelector('.js-archive-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'entities':
					setTimeout(function() {
						document.querySelector('.js-people-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'entity':
					setTimeout(function() {
						document.querySelector('.js-people-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'about':
					setTimeout(function() {
						document.querySelector('.js-about').classList.add('router-link-exact-active');
					}, 100);
					break;
				default:
					setTimeout(function() {
						document.querySelector('.js-home').classList.add('router-link-exact-active');
					}, 100);
			}
		}
	},
	methods: {
		toggleMenu: function() {
			const mobileNav = document.querySelector('.mobile__nav')
			const nav = document.querySelector('.header__nav')
			mobileNav.classList.toggle('toggle')
			nav.classList.toggle('nav-active')
		},
		showModal() {
			this.advancedSearchShow = true;
		},
		closeModal() {
			this.advancedSearchShow = false;
		},
		submit(){
			this.$router.push("/search?q="+this.searchQuery);
		}
	}
}
</script>
