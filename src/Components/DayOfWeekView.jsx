import React from 'react';
import styled from 'styled-components';
import { Row } from './FlexBox';
import { Header } from './Text';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const PaddedHeader = styled(Header)`
	width: 1.6em;
	height: 48px;
`;

const TodayHeader = styled(PaddedHeader)`
	border-radius: 5px;
	color: lightgray;
	background-color: black;
`;

export default ({ className, now }) => (
	<Row justify='space-evenly' className={className}>
		{days.map(d => d === now.format('dd')
			? <TodayHeader>{d}</TodayHeader>
			: <PaddedHeader>{d}</PaddedHeader>
		)}
	</Row>
);