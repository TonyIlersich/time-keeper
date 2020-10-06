import React from 'react';
import * as Feather from 'react-feather';
import { Button } from './Button';
import TaskInfo from './TaskInfo';
import { RowCard } from './RowCard';
import { Gap } from './FlexBox';

export const TaskView = ({ selected, task, onToggleSelected, onPause, onPlay, onDelete, onPromote }) => (
	<RowCard
		selected={selected}
		color={task.color}
		onClick={() => onToggleSelected && onToggleSelected(task)}>
		<TaskInfo task={task} />
		<Gap width={12} />
		{onPlay && onPause && <Button onClick={() => task.active ? onPause(task) : onPlay(task)}>
			{task.active ? <Feather.Pause /> : <Feather.Play />}
		</Button>}
		{onPromote && <Button onClick={() => onPromote(task)}>
			<Feather.ArrowRight />
		</Button>}
		{onDelete && <Button onClick={() => onDelete(task)}>
			<Feather.X />
		</Button>}
	</RowCard >
);