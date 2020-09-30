import styled from 'styled-components';
import { Container } from './Container';
import React from 'react';

const ButtonContainer = styled(Container)`
	min-width: auto;
	background-color: #dddddd;
	cursor: pointer;
	transition: background-color .2s;
	margin: 0;
	width: 44px;
	height: 44px;

	&:hover {
		background-color: #eeeeee;
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