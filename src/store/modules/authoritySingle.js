import Api from '../../services/Api';

const state = {
    authority: {}
};

const getters = {
    getAuthority: (state) => state.authority
};

const actions = {
    async fetchAuthority({ commit }, id) {
        const response = await Api.getSingle('/authority/entities/',id);

        commit('setAuthority', response.data);
    }
};

const mutations = {
    setAuthority: (state, authority) => (state.authority = authority),
};

export default {
    state,
    getters,
    actions,
    mutations
}
