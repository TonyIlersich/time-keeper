import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';

const totalValue = 24 * 60 * 60 * 1000;
const minDegree = 15;
const minValue = totalValue * minDegree / 360;

const StyledPieChart = styled(PieChart)`
`;

export const DailyPieChart = ({ tasks }) => {
	const other = {
		title: 'other',
		value: tasks.filter(t => t.duration < minValue).reduce((sum, t) => sum + t.duration, 0),
		color: 'black',
	};
	const data = [
		...(other.value > 10000 ? [other] : []),
		...tasks.filter(t => t.duration >= minValue)
			.sort((t1, t2) => t1.duration - t2.duration)
			.map(t => ({
				title: t.name,
				value: t.duration,
				color: t.color,
			})),
	];
	return (
		<StyledPieChart
			background='lightgray'
			data={data}
			totalValue={totalValue}
			startAngle={-90}
			label={labelProps => labelProps.dataEntry.title}
			labelStyle={idx => ({
				fontSize: 10 / (1 + Math.pow(data[idx].title.length, .5)),
				fill: data[idx].color,
			})}
			radius={25}
			lineWidth={80}
			paddingAngle={1}
			labelPosition={112}
			animate
		/>
	);
};