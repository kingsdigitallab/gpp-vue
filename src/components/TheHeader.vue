<template>
	<header class="header">
		<div class="container">
			<a href="#main-content" class="skip-link">Skip to main content</a>
			<a href="/"><img src="../assets/images/site-logo.png" alt="site-logo" class="header__logo"></a>
			<span v-on:click="toggleMenu" class="header__menu-btn">Menu <FontAwesomeIcon icon="bars" aria-label="menu"/></span>
			<nav v-on:click="closeMenu" v-on:keyup.esc="closeMenu" class="header__nav js-nav">
				<ul class="header__nav-list">
					<li class="header__nav-item">
						<router-link to="/" class="header__link js-header-link">Home</router-link>
					</li>
					<li>
						<router-link to="/archival-records" class="header__link js-header-link js-archive-link">Archival Records</router-link>
					</li>
					<li>
						<router-link to="/people-and-corporate-bodies" class="header__link js-header-link js-people-link">People and corporate bodies</router-link>
					</li>
					<li class="header__nav-item">
						<router-link to="/about" class="header__link js-header-link">About</router-link>
					</li>
					<li class="header__nav-item header__nav-item--search">
						<div class="header__search"><input type="text" placeholder="Search" class="header__search-input" aria-label="search bar"><button type="button" class="header__search-btn"><FontAwesomeIcon icon="search" aria-label="search icon"/></button></div>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { setTimeout } from 'timers';

library.add(faSearch);
library.add(faBars);

export default {
  name: 'TheHeader',
	components: {
		FontAwesomeIcon
	},
  props: {
    msg: String
  },
	data: function() {
		return {
			navLinks: ['Home', 'Archival Records', 'People and corporate bodies', 'About']
		}
	},
	methods: {
		toggleMenu: function() {
			const nav = document.querySelector('.js-nav');
			const body = document.body;

			nav.classList.toggle('header__nav--active');
			body.classList.toggle('overflow');
		},
		closeMenu: function(e) {
			const nav = document.querySelector('.js-nav');
			const body = document.body;

			if(e.target.className !== 'header__search-input') {
				nav.classList.remove('header__nav--active');
				body.classList.remove('overflow');
			}
		},
		closeMenuEcs: function() {
			const nav = document.querySelector('.js-nav');
			const body = document.body;

			window.addEventListener('keyup', function(e) {
				if (e.keyCode === 27 && nav.classList.contains('header__nav--active')) {
					nav.classList.remove('header__nav--active');
					body.classList.remove('overflow');
				}
			})
		}
	},
	mounted() {
		this.closeMenuEcs();
	},
	watch: {
		$route(to, from) {
			switch(to.name) {
				case 'Archive Record':
					setTimeout(function() {
					document.querySelector('.js-archive-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'People and Corporate Bodies':
					setTimeout(function() {
					document.querySelector('.js-people-link').classList.add('router-link-exact-active');
					}, 100);
					break;
				case 'Person and Corporate Body':
					setTimeout(function() {
					document.querySelector('.js-people-link').classList.add('router-link-exact-active');
					}, 100);
					break;
			}
		}
	}
}
</script>
