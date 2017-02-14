import fetch from 'isomorphic-fetch';

export async function get(url) {
    let res = await fetch(url, {
        credentials: 'same-origin',
    });

    return res.json();
}

export async function post(url, data) {
    let res = await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : JSON.stringify({}),
    });

    return res.json();
}

