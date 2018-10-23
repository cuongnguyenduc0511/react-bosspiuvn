export function authHeader() {
    // return authorization header with jwt token
    let userToken = localStorage.getItem('jwtToken');

    if (userToken) {
        return { 'Authorization': 'Bearer ' + userToken };
    } else {
        return {};
    }
}
