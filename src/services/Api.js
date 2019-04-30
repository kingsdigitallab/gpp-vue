import axios from 'axios';

export const TOKEN = process.env.VUE_APP_API_TOKEN;
const API_URL = "https://autharch-stg.kdl.kcl.ac.uk/api";

async function getUrl(url) {
    return axios.get(url, { 
        headers: getHeaders()
    });
}

async function get(action) {
    return axios.get(`${API_URL}${action}`, {
        headers: getHeaders()
    });
}

async function getSingle(action, id) {
    return axios.get(`${API_URL}${action}/${id}`, {
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
    getSingle
};
export default Api;