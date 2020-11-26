import styled from 'styled-components';
import React from 'react';
import { Row } from './FlexBox';

const ButtonContainer = styled(Row)`
	min-width: 44px;
	background-color: #eee0;
	cursor: pointer;
	transition: background-color .2s;
	height: 44px;
	flex-grow: 0;
	align-items: center;
	justify-content: center;
	
	&:hover {
		background-color: #fffc;
		transition: background-color 0s;
	}

	&:active {
		background-color: #dddc;
	}
`;

export const Button = ({ className, children, onClick }) => (
	<ButtonContainer className={className} onClick={e => {
		e.preventDefault();
		e.stopPropagation();
		onClick();
	}}>
		{children}
	</ButtonContainer>
);