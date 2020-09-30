import React from 'react';
import { Column } from './FlexBox';
import { NewTaskForm } from './NewTaskForm';
import { TaskView } from './TaskView';

export default ({ tasks, onSwitchTask, onPauseTask, onCreateTask, onDeleteTask }) => (
	<Column>
		{tasks.map((t, i) => (
			<TaskView
				key={i}
				task={t}
				onPlay={onSwitchTask}
				onPause={onPauseTask}
				onDelete={onDeleteTask}
			/>
		))}
		<NewTaskForm onCreate={onCreateTask} />
	</Column>
);
