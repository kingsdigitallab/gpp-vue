<template>
	<header class="header">
		<div class="container">
			<a href="/"><img src="../assets/images/site-logo.png" alt="site-logo" class="header__logo"></a>
			<span v-on:click="toggleMenu" class="header__menu-btn">Menu</span>
			<nav v-on:click="closeMenu" v-on:keyup.esc="closeMenu" class="header__nav js-nav">
				<ul class="header__nav-list">
					<li class="header__nav-item">
						<router-link to="/" class="header__link">Home</router-link>
					</li>
					<li>
						<router-link to="/archival-records" class="header__link">Archival Records</router-link>
					</li>
					<li>
						<router-link to="/people-and-corporate-bodies" class="header__link">People and corporate bodies</router-link>
					</li>
					<li class="header__nav-item">
						<router-link to="/about" class="header__link">About</router-link>
					</li>
					<li class="header__nav-item header__nav-item--search">
						<div class="header__search"><input type="text" placeholder="Search" class="header__search-input"><button type="button" class="header__search-btn"><FontAwesomeIcon icon="search" /></button></div>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch)

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
		},
	},
	mounted() {
		this.closeMenuEcs();
	}
}
</script>
