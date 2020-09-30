import React from 'react';
import { Row, Column } from './FlexBox';
import { Text } from './Text';
import { Clock } from './Clock';
import styled from 'styled-components';

const TextColumn = styled(Column)`
	padding: 2px 10px 2px 4px;
`;

export default ({ task }) => (
	<TextColumn style={{ justifyContent: 'space-evenly' }}>
		<Row spread>
			<Text bold title={task.name}>{task.name}</Text>
			{task.estDuration && <Clock bold ms={task.estDuration} />}
		</Row>
		<Row spread>
			{task.duration && <Clock ss ms={task.duration} />}
			{task.duration && task.estDuration && <Clock sign ss ms={task.duration - task.estDuration} />}
		</Row>
	</TextColumn>
);