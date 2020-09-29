import React from 'react';
import * as Feather from 'react-feather';
import styled from 'styled-components';
import { Button } from './Button';
import { Row } from './FlexBox';

const StyledRow = styled(Row)`
	border-bottom: 4px solid #333333;
	margin-bottom: 4px;
	padding: 8px;
	flex-grow: 0;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;
	background-color: gray;
`;

export default ({ onClickTrash }) => (
	<StyledRow>
		<Button onClick={onClickTrash}>
			<Feather.Trash2/>
		</Button>
	</StyledRow>
);