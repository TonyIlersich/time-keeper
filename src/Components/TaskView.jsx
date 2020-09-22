import React from 'react';
import * as Feather from 'react-feather';
import { Container } from './Container';
import { Row, Column } from './FlexBox';
import { Text } from './Text';
import { Clock } from './Clock';
import { Button } from './Button';

export const TaskView = props => (
	<Container color={props.task.color}>
		<Row>
			<Column style={{ justifyContent: 'space-evenly' }}>
				<Text title={props.task.name}>{props.task.name}</Text>
				<Clock ms={props.task.duration}/>
			</Column>
			<Button onClick={() => props.task.active ? props.onPause() : props.onPlay(props.task)}>
				{props.task.active ? <Feather.Pause/> : <Feather.Play/>}
			</Button>
		</Row>
	</Container>
);