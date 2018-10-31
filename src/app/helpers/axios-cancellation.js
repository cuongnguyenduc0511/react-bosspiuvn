import axios from 'axios';
const CancelToken = axios.CancelToken;

var allSources = []

export function getCancelToken() {
    const cancelTokenSource = CancelToken.source();
    allSources.push(cancelTokenSource);
    return cancelTokenSource;
}

export function cancelAllPendingRequests() {
    if (allSources.length > 0) {
        allSources.forEach(item => {
            item.cancel();
        });
        allSources = [];
    }
}

export function removeCancelToken(cancelTokenSource) {
    arrayRemove(allSources, cancelTokenSource)
}

function arrayRemove(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}
