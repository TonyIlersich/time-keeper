import React from 'react';
import styled from 'styled-components';
import Colors from '../Styles/Colors';
import { Clock } from './Clock';
import DayOfWeekView from './DayOfWeekView';
import { DividerRow } from './Divider';
import { Column, Row } from './FlexBox';
import { Header } from './Text';

const OuterColumn = styled(Column)`
	padding: 10px 6px;
`;

const HeaderRow = styled(Row)`
	padding: 0px 16px 0px 12px;
	align-items: center;
`;

const HeaderClock = styled(Clock)`
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
`;

export default ({ now, totalPlanned, totalInProgress, totalCompleted }) => (
	<OuterColumn color={Colors.DarkBackground}>
		<DayOfWeekView now={now} />
		<DividerRow />
		<Row>
			<HeaderRow>
				<Header>To Do</Header>
				<Row />
				<HeaderClock ms={totalPlanned} />
			</HeaderRow>
			<HeaderRow>
				<Header>Doing</Header>
				<Row />
				<HeaderClock ms={totalInProgress} />
			</HeaderRow>
			<HeaderRow>
				<Header>Done</Header>
				<Row />
				<HeaderClock ms={totalCompleted} />
			</HeaderRow>
		</Row>
	</OuterColumn>
);