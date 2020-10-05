import React from 'react';
import * as Feather from 'react-feather';
import { Input } from './Input';
import { ErrorText, Text } from './Text';
import { Button } from './Button';
import styled from 'styled-components';
import { RowCard } from './RowCard';
import { createTask, TaskStatus } from '../Utils/Task';
import { Column, Gap, Row } from './FlexBox';

const TimeInput = styled(Input)`
	padding: 0px;
	margin: 0px;
	flex-grow: 0;
	width: 1.2em;
	text-align: right;
`;

const ColonText = styled(Text)`
	padding-bottom: 2px;
`;

export default class NewPlannedTaskForm extends React.Component {
	initialState = {
		name: '',
		hh: '',
		mm: '',
		estDurationMinutes: NaN,
		error: '',
	};

	state = {
		...this.initialState,
	};

	render() {
		return (
			<RowCard>
				<Column>
					<Row>
						<ErrorText title={this.state.error}>{this.state.error}</ErrorText>
					</Row>
					<Row align='flex-end'>
						<Input
							type='text'
							value={this.state.name}
							onKeyDown={this.onKeyDown}
							onChange={ev => this.setState({ error: this.initialState.error, name: ev.target.value })}
						/>
						<Gap width={12} />
						<TimeInput
							type='text'
							value={this.state.hh}
							maxLength={2}
							onKeyDown={this.onKeyDown}
							onChange={ev => this.setState({ hh: ev.target.value.substr(0, 2) })}
						/>
						<ColonText>:</ColonText>
						<TimeInput
							type='text'
							value={this.state.mm}
							maxLength={2}
							onKeyDown={this.onKeyDown}
							onChange={ev => this.setState({ mm: ev.target.value.substr(0, 2) })}
						/>
					</Row>
				</Column>
				<Gap width={12} />
				<Button onClick={this.onCreate}>
					<Feather.Plus />
				</Button>
			</RowCard>
		);
	}

	onKeyDown = e => {
		if (e.key === 'Enter' && !e.repeat) {
			e.preventDefault();
			e.stopPropagation();
			this.onCreate();
		}
	};

	onCreate = () => {
		if (!this.state.name) return;
		try {
			const hour = Number(this.state.hh);
			const minute = Number(this.state.mm);
			this.props.onCreate(createTask({
				status: TaskStatus.Planned,
				name: this.state.name,
				estDuration: (hour * 60 + minute) * 60 * 1000,
			}));
			this.setState(this.initialState);
		} catch (err) {
			this.setState({ error: err.message });
		}
	}
}