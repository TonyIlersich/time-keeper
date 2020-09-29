import React from 'react';
import * as Feather from 'react-feather';
import { Container } from './Container';
import { Row, Column } from './FlexBox';
import { Text } from './Text';
import { Button } from './Button';
import { Clock } from './Clock';

export default ({ todo, onClickRight }) => (
	<Container color={todo.color}>
		<Row>
			<Column style={{ justifyContent: 'space-evenly' }}>
				<Text title={todo.name}>{todo.name}</Text>
				<Clock ms={todo.estDuration} />
			</Column>
			<Button onClick={onClickRight}>
				<Feather.ArrowRight />
			</Button>
		</Row>
	</Container>
);