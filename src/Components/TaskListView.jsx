import React from 'react';
import { Column } from './FlexBox';
import { TaskView } from './TaskView';

export default ({ tasks, onPlay, onPause, onDelete, onPromote }) => (
	<Column flexRatio={0}>
		{tasks.map((t, i) => (
			<TaskView
				key={i}
				task={t}
				onPlay={onPlay}
				onPause={onPause}
				onPromote={onPromote}
				onDelete={onDelete}
			/>
		))}
	</Column>
);
