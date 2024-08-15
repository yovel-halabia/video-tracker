function getCookie(key: string): string {
	key = `${key}=`;
	const cookieDecoded = decodeURIComponent(document.cookie);
	const cookieArray = cookieDecoded.split("; ");
	let value: string = "";
	cookieArray.forEach((val) => {
		if (val.indexOf(key) === 0) value = val.substring(key.length);
	});
	return value;
}

function deleteCookie(key: string): void {
	document.cookie = `${key}=; Max-Age=0`;
}

const Cookie = {
	get: getCookie,
	delete: deleteCookie,
};
export default Cookie;
