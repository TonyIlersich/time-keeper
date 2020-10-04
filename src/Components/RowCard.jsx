import React from 'react';
import styled from 'styled-components';
import { Row } from './FlexBox';

const RowCardContainer = styled(Row)`
	flex-basis: 70px;
	flex-grow: 0;
	margin: 4px;
	padding: 12px;
	background-color: ${props => props.color || 'transparent'};
`;

export const RowCard = ({ children, color }) => (
	<RowCardContainer align='center' color={color}>
		<Row>
			{children}
		</Row>
	</RowCardContainer>
);