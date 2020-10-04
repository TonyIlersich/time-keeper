import React from 'react';
import * as Feather from 'react-feather';
import { Input } from './Input';
import { Text } from './Text';
import { Button } from './Button';
import { createTodo } from '../Utils/Todo';
import styled from 'styled-components';
import { RowCard } from './RowCard';

const NameInput = styled(Input)`
	margin-right: 16px;
`;

const TimeInput = styled(Input)`
	flex-grow: 0;
	width: 1.15em;
`;

export default class NewTodoForm extends React.Component {
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
				<NameInput
					type='text'
					value={this.state.name}
					onKeyDown={this.onKeyDown}
					onChange={ev => this.setState({ name: ev.target.value })}
				/>
				<TimeInput
					type='text'
					value={this.state.hh}
					maxLength={2}
					onKeyDown={this.onKeyDown}
					onChange={ev => this.setState({ hh: ev.target.value.substr(0, 2) })}
				/>
				<Text style={{ alignSelf: 'center' }}>:</Text>
				<TimeInput
					type='text'
					value={this.state.mm}
					maxLength={2}
					onKeyDown={this.onKeyDown}
					onChange={ev => this.setState({ mm: ev.target.value.substr(0, 2) })}
				/>
				<Text title={this.state.error}>{this.state.error}</Text>
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
			this.props.onCreate(createTodo({
				name: this.state.name,
				estDuration: (hour * 60 + minute) * 60 * 1000,
			}));
			this.setState(this.initialState);
		} catch (err) {
			this.setState({ error: err.message });
		}
	}
}