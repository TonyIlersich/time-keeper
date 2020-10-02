import React from 'react';
import * as Feather from 'react-feather';
import styled from 'styled-components';
import { Button } from './Button';
import { Clock } from './Clock';
import { Row } from './FlexBox';
import { Text } from './Text';

const StyledRow = styled(Row)`
	border-bottom: 4px solid #333333;
	margin-bottom: 6px;
	padding: 6px;
	flex-grow: 0;
	background-color: gray;
`;

const HeaderRow = styled(Row)`
	padding: 0px 14px 0px 12px;
`;

const Header = styled(Text)`
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
`;

const HeaderClock = styled(Clock)`
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
`;

export default ({ totalTodo, totalDoing, onClickTrash }) => (
	<StyledRow>
		<Row flexRatio={1.5}>
			<HeaderRow spread>
				<Header>To Do</Header>
				<HeaderClock ms={totalTodo} bold />
			</HeaderRow>
			<HeaderRow spread>
				<Header>Doing</Header>
				<HeaderClock ms={totalDoing} bold />
			</HeaderRow>
		</Row>
		<Row align='center'>
			<Row />
			<Button onClick={onClickTrash}>
				<Feather.Trash2 />
			</Button>
		</Row>
	</StyledRow>
);