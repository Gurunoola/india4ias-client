import {get, keys, pick} from 'lodash';
import SecureLS from 'secure-ls';
import { globalConfigs } from '../globalConfigs';

export function getUserDataFromLocal() {
    try {
        const ls = new SecureLS({ encodingType: 'aes', encryptionSecret: globalConfigs.appConfig.secretKey });
        const user = ls.get('user');
        return JSON.parse(user)
    } catch (error) {
        return {};
    }
}

export function getUser() {
    const {user} = getUserDataFromLocal();
    return { data: {...user} };
}

export function getUserRole(props) {
    const {user} = getUserDataFromLocal();
    // const roldId = get(userData, 'roleId', {})
    // const { role } = keys(userObj).length > 0 ? userObj : { user: { role: undefined } }
    return get(user, 'role', {});
}

export function getAccessToken() {
    let {token} = getUserDataFromLocal();
    return token;
}

export function getAccessTokenWithExpires() {
    let {token} = getUserDataFromLocal();
    return token;
}

export function getUserId() {
    const userData = getUserDataFromLocal();
    return { data: pick(userData, ['id']) };
}



export function verifyToken(props) {
    let isExpired = false;
    let token = getAccessTokenWithExpires();
    var decodedToken = parseJwt(token);
    var dateNow = new Date();
    if (token === undefined || token.expires * 1000 < Date.now())
        isExpired = true;
    return isExpired;
}

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export function getUserRefreshToken() {
    let userData = getUserDataFromLocal();
    return get(userData, 'tokens.refresh.token', undefined)
}