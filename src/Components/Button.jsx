import styled from 'styled-components';
import { Container } from './Container';
import React from 'react';

const ButtonContainer = styled(Container)`
	min-width: auto;
	background-color: #dddddd;
	cursor: pointer;
	transition: background-color .2s;
	margin: 0;

	&:hover {
		background-color: #eeeeee;
		transition: background-color 0s;
	}

	&:active {
		background-color: #bbbbbb;
	}
`;

export const Button = ({ children, onClick }) => (
	<ButtonContainer onClick={onClick}>
		{children}
	</ButtonContainer>
);