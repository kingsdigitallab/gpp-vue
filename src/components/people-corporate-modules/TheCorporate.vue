<template>
	<div class="corporate">
		<ul class="list">
			<li class="list-item list-row">
				<span class="list-head">{{name}}</span>
				<span class="list-head">{{date}}</span>
				<span class="list-head">{{bio}}</span>
			</li>
			<li :key="index" v-for="(item, index) in listItems" class="list-item list-row">
				<span class="list-head list-head--hidden">{{name}}</span>
				<span class="list-data">{{item.name}}</span>
				<span class="list-head list-head--hidden">{{date}}</span>
				<span class="list-data">{{item.date}}</span>
				<span v-if="item.bio" class="list-head list-head--hidden">{{bio}}</span>
				<span v-if="item.bio" class="list-data">{{item.bio}}</span>
			</li>
		</ul>
		<button type="button" name="button" class="btn btn-load">Load more</button>
		<div class="loader"></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Corporate',
	computed: mapGetters(['getCorporate']),
	data: function() {
		return {
			name: 'Name',
			date: 'Date of existence',
			bio: 'Bio snippets',
			listItems: [
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
			]
		}
	},
	methods: {
		...mapActions(['fetchCorporate'])
	},
	created() { 
		this.fetchCorporate();
	}
}
</script>
