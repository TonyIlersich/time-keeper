import { getNewTaskColor } from "./ColorUtils";

export const TaskStatus = {
	Planned: 'Planned',
	InProgress: 'In Progress',
	Completed: 'Completed',
};

export const createTask = props => {
	if (!props.name) {
		throw new Error('Cannot create a task without a name.');
	}
	return {
		name: props.name,
		status: props.status || TaskStatus.Planned,
		duration: props.duration || 0,
		estDuration: props.estDuration || undefined,
		color: props.color || getNewTaskColor(),
		active: props.active || false,
	};
};
