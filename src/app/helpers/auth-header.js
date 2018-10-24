export function authHeader() {
    // return authorization header with jwt token
    let userToken = localStorage.getItem('authToken');

    if (userToken) {
        return { 'Authorization': 'Bearer ' + userToken };
    } else {
        return {};
    }
}
