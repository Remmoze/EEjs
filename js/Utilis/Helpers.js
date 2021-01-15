export function combineImages(image1, image2) {
	let canvas = document.createElement('canvas');
	canvas.width = image1.width >= image2.width?image1.width:image2.width;
	canvas.height = image1.height >= image2.height?image1.height:image2.height;
	let context = canvas.getContext('2d');
	context.drawImage(image1, 0, 0, canvas.width, canvas.height);
	context.drawImage(image2, 0, 0, canvas.width, canvas.height);
	return canvas;
}

export function crop(image, x, y, width, height) {
	const buf = document.createElement('canvas');
	const context = buf.getContext('2d');
	buf.width = width;
	buf.height = height;
	context.drawImage(image, x, y, width, height, 0, 0, width, height);
	return buf;
}

export function ConsoleTime(text) {
	let date = new Date();
	console.log('[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds() + '] ' + text);
}

export function ConsoleError(text) {
	console.warn('[ERROR!] ' + text);
}

export function getLocation(value) {
	return {x: value >> 8, y: value & 255};
}

export function createLocation(x,y) {
	if(x > 255 || y > 255) throw new Error('invalid location ' + x + "x" + y);
	return (x << 8) + y;
}

//32 limit.