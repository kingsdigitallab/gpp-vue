<template>
	<div>
		<div class="entity" v-if="!loading">
			<div class="identity-list">
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
						</p>
						<br>
						<br>
						<template v-if="identity.descriptions.length > 0">
							<p v-html="identity.descriptions[activeDescription].biography_history.abstract"></p>
							<p v-html="identity.descriptions[activeDescription].biography_history.biography"></p>
							<h4>Biography sources:</h4>
							<p v-html="identity.descriptions[activeDescription].biography_history.sources"></p>
							<br>
							<p v-html="identity.descriptions[activeDescription].biography_history.copyright"></p>
						</template>
					</div>
					<div class="grey-column" v-if="identity.descriptions.length > 0">
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
			<div class="descriptions-section" v-if="identity.descriptions && identity.descriptions.length > 1">
				<h2>Other descriptions of {{identity.name_entries[0].display_name}}</h2>
				<div v-for="(description, i) in identity.descriptions" v-show="activeDescription != i" v-bind:key="i" class="grey-column description column-delimiter">
					<div class="abstract" v-html="description.biography_history.abstract"></div>
					<div>
						<div class="two-column-40-60" v-if="description.genders && description.genders.length > 0">
							<h4>Genders</h4>
							<ul class="flex">
								<!-- TODO add route to the list page with filters -->
								<li v-for="(gender, i) in description.genders" v-bind:key="i" class="mgn-right">
									<router-link :to="{}" class="dotted-underline">{{gender.title}}</router-link><template v-if="i != description.genders.length - 1">, </template>
								</li>
							</ul>
						</div>
						<div class="two-column-40-60" v-if="description.language_scripts && description.language_scripts.length > 0">
							<h4>Languages used</h4>
							<ul class="flex">
								<!-- TODO add route to the list page with filters -->
								<li v-for="(language, i) in description.language_scripts" v-bind:key="i" class="mgn-right">
									{{language}}<template v-if="i != description.language_scripts.length - 1">, </template>
								</li>
							</ul>
						</div>
						<div class="two-column-40-60" v-if="description.functions && description.functions.length > 0">
							<h4>Functions</h4>
							<ul class="flex">
								<!-- TODO add route to the list page with filters -->
								<li v-for="(entityFunction, i) in description.functions" v-bind:key="i" class="mgn-right">
									{{entityFunction.title}} (used: {{entityFunction.display_date}})<template v-if="i != description.functions.length - 1">, </template>
								</li>
							</ul>
						</div>
					</div>
					<button type="button" v-on:click="activeDescription = i" class="button-default large arrow">See this description</button>
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
			identity: [],
			entity_PLACEHOLDER: {
				identities: [
					{
						"display_date": "1983-03-03",
						"authorised_display_name": "Authorised display name",
						"name_entries": [
							{
								"display_name": "display_name1",
								"display_date": "display_date1"
							},
							{
								"display_name": "display_name2",
								"display_date": "display_date2"
							}
						],
						"descriptions": [
							{
								"biography_history": {
									"abstract": "abstract1",
									"biography": "biography1",
									"sources": "sources1",
									"copyright": "copyright1"
								},
								"genders": [
									{
										"title": "gender11",
										"display_date":  "display_date11",
										"descriptive_notes": "descriptive_notes11",
										"citation": "citation11"
									},
									{
										"title": "gender12",
										"display_date":  "display_date12",
										"descriptive_notes": "descriptive_notes12",
										"citation": "citation12"
									}
								],
								"functions": [
									{
										"title": "function11",
										"display_date": "display_date11"
									},
									{
										"title": "function12",
										"display_date": "display_date12"
									}
								],
								"language_scripts": ["language11", "language12"],
								"places": [
									{
										"title": "place11",
										"role": "role11",
										"address": "address11",
										"display_date": "display_date11"
									},
									{
										"title": "place12",
										"role": "role12",
										"address": "address12",
										"display_date": "display_date12"
									}
								],
								"events": [
									{
										"title": "event11",
										"place": "place11",
										"display_date": "display_date11"
									},
									{
										"title": "event12",
										"place": "place12",
										"display_date": "display_date12"
									},
									{
										"display_name": "display_name13",
										"display_date": "display_date13"
									},
								]
							},
							{
								"biography_history": {
									"abstract": "abstract12",
									"biography": "biography12",
									"sources": "sources12",
									"copyright": "copyright12"
								},
								"genders": [
									{
										"title": "gender11",
										"display_date":  "display_date11",
										"descriptive_notes": "descriptive_notes11",
										"citation": "citation11"
									},
									{
										"title": "gender12",
										"display_date":  "display_date12",
										"descriptive_notes": "descriptive_notes12",
										"citation": "citation12"
									}
								],
								"functions": [
									{
										"title": "function11",
										"display_date": "display_date11"
									},
									{
										"title": "function12",
										"display_date": "display_date12"
									}
								],
								"language_scripts": ["language11", "language12"],
								"places": [
									{
										"title": "place11",
										"role": "role11",
										"address": "address11",
										"display_date": "display_date11"
									},
									{
										"title": "place12",
										"role": "role12",
										"address": "address12",
										"display_date": "display_date12"
									}
								],
								"events": [
									{
										"title": "event11",
										"place": "place11",
										"display_date": "display_date11"
									},
									{
										"title": "event12",
										"place": "place12",
										"display_date": "display_date12"
									}
								]
							}
						],
						"related_records": 
						[
							{
								"id": 1,
								"title": "record11",
								"related_as": "related_as11"
							},
							{
								"id": 2,
								"title": "title12",
								"related_as": "related_as12"
							}	
						],
						"related_entities": [
							{
								"id": 1,
								"title": "title11",
								"related_as": "related_as11"
							},
							{
								"id": 2,
								"title": "title12",
								"related_as": "related_as12"
							}	
						],
						"resources": [
							{
								"citation": "resource11",
								"url": "url11",
								"related_as": "related_as11",
								"notes": "note11"
							},
							{
								"citation": "resource12",
								"url": "url11",
								"related_as": "related_as12",
								"notes": "note11"
							}
						]
					},
					{
						"display_date": "date",
						"authorised_display_name": "Authorised display name",
						"name_entries": [
							{
								"display_name": "display_name21",
								"display_date": "display_date21"
							},
						],
						"descriptions": [
							{
								"biography_history": {
									"abstract": "abstract2",
									"biography": "biography2",
									"sources": "sources2",
									"copyright": "copyright2"
								},
								"genders": [
									{
										"title": "gender21",
										"display_date":  "display_date21",
										"descriptive_notes": "descriptive_notes21",
										"citation": "citation21"
									},
								],
								"functions": [
									{
										"title": "function21",
										"display_date": "display_date21"
									},
									{
										"title": "function22",
										"display_date": "display_date22"
									}
								],
								"language_scripts": [],
								"places": [
									{
										"title": "place21",
										"role": "role21",
										"address": "address21",
										"display_date": "display_date21"
									},
									{
										"title": "place22",
										"role": "role22",
										"address": "address22",
										"display_date": "display_date22"
									}
								],
								"events": [
								]
							}
						],
						"related_records": 
						[
							{
								"id": 1,
								"title": "record21",
								"related_as": "related_as21"
							},
							{
								"id": 2,
								"title": "title22",
								"related_as": "related_as22"
							}	
						],
						"related_entities": [
						],
						"resources": [
							{
								"citation": "resource21",
								"url": "url21",
								"related_as": "related_as21",
								"notes": "note21"
							},
							{
								"citation": "resource21",
								"url": "url21",
								"related_as": "related_as21",
								"notes": "note21"
							}
						]
					}
				],
				"sources": [
					{
						"title": "source1",
						"url": "url1",
						"notes": "notes1"
					},
					{
						"title": "source2",
						"url": "url2",
						"notes": "notes2"
					}
				],
				"rights_declaration": "rights_declaration"
			}
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
