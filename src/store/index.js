import Vuex from 'vuex';
import Vue from 'vue';
import home from './modules/home';
import about from './modules/about';
import archivalRecords from './modules/archivalRecords';
import archiveSingle from './modules/archiveSingle';
import authorityEntities from './modules/authorityEntities';
import authoritySingle from './modules/authoritySingle';
import accessibility from './modules/accessibility';
import timeline from './modules/timeline';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        about,
        archivalRecords,
        archiveSingle,
        authorityEntities,
        authoritySingle,
        accessibility,
        timeline
    }
})