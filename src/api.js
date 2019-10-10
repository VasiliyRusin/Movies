const url = 'https://api.themoviedb.org/3';
const apiKey = 'e5d36b64e2db663a002d1177202887ce';

function get (url, data = {}) {
    url = new URL(url);
    data = Object.assign(data, { api_key: apiKey });
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            url.searchParams.append(key, data[key].join(','))
        } else if (data[key] != null) {
            url.searchParams.append(key, data[key])
        }
    });
    return fetch(url, { method: 'GET' })
        .then(response => response.json())
}

export function discover (data, type = 'movie') {
    return get(`${ url }/discover/${ type }/`, data)
}


export function genres (type) {
    return get(`${ url }/genre/${ type }/list`)
}
