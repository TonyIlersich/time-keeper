import React from 'react';
import { Input } from './Input';
import { createTask, TaskStatus } from '../Utils/Task';
import NewTaskFormContainer from './NewTaskFormContainer';

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
			<NewTaskFormContainer error={this.state.error} onCreate={this.onCreate}>
				<Input
					type='text'
					value={this.state.name}
					onKeyDown={this.onKeyDown}
					onChange={ev => this.setState({ error: this.initialState.error, name: ev.target.value })}
				/>
			</NewTaskFormContainer>
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
			this.props.onCreate(createTask({ name: this.state.name, status: TaskStatus.InProgress }));
			this.setState(this.initialState);
		} catch (err) {
			this.setState({ error: err.message });
		}
	}
}