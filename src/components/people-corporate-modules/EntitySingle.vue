<template>
  <div>
    <div class="entity" v-if="!loading">
      <div class="inline-list" v-if="getAuthority.identities.length > 1">
        <strong>Identities:</strong>
        <ul class="inline-tabs" v-for="(identity, i) in getAuthority.identities" v-bind:key="i">
          <li role="button" v-on:click="changeIdentity(i)" v-bind:class="['inline-tab', {'active': activeIdentity == i}]">{{identity.authorised_display_name}}</li>
        </ul>
      </div>
      <div class="identity-description two-column-70-30">
        <div>
          <h1>{{identity.authorised_display_name}}</h1>
          <p v-if="identity.name_entries && identity.name_entries.length > 1">
            <span class="highlight">Also known as:</span>
            <span v-for="(name_entry, i) in identity.name_entries" v-bind:key="i">
              <template v-if="!name_entry.authorised_form">
                {{name_entry.display_name}}<template v-if="name_entry.display_date"> (name used: {{name_entry.display_date}})</template><template v-if="i != identity.name_entries.length-2">;</template>
              </template>
            </span>
            <br>
            <br>
          </p>
          <template v-if="identity.descriptions.length > 0 && identity.descriptions[0].biography_history">
            <p v-if="identity.descriptions[0].biography_history.abstract" v-html="identity.descriptions[0].biography_history.abstract"></p>
            <p v-if="identity.descriptions[0].biography_history.content" v-html="identity.descriptions[0].biography_history.content"></p>
            <template v-if="identity.descriptions[0].biography_history.sources">
              <h4>Biography sources:</h4>
              <p v-html="identity.descriptions[0].biography_history.sources"></p>
            </template>
            <template v-if="identity.descriptions[0].biography_history.copyright">
              <h4>Copyright</h4>
              <p v-html="identity.descriptions[0].biography_history.copyright"></p>
            </template>
          </template>
        </div>
        <!-- TODO update v-if once the normalised data is sent -->
        <div v-if="identity.descriptions && identity.descriptions.length > 0"
             :class="{'grey-column': identity.display_date
                     || identity.descriptions[0].genders && identity.descriptions[0].genders.length > 0
                     || identity.descriptions[0].language_script && identity.descriptions[0].language_scripts.length > 0
                     || identity.descriptions[0].functions && identity.descriptions[0].functions.length > 0
                     || identity.descriptions[0].places && identity.descriptions[0].places.length > 0
                     || identity.descriptions[0].events && identity.descriptions[0].events.length > 0
                     || identity.descriptions[0].mandates && identity.descriptions[0].mandates.length > 0
                     || identity.descriptions[0].legal_statuses && identity.descriptions[0].legal_statuses.length > 0}">
          <div class="two-column-40-60" v-if="identity.display_date">
            <h4>Dates of existence</h4>
            <span>{{identity.display_date}}</span>
          </div>
          <!-- ADD identity.genders.length > 0 -->
          <!-- TODO send an array of listed genders -->
          <div v-if="identity.descriptions[0].genders && identity.descriptions[0].genders.length > 0">
            <h4>Genders</h4>
            <div v-for="(gender, i) in identity.descriptions[0].genders" v-bind:key="i" class="two-column-40-60">
              <span>{{gender.title}}</span>
              <span>
                {{gender.display_date}}<br>
                {{gender.notes}}<br>
                <span v-html="gender.citation"></span>
              </span>
            </div>
          </div>
          <div class="two-column-40-60" v-if="identity.descriptions[0].languages_scripts && identity.descriptions[0].languages_scripts.length > 0">
            <h4>Languages used</h4>
            <ul class="flex">
              <li v-for="(language, i) in identity.descriptions[0].languages_scripts" v-bind:key="i">
                {{language}}<template v-if="i != identity.descriptions[0].languages_scripts.length - 1">;&nbsp;</template>
              </li>
            </ul>
          </div>
          <div class="two-column-40-60" v-if="identity.descriptions[0].functions && identity.descriptions[0].functions.length > 0">
            <h4>Functions</h4>
            <ul>
              <li v-for="(entityFunction, i) in identity.descriptions[0].functions" v-bind:key="i">
                {{entityFunction.title}}<template v-if="entityFunction.display_date"> (used: {{entityFunction.display_date}})</template><template v-if="i != identity.descriptions[0].functions.length - 1">; </template>
              </li>
            </ul>
          </div>
          <div v-if="identity.descriptions[0].places && identity.descriptions[0].places.length > 0">
            <h4>Associated places</h4>
            <div v-for="(place, i) in identity.descriptions[0].places" v-bind:key="i" class="two-column-40-60">
              <span>
                <template v-if="place.role">
                  {{place.role}}<br>
                </template>
                {{place.display_date}}
              </span>
              <span>
                <template v-if="place.title">
                  {{place.title}}<br>
                </template>
                {{place.place}}
              </span>
            </div>
            <!-- TODO ADD SHOW MORE -->
          </div>
          <div v-if="identity.descriptions[0].events && identity.descriptions[0].events.length > 0">
            <h4>Related events</h4>
            <div v-for="(event, i) in identity.descriptions[0].events" v-bind:key="i" class="two-column-40-60">
              <span>
                {{event.display_date}}
              </span>
              <span>
                <template v-if="event.event">
                  {{event.event}}<br>
                </template>
                {{event.place}}
              </span>
            </div>
            <!-- TODO ADD SHOW MORE -->
          </div>
          <div v-if="identity.descriptions[0].mandates && identity.descriptions[0].mandates.length > 0">
            <h4>Mandates</h4>
            <div v-for="(mandate, i) in identity.descriptions[0].mandates" v-bind:key="i">
              <div class="two-column-40-60">
                <span>{{mandate.term}}</span>
                <span>{{mandate.display_date}}</span>
              </div>
              <p v-html="mandate.notes"></p>
              <p v-html="mandate.citation"></p>
            </div>
          </div>
          <div v-if="identity.descriptions[0].legal_statuses && identity.descriptions[0].legal_statuses.length > 0">
            <h4>Legal statuses</h4>
            <div v-for="(legal_status, i) in identity.descriptions[0].legal_statuses" v-bind:key="i">
              <div class="two-column-40-60">
                <span>{{legal_status.term}}</span>
                <span>{{legal_status.display_date}}</span>
              </div>
              <p v-html="legal_status.notes"></p>
              <p v-html="legal_status.citation"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="descriptions-section" v-if="(identity.related_records && identity.related_records.length > 0) || (identity.related_entities && identity.related_entities.length > 0)">
        <h2>Related</h2>
        <div class="grey-column description column-delimiter">
          <div v-if="identity.related_records && identity.related_records.length > 0">
            <h3>Related archival records</h3>
            <p v-for="(related_record, i) in identity.related_records" v-bind:key="i">
              <router-link :to="{}">{{related_record.title}}</router-link>
              <br>
              <strong>Related as:</strong> {{related_record.related_as}}
            </p>
          </div>
          <div v-if="identity.related_entities && identity.related_entities.length > 0">
            <h3>Related people and corporate bodies</h3>
            <p v-for="(related_entity, i) in identity.related_entities" v-bind:key="i">
              <router-link :to="{name: 'entity', params: {id: related_entity.related_entity.id}}">{{related_entity.related_entity.name}}</router-link>
              <br>
              <strong>Related as:</strong> {{related_entity.relation_type.title}}
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
            <strong>Related as:</strong> {{resource.relation_type.title}}<br>
            <a v-bind:href="resource.url">{{resource.url}}</a>, {{resource.notes}}
          </li>
        </ol>
      </div>
      <div class="descriptions-section" v-if="getAuthority.control.sources && getAuthority.control.sources.length > 0">
        <h2>Record references</h2>
        <ol>
          <li v-for="(source, i) in getAuthority.control.sources" v-bind:key="i">
            <span v-html="source.name"></span>
            <a v-bind:href="source.url">{{source.url}}</a><br>
            {{source.notes}}
          </li>
        </ol>
      </div>
      <div class="grey-column" v-if="getAuthority.control.rights_declaration">
        <h2>Digital rights declaration</h2>
        <p v-html="getAuthority.control.rights_declaration"></p>
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
    async created() {
      await this.fetchAuthority(this.$route.params.id);
      this.loading = false;
      this.identity = this.getAuthority.identities[0];
    }
  }
</script>
