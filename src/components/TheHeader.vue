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
						<router-link to="/archival-records" class="header__link js-archival-records">Archival records</router-link>
					</li>
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/people-and-corporate-bodies" class="header__link js-entities">People and corporate bodies</router-link>
					</li>
					<li class="header__nav-item" v-on:click="toggleMenu">
						<router-link to="/about" class="header__link js-about">About</router-link>
					</li>
				</ul>
			</nav>
			<div class="header__search">
				<input type="checkbox" aria-label="Search button" id="search-icon" v-on:click="toggleSearch"/>
				<label class="search-label" for="search-icon"><span hidden>Expand search bar</span></label>
				<form @submit.prevent="submit" class="search-field">
					<input type="search" v-model="searchTerm" name="search" aria-label="Search" placeholder="e.g., Chevalier d’Eon" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., Chevalier d’Eon'"/>
					<input type="submit" class="search-button" aria-label="Search button" value=""/>
				</form>
			</div>
			<div class="mobile__nav" role="button" v-on:click="toggleMenu">
				<div class="line1"></div>
				<div class="line2"></div>
				<div class="line3"></div>
			</div>
		</div>
	</header>
</template>

<script>
import { setTimeout } from 'timers';

export default {
	name: 'TheHeader',
	components: {},
	data: function() {
		return {
			searchTerm: ''
		}
	},
	methods: {
		toggleMenu: function() {
			document.getElementById('search-icon').checked = false;
			const mobileNav = document.querySelector('.mobile__nav');
			const nav = document.querySelector('.header__nav');
			mobileNav.classList.toggle('toggle');
			nav.classList.toggle('nav-active');
		},
		toggleSearch: function() {
			document.querySelector('.mobile__nav').classList.remove('toggle');
			document.querySelector('.header__nav').classList.remove('nav-active');
		},
		setPage(to) {
			switch(to.name) {
				case 'search-results':
					break;
				case 'not-found':
					break;
				case 'accessibility-statement':
					break;
				case 'collections-series':
					this.setActivePage('archival-records');
					break;
				case 'files-items':
					this.setActivePage('archival-records');
					break;
				case 'entity':
					setTimeout(function() {
						document.querySelector('.js-people-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				default: 
					this.setActivePage(to.name);
				}
		},
		setActivePage(pageName) {
			setTimeout(function() {
				if(document.querySelector('.js-'+pageName)) {
				document.querySelector('.js-'+pageName).classList.add('router-link-exact-active');
				}
			}, 100);
		},
		submit(){
			if (this.searchTerm != '') {
				this.$router.push("/search?q="+this.searchTerm);
			}
		}
	}
}
</script>
