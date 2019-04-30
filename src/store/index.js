import Vuex from 'vuex';
import Vue from 'vue';
import about from './modules/about';
import archivalRecords from './modules/archivalRecords';
import archiveSingle from './modules/archiveSingle';
import authorityEntities from './modules/authorityEntities';
import authoritySingle from './modules/authoritySingle';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        about,
        archivalRecords,
        archiveSingle,
        authorityEntities,
        authoritySingle
    }
})