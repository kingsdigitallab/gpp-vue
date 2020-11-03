<template>
    <div class="container">
        <div v-if="searchResults.length == 0">
            <h1>No matches found</h1>
            <p>We couldn't find a match for "<strong>{{searchQuery}}</strong>". Please try another search.</p>
        </div>
        <div v-else>
            <h1>Search results</h1>
            <p>{{searchResults.length}} result<template v-if="searchResults.length > 1">s</template> found for: "<strong>{{searchQuery}}</strong>"</p>
            <div class="two-column-20-80">
                <div class="filters">
                    <!-- TODO add filters -->
                </div>
                <div>
                    <ul>
                        <li v-for="(result, i) in searchResults" v-bind:key="i">
                            <router-link :to="result.url">{{result.summary}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// TODO fetch search results

export default {
    name: 'SearchResultsPage',
    components: {},
    computed: mapGetters(['']),
    data: function () {
        return {
            searchQuery: '',
            searchResults: [
                {
                    url: '/people-and-corporate-bodies/90',
                    summary: 'summary',
                }
            ]
        }
    },
    created: function() {
        this.searchQuery = this.$route.query.q;
    }
}
</script>