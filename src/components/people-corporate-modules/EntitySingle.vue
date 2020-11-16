<template>
	<div>
		<div class="entity" v-if="!loading">
			<div class="identity-list" v-if="getAuthority.identities.length > 1">
				<strong>Identities:</strong>
				<ul class="identity-tabs" v-for="(identity, i) in getAuthority.identities" v-bind:key="i">
					<!-- TODO change to identity.authorised_display_name -->
					<li role="button" v-on:click="changeIdentity(i)" v-bind:class="['identity-tab', {'active': activeIdentity == i}]">{{identity.name_entries[0].display_name}}</li>
				</ul>
			</div>
			<div class="identity-description two-column-70-30">
					<div>
						<!-- TODO send authorised name form -->
						<h1>{{identity.name_entries[0].display_name}}</h1>
						<p v-if="identity.name_entries && identity.name_entries.length > 1">
							<b>Also known as:</b> 
							<span v-for="(name_entry, i) in identity.name_entries.slice(1)" v-bind:key="i">
								<!-- TODO change name_entry.date_from - .date_to to .display_date -->
								{{name_entry.display_name}} 
								<template v-if="name_entry.display_date">(name used: {{name_entry.display_date}})</template>
								<template v-if="i != identity.name_entries.length-2">;</template>
							</span>
							<br>
							<br>
						</p>
						<!-- TODO send one description rather than an array of descriptions -->
						<template v-if="identity.descriptions.length > 0">
							<p v-html="identity.descriptions[activeDescription].biography_history.abstract"></p>
							<p v-html="identity.descriptions[activeDescription].biography_history.biography"></p>
							<h4>Biography sources:</h4>
							<p v-html="identity.descriptions[activeDescription].biography_history.sources"></p>
							<br>
							<p v-html="identity.descriptions[activeDescription].biography_history.copyright"></p>
						</template>
					</div>
					<div class="grey-column">
						<div class="two-column-40-60" v-if="identity.display_date">
							<h4>Dates of existence</h4>
							<span>{{identity.display_date}}</span>
						</div>
						<!-- ADD identity.genders.length > 0 -->
						<!-- TODO send an array of listed genders -->
						<div v-if="identity.descriptions[activeDescription].genders && identity.descriptions[activeDescription].genders.length > 0">
							<h4>Genders</h4>
							<div v-for="(gender, i) in identity.descriptions[activeDescription].genders" v-bind:key="i" class="two-column-40-60">
								<span>{{gender.title}}</span>
								<span>
									{{gender.display_date}}<br>
									{{gender.descriptive_notes}}<br>
									<template v-html="gender.citation"></template>
								</span>
							</div>
						</div>
						<div class="two-column-40-60" v-if="identity.descriptions[activeDescription].language_script && identity.descriptions[activeDescription].language_scripts.length > 0">
							<h4>Languages used</h4>
							<ul class="flex">
								<li v-for="(language, i) in identity.descriptions[0].language_scripts" v-bind:key="i">
									{{language}}<template v-if="i != identity.descriptions[0].language_scripts.length - 1">, </template>
								</li>
							</ul>
						</div>
						<div class="two-column-40-60" v-if="identity.descriptions[activeDescription].functions && identity.descriptions[activeDescription].functions.length > 0">
							<h4>Functions</h4>
							<ul>
								<li v-for="(entityFunction, i) in identity.descriptions[activeDescription].functions" v-bind:key="i">
									{{entityFunction.title}} (used: {{entityFunction.display_date}})<template v-if="i != identity.descriptions[activeDescription].functions.length - 1">, </template>
								</li>
							</ul>
						</div>
						<div v-if="identity.descriptions[activeDescription].places && identity.descriptions[activeDescription].places.length > 0">
							<h4>Associated places</h4>
							<div v-for="(place, i) in identity.descriptions[activeDescription].places" v-bind:key="i" class="two-column-40-60">
								<span>
									{{place.role}}<br>
									{{place.display_date}}
								</span>
								<span>
									{{place.title}}<br>
									{{place.address}}
								</span>
							</div>
							<!-- TODO ADD SHOW MORE -->
						</div>
						<div v-if="identity.descriptions[activeDescription].events && identity.descriptions[activeDescription].events.length > 0">
							<h4>Related events</h4>
							<div v-for="(event, i) in identity.descriptions[activeDescription].events" v-bind:key="i" class="two-column-40-60">
								<span>
									{{event.display_date}}
								</span>
								<span>
									{{event.title}}<br>
									{{event.place}}
								</span>
							</div>
							<!-- TODO ADD SHOW MORE -->
						</div>
					</div>
			</div>
			<div class="descriptions-section" v-if="identity.related_records && identity.related_records.length > 0 || identity.related_entites && identity.related_entites.length > 0">
				<h2>Related</h2>
				<div class="grey-column description column-delimiter">
					<!-- ADD identity.related_records.length > 0 -->
					<div v-if="identity.related_records && identity.related_records.length > 0">
						<h3>Related archival records</h3>
						<p v-for="(related_record, i) in identity.related_records" v-bind:key="i">
							<router-link :to="{}">{{related_record.title}}</router-link>
							<br>
							<strong>Related as:</strong> {{related_record.related_as}}
						</p>
					</div>
					<!-- ADD identity.related_entities.length > 0 -->
					<div v-if="identity.related_entities && identity.related_entities.length > 0">
						<h3>Related people and corporate bodies</h3>
						<p v-for="(related_entity, i) in identity.related_entities" v-bind:key="i">
							<router-link :to="{}">{{related_entity.title}}</router-link>
							<br>
							<strong>Related as:</strong> {{related_entity.related_as}}
						</p>
					</div>
				</div>
			</div>
			<div class="descriptions-section" v-if="identity.resources && identity.resources.length > 0">
				<h2>Additional resources about {{identity.name_entries[0].display_name}}</h2>
				<ol>
					<li v-for="(resource, i) in identity.resources" v-bind:key="i">
						<span v-html="resource.citation"></span>
						<br>
						<strong>Related as:</strong> {{resource.related_as}}<br>
						<a v-bind:href="resource.url">{{resource.url}}</a>, {{resource.notes}}
					</li>
				</ol>
			</div>
			<div class="descriptions-section" v-if="getAuthority.sources && getAuthority.sources.length > 0">
				<h2>Record references</h2>
				<ol>
					<li v-for="(source, i) in getAuthority.sources" v-bind:key="i">
						<span v-html="source.title"></span>
						<br>
						<a v-bind:href="source.url">{{source.url}}</a><br>
						{{source.notes}}
					</li>
				</ol>
			</div>
			<div class="descriptions-section" v-if="getAuthority.rights_declaration">
				<h2>Digital rights declaration</h2>
				<div class="grey-column">
					<p v-html="getAuthority.rights_declaration"></p>
				</div>
			</div>
		</div>
		<div v-else class="loader"></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
	name: 'EntitySingle',
	components: {},
	computed: mapGetters(['getAuthority']),
	data: function() {
		return {
			loading: true,
			activeIdentity: 0,
			activeDescription: 0,
			identity: []
		}
	},
	methods: {
		changeIdentity(i) {
			if (this.activeIdentity != i) {
				this.activeIdentity = i;
				// fetchIdentity?
				this.identity = this.getAuthority.identities[i];
			}
		},
		...mapActions(['fetchAuthority'])
	},
	created() {
		this.loading = true;
		// fetchIdentity?
	},
	async mounted() {
		await this.fetchAuthority(this.$route.params.id);
		this.loading = false;
		this.identity = this.getAuthority.identities[0];
	}
}
</script>
