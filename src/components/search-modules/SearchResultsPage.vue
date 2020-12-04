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
                <div class="inline-list">
                    <strong>Results:</strong>
                    <ul class="inline-tabs">
                        <li role="button" v-on:click="getResults('all')" v-bind:class="['inline-tab', {'active': activeSearchTab == 'all'}]">All results</li>
                        <li role="button" v-on:click="getResults('archival_records')" v-bind:class="['inline-tab', {'active': activeSearchTab == 'archival_records'}]">Archival records</li>
                        <li role="button" v-on:click="getResults('entities')" v-bind:class="['inline-tab', {'active': activeSearchTab == 'entities'}]">People and corporate bodies</li>
                    </ul>
                </div>
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

export default {
    name: 'SearchResultsPage',
    components: {},
    computed: mapGetters(['getSearchResults', 'getSearchResultsTotal']),
    data: function () {
        return {
            loading: true,
            loadingMoreRecords: false,
            searchTerm: '',
            pageNum: 1,
            activeSearchTab: ''
        }
    },
    methods: {
        async getResults(filter) {
            this.loading = true;

            const setQuery = this.$route.query;
            this.activeSearchTab = filter;
            this.pageNum = 1;

            setQuery['page'] = this.pageNum;
            setQuery['filter'] = filter;

            this.$router.replace({ query: {} });
			this.$router.push({query: setQuery});

            await this.fetchSearchResults({filter: this.activeSearchTab, pages: this.pageNum, searchTerm: this.searchTerm});
            
            this.loading = false;
        },
        async updatePage() {
            this.loading = true;

            const setQuery = this.$route.query;
            this.activeSearchTab = 'all';
            this.pageNum = 1;

            for (var key in setQuery) {
                switch (key){
                    case 'filter':
                        this.activeSearchTab = setQuery[key];
                        break;
                    case 'q':
                        this.searchTerm = setQuery[key];
                        break;
                    case 'page':
                        this.pageNum = Number(setQuery[key]);
                        break;
                }
            }
            
            await this.fetchSearchResults({filter: this.activeSearchTab, pages: this.pageNum, searchTerm: this.searchTerm});
            this.loading = false;
        },
        async moreRecords() {
            this.loadingMoreRecords = true;

            this.pageNum = Number(this.pageNum) + 1;

            const setQuery = this.$route.query;
            setQuery['page'] = Number(this.pageNum);
            this.$router.replace({ query: {} });
            this.$router.push({query: setQuery});

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