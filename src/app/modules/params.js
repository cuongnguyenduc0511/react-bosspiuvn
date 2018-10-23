export function getParamString(params) {
	let stringParam = '';
	if (countQuery(params) > 0) {
		let index = 0;
		// var indexPageParam;
		for (const key in params) {
			var value = params[key];

			if (value === undefined) {
				value = '';
			}

			if (index == 0) {
				stringParam += '?' + key + '=' + value;
			}
			else {
				stringParam += '&' + key + '=' + value;
			}

			index++;
		}
	}
	return stringParam;
}

export function countQuery(query) {
	var count = 0;
	for (var k in query) {
		if (query.hasOwnProperty(k)) {
			++count;
		}
	}
	return count;
}

export function getAllUrlParams(url) {
	// get query string from url (optional) or window
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	// we'll store the parameters here
	var obj = {};

	// if query string exists
	if (queryString) {

		// stuff after # is not part of query string, so get rid of it
		queryString = queryString.split('#')[0];

		// split our query string into its component parts
		var arr = queryString.split('&');

		for (var i = 0; i < arr.length; i++) {
			// separate the keys and the values
			var a = arr[i].split('=');

			// in case params look like: list[]=thing1&list[]=thing2
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function (v) {
				paramNum = v.slice(1, -1);
				return '';
			});

			// set parameter value (use 'true' if empty)
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

			// (optional) keep case consistent
			paramName = paramName.toLowerCase();
			paramValue = decodeURIComponent(paramValue);

			// if parameter name already exists
			if (obj[paramName]) {
				// convert value to array (if still string)
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				// if no array index number specified...
				if (typeof paramNum === 'undefined') {
					// put the value on the end of the array
					obj[paramName].push(paramValue);
				}
				// if array index number specified...
				else {
					// put the value at that index number
					obj[paramName][paramNum] = paramValue;
				}
			}
			// if param name doesn't exist yet, set it
			else {
				obj[paramName] = paramValue;
			}
		}
	}

	return obj;
}

const entities = {
	'amp': '&',
	'apos': '\'',
	'lt': '<',
	'gt': '>',
	'quot': '"',
	'nbsp': '\xa0'
};
const entityPattern = /&([a-z]+);/ig;

function decodeHTMLEntities(text) {
	// A single replace pass with a static RegExp is faster than a loop
	return text.replace(entityPattern, function (match, entity) {
		entity = entity.toLowerCase();
		if (entities.hasOwnProperty(entity)) {
			return entities[entity];
		}
		// return original string if there is no matching entity (no replace)
		return match;
	});
}