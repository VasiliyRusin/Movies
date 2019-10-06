const apiKey = 'e5d36b64e2db663a002d1177202887ce';

function get (url, data = {}) {
    url = new URL(url);
    data = Object.assign({api_key: apiKey}, data);
    Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
    return fetch(url, {
        method: 'GET'
    })
}

export function discover (data) {
    return get(``, data)
}
