import { getNewTaskColor } from "./ColorUtils";

export const createTodo = props => {
	if (!props.name) {
		throw new Error('Cannot create a todo without a name.');
	}
	return {
		name: props.name,
		estDuration: props.estDuration || undefined,
		color: props.color || getNewTaskColor(),
	};
};