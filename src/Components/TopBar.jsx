import React from 'react';
import styled from 'styled-components';
import Colors from '../Styles/Colors';
import { Clock } from './Clock';
import DayOfWeekView from './DayOfWeekView';
import { DividerColumn, DividerRow } from './Divider';
import { Column, Row } from './FlexBox';
import { Header } from './Text';

const OuterColumn = styled(Column)`
	padding: 10px 6px;
`;

const HeaderRow = styled(Row)`
	padding-top: 4px;
	align-items: center;
`;

const OuterHeaderRow = styled(Row)`
	padding: 0px 12px;
`;

const HeaderClock = styled(Clock)`
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
`;

export default ({ now, totalPlanned, totalInProgress, totalCompleted }) => (
	<OuterColumn color={Colors.DarkBackground}>
		<DayOfWeekView now={now} />
		<DividerRow below={0} />
		<OuterHeaderRow>
			<HeaderRow>
				<Header>To Do</Header>
				<Row />
				<HeaderClock ms={totalPlanned} />
			</HeaderRow>
			<DividerColumn />
			<HeaderRow>
				<Header>Doing</Header>
				<Row />
				<HeaderClock ms={totalInProgress} />
			</HeaderRow>
		</OuterHeaderRow>
	</OuterColumn>
);