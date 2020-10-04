import React from 'react';
import * as Feather from 'react-feather';
import styled from 'styled-components';
import { Button } from './Button';
import { Clock } from './Clock';
import DayOfWeekView from './DayOfWeekView';
import { Row } from './FlexBox';
import { Header } from './Text';

const StyledRow = styled(Row)`
	margin-bottom: 6px;
	padding: 12px 6px;
	flex-grow: 0;
	background-color: lightgray;
`;

const HeaderRow = styled(Row)`
	padding: 0px 16px 0px 12px;
	align-items: center;
`;

const HeaderClock = styled(Clock)`
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
	padding-right: 12px;
`;

export default ({ now, totalTodo, totalDoing, onClearTodos, onClearTasks }) => (
	<StyledRow>
		<Row flexRatio={1.5}>
			<HeaderRow>
				<Header>To Do</Header>
				<Row />
				<HeaderClock ms={totalTodo} />
				<Button onClick={onClearTodos}>
					<Feather.Trash2 />
				</Button>
			</HeaderRow>
			<HeaderRow>
				<Header>Doing</Header>
				<Row />
				<HeaderClock ms={totalDoing} bold />
				<Button onClick={onClearTasks}>
					<Feather.Trash2 />
				</Button>
			</HeaderRow>
		</Row>
		<DayOfWeekView now={now} />
	</StyledRow>
);