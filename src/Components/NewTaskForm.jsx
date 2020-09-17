import React from 'react';
import * as Feather from 'react-feather';
import { Container } from './Container';
import { Row } from './FlexBox';
import { Input } from './Input';
import { Text } from './Text';
import { Button } from './Button';

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
			<Container>
				<Row>
					<Input
						type='text'
						value={this.state.name}
						onChange={ev => this.setState({ name: ev.target.value })}
					/>
					<Text>{this.state.error}</Text>
					<Button onClick={() => {
						try {
							this.props.onCreate({
								name: this.state.name,
								duration: 0,
								active: true,
							});
							this.setState(this.initialState);
						} catch (err) {
							this.setState({ error: err.message });
						}
					}}>
						<Feather.Plus/>
					</Button>
				</Row>
			</Container>
		);
	}
}