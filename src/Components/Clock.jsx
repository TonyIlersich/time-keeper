import React from 'react';
import { Text } from './Text';

const format = number => Number.isNaN(number)
	? '??'
	: Math.floor(number).toString().padStart(2, '0');

export const Clock = ({ ms }) => (
	<Text>
		{format(ms / 1000 / 60 / 60)}:{format(ms / 1000 / 60 % 60)}:{format(ms / 1000 % 60)}
	</Text>
);
