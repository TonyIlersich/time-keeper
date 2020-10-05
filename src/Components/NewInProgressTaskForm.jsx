import React from 'react';
import * as Feather from 'react-feather';
import { RowCard } from './RowCard';
import { Input } from './Input';
import { Text } from './Text';
import { Button } from './Button';
import { createTask, TaskStatus } from '../Utils/Task';

export class NewInProgressTaskForm extends React.Component {
	initialState = {
		name: '',
		error: '',
	};

	state = {
		...this.initialState,
	};

	render() {
		return (
			<RowCard>
				<Input
					type='text'
					value={this.state.name}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.repeat) {
							e.preventDefault();
							e.stopPropagation();
							this.onCreate();
						}
					}}
					onChange={ev => this.setState({ name: ev.target.value })}
				/>
				<Text>{this.state.error}</Text>
				<Button onClick={this.onCreate}>
					<Feather.Plus />
				</Button>
			</RowCard>
		);
	}

	onCreate = () => {
		if (!this.state.name) return;
		try {
			this.props.onCreate(createTask({ name: this.state.name, status: TaskStatus.InProgress }));
			this.setState(this.initialState);
		} catch (err) {
			this.setState({ error: err.message });
		}
	}
}