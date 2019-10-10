const url = 'https://api.themoviedb.org/3';
const apiKey = 'e5d36b64e2db663a002d1177202887ce';

function get (url, data = {}) {
    url = new URL(url);
    data = Object.assign(data, { api_key: apiKey });
    Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
    return fetch(url, { method: 'GET' })
        .then(response => response.json())
}

export function discover (data, type) {
    return get(`${ url }/discover/${ type }/`, data)
}

export function tv (id) {
    return get(`${ url }/tv/${ id }`)
}

export function movie (id) {
    return get(`${ url }/movie/${ id }`)
}

export function videos (type, id) {
    return get(`${ url }/${ type }/${ id }/videos`)
}

export function genres (type) {
    return get(`${ url }/genre/${ type }/list`)
}
