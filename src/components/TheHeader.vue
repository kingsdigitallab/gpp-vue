<template>
	<header class="header">
		<div class="container">
			<a href="#main-content" class="skip-link">Skip to main content</a>
			<a href="/" class="header__logo"><img src="@/assets/images/site-logo.png" alt="Georgian Papers Programme logo"></a>
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
				<form action="" method="GET" class="search-field">
					<label>
					<span hidden>Search</span>
					<!-- name, date, category, creator -->
					<input type="search" aria-label="Search" placeholder="e.g., Chevalier d’Eon" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., Chevalier d’Eon'"/>
					</label>
					<input type="submit" class="search-button" aria-label="Search button" value=""/>
				</form>
				<button v-on:click="search()" class="button-link dotted-underline">Advanced search</button>
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
	methods: {
		toggleMenu: function() {
			const mobileNav = document.querySelector('.mobile__nav')
			const nav = document.querySelector('.header__nav')
			mobileNav.classList.toggle('toggle')
			nav.classList.toggle('nav-active')
		}
	},
	watch: {
		$route(to, from) {
			switch(to.name) {
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
				case 'archival-record':
					setTimeout(function() {
						document.querySelector('.js-archive-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'people-and-corporate-bodies':
					setTimeout(function() {
						document.querySelector('.js-people-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'person-and-corporate-body':
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
	}
}
</script>
