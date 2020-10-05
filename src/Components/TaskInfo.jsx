import React from 'react';
import { Row, Column, Gap } from './FlexBox';
import { Text } from './Text';
import { Clock } from './Clock';

export default ({ className, task }) => (
	<Column className={className} justify='space-evenly'>
		<Row justify='space-between'>
			<Text bold title={task.name}>{task.name}</Text>
			<Gap width={24} />
			{!!task.estDuration && <Clock bold ms={task.estDuration} />}
		</Row>
		<Row justify='space-between'>
			{!!task.duration && <Clock ss ms={task.duration} />}
			{!!task.duration && !!task.estDuration && <Clock sign ss ms={task.duration - task.estDuration} />}
		</Row>
	</Column>
);