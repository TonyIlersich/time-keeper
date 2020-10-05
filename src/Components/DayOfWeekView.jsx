import React from 'react';
import styled from 'styled-components';
import Colors from '../Styles/Colors';
import { Row } from './FlexBox';
import { Header } from './Text';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const PaddedHeader = styled(Header)`
	width: 1.6em;
	height: 48px;
	padding-top: .05em;
`;

const TodayHeader = styled(PaddedHeader)`
	border-radius: 5px;
	color: ${Colors.DarkBackground};
	background-color: ${Colors.Text};
`;

export default ({ className, now }) => (
	<Row justify='space-evenly' className={className}>
		{days.map(d => d === (now && now.format('dd'))
			? <TodayHeader key={d}>{d}</TodayHeader>
			: <PaddedHeader key={d}>{d}</PaddedHeader>
		)}
	</Row>
);