import React from 'react';
import { Column } from './FlexBox';
import { NewTaskForm } from './NewTaskForm';
import { TaskView } from './TaskView';

export default ({ tasks, onSwitchTask, onPauseTask, onCreateTask }) => (
	<Column>
		{tasks.map((t, i) => (
			<TaskView
				key={i}
				task={t}
				onPlay={onSwitchTask}
				onPause={onPauseTask}
			/>
		))}
		<NewTaskForm onCreate={onCreateTask} />
	</Column>
);
