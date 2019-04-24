<template>
	<main class="people-corp">
		<div class="container">
			<the-breadcrumbs :breadcrumbs="breadcrumbs" />
			<h1 class="page-title">{{title}}</h1>
			<select class="people__select" name="people-select">
				<option value="newest">Newest</option>
				<option value="oldest">Oldest</option>
			</select>
			<button
				:key="index"
				v-for="(tab, index) in tabs"
				@click="activeTab(index, $event)"
				type="button"
				name="button"
				v-bind:class="{'btn': true, 'btn--active': index === 0}">{{tab}}</button>
			<the-people v-show="currentTab === 0" />
			<the-corporate v-show="currentTab === 1" />
		</div>
	</main>
</template>

<script>
import ThePeople from '../components/people-corporate-modules/ThePeople.vue'
import TheCorporate from '../components/people-corporate-modules/TheCorporate.vue'
import TheBreadcrumbs from '../components/TheBreadcrumbs.vue'

export default {
	name: 'PeopleAndCorporate',
	components: {
		ThePeople,
		TheCorporate,
		TheBreadcrumbs
	},
	data: function() {
		return {
			title: 'People and corporate bodies',
			dropdownItems: ['Newest', 'Latest'],
			dropdownChosen: '',
			currentTab: 0,
			tabs: ['People','Corporate Bodies'],
			breadcrumbs: [{ text: 'Home', url: '/' }]
		}
	},
	methods: {
		activeTab: function(index, event) {
			this.$data.currentTab = index;
			const siblings = [...event.target.parentNode.children];

			for(let sibling of siblings) {
				if(sibling.classList.contains('btn--active')) {
					sibling.classList.remove('btn--active');
				}
			}
			event.target.classList.add('btn--active');
		}
	}
}
</script>
