import Api from '../../services/Api';

const state = {
    archive: {}
};

const getters = {
    getArchive: (state) => state.archive
};

const actions = {
    async fetchArchive({ commit }, id) {
        const response = await Api.getSingle('/archival/records/',id);

        let images = [];
        response.data['media'].forEach(element => {
            images.push({type:'image', url: element['resource'], buildPyramid: false});
        });
        response.data['media'] = images;
        commit('setArchive', response.data);
    }
};

const mutations = {
    setArchive: (state, archive) => (state.archive = archive),
};

export default {
    state,
    getters,
    actions,
    mutations
}
