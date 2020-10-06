const hex2rgb = str => {
	if (typeof str !== 'string' || str.search(/#\w\w\w\w\w\w/)) {
		throw new Error(`cannot parse color: ${JSON.stringify(str)}`);
	}
	const result = {
		r: parseInt(str.slice(1, 3), 16) / 255,
		g: parseInt(str.slice(3, 5), 16) / 255,
		b: parseInt(str.slice(5, 7), 16) / 255,
	};
	console.log(`${str} -> ${JSON.stringify(result)}`);
	return result;
};

const rgb2hex = rgb => `#${[rgb.r, rgb.g, rgb.b].reduce(
	(str, value) => `${str}${Math.floor(value * 0xff).toString(16).padStart(2, '0')}`, ''
)}`;

const clamp01 = x => Math.min(1, Math.max(0, x));

const mod1 = x => (x % 1 + 1) % 1;

const hsv2rgb = ({ h, s, v }) => ({
	r: (clamp01(Math.abs(mod1(h) * 6 - 3) - 1) * s + (1 - s)) * v,
	g: (clamp01(-Math.abs(mod1(h) * 6 - 2) + 2) * s + (1 - s)) * v,
	b: (clamp01(-Math.abs(mod1(h) * 6 - 4) + 2) * s + (1 - s)) * v,
});

// TODO: implement this when it is necessary
const rgb2hsv = ({ r, g, b }) => ({
});

const hsv2hex = hsv => rgb2hex(hsv2rgb(hsv));

// TODO: remove comment when function is used
// eslint-disable-next-line no-unused-vars
const hex2hsv = hex => rgb2hsv(hex2rgb(hex));

const getRandomHex = (s, v) => {
	return hsv2hex({ h: Math.random(), s, v });
};

export const getNewTaskColor = () => getRandomHex(.4, .9);
