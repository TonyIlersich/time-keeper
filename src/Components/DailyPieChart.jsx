import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import FixedAspect from './FixedAspect';

const totalValue = 24 * 60 * 60 * 1000;
const minDegree = 15;
const minValue = totalValue * minDegree / 360;

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
		<FixedAspect ratio={16 / 9}>
			<PieChart
				background='lightgray'
				data={data}
				totalValue={totalValue}
				label={labelProps => labelProps.dataEntry.title}
				labelStyle={idx => ({
					fontSize: Math.min(70 / data[idx].title.length, 8),
					fill: data[idx].color,
				})}
				radius={40}
				lineWidth={80}
				paddingAngle={1}
				labelPosition={112}
				animate
			/>
		</FixedAspect>
	);
};