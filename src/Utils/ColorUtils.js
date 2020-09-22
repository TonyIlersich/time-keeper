export const getRandomColor = () => {
	const s = .4, v = .9;
	const channels = [0, Math.random(), 1].map(c => (c * s + (1-s)) * v);
	channels.sort(() => Math.random() - .5);
	const color = `#${channels.reduce(
		(str, value) => `${str}${Math.floor(value * 0xff).toString(16).padStart(2, '0')}`, ''
	)}`;
	return color;
};

export const getNewTaskColor = () => getRandomColor();