import React from 'react';
import { Text } from './Text';

export const Clock = ({ ms }) => (
	<Text>{
		Math.floor(ms / 1000 / 60 / 60).toString().padStart(2, '0')
	}:{
		Math.floor(ms / 1000 / 60 % 60).toString().padStart(2, '0')
	}:{
		Math.floor(ms / 1000 % 60).toString().padStart(2, '0')
	}</Text>
);
