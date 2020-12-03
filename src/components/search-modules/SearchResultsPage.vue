<template>
    <div class="search-results-page container">
        <template v-if="!loading">
            <div v-if="getSearchResultsTotal == 0">
                <h1 class="page-title">No matches found</h1>
                <p>We couldn't find a match for "<strong>{{searchTerm}}</strong>". Please try another search.</p>
            </div>
            <div v-else>
                <h1 class="page-title">Search results</h1>
                <p>{{getSearchResultsTotal}} {{'result' | pluralize(getSearchResultsTotal)}} found for: "<strong>{{searchTerm}}</strong>"</p>
                <div v-for="(result, i) in getSearchResults" v-bind:key="i" class="result">
                    <router-link v-if="result.page == 'people-and-corporate-bodies'" :to="'people-and-corporate-bodies/'+result.pk" class="result-page">{{result.title}}</router-link>
                    <router-link v-else-if="result.page == 'files-items'|| result.page == 'collections-series'" :to="'archival-records/'+result.page+'/' + result.pk" class="result-page">{{result.title}}</router-link>
                    <p class="result-snippet">{{result.snippet}}</p>
                </div>
            </div>
            <div v-if="loadingMoreRecords" class="loader"></div>
            <template v-else>
                <button type="button" class="button-primary large" v-if="getSearchResults && getSearchResults.length < getSearchResultsTotal" @click="moreRecords()">Show more results</button>
            </template>
        </template>
        <div v-else class="loader"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// TODO fetch search results

export default {
    name: 'SearchResultsPage',
    components: {},
    computed: mapGetters(['getSearchResults', 'getSearchResultsTotal']),
    data: function () {
        return {
            loading: true,
            loadingMoreRecords: false,
            searchTerm: '',
            pageNum: 1
        }
    },
    methods: {
        async updatePage() {
            this.loading = true;

            const setQuery = this.$route.query;
            this.pageNum = 1;

            for (var key in setQuery) {
                switch (key){
                    case 'q':
                        this.searchTerm = setQuery[key];
                    break;
                    case 'page':
                        this.pageNum = Number(setQuery[key]);
                    break;
                }
            }
            
            await this.fetchSearchResults({pages: this.pageNum, searchTerm: this.searchTerm});
            this.loading = false;
        },
        async moreRecords() {
            this.loadingMoreRecords = true;

            this.pageNum = Number(this.pageNum) + 1;

            const setQuery = this.$route.query;
            setQuery['page'] = Number(this.pageNum);
            this.$router.replace({ query: {} });
            this.$router.push({query: setQuery});

            // ?: change to await this.fetchSearchResults(...);	
            await this.loadMoreSearchResults();

            this.loadingMoreRecords = false;
        },
        ...mapActions(['fetchSearchResults', 'loadMoreSearchResults']),
    },
    created() {
        this.updatePage();
    },
    watch: {
        $route(to, from) {
            if(from.query.q != to.query.q) {
                this.updatePage();
            }
        }
    }
}
</script>