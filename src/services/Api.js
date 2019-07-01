import axios from 'axios';

export const TOKEN = process.env.VUE_APP_API_TOKEN;
const API_URL = "https://autharch-stg.kdl.kcl.ac.uk/api";
const PROJECT_PARAM = "?project=gpp";

async function getUrl(url) {
    return axios.get(url, { 
        headers: getHeaders()
    });
}

async function get(action) {
    return axios.get(`${API_URL}${action}${PROJECT_PARAM}`, {
        headers: getHeaders()
    });
}

async function getSingle(action, id) {
    return axios.get(`${API_URL}${action}/${id}${PROJECT_PARAM}`, {
        headers: getHeaders()
    });
}

async function getFilteredData(action, filters) {
    return axios.get(`${API_URL}${action}${PROJECT_PARAM}&${filters}`, {
        headers: getHeaders()
    });
}

function getHeaders() {
    return {
        Authorization: `Token ${TOKEN}`,
    }
}

const Api = {
    getUrl,
    get,
    getSingle,
    getFilteredData
};
export default Api;