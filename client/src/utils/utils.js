const arrHasKeyVal = (arr, key, match) => {
	let result = false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][key] === match) {
			result = true;
			break;
		}
	}
	return result;
};

export { arrHasKeyVal };
