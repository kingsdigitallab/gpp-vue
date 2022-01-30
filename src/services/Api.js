import axios from 'axios';

export const TOKEN = process.env.VUE_APP_API_TOKEN;
const API_URL = process.env.VUE_APP_API_URL;


async function getUrl(url) {
    return axios.get(url, {
        headers: getHeaders()
    });
}

async function get(action, params) {
    return axios.get(`${API_URL}${action}`, {
      headers: getHeaders(),
      params: getParams(params)
    });
}

async function getSingle(action, id) {
    return axios.get(`${API_URL}${action}${id}/`, {
        headers: getHeaders()
    });
}

async function getFilteredData(action, filters) {
    return axios.get(`${API_URL}${action}?${filters}`, {
        headers: getHeaders()
    });
}

function getHeaders() {
    return {
        Authorization: `Token ${TOKEN}`,
    };
}

function getParams(params) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of Object.entries(params)) {
    if (key == 'selectedFacets') {
      for (let facet in value) {
        searchParams.append(params.selectedFacets[facet].category,
                            params.selectedFacets[facet].key);
      }
    } else {
      searchParams.append(key, value);
    }
  }
  return searchParams;
}

const Api = {
    getUrl,
    get,
    getSingle,
    getFilteredData
};
export default Api;
