import React from 'react';
import * as Feather from 'react-feather';
import { Button } from './Button';
import TaskInfo from './TaskInfo';
import { RowCard } from './RowCard';
import { Gap } from './FlexBox';

export const TaskView = ({ task, onPause, onPlay, onDelete }) => (
	<RowCard color={task.color}>
		<TaskInfo task={task} />
		<Gap width={10} />
		<Button onClick={() => task.active ? onPause() : onPlay(task)}>
			{task.active ? <Feather.Pause /> : <Feather.Play />}
		</Button>
		<Button onClick={() => onDelete(task)}>
			<Feather.X />
		</Button>
	</RowCard>
);