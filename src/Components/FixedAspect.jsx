import React from 'react';
import styled from 'styled-components';
import { FlexBox } from './FlexBox';

const Outer = styled(FlexBox)`
	width: 100%;
	height: 0;
	padding-bottom: ${props => 100 / props.ratio}%;
	position: relative;
	flex-grow: 0;
`;

const Inner = styled(FlexBox)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

export default ({ children, ratio }) => (
	<Outer ratio={ratio}>
		<Inner>
			{children}
		</Inner>
	</Outer>
);
