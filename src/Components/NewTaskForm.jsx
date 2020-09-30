import React from 'react';
import * as Feather from 'react-feather';
import { Container } from './Container';
import { Row } from './FlexBox';
import { Input } from './Input';
import { Text } from './Text';
import { Button } from './Button';
import { createTask } from '../Utils/Task';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
	flex-basis: 70px;
`;

export class NewTaskForm extends React.Component {
	initialState = {
		name: '',
		error: '',
	};

	state = {
		...this.initialState,
	};

	render() {
		return (
			<StyledContainer>
				<Row>
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
				</Row>
			</StyledContainer>
		);
	}

	onCreate = () => {
		if (!this.state.name) return;
		try {
			this.props.onCreate(createTask({ name: this.state.name }));
			this.setState(this.initialState);
		} catch (err) {
			this.setState({ error: err.message });
		}
	}
}