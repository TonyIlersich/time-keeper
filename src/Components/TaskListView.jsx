import React from 'react';
import { Column } from './FlexBox';
import { TaskView } from './TaskView';

export default ({ selectionMap, tasks, onToggleSelected, onPlay, onPause, onDelete, onPromote, onCheck }) => (
	<Column flexRatio={0}>
		{tasks.map((t, i) => (
			<TaskView
				key={i}
				task={t}
				selected={selectionMap[t.name]}
				onToggleSelected={onToggleSelected}
				onPlay={onPlay}
				onPause={onPause}
				onPromote={onPromote}
				onDelete={onDelete}
				onCheck={onCheck}
			/>
		))}
	</Column>
);
