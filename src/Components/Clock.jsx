import React from 'react';
import styled from 'styled-components';
import { Text } from './Text';

const format = number => Number.isNaN(number)
	? '??'
	: Math.floor(Math.abs(number)).toString().padStart(2, '0');

const NoShrinkText = styled(Text)`
	flex-shrink: 0;
`;

export const Clock = ({ className, ms, ss, sign, bold }) => (
	<NoShrinkText className={className} bold={bold}>
		{(sign || ms < 0) && (ms < 0 ? '-' : '+')}
		{format(ms / 1000 / 60 / 60)}
		:{format(ms / 1000 / 60 % 60)}
		{ss && (<>:{format(ms / 1000 % 60)}</>)}
	</NoShrinkText>
);
