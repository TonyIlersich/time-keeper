import React from 'react';
import styled from 'styled-components';
import * as Feather from 'react-feather';

const Text = styled.span`
	align-items: center;
	display: flex;
	flex-grow: 0;
`;

const FlexBox = styled.div`
	display: flex;
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 0px;
	flex-direction: column;
	box-shadow: border-box;
`;

const Column = styled(FlexBox)`
	flex-direction: column;
`

const Row = styled(FlexBox)`
	flex-direction: row;
`

const Container = styled(Row)`
	border: 4px solid #333333;
	border-radius: 6px;
	margin: 4px;
	padding: 8px;
	display: flex;
	flex-grow: 0;
	align-items: center;
	justify-content: center;
`;

const ButtonContainer = styled(Container)`
	background-color: #dddddd;
	cursor: pointer;
	transition: background-color .2s;

	&:hover {
		background-color: #eeeeee;
		transition: background-color 0s;
	}

	&:active {
		background-color: #bbbbbb;
	}
`;

const Button = props => (
	<ButtonContainer onClick={props.onClick}>
		{props.children}
	</ButtonContainer>
);

const Clock = ({ ms }) => (
	<Text>{
		Math.floor(ms / 1000 / 60 / 60).toString().padStart(2, '0')
	}:{
		Math.floor(ms / 1000 / 60 % 60).toString().padStart(2, '0')
	}:{
		Math.floor(ms / 1000 % 60).toString().padStart(2, '0')
	}</Text>
);

const TaskView = props => (
	<Container>
		<Row>
			<Column style={{ justifyContent: 'space-evenly' }}>
				<Text>{props.task.name}</Text>
				<Clock ms={props.task.duration}/>
			</Column>
			<Row/>
			<Button onClick={() => props.task.active ? props.onPause() : props.onPlay(props.task)}>
				{props.task.active ? <Feather.Pause/> : <Feather.Play/>}
			</Button>
		</Row>
	</Container>
);

class NewTaskForm extends React.Component {
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
					<input
						type='text'
						value={this.state.name}
						onChange={ev => this.setState({ name: ev.target.value })}
					/>
					<Text>{this.state.error}</Text>
					<Row/>
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

class App extends React.Component {
	handlerId = null;

	state = {
		tasks: [],
	};

	componentDidMount() {
		const interval = 500;
		this.handlerId = setInterval(() => this.onTick(interval), interval);
	}

	componentWillUnmount() {
		this.handlerId && clearInterval(this.handlerId);
	}

	render() {
		return (
			<Row>
				<Column>
					{this.state.tasks.map((t, i) => (
						<TaskView
							key={i}
							task={t}
							onPlay={this.onSwitchTask}
							onPause={this.onPauseTask}
						/>
					))}
					<NewTaskForm onCreate={this.onCreateTask}/>
				</Column>
				<Column>
				</Column>
			</Row>
		);
	}

	onTick = deltaMs => {
		const tasks = this.state.tasks.map(t => ({
			...t,
			...(t.active ? { duration: t.duration + deltaMs } : {}
			),
		}));
		this.setState({ tasks });
	};

	onCreateTask = task => {
		if (this.state.tasks.some(t => t.name.toLowerCase() === task.name.toLowerCase())) {
			throw new Error(`Task name "${task.name}" is already in use.`);
		};
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: false,
		}));
		tasks.push(task);
		this.setState({ tasks });
	};

	onPauseTask = () => {
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: false,
		}));
		this.setState({ tasks });
	};

	onSwitchTask = target => {
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: t === target,
		}));
		this.setState({ tasks });
	};
}

export default App;
