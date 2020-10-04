import React from 'react';
import * as Feather from 'react-feather';
import { Button } from './Button';
import TaskInfo from './TaskInfo';
import { RowCard } from './RowCard';
import { Gap } from './FlexBox';

export default ({ todo, onPromote, onDelete }) => (
	<RowCard color={todo.color}>
		<TaskInfo task={todo} />
		<Gap width={10} />
		<Button onClick={() => onPromote(todo)}>
			<Feather.ArrowRight />
		</Button>
		<Button onClick={() => onDelete(todo)}>
			<Feather.X />
		</Button>
	</RowCard>
);