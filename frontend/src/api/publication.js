function getToken() {
    return sessionStorage.getItem("token");
}

export function fetchCreatePost(data) {

    const token = getToken();

    const requestOptions = {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: data
    };

    return fetch("http://localhost:3000/api/publi/publiCreate", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                Promise.reject(response.status);
            }
        })
}

export function fetchAllPost() {

    const token = getToken();

    const options = {
        headers: { authorization: `Bearer ${token}` }
    };

    return fetch("http://localhost:3000/api/publi/", options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(response.status);
            }
        })
}

export function fetchDeletePost(id) {

    const token = getToken();

    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    };

    return fetch("http://localhost:3000/api/publi/" + id, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                Promise.reject(response.status);
            }
        })
}