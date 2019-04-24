<template>
	<div class="people">
		<ul class="list">
			<li class="list-item list-row">
				<span class="list-head">{{name}}</span>
				<span class="list-head">{{date}}</span>
				<span class="list-head">{{gender}}</span>
				<span class="list-head">{{bio}}</span>
			</li>
			<li :key="index" v-for="(item, index) in getPeople" class="list-item list-row">
				<span class="list-head list-head--hidden">{{name}}</span>
				<span class="list-data">{{item.display_name}}</span>
				<span class="list-head list-head--hidden">{{date}}</span>
				<span class="list-data">{{item.date}}</span>
				<span class="list-head list-head--hidden">{{gender}}</span>
				<span class="list-data">{{item.gender}}</span>
				<span v-if="item.bio" class="list-head list-head--hidden">{{bio}}</span>
				<span v-if="item.bio" class="list-data">{{item.bio}}</span>
			</li>
		</ul>
		<div v-if="getPeople.length === 0" class="loader"></div>
		<button v-if="getTotal !== getPeople.length" type="button" name="button" class="btn btn-load" @click="loadMorePeople">Load more</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ThePeople',
	computed: mapGetters(['getPeople','getTotal']),
	data: function() {
		return {
			name: 'Name',
			date: 'Date of existence',
			gender: 'Gender',
			bio: 'Bio snippets',
			listItems: [
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: ''
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
				{
					name: 'Bancks, Christopher',
					date: '1762-1800',
					gender: 'Male',
					bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.'
				},
			]
		}
	},
	methods: {
		...mapActions(['fetchPeople','loadMorePeople'])
	},
	created() { 
		this.fetchPeople();
	}
}
</script>
