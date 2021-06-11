function getToken() {
    return sessionStorage.getItem("token");
}

export function fetchSignup(contact) {

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    };

    return fetch("http://localhost:3000/api/auth/signup", requestOptions)

    .then(response => {

        if (response.ok) {
            return response.json();
        } else {
            Promise.reject(response.status);
        }
    })
}

export function fetchLogin(contact) {

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    };

    return fetch("http://localhost:3000/api/auth/login", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()

            } else {
                Promise.reject(response.status);
            }
        })
}

export function fetchDeleteAccount() {

    const token = getToken();

    const options = {
        method: 'DELETE',
        headers: { authorization: `bearer ${token}` }
    };

    return fetch("http://localhost:3000/api/auth/users/deleteUser", options)
        .then(response => {
            if (response.ok) {

                return response.json();

            } else {
                Promise.reject(response.status);
            }
        })
}