import axios from 'axios';

const TOKEN = "d517931f5c95d8510369814a805bd6028cbd0180";
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