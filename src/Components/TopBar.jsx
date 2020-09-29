import React from 'react';
import * as Feather from 'react-feather';
import styled from 'styled-components';
import { Button } from './Button';
import { Row } from './FlexBox';
import { Text } from './Text';

const StyledRow = styled(Row)`
	border-bottom: 4px solid #333333;
	margin-bottom: 6px;
	padding: 8px;
	flex-grow: 0;
	background-color: gray;
`;

const HeaderRow = styled(Row)`
	align-items: center;
	flex-grow: 1.5;
`;

const Header = styled(Text)`
	margin: 0 8px;
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
`;

export default ({ onClickTrash }) => (
	<StyledRow>
		<HeaderRow>
			<Row>
				<Header>To Do</Header>
			</Row>
			<Row>
				<Header>Doing</Header>
			</Row>
		</HeaderRow>
		<Row>
			<Row />
			<Button onClick={onClickTrash}>
				<Feather.Trash2 />
			</Button>
		</Row>
	</StyledRow>
);