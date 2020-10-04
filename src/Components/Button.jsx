import styled from 'styled-components';
import React from 'react';
import { Row } from './FlexBox';

const ButtonContainer = styled(Row)`
	min-width: 44px;
	background-color: #eeeeee;
	cursor: pointer;
	transition: background-color .2s;
	height: 44px;
	flex-grow: 0;
	align-items: center;
	justify-content: center;
	
	&:hover {
		background-color: #ffffff;
		transition: background-color 0s;
	}

	&:active {
		background-color: #bbbbbb;
	}
`;

export const Button = ({ className, children, onClick }) => (
	<ButtonContainer className={className} onClick={onClick}>
		{children}
	</ButtonContainer>
);