import Vuex from 'vuex';
import VuePluralize from 'vue-pluralize'
import Vue from 'vue';
import home from './modules/home';
import archivalRecords from './modules/archivalRecords';
import archiveSingle from './modules/archiveSingle';
import authorityEntities from './modules/authorityEntities';
import authoritySingle from './modules/authoritySingle';
import secondaryPage from './modules/secondary_page';
import timeline from './modules/timeline';
import searchResults from './modules/searchResults';

Vue.use(Vuex);
Vue.use(VuePluralize);

export default new Vuex.Store({
    modules: {
        home,
        archivalRecords,
        archiveSingle,
        authorityEntities,
        authoritySingle,
        secondaryPage,
        timeline,
        searchResults
    }
})