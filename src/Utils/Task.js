import { getNewTaskColor } from "./ColorUtils";

export const createTask = props => {
	if (!props.name) {
		throw new Error('Cannot create a task without a name.');
	}
	return {
		name: props.name,
		duration: props.duration || 0,
		estDuration: props.estDuration || undefined,
		color: props.color || getNewTaskColor(),
		active: props.active || false,
	};
};