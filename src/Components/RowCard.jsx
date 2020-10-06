import React from 'react';
import styled from 'styled-components';
import Colors from '../Styles/Colors';
import { Row } from './FlexBox';

const RowCardContainer = styled(Row)`
	flex-basis: 70px;
	flex-grow: 0;
	margin: 4px;
	padding: ${props => props.selected ? 4 : 12}px;
	border: ${props => props.selected ? 8 : 0}px solid ${Colors.Border};
	background-color: ${props => props.color || Colors.Highlight};
`;

export const RowCard = ({ className, children, color, selected, onClick }) => (
	<RowCardContainer className={className} align='center' color={color} selected={selected} onClick={onClick}>
		<Row>
			{children}
		</Row>
	</RowCardContainer>
);