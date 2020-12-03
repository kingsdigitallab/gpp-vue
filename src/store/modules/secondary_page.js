import Api from '../../services/Api';

const state = {
    page: {},
    status: false,
    imageUrl: {}
};

const getters = {
    getPage: (state) => state.page,
    getPageStatus: (state) => state.status,
    getImageURL: (state) => state.imageUrl,
};

const wagtailPageIds = {
    'accessibility': 5,
    'about': 4
}

const actions = {
    async fetchSecondaryPage({ commit }, page_name) {

        // TODO once the ShaRC site is linked to the ShaRC Wagtail root page, please change 4 to id
        const response = await Api.getSingle('/wagtail/pages/',wagtailPageIds[page_name]);
        let image = {}
        if (response.data.image) {
            image = {
                resource: response.data.meta.parent.meta.html_url + response.data.image.meta.download_url,
                alt: response.data.image.title
            }
        }
        commit('setImageURL', image);
        commit('setPage', response.data);
    },
};

const mutations = {
    setPage: (state, page) => (state.page = page),
    setPageStatus: (state, status) => (state.status = status),
    setImageURL: (state, imageUrl) => (state.imageUrl = imageUrl),
};

export default {
    state,
    getters,
    actions,
    mutations
}