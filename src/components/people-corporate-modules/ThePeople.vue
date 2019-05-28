<template>
	<div class="people">
		<ul class="list">
			<li class="list-item list-row">
				<span class="list-head">{{name}}</span>
				<span class="list-head">{{date}}</span>
				<span class="list-head">{{gender}}</span>
				<span class="list-head">{{bio}}</span>
			</li>
			<li :key="index" v-for="(item, index) in getPeople" class="list-item">
				<router-link :to="'/people-and-corporate-bodies/'+item.id" class="list-row">
					<span class="list-head list-head--hidden">{{name}}</span>
					<span class="list-data">{{item.display_name}}</span>
					<span class="list-head list-head--hidden">{{date}}</span>
					<span class="list-data">{{formatDate(item.identities[0].date_from)}} {{item.identities[0].date_to ? '-' : null}} {{ formatDate(item.identities[0].date_to) || null}}</span>
					<span class="list-head list-head--hidden">{{gender}}</span>
					<span class="list-data">Male</span>
					<span class="list-head list-head--hidden">{{bio}}</span>
					<span class="list-data" v-if="Array.isArray(item.descriptions)">
						<span 
							:key="description.index" 
							v-for="description in item.descriptions" 
							v-html="description.biography_history.abstract.substring(0,120).concat('...')">
						</span>
					</span>
				</router-link>
			</li>
		</ul>
		<div v-if="getPeople.length === 0" class="loader"></div>
		<button v-if="getTotal !== getPeople.length" type="button" name="button" class="btn btn-load" @click="loadMorePeople">Load more</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

function formatDate(current_datetime) {
	if (current_datetime != null)
	{
		current_datetime = new Date(current_datetime);
		const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let formatted_date = months[current_datetime.getMonth()] + " " + current_datetime.getDate() + ", " + current_datetime.getFullYear();
		return formatted_date;
	}
}

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
		...mapActions(['fetchPeople','loadMorePeople']),
		formatDate
	},
	created() { 
		this.fetchPeople();
	}
}
</script>
